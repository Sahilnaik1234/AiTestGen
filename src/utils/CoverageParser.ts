import * as fs from 'fs';
import * as path from 'path';

export interface FileCoverage {
    filePath: string;
    coverage: number;
    details?: string;
}

export class CoverageParser {
    static parseJest(jsonPath: string): FileCoverage[] {
        if (!fs.existsSync(jsonPath)) return [];
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        const results: FileCoverage[] = [];

        for (const filePath in data) {
            const summary = data[filePath].s;
            const total = Object.keys(summary).length;
            const covered = Object.values(summary).filter((count: any) => count > 0).length;
            const percentage = total === 0 ? 100 : (covered / total) * 100;

            // Normalize path: Convert absolute path to relative path if possible
            let normalizedPath = filePath;
            if (path.isAbsolute(filePath) && filePath.includes(process.cwd())) {
                normalizedPath = path.relative(process.cwd(), filePath);
            }

            results.push({ filePath: normalizedPath, coverage: percentage });
        }
        return results;
    }

    static parseGo(outPath: string): FileCoverage[] {
        if (!fs.existsSync(outPath)) return [];
        const content = fs.readFileSync(outPath, 'utf8');
        const lines = content.split('\n');
        const fileData: Record<string, { covered: number; total: number; missingBlocks: string[] }> = {};

        for (const line of lines) {
            if (line.startsWith('mode:') || !line.trim()) continue;
            const parts = line.split(' ');
            if (parts.length < 3) continue;

            const fileLine = parts[0];
            const fileName = fileLine.split(':')[0];
            const range = fileLine.split(':')[1];
            const statements = parseInt(parts[1], 10);
            const count = parseInt(parts[2], 10);

            if (!fileData[fileName]) fileData[fileName] = { covered: 0, total: 0, missingBlocks: [] };
            fileData[fileName].total += statements;
            if (count > 0) {
                fileData[fileName].covered += statements;
            } else {
                fileData[fileName].missingBlocks.push(range);
            }
        }

        return Object.entries(fileData).map(([fileName, data]) => {
            return {
                filePath: fileName,
                coverage: data.total === 0 ? 100 : (data.covered / data.total) * 100,
                details: data.missingBlocks.length > 0 ? `Uncovered blocks: ${data.missingBlocks.slice(0, 5).join(', ')}${data.missingBlocks.length > 5 ? '...' : ''}` : undefined
            };
        });
    }

    static parsePython(jsonPath: string): FileCoverage[] {
        if (!fs.existsSync(jsonPath)) return [];
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        const results: FileCoverage[] = [];

        if (data.files) {
            for (const filePath in data.files) {
                const fileStat = data.files[filePath];
                results.push({
                    filePath,
                    coverage: fileStat.summary.percent_covered,
                    details: fileStat.missing_lines?.length > 0 ? `Missing lines: ${fileStat.missing_lines.slice(0, 10).join(', ')}${fileStat.missing_lines.length > 10 ? '...' : ''}` : undefined
                });
            }
        }
        return results;
    }

    static parseJacoco(xmlPath: string): FileCoverage[] {
        if (!fs.existsSync(xmlPath)) return [];
        const content = fs.readFileSync(xmlPath, 'utf8');
        const results: FileCoverage[] = [];

        // Basic regex parsing for JaCoCo XML if no XML parser available
        // <sourcefile name="StringUtils.java"> ... <counter type="LINE" missed="10" covered="20"/>
        const sourceFileMatches = content.matchAll(/<sourcefile name="([^"]+)">[\s\S]*?<counter type="LINE" missed="(\d+)" covered="(\d+)"\/>/g);

        for (const match of sourceFileMatches) {
            const fileName = match[1];
            const missed = parseInt(match[2], 10);
            const covered = parseInt(match[3], 10);
            const total = missed + covered;
            results.push({
                filePath: fileName,
                coverage: total === 0 ? 100 : (covered / total) * 100
            });
        }
        return results;
    }
}
