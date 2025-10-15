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
    if (config) {
      return config;
    }
  }

  // Fallback to build-time environment variables
  return {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    MOCK_API: process.env.NEXT_PUBLIC_MOCK_API === 'true',
  };
}

export const runtimeConfig = getRuntimeConfig();