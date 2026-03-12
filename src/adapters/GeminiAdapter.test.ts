import { GeminiAdapter } from './GeminiAdapter';
import axios from 'axios';

describe('GeminiAdapter', () => {
    let adapter: GeminiAdapter;

    beforeEach(() => {
        adapter = new GeminiAdapter();
        adapter.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
        adapter.modelName = 'test-model';
        adapter.apiKey = 'test-api-key';

        // Mock axios post request
        jest.spyOn(axios, 'post').mockImplementation(async () => {
            return {
                data: {
                    candidates: [
                        {
                            content: {
                                parts: [
                                    {
                                        text: '