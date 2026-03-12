import { GroqAdapter } from './GroqAdapter';
import axios from 'axios';
import { AIModelResponse } from './BaseAdapter';

describe('GroqAdapter', () => {
    let adapter: GroqAdapter;

    beforeEach(() => {
        adapter = new GroqAdapter();
        // Mock the axios post request
        jest.spyOn(axios, 'post').mockImplementation(() => {
            return Promise.resolve({
                data: {
                    choices: [
                        {
                            message: {
                                content: '