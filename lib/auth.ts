export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
}

export async function checkAuth(): Promise<Admin | null> {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('admin_token');
  if (!token) return null;

  // Mock authentication for development
  if (process.env.NEXT_PUBLIC_MOCK_API === 'true') {
    return {
      id: '1',
      email: 'admin@marcel.com',
      name: 'Admin User',
      role: 'admin'
    };
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const response = await fetch(`${apiUrl}/admin/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      localStorage.removeItem('admin_token');
      return null;
    }

    const data = await response.json();
    return {
      id: 'admin',
      email: data.admin.email,
      name: 'Admin User',
      role: 'admin'
    };
  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('admin_token');
    return null;
  }
}

export async function login(email: string, password: string): Promise<{ admin: Admin; token: string } | null> {
  // Mock login for development
  if (process.env.NEXT_PUBLIC_MOCK_API === 'true') {
    if (email === 'admin@marcel.com' && password === 'admin123') {
      const mockResult = {
        admin: {
          id: '1',
          email: 'admin@marcel.com',
          name: 'Admin User',
          role: 'admin' as const
        },
        token: 'mock-jwt-token'
      };
      localStorage.setItem('admin_token', mockResult.token);
      return mockResult;
    }
    return null;
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const response = await fetch(`${apiUrl}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    localStorage.setItem('admin_token', data.token);

    return {
      admin: {
        id: 'admin',
        email: data.admin.email,
        name: 'Admin User',
        role: 'admin'
      },
      token: data.token
    };
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
}

export function logout() {
  localStorage.removeItem('admin_token');
  window.location.href = '/login';
}