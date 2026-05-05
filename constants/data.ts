export type Role = 'driver' | 'passenger';
export type Step = 'email' | 'code' | 'password';
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type LoginFormData = {
  role: Role;
  bodyNumber: string;
  email: string;
  password: string;
}

export type RegisterFormData = {
  role: Role;
  fullName: string;
  contact: string;
  email: string;
  password: string;
  confirmPassword: string;
  address?: string;
  bodyNumber?: string;
  agreed: boolean;
  licenseUploaded?: string;
  orcrUploaded?: string;
}

export type EmailStepData = {
  email: string;
};

export type CodeStepData = {
  code: string;
};

export type PasswordStepData = {
  newPassword: string;
  confirmPassword: string;
};

export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  avatar: string | null;
  unread?: number;
  isActive?: boolean;
  isSupport?: boolean;
}

export interface Message {
  id: string;
  text: string;
  time: string;
  isSent: boolean;
  isRead?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  isNew?: boolean;
}

export interface FareItem {
  destination: string;
  price: string;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  status: 'FOUND' | 'SEARCHING';
  image: string;
  action: string;
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    preview: "I'm standing near the blue pillar...",
    time: 'JUST NOW',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    unread: 2,
    isActive: true,
  },
  {
    id: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    preview: 'Thanks for the smooth ride earlier!...',
    time: '12 MIN',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'david-park',
    name: 'David Park',
    preview: 'Your item has been returned to the...',
    time: '2 HOURS',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'support-team',
    name: 'Support Team',
    preview: "We've updated your driver...",
    time: 'YESTERDAY',
    avatar: null,
    isSupport: true,
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    preview: 'Can we schedule a recurring...',
    time: 'OCT 12',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const CHAT_MESSAGES: Record<string, Message[]> = {
  'marcus-chen': [
    {
      id: '1',
      text: "Hello! I'm outside the main entrance. I'm in a silver sedan.",
      time: '2:46 PM',
      isSent: false,
    },
    {
      id: '2',
      text: "Great, thank you! I'm just coming down the stairs now. Be there in 2 minutes.",
      time: '2:48 PM',
      isSent: true,
      isRead: true,
    },
    {
      id: '3',
      text: 'No problem at all. The hazards are on. Take your time, safety first.',
      time: '2:49 PM',
      isSent: false,
    },
    {
      id: '4',
      text: 'Perfect. Just exiting the building.',
      time: '2:50 PM',
      isSent: true,
      isRead: true,
    },
  ],
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Monthly Association Meeting',
    body: 'Join us at the Barangay Hall this Saturday at 2:00 PM to discuss route updates and safety measures.',
    date: 'Oct 24, 2023',
    isNew: true,
  },
  {
    id: '2',
    title: 'Holiday Schedule Update',
    body: 'Operating hours will be extended during the upcoming festival. All units are advised to monitor official channels.',
    date: 'Oct 20, 2023',
  },
];

export const FARE_LIST: FareItem[] = [
  { destination: 'Public Market', price: '₱15.00' },
  { destination: 'Town Plaza', price: '₱20.00' },
  { destination: 'Central Hospital', price: '₱25.00' },
  { destination: 'Barangay Hall', price: '₱12.00' },
];

export const LOST_ITEMS: LostItem[] = [
  {
    id: '1',
    title: 'Brown Leather Wallet',
    description: 'Found near Market Terminal - Oct 23 at 10:30 AM',
    status: 'FOUND',
    image: 'https://images.pexels.com/photos/5650025/pexels-photo-5650025.jpeg?auto=compress&cs=tinysrgb&w=400',
    action: 'CLAIM ITEM',
  },
  {
    id: '2',
    title: 'Silver Keys (Bundle)',
    description: 'Lost near Plaza Entrance - Oct 22 at 2:15 PM',
    status: 'SEARCHING',
    image: 'https://images.pexels.com/photos/1029614/pexels-photo-1029614.jpeg?auto=compress&cs=tinysrgb&w=400',
    action: 'PROVIDE INFO',
  },
];
