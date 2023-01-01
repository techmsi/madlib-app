import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { mockApiResponse } from 'mocks/mockApiResponse';

const mockStoryApi = 'http://localhost:3000/api/story';
export default async function mockFetch(url) {
  switch (url) {
    case mockStoryApi: {
      return {
        ok: true,
        status: 200,
        json: async () => mockApiResponse,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(mockFetch);
});

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});
