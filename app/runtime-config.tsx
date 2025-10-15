// Runtime configuration injector
// This script runs on the server and injects environment variables for client use

export function RuntimeConfigScript() {
  const config = {
    API_URL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    MOCK_API: (process.env.MOCK_API || process.env.NEXT_PUBLIC_MOCK_API) === 'true',
  };

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.__RUNTIME_CONFIG__ = ${JSON.stringify(config)};
        `,
      }}
    />
  );
}