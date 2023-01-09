// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
import { server } from './__tests__/mocks/msw/server';
// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

beforeAll(() => {
  server.listen(
    {
      onUnhandledRequest: 'warn'
    }
  );
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
