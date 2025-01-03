'use client';

import { Workbench } from 'next/font/google';
import localFont from 'next/font/local';
import { createTheme } from '@mantine/core';

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
  colors: {
    dark: [
      '#f8f9fa', // Lightest
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#6c757d', // Neutral
      '#495057',
      '#101010',
      '#100000', // Darker
      '#000000', // Darkest
    ],
  },
  primaryColor: 'dark', // Use the custom dark color
});
