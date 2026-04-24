export const currentUser = {
  name: 'Ricardo Santos',
  bodyNumber: 'BODY #2948-TP',
  avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
};

export const conversations = [
  {
    id: '1',
    name: 'Maria Clara',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Missed voice call',
    time: '6:45 PM',
    unread: true,
    missedCall: true,
    section: 'today',
  },
  {
    id: '2',
    name: 'Juan Dela Cruz',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Salamat po sa pagsundo kanina! Ing...',
    time: '4:20 PM',
    unread: false,
    missedCall: false,
    section: 'today',
  },
  {
    id: '3',
    name: 'Elena Gilbert',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Naiwan ko po ata yung payong ...',
    time: 'Yesterday',
    unread: true,
    missedCall: false,
    section: 'yesterday',
  },
  {
    id: '4',
    name: 'Toda Support',
    avatar: null,
    lastMessage: 'Your account verification is now co...',
    time: 'Yesterday',
    unread: false,
    missedCall: false,
    section: 'yesterday',
    isSupport: true,
  },
  {
    id: '5',
    name: 'Lolo Ben',
    avatar: null,
    lastMessage: 'Maraming salamat sa tulong kanina,...',
    time: 'Yesterday',
    unread: false,
    missedCall: false,
    section: 'yesterday',
  },
];

export const chatMessages: Record<string, any[]> = {
  '1': [
    {
      id: 'm1',
      text: 'Salamat po sa pagsundo kanina! Ingat sa byahe.',
      sender: 'them',
      time: '5:42 PM',
      day: 'yesterday',
    },
    {
      id: 'm2',
      text: "Walang anuman po Ma'am Maria. Nandito na po ako sa labas ng kanto niyo.",
      sender: 'me',
      time: '9:15 AM',
      day: 'today',
      read: true,
    },
    {
      id: 'm3',
      text: 'Opo kuya, palabas na po ako. Saglit lang po.',
      sender: 'them',
      time: '9:16 AM',
      day: 'today',
      highlighted: true,
    },
    {
      id: 'm4',
      text: 'Passenger is 2 minutes away from your location.',
      sender: 'system',
      time: '9:16 AM',
      day: 'today',
    },
  ],
};

export const butawLog = [
  { date: 'Oct 25, 2024', label: 'Daily Membership Contribution', amount: '₱50.00', status: 'PAID' },
  { date: 'Oct 24, 2024', label: 'Daily Membership Contribution', amount: '₱50.00', status: 'PAID' },
  { date: 'Oct 23, 2024', label: 'Daily Membership Contribution', amount: '₱50.00', status: 'PENDING' },
];

export const associationFees = [
  { title: 'October Association Fee', batch: 'Batch 2024 · Unit Maintenance', amount: '₱500.00', paidOn: 'PAID OCT 01' },
  { title: 'September Association Fee', batch: 'Batch 2024 · Insurance Share', amount: '₱500.00', paidOn: 'PAID SEP 02' },
  { title: 'August Association Fee', batch: 'Batch 2024 · Terminal Rights', amount: '₱500.00', paidOn: 'PAID AUG 01' },
];

export const communityFunds = [
  { icon: 'wrench', label: 'Terminal Repairs', description: 'Roofing replacement and solar light installation at North Wing Terminal.', amount: '₱12,400' },
  { icon: 'briefcase', label: 'Member Health Aid', description: 'Hospitalization assistance for 3 members and emergency medicine fund.', amount: '₱8,500' },
  { icon: 'megaphone', label: 'Local Announcements', description: 'New signage for traffic routing and community bulletin board maintenance.', amount: '₱4,200' },
];

export const events = [
  { date: 'OCT 24', title: 'Annual Fleet Parade', description: 'Showcasing the best-maintained vehicles in the district. Registration required.' },
  { date: 'OCT 26', title: 'Community Clean-up Drive', description: 'Volunteers earn Pro-Points for active participation in the South Terminal area.' },
];

export const agendas = [
  { title: 'Terminal Expansion Phase 2', postedAgo: 'POSTED 2 DAYS AGO', fileSize: 'PDF (1.2MB)' },
  { title: 'Quarterly Earnings Report - Q3', postedAgo: 'POSTED 1 WEEK AGO', fileSize: 'PDF (4.5MB)' },
];

export const fareMatrix = [
  { range: '0.0 – 2.0 km', base: '₱15.00', seniorPwd: '₱12.00' },
  { range: '2.1 – 4.0 km', base: '₱25.00', seniorPwd: '₱20.00' },
  { range: '4.1 – 6.0 km', base: '₱35.00', seniorPwd: '₱28.00' },
];

export const lostFound = [
  { id: 'lf1', icon: 'wallet', title: 'Leather Wallet', description: 'Found in Vehicle #412', date: 'OCT 22', status: 'REPORTED', action: 'Claim Info' },
  { id: 'lf2', icon: 'key', title: 'House Keys', description: 'Blue lanyard attached', date: 'OCT 21', status: 'RESOLVED', action: 'RETURNED TO OWNER' },
  { id: 'lf3', icon: 'smartphone', title: 'iPhone 13 Case', description: 'Clear silicone, Yellowing', date: 'OCT 19', status: 'REPORTED', action: 'Claim Info' },
];
