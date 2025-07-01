export interface User {
  _id: string;
  email: string;
  full_name: string;
  headline: string;
  role: 'seeker' | 'connector';
  reputation_score: number;
  wallet_balance: number;
}

export interface Bounty {
  _id: string;
  creator: User;
  title: string;
  description: string;
  category: string;
  amount: number;
  is_active: boolean;
  created_at: string;
}

export interface Deal {
  _id: string;
  bounty: Bounty;
  seeker: User;
  connector: User;
  status: 'pending' | 'funded' | 'introduction_made' | 'completed' | 'disputed' | 'cancelled';
  chat_history: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  sender: User;
  content: string;
  timestamp: string;
}

export interface ConnectionList {
  _id: string;
  creator: User;
  title: string;
  description: string;
  category: string;
  price: number;
  purchase_count: number;
  created_at: string;
  contact_count: number;
}