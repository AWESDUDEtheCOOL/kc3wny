import '@mantine/core/styles.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme, workbench, ppEditorialNew, ppNeueMontreal } from '../theme';

export const metadata = {
  title: 'KC3WNY',
  description: 'Mason Matich\'s personal website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={`${ppEditorialNew.className} ${ppNeueMontreal.className} ${workbench.className}`}>
        <MantineProvider theme={theme}>
          {children}
          <SpeedInsights />
          <Analytics />
        </MantineProvider>
      </body>
    </html>
  );
}
