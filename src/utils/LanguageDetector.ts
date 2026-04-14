import * as fs from 'fs';
import * as path from 'path';

export interface DetectedLanguage {
    language: string;
    framework: string;
    configFile: string;             // The config file that triggered detection
    testCommand: string;            // Command to run tests with coverage
    coverageCommand?: string;       // Separate coverage command if different from test
    installCommand: string;         // Command to install dependencies
    setupAction?: string;           // GitHub Actions setup action
    setupVersion?: string;          // Runtime version to install
    setupExtra?: Record<string, string>; // Extra setup action inputs (e.g. distribution for Java)
    coverageFiles?: string[];       // Glob patterns for generated coverage reports
}

export interface DetectionResult {
    languages: DetectedLanguage[];
    summary: string[];
}

/**
* Config-file-first language detection.
*
* Instead of scanning file extensions, we look for package manager / build tool
* config files and inspect their contents to determine:
*   Config File → Language → Framework → Test Command
*
* This is more accurate because:
* - A .py file doesn't tell you if they use pytest vs unittest
* - A .ts file doesn't tell you if they use jest vs vitest vs mocha
* - The config file knows exactly what the project uses
*/
export class LanguageDetector {
    private rootDir: string;
    private ignorePatterns = [
        'node_modules', '.git', 'dist', 'build', 'coverage',
        'target', '__pycache__', '.venv', 'venv', '.tox'
    ];

    constructor(rootDir: string = process.cwd()) {
        this.rootDir = rootDir;
    }

    detect(): DetectionResult {
        const detected: DetectedLanguage[] = [];
        const configFiles = this.findConfigFiles(this.rootDir, 0);

        // ── 1. package.json → JS/TS (inspect deps for framework) ──
        const packageJsons = configFiles.filter(f => path.basename(f) === 'package.json');
        for (const pkgPath of packageJsons) {
            const result = this.detectFromPackageJson(pkgPath);
            if (result && !detected.some(d => d.configFile === result.configFile)) {
                detected.push(result);
            }
        }

        // ── 2. Python: requirements.txt / pyproject.toml / setup.py / Pipfile ──
        const pythonConfigs = configFiles.filter(f =>
            ['requirements.txt', 'pyproject.toml', 'setup.py', 'Pipfile', 'setup.cfg'].includes(path.basename(f))
        );
        if (pythonConfigs.length > 0) {
            const result = this.detectPython(pythonConfigs);
            if (result) detected.push(result);
        }

        // ── 3. go.mod → Go ──
        const goMods = configFiles.filter(f => path.basename(f) === 'go.mod');
        for (const goModPath of goMods) {
            const result = this.detectGo(goModPath);
            if (result) detected.push(result);
        }

        // ── 4. pom.xml → Java (Maven) ──
        const pomFiles = configFiles.filter(f => path.basename(f) === 'pom.xml');
        for (const pomPath of pomFiles) {
            const result = this.detectJavaMaven(pomPath);
            if (result && !detected.some(d => d.language === 'java')) {
                detected.push(result);
            }
        }

        // ── 5. build.gradle / build.gradle.kts → Java/Kotlin (Gradle) ──
        const gradleFiles = configFiles.filter(f =>
            ['build.gradle', 'build.gradle.kts'].includes(path.basename(f))
        );
        if (gradleFiles.length > 0 && !detected.some(d => d.language === 'java')) {
            detected.push(this.detectJavaGradle(gradleFiles[0]));
        }

        // ── 6. Cargo.toml → Rust ──
        const cargoFiles = configFiles.filter(f => path.basename(f) === 'Cargo.toml');
        if (cargoFiles.length > 0) {
            detected.push(this.detectRust(cargoFiles[0]));
        }

        // ── 7. *.csproj / *.sln → C# ──
        const csharpFiles = configFiles.filter(f =>
            f.endsWith('.csproj') || f.endsWith('.sln')
        );
        if (csharpFiles.length > 0) {
            detected.push(this.detectCSharp(csharpFiles[0]));
        }

        // ── 8. Gemfile → Ruby ──
        const gemfiles = configFiles.filter(f => path.basename(f) === 'Gemfile');
        if (gemfiles.length > 0) {
            detected.push(this.detectRuby(gemfiles[0]));
        }

        return {
            languages: detected,
            summary: detected.map(l =>
                `${l.language} (${l.framework}, via ${path.basename(l.configFile)})`
            ),
        };
    }

    // ─── Config File Scanners ───────────────────────────────────────────

