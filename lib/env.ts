// Runtime environment configuration
// This allows changing environment variables without rebuilding

interface RuntimeConfig {
  API_URL: string;
  MOCK_API: boolean;
}

function getRuntimeConfig(): RuntimeConfig {
  // Check if running on client side
  if (typeof window !== 'undefined') {
    // Try to get config from window object (set by server)
    const config = (window as any).__RUNTIME_CONFIG__;
    console.log('getRuntimeConfig - Client side:', {
      windowRuntimeConfig: config,
      windowObject: typeof window !== 'undefined' ? 'available' : 'not available'
    });
    if (config) {
      console.log('Using runtime config from window:', config);
      return config;
    }
  }

  // Fallback to build-time environment variables
  const fallbackConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    MOCK_API: process.env.NEXT_PUBLIC_MOCK_API === 'true',
  };

  console.log('Using fallback config:', fallbackConfig);
  return fallbackConfig;
}

export const runtimeConfig = getRuntimeConfig();