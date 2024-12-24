'use client';

import { createTheme } from '@mantine/core';
import { Workbench } from 'next/font/google';
import localFont from 'next/font/local';

// Google fonts
export const workbench = Workbench({
  subsets: ['latin'],
  axes: ['BLED', 'SCAN'],
});

// Local font
export const ppEditorialNew = localFont({
  src: [
    {
      path: 'public/fonts/PPEditorialNew-Variable.ttf',
      weight: '100 900',
    },
  ],
});

export const ppNeueMontreal = localFont({
  src: [
    {
      path: 'public/fonts/PPNeueMontreal-Variable.ttf',
      weight: '200 800',
    },
  ],
});

export const theme = createTheme({
  fontFamily: `${ppNeueMontreal.style.fontFamily}, ${ppEditorialNew.style.fontFamily}, ${workbench.style.fontFamily}, sans-serif`,
});