    private detectFromPackageJson(pkgPath: string): DetectedLanguage | null {
        const pkg = readJson(pkgPath);
        if (!pkg) return null;

        const allDeps = {
            ...pkg.dependencies,
            ...pkg.devDependencies,
        };

        // Determine language: TS if typescript is a dep or tsconfig exists alongside
        const tsConfigExists = fs.existsSync(path.join(path.dirname(pkgPath), 'tsconfig.json'));
        const hasTypescriptDep = !!allDeps['typescript'];
        const language = (tsConfigExists || hasTypescriptDep) ? 'typescript' : 'javascript';

        // Determine test framework by checking deps
        let framework: string;
        let testCommand: string;
        let coverageCommand: string | undefined;

        if (allDeps['vitest']) {
            framework = 'vitest';
            testCommand = 'npx vitest run --coverage || true';
        } else if (allDeps['jest'] || allDeps['ts-jest']) {
            framework = 'jest';
            testCommand = 'npm test || true';
        } else if (allDeps['mocha']) {
            framework = 'mocha';
            testCommand = 'npm test || true';
            coverageCommand = 'npx nyc npm test || true';
        } else if (allDeps['ava']) {
            framework = 'ava';
            testCommand = 'npx ava || true';
            coverageCommand = 'npx c8 npx ava || true';
        } else if (pkg.scripts?.test) {
            // Has a test script but unknown framework — use it directly
            framework = 'npm-script';
            testCommand = 'npm test || true';
        } else {
            // package.json exists but no test framework — still install deps
            return null;
        }

        // Detect Node version from .nvmrc, engines, or package.json
        let version = '20';
        const nvmrcPath = path.join(path.dirname(pkgPath), '.nvmrc');
        if (fs.existsSync(nvmrcPath)) {
            version = fs.readFileSync(nvmrcPath, 'utf-8').trim();
        } else if (pkg.engines?.node) {
            // Extract major version number from semver range (e.g., ">=18" → "18")
            const match = String(pkg.engines.node).match(/(\d+)/);
            if (match) version = match[1];
        }

        return {
            language,
            framework,
            configFile: pkgPath,
            testCommand,
            coverageCommand,
            installCommand: 'npm install',
            setupAction: 'actions/setup-node@v4',
            setupVersion: version,
            coverageFiles: ['**/coverage-final.json', '**/coverage/lcov.info'],
        };
    }

