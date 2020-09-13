import { compareWCAGContrastScores } from '@ssen/anlayze-wcag-contrast/compareWCAGContrastScores';

describe('compareWCAGContrastScores', () => {
  test('should the changed value is false', () => {
    // Act
    const { changed } = compareWCAGContrastScores(
      { a: { background: 'AAA', paper: 'AAA' } },
      {
        a: {
          background: 'AAA',
          paper: 'AAA',
        },
      },
    );

    // Assert
    expect(changed).toBeFalsy();
  });

  test('should the changed value is true because the items are changed', () => {
    // Act
    const { changed } = compareWCAGContrastScores(
      { a: { background: 'AAA', paper: 'AAA' } },
      {
        a: {
          background: 'AAA',
          paper: 'AAA',
        },
        b: {
          background: 'AAA',
          paper: 'AAA',
        },
      },
    );

    // Assert
    expect(changed).toBeTruthy();
  });

  test('should the changed value is true because the values are changed', () => {
    // Act
    const { changed } = compareWCAGContrastScores(
      { a: { background: 'AAA', paper: 'AAA' } },
      {
        a: {
          background: 'AAA',
          paper: 'Fail',
        },
      },
    );

    // Assert
    expect(changed).toBeTruthy();
  });
});
