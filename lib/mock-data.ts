export const mockStats = {
  totalUsers: 12450,
  activeDrivers: 234,
  totalRides: 45678,
  todayRides: 156,
  avgRideTime: 18,
  activeIssues: 3,
  userGrowth: 12.5,
  revenue: 125680,
};

export const mockChartData = {
  ridesOverTime: [
    { date: "Jan", rides: 150, completed: 142 },
    { date: "Feb", rides: 180, completed: 175 },
    { date: "Mar", rides: 220, completed: 210 },
    { date: "Apr", rides: 190, completed: 185 },
    { date: "May", rides: 250, completed: 240 },
    { date: "Jun", rides: 280, completed: 275 },
  ],
  revenueByDay: [
    { day: "Mon", revenue: 2500 },
    { day: "Tue", revenue: 3200 },
    { day: "Wed", revenue: 2800 },
    { day: "Thu", revenue: 3500 },
    { day: "Fri", revenue: 4200 },
    { day: "Sat", revenue: 5800 },
    { day: "Sun", revenue: 4500 },
  ],
  userDistribution: [
    { name: "Regular", value: 65 },
    { name: "Premium", value: 25 },
    { name: "VIP", value: 8 },
    { name: "Trial", value: 2 },
  ],
  peakHours: [
    { hour: "06:00", rides: 45 },
    { hour: "07:00", rides: 89 },
    { hour: "08:00", rides: 145 },
    { hour: "09:00", rides: 156 },
    { hour: "17:00", rides: 178 },
    { hour: "18:00", rides: 201 },
    { hour: "19:00", rides: 165 },
    { hour: "20:00", rides: 123 },
  ],
};

export const mockActivity = [
  {
    id: "1",
    type: "user_signup" as const,
    description: "New user registered: john.doe@example.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: "success" as const,
  },
  {
    id: "2",
    type: "ride_completed" as const,
    description: "Ride completed: Downtown to Airport",
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    status: "success" as const,
  },
  {
    id: "3",
    type: "driver_joined" as const,
    description: "New driver verified: Marie Dubois",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    status: "success" as const,
  },
  {
    id: "4",
    type: "issue_reported" as const,
    description: "Payment issue reported by user #12450",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: "warning" as const,
  },
  {
    id: "5",
    type: "payment_received" as const,
    description: "Payment processed: €35.50",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "success" as const,
  },
];