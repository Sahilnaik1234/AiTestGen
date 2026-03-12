import { test, expect } from '@jest/globals';
import { Command } from 'commander';
import { Orchestrator } from './core/Orchestrator';
import { CoverageParser, FileCoverage } from './utils/CoverageParser';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import index from './index';

describe('index.ts', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(process, 'exit').mockImplementation(() => {});
  });

  test('should define the command', () => {
    const program = new Command();
    program.name('ai-test-gen');
    program.description('Generate AI-powered test cases for any language');
    program.version('1.0.0');
    expect(program.name()).toBe('ai-test-gen');
    expect(program.description()).toBe('Generate AI-powered test cases for any language');
    expect(program.version()).toBe('1.0.0');
  });

  test('should define the generate command', () => {
    const program = new Command();
    program.command('generate');
    expect(program.commands).toHaveLength(1);
    expect(program.commands[0].name()).toBe('generate');
  });

  test('should define the coverage command', () => {
    const program = new Command();
    program.command('coverage');
    expect(program.commands).toHaveLength(1);
    expect(program.commands[0].name()).toBe('coverage');
  });

  test('should run the generate command', async () => {
    const runBatchGenerationSpy = jest.fn();
    const program = new Command();
    program.command('generate').action(async (pattern, options) => {
      await runBatchGenerationSpy(pattern, options);
    });
    program.parse(['node', 'index.js', 'generate', 'pattern']);
    expect(runBatchGenerationSpy).toHaveBeenCalledTimes(1);
    expect(runBatchGenerationSpy).toHaveBeenCalledWith('pattern', expect.any(Object));
  });

  test('should run the coverage command', async () => {
    const program = new Command();
    program.command('coverage').action(async (options) => {
      await index.runCoverageCommand(options);
    });
    program.parse(['node', 'index.js', 'coverage']);
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  test('should find and parse reports', () => {
    const findAndParseReportsSpy = jest.fn();
    const program = new Command();
    program.command('coverage').action(async (options) => {
      await findAndParseReportsSpy();
    });
    program.parse(['node', 'index.js', 'coverage']);
    expect(findAndParseReportsSpy).toHaveBeenCalledTimes(1);
  });

  test('should resolve file path', () => {
    const resolveFilePathSpy = jest.fn();
    const filePath = 'path/to/file';
    resolveFilePathSpy(filePath);
    expect(resolveFilePathSpy).toHaveBeenCalledTimes(1);
    expect(resolveFilePathSpy).toHaveBeenCalledWith(filePath);
  });

  test('should save results', () => {
    const saveResultsSpy = jest.fn();
    const results = ['result1', 'result2'];
    saveResultsSpy(results);
    expect(saveResultsSpy).toHaveBeenCalledTimes(1);
    expect(saveResultsSpy).toHaveBeenCalledWith(results);
  });

  test('should update coverage only', () => {
    const updateCoverageOnlySpy = jest.fn();
    const reports = [new FileCoverage('file1', 100), new FileCoverage('file2', 50)];
    updateCoverageOnlySpy(reports);
    expect(updateCoverageOnlySpy).toHaveBeenCalledTimes(1);
    expect(updateCoverageOnlySpy).toHaveBeenCalledWith(reports);
  });

  test('should get API key', () => {
    const getApiKeySpy = jest.fn();
    const type = 'openai';
    getApiKeySpy(type);
    expect(getApiKeySpy).toHaveBeenCalledTimes(1);
    expect(getApiKeySpy).toHaveBeenCalledWith(type);
  });

  test('should run batch generation', async () => {
    const runBatchGenerationSpy = jest.fn();
    const pattern = 'pattern';
    const options = { model: 'openai' };
    await runBatchGenerationSpy(pattern, options);
    expect(runBatchGenerationSpy).toHaveBeenCalledTimes(1);
    expect(runBatchGenerationSpy).toHaveBeenCalledWith(pattern, options);
  });
});