    private detectPython(configs: string[]): DetectedLanguage | null {
        const rootDir = path.dirname(configs[0]);
        let framework = 'pytest';  // default
        let installCommand = 'pip install pytest pytest-cov';
        let testCommand = 'pytest . --cov=. --cov-report=json:coverage.json || true';
        let version = '3.10';

        // Check pyproject.toml for poetry or version hints
        const pyproject = configs.find(f => path.basename(f) === 'pyproject.toml');
        if (pyproject) {
            const content = fs.readFileSync(pyproject, 'utf-8');
            const versionMatch = content.match(/requires-python\s*=\s*"[>=<]*(\d+\.\d+)/);
            if (versionMatch) version = versionMatch[1];

            if (content.includes('[tool.poetry]')) {
                installCommand = 'pip install poetry && poetry install';
                testCommand = 'poetry run pytest --cov=. --cov-report=json:coverage.json || true';
            }
            if (content.includes('unittest')) framework = 'unittest';
        }

        // Check requirements.txt for pytest
        const reqFile = configs.find(f => path.basename(f) === 'requirements.txt');
        if (reqFile) {
            const content = fs.readFileSync(reqFile, 'utf-8');
            if (content.includes('pytest')) {
                framework = 'pytest';
                installCommand = 'pip install -r requirements.txt && pip install pytest-cov';
            } else {
                installCommand = 'pip install -r requirements.txt && pip install pytest pytest-cov';
            }
        }

        // If Pipfile, use pipenv
        const pipfile = configs.find(f => path.basename(f) === 'Pipfile');
        if (pipfile) {
            installCommand = 'pip install pipenv && pipenv install --dev';
            testCommand = 'pipenv run pytest --cov=. --cov-report=json:coverage.json || true';
        }

        return {
            language: 'python',
            framework,
            configFile: configs[0],
            testCommand,
            installCommand,
            setupAction: 'actions/setup-python@v5',
            setupVersion: version,
            coverageFiles: ['**/coverage.json'],
        };
    }

    private detectGo(goModPath: string): DetectedLanguage {
        let version = '1.21';
        const content = fs.readFileSync(goModPath, 'utf-8');
        const versionMatch = content.match(/^go\s+(\d+\.\d+)/m);
        if (versionMatch) version = versionMatch[1];

        return {
            language: 'go',
            framework: 'go-test',
            configFile: goModPath,
            testCommand: 'go test -coverprofile=coverage.out ./... || true',
            installCommand: 'go mod download',
            setupAction: 'actions/setup-go@v5',
            setupVersion: version,
            coverageFiles: ['**/coverage.out'],
        };
    }

    private detectJavaMaven(pomPath: string): DetectedLanguage {
        let version = '17';
        const content = fs.readFileSync(pomPath, 'utf-8');
        const versionMatch = content.match(/<maven\.compiler\.source>(\d+)</);
        if (versionMatch) version = versionMatch[1];

        return {
            language: 'java',
            framework: 'maven',
            configFile: pomPath,
            testCommand: 'mvn clean test || true',
            installCommand: 'mvn dependency:resolve',
            setupAction: 'actions/setup-java@v4',
            setupVersion: version,
            setupExtra: { distribution: 'temurin' },
            coverageFiles: ['**/jacoco.xml'],
        };
    }

    private detectJavaGradle(gradlePath: string): DetectedLanguage {
        const isKotlinDsl = gradlePath.endsWith('.kts');
        return {
            language: isKotlinDsl ? 'kotlin' : 'java',
            framework: 'gradle',
            configFile: gradlePath,
            testCommand: './gradlew test || true',
            installCommand: './gradlew dependencies',
            setupAction: 'actions/setup-java@v4',
            setupVersion: '17',
            setupExtra: { distribution: 'temurin' },
            coverageFiles: ['**/jacoco.xml'],
        };
    }

    private detectRust(cargoPath: string): DetectedLanguage {
        return {
            language: 'rust',
            framework: 'cargo',
            configFile: cargoPath,
            testCommand: 'cargo test || true',
            installCommand: '',  // Rust toolchain handles it
            setupAction: 'dtolnay/rust-toolchain@stable',
            setupVersion: 'stable',
            coverageFiles: [],
        };
    }

    private detectCSharp(projPath: string): DetectedLanguage {
        return {
            language: 'csharp',
            framework: 'dotnet',
            configFile: projPath,
            testCommand: 'dotnet test --collect:"XPlat Code Coverage" || true',
            installCommand: 'dotnet restore',
            setupAction: 'actions/setup-dotnet@v4',
            setupVersion: '8.0',
            coverageFiles: ['**/coverage.cobertura.xml'],
        };
    }

    private detectRuby(gemfilePath: string): DetectedLanguage {
        const content = fs.readFileSync(gemfilePath, 'utf-8');
        const hasRspec = content.includes('rspec');

        return {
            language: 'ruby',
            framework: hasRspec ? 'rspec' : 'minitest',
            configFile: gemfilePath,
            testCommand: hasRspec
                ? 'bundle exec rspec || true'
                : 'bundle exec rake test || true',
            installCommand: 'bundle install',
            setupAction: 'ruby/setup-ruby@v1',
            setupVersion: '3.2',
            coverageFiles: ['**/coverage/.resultset.json'],
        };
    }

    // ─── Filesystem Scanner ─────────────────────────────────────────────

    /**
     * Recursively find config files. Only looks for known filenames,
     * does NOT scan extensions.
     */
    private findConfigFiles(dir: string, depth: number): string[] {
        if (depth > 4) return [];

        const CONFIG_FILENAMES = new Set([
            'package.json', 'tsconfig.json',
            'go.mod',
            'requirements.txt', 'pyproject.toml', 'setup.py', 'Pipfile', 'setup.cfg',
            'pom.xml', 'build.gradle', 'build.gradle.kts',
            'Cargo.toml',
            'Gemfile',
            '.nvmrc',
        ]);
        // Suffix-based matches (*.csproj, *.sln)
        const CONFIG_SUFFIXES = ['.csproj', '.sln'];

        const results: string[] = [];

        let entries: fs.Dirent[];
        try {
            entries = fs.readdirSync(dir, { withFileTypes: true });
        } catch {
            return results;
        }

        for (const entry of entries) {
            const name = entry.name;
            const fullPath = path.join(dir, name);

            if (entry.isDirectory()) {
                if (this.ignorePatterns.includes(name) || name.startsWith('.')) continue;
                results.push(...this.findConfigFiles(fullPath, depth + 1));
            } else if (entry.isFile()) {
                if (CONFIG_FILENAMES.has(name)) {
                    results.push(fullPath);
                } else if (CONFIG_SUFFIXES.some(s => name.endsWith(s))) {
                    results.push(fullPath);
                }
            }
        }

        return results;
    }
}

function readJson(filePath: string): any {
    try {
        if (!fs.existsSync(filePath)) return null;
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
        return null;
    }
}
