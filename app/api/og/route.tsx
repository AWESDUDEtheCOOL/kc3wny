import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.
 
export async function GET(request: Request) {
  // Fetch the SVG from the public folder
  const logoUrl = new URL('/logo/v4_text.svg', request.url);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl.toString()}
          alt="Logo"
          width="600"
          height="295"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}