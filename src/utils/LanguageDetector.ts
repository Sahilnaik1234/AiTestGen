import * as fs from 'fs';
import * as path from 'path';

export interface DetectedLanguage {
    name: string;
    extensions: string[];
    setupAction?: string;           // GitHub Actions setup action
    setupVersion?: string;          // Version to install
    testCommand?: string;           // Command to run tests with coverage
    coverageFiles?: string[];       // Glob patterns for coverage output
    installCommand?: string;        // Dependency install command
    ecosystem?: string;             // Marker file that confirmed detection
}

export interface DetectionResult {
    languages: DetectedLanguage[];
    summary: string[];
}

// Each language definition: how to detect it, what to install, how to test
const LANGUAGE_DEFINITIONS: {
    name: string;
    extensions: string[];
    markers: string[];              // Config/ecosystem files that confirm the language
    setupAction: string;
    setupVersionKey: string;
    defaultVersion: string;
    detectVersion?: (rootDir: string) => string | null;
    testCommand: (rootDir: string) => string;
    coverageFiles: string[];
    installCommand?: (rootDir: string) => string | null;
}[] = [
        {
            name: 'typescript',
            extensions: ['.ts', '.tsx'],
            markers: ['tsconfig.json', 'package.json'],
            setupAction: 'actions/setup-node@v4',
            setupVersionKey: 'node-version',
            defaultVersion: '20',
            detectVersion: (rootDir) => {
                const nvmrc = path.join(rootDir, '.nvmrc');
                if (fs.existsSync(nvmrc)) return fs.readFileSync(nvmrc, 'utf-8').trim();
                const pkg = readJson(path.join(rootDir, 'package.json'));
                return pkg?.engines?.node || null;
            },
            testCommand: () => 'npm test || true',
            coverageFiles: ['**/coverage-final.json'],
            installCommand: () => 'npm install',
        },
        {
            name: 'javascript',
            extensions: ['.js', '.jsx'],
            markers: ['package.json'],
            setupAction: 'actions/setup-node@v4',
            setupVersionKey: 'node-version',
            defaultVersion: '20',
            detectVersion: (rootDir) => {
                const nvmrc = path.join(rootDir, '.nvmrc');
                if (fs.existsSync(nvmrc)) return fs.readFileSync(nvmrc, 'utf-8').trim();
                const pkg = readJson(path.join(rootDir, 'package.json'));
                return pkg?.engines?.node || null;
            },
            testCommand: () => 'npm test || true',
            coverageFiles: ['**/coverage-final.json'],
            installCommand: () => 'npm install',
        },
        {
            name: 'go',
            extensions: ['.go'],
            markers: ['go.mod', 'go.sum'],
            setupAction: 'actions/setup-go@v5',
            setupVersionKey: 'go-version',
            defaultVersion: '1.21',
            detectVersion: (rootDir) => {
                const goMod = path.join(rootDir, 'go.mod');
                if (fs.existsSync(goMod)) {
                    const content = fs.readFileSync(goMod, 'utf-8');
                    const match = content.match(/^go\s+(\d+\.\d+)/m);
                    if (match) return match[1];
                }
                return null;
            },
            testCommand: () => 'go test -coverprofile=coverage.out ./... || true',
            coverageFiles: ['**/coverage.out'],
        },
        {
            name: 'python',
            extensions: ['.py'],
            markers: ['requirements.txt', 'setup.py', 'pyproject.toml', 'Pipfile', 'setup.cfg'],
            setupAction: 'actions/setup-python@v5',
            setupVersionKey: 'python-version',
            defaultVersion: '3.10',
            detectVersion: (rootDir) => {
                const pyproject = path.join(rootDir, 'pyproject.toml');
                if (fs.existsSync(pyproject)) {
                    const content = fs.readFileSync(pyproject, 'utf-8');
                    const match = content.match(/requires-python\s*=\s*"[>=<]*(\d+\.\d+)/);
                    if (match) return match[1];
                }
                return null;
            },
            testCommand: () => 'pytest . --cov=. --cov-report=json:coverage.json || true',
            coverageFiles: ['**/coverage.json'],
            installCommand: (rootDir) => {
                if (fs.existsSync(path.join(rootDir, 'requirements.txt')))
                    return 'pip install -r requirements.txt && pip install pytest pytest-cov';
                return 'pip install pytest pytest-cov';
            },
        },
        {
            name: 'java',
            extensions: ['.java'],
            markers: ['pom.xml', 'build.gradle', 'build.gradle.kts'],
            setupAction: 'actions/setup-java@v4',
            setupVersionKey: 'java-version',
            defaultVersion: '17',
            detectVersion: (rootDir) => {
                const pomPath = path.join(rootDir, 'pom.xml');
                if (fs.existsSync(pomPath)) {
                    const content = fs.readFileSync(pomPath, 'utf-8');
                    const match = content.match(/<maven\.compiler\.source>(\d+)</);
                    if (match) return match[1];
                }
                return null;
            },
            testCommand: () => 'mvn clean test || true',
            coverageFiles: ['**/jacoco.xml'],
        },
        {
            name: 'rust',
            extensions: ['.rs'],
            markers: ['Cargo.toml'],
            setupAction: 'dtolnay/rust-toolchain@stable',
            setupVersionKey: 'toolchain',
            defaultVersion: 'stable',
            testCommand: () => 'cargo test || true',
            coverageFiles: [],
        },
        {
            name: 'csharp',
            extensions: ['.cs'],
            markers: ['*.csproj', '*.sln'],
            setupAction: 'actions/setup-dotnet@v4',
            setupVersionKey: 'dotnet-version',
            defaultVersion: '8.0',
            testCommand: () => 'dotnet test --collect:"XPlat Code Coverage" || true',
            coverageFiles: ['**/coverage.cobertura.xml'],
        },
        {
            name: 'cpp',
            extensions: ['.cpp', '.cc', '.cxx', '.h', '.hpp'],
            markers: ['CMakeLists.txt', 'Makefile'],
            setupAction: '',
            setupVersionKey: '',
            defaultVersion: '',
            testCommand: () => 'cmake --build . --target test || make test || true',
            coverageFiles: [],
        },
    ];

export class LanguageDetector {
    private rootDir: string;
    private ignorePatterns = ['node_modules', '.git', 'dist', 'build', 'coverage', 'target', '__pycache__', '.venv', 'venv'];

    constructor(rootDir: string = process.cwd()) {
        this.rootDir = rootDir;
    }

    detect(): DetectionResult {
        const foundExtensions = new Set<string>();
        const foundMarkers = new Set<string>();

        this.scanDirectory(this.rootDir, foundExtensions, foundMarkers, 0);

        const detected: DetectedLanguage[] = [];
        const seen = new Set<string>();

        for (const lang of LANGUAGE_DEFINITIONS) {
            // Skip if we already detected this via a more specific match (e.g., TS subsumes JS)
            if (seen.has(lang.name)) continue;

            const hasExtension = lang.extensions.some(ext => foundExtensions.has(ext));
            const hasMarker = lang.markers.some(marker => {
                if (marker.includes('*')) {
                    // Glob-style marker: check if any found marker matches
                    const suffix = marker.replace('*', '');
                    return Array.from(foundMarkers).some(m => m.endsWith(suffix));
                }
                return foundMarkers.has(marker);
            });

            if (!hasExtension) continue;

            // TypeScript detection subsumes JavaScript
            if (lang.name === 'typescript' && hasExtension) {
                seen.add('javascript');
            }

            const version = lang.detectVersion?.(this.rootDir) || lang.defaultVersion;
            const matchedMarker = lang.markers.find(m => {
                if (m.includes('*')) {
                    const suffix = m.replace('*', '');
                    return Array.from(foundMarkers).some(fm => fm.endsWith(suffix));
                }
                return foundMarkers.has(m);
            });

            detected.push({
                name: lang.name,
                extensions: lang.extensions.filter(ext => foundExtensions.has(ext)),
                setupAction: lang.setupAction || undefined,
                setupVersion: version,
                testCommand: lang.testCommand(this.rootDir),
                coverageFiles: lang.coverageFiles,
                installCommand: lang.installCommand?.(this.rootDir) || undefined,
                ecosystem: matchedMarker || undefined,
            });

            seen.add(lang.name);
        }

        return {
            languages: detected,
            summary: detected.map(l => `${l.name} (${l.setupVersion}${l.ecosystem ? ', via ' + l.ecosystem : ''})`)
        };
    }

    private scanDirectory(dir: string, extensions: Set<string>, markers: Set<string>, depth: number): void {
        // Limit scan depth to avoid traversing huge trees
        if (depth > 5) return;

        let entries: fs.Dirent[];
        try {
            entries = fs.readdirSync(dir, { withFileTypes: true });
        } catch {
            return;
        }

        for (const entry of entries) {
            const name = entry.name;

            if (entry.isDirectory()) {
                if (this.ignorePatterns.includes(name) || name.startsWith('.')) continue;
                this.scanDirectory(path.join(dir, name), extensions, markers, depth + 1);
            } else if (entry.isFile()) {
                const ext = path.extname(name).toLowerCase();
                if (ext) extensions.add(ext);

                // Check if this file is a known ecosystem marker
                for (const lang of LANGUAGE_DEFINITIONS) {
                    for (const marker of lang.markers) {
                        if (marker.includes('*')) {
                            const suffix = marker.replace('*', '');
                            if (name.endsWith(suffix)) markers.add(name);
                        } else if (name === marker) {
                            markers.add(name);
                        }
                    }
                }
            }
        }
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
