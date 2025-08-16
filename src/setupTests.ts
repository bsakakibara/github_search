import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Configuração para Jest fetch
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();