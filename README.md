# Marcel Backoffice

Admin dashboard for Marcel ride-sharing platform.

## Features

- 🔐 **Authentication System** - Secure admin login
- 📊 **Real-time Dashboard** - Live stats and metrics
- 📈 **Charts & Analytics** - Visual data representation
- 🚗 **User Management** - Monitor users and drivers
- 🗺️ **Ride Tracking** - Real-time ride monitoring
- 🔧 **System Health** - Monitor platform status
- 📱 **Responsive Design** - Works on all devices

## Getting Started

### Prerequisites

- Bun (recommended) or Node.js
- Marcel backend API running on port 3000

### Installation

```bash
cd backoffice
bun install
```

### Development

```bash
bun run dev
```

The application will be available at [http://localhost:3001](http://localhost:3001)

### Mock Authentication

For development, use these credentials:
- **Email**: admin@marcel.com
- **Password**: admin123

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_MOCK_API=true
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Package Manager**: Bun

## Project Structure

```
backoffice/
├── app/                 # Next.js app router
│   ├── login/          # Login page
│   ├── page.tsx        # Dashboard home
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── dashboard-layout.tsx
│   ├── sidebar.tsx
│   ├── stats-cards.tsx
│   ├── chart-section.tsx
│   └── recent-activity.tsx
├── lib/                # Utilities
│   ├── auth.ts         # Authentication
│   ├── api.ts          # API client
│   └── mock-data.ts    # Development data
└── utils/              # Helper functions
    └── cn.ts           # Class name utility
```

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Dashboard Features

### Stats Overview
- Total users count
- Active drivers online
- Daily rides completed
- Average ride duration
- Revenue tracking
- Active issues monitoring

### Charts & Analytics
- Rides over time (line chart)
- Revenue by day (bar chart)
- User distribution (pie chart)
- Peak hours analysis

### Real-time Activity
- User registrations
- Completed rides
- Driver verifications
- Issue reports
- Payment confirmations

## API Integration

The dashboard connects to Marcel's backend API:

- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/charts` - Chart data
- `GET /api/admin/activity` - Recent activity
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/verify` - Token verification

Fallback to mock data when API is unavailable.
