import React, { ReactElement, ReactNodeArray } from 'react';
import { hex, score, Score } from 'wcag-contrast';

export interface Report {
  scores: { background: Score; paper: Score }[];
  svg: ReactElement;
}

export interface Params {
  backgroundColor: string;
  paperColor: string;
  colors: Record<string, string>;
}

const width: number = 700;
const height: number = 140;
const margin: number = 10;
const scoreFontSize: number = 70;
const colorFontSize: number = 18;

export function analyzeWCAGContrast({
  backgroundColor,
  paperColor,
  colors,
}: Params): Report {
  const scores: { background: Score; paper: Score }[] = [];
  const elements: ReactNodeArray = [];

  const colorNames: string[] = Object.keys(colors);

  let i: number = -1;
  const max: number = colorNames.length;

  while (++i < max) {
    const colorName: string = colorNames[i];
    const color: string = colors[colorName];

    const backgroundScore: Score = score(hex(backgroundColor, color));
    const paperScore: Score = score(hex(paperColor, color));

    scores.push({
      background: backgroundScore,
      paper: paperScore,
    });

    elements.push(
      <g key={color} transform={`translate(0 ${(height + margin) * i})`}>
        <rect width={width} height={height} fill={backgroundColor} />
        <text x={20} y={80} fontSize={scoreFontSize} fill={color}>
          {backgroundScore}
        </text>
        <text
          x={20}
          y={115}
          fontSize={colorFontSize}
          fill={color}
          opacity={0.5}
        >
          {colorName.toUpperCase()} {backgroundColor.toUpperCase()}{' '}
          {color.toUpperCase()}
        </text>

        <rect
          x={width / 2}
          y={10}
          width={width / 2 - margin}
          height={height - margin * 2}
          fill={paperColor}
        />
        <text x={width / 2 + 20} y={80} fontSize={scoreFontSize} fill={color}>
          {paperScore}
        </text>
        <text
          x={width / 2 + 20}
          y={115}
          fontSize={colorFontSize}
          fill={color}
          opacity={0.5}
        >
          {colorName.toUpperCase()} {paperColor.toUpperCase()}{' '}
          {color.toUpperCase()}
        </text>
      </g>,
    );
  }

  return {
    scores,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={width}
        height={max * height + (max - 1) * margin}
      >
        <style>
          {`
            text {
              font-family: "Times New Roman", Times, serif;
            }
          `}
        </style>
        {elements}
      </svg>
    ),
  };
}
