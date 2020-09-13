import { Scores } from '@ssen/anlayze-wcag-contrast/analyzeWCAGContrast';
import React, { Fragment, ReactElement } from 'react';

export interface WCAGContrastScoresDiff {
  element: ReactElement;
  changed: boolean;
}

export async function compareWCAGContrastScores(
  base: Record<string, Scores>,
  change: Record<string, Scores>,
): Promise<WCAGContrastScoresDiff> {
  const baseKeys: string[] = Object.keys(base);
  const changeKeys: string[] = Object.keys(change);

  const keys: string[] = Array.from(new Set([...baseKeys, ...changeKeys]));

  const changed: boolean =
    baseKeys.length !== changeKeys.length ||
    baseKeys.some((key: string) => base[key] !== change[key]);

  const element: ReactElement = (
    <table>
      <thead>
        <th>master</th>
        <th>current</th>
      </thead>
      <tbody>
        {keys.map((key) => (
          <Fragment key={key}>
            <td>{base[key] ?? '-'}</td>
            <td>{change[key] ?? '-'}</td>
          </Fragment>
        ))}
      </tbody>
    </table>
  );

  return {
    element,
    changed,
  };
}
