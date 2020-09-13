import { Scores } from '@ssen/anlayze-wcag-contrast/analyzeWCAGContrast';
import React, { ReactElement } from 'react';

export interface WCAGContrastScoresDiff {
  element: ReactElement;
  changed: boolean;
}

export function compareWCAGContrastScores(
  base: Record<string, Scores>,
  change: Record<string, Scores>,
): WCAGContrastScoresDiff {
  const baseKeys: string[] = Object.keys(base);
  const changeKeys: string[] = Object.keys(change);

  const keys: string[] = Array.from(new Set([...baseKeys, ...changeKeys]));

  const changed: boolean =
    baseKeys.length !== changeKeys.length ||
    baseKeys.some(
      (key: string) =>
        base[key]?.background !== change[key]?.background ||
        base[key]?.paper !== change[key]?.paper,
    );

  const element: ReactElement = (
    <table>
      <thead>
        <tr>
          <th>color</th>
          <th>base background</th>
          <th>change background</th>
          <th>base paper</th>
          <th>change paper</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((key) => (
          <tr key={key}>
            <th>{key.toUpperCase()}</th>
            <td>{base[key]?.background ?? '-'}</td>
            <td>{change[key]?.background ?? '-'}</td>
            <td>{base[key]?.paper ?? '-'}</td>
            <td>{change[key]?.paper ?? '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return {
    element,
    changed,
  };
}
