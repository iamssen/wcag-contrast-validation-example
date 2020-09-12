import { PaletteColor, TypeBackground } from '@material-ui/core/styles/createPalette';
import React, { ReactElement, ReactNodeArray } from 'react';
import { hex, score, Score } from 'wcag-contrast';

export interface Report {
  scores: { background: Score, paper: Score }[];
  svg: ReactElement;
}

export function analyzeWCAGContrast(background: TypeBackground, colors: PaletteColor[]): Report {
  const scores: { background: Score, paper: Score }[] = [];
  const elements: ReactNodeArray = [];
  
  let i: number = -1;
  const max: number = colors.length;
  
  while (++i < max) {
    const color: PaletteColor = colors[i];
    
    const backgroundScore: Score = score(hex(background.default, color.main));
    const paperScore: Score = score(hex(background.paper, color.main));
    
    scores.push({
      background: backgroundScore,
      paper: paperScore,
    });
    
    elements.push(
      <g key={color.main} transform={`translate(0 ${210 * i})`}>
        <rect width={600} height={200} fill={background.default}/>
        <text x={30} y={100} fontSize={90} fill={color.main}>{backgroundScore}</text>
        <text x={30} y={150} fontSize={26} fill={color.dark}>{background.default} : {color.main}</text>
        
        <rect x={300} y={10} width={290} height={180} fill={background.paper}/>
        <text x={330} y={100} fontSize={90} fill={color.main}>{paperScore}</text>
        <text x={330} y={150} fontSize={26} fill={color.dark}>{background.paper} : {color.main}</text>
      </g>,
    );
  }
  
  return {
    scores,
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={620} height={(max * 200) + ((max - 1) * 10)}>
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
