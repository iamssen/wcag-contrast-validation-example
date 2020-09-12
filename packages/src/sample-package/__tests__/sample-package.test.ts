import { yourFunction } from 'sample-package';

describe('sample-package', () => {
  test('should print Hello World!', () => {
    expect(yourFunction()).toBe('Hello World!');
  });
});
