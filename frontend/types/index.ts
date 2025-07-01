// This file will export all necessary TypeScript interfaces and types for the application.
// This helps in maintaining a single source of truth for data structures.

// Example: User type (can be expanded from the one in store/auth.ts or defined centrally here)
export interface UserProfile {
  id: string;
  email: string;
  username?: string; // Or a dedicated display name
  role: 'seeker' | 'connector' | 'admin'; // Assuming admin role might exist
  avatarUrl?: string;
  bio?: string;
  linkedInProfileUrl?: string;
  reputationScore: number;
  walletBalance: number; // Could be a string if dealing with large precision, or a separate Wallet type
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Example: Bounty type
export interface Bounty {
  id: string;
  creator: UserProfile; // or just creatorId: string and fetch user details separately
  title: string;
  description: string;
  amount: number; // Consider using a library for currency handling if precision is critical
  currency: 'USD'; // Or other currencies
  status: 'open' | 'claimed' | 'in_progress' | 'pending_approval' | 'completed' | 'disputed' | 'expired' | 'cancelled';
  category?: string; // e.g., 'Software Development', 'Marketing', 'Sales'
  tags?: string[];
  urgency: 'low' | 'medium' | 'high';
  terms?: string; // Detailed terms and conditions for the bounty
  createdAt: Date | string;
  updatedAt: Date | string;
  claimedBy?: UserProfile; // or claimedById: string
  escrowStatus?: 'funded' | 'released' | 'refunded' | 'not_funded';
}

// Example: Claim type (an offer made by a Connector for a Bounty)
export interface Claim {
  id:string;
  bountyId: string;
  connector: UserProfile; // or connectorId: string
  messageToSeeker?: string; // Connector's pitch or message
  status: 'pending_review' | 'accepted' | 'rejected' | 'withdrawn';
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Example: Transaction type (for escrow, payouts)
export interface Transaction {
  id: string;
  bountyId?: string; // Optional if it's a general wallet transaction
  type: 'escrow_funding' | 'payout_release' | 'refund' | 'wallet_deposit' | 'wallet_withdrawal';
  amount: number;
  currency: 'USD';
  status: 'pending' | 'completed' | 'failed';
  fromUserId: string;
  toUserId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  providerTransactionId?: string; // For linking with external payment processors
}

// For the UI store notifications
export interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

// Add other types as the application grows, e.g.:
// export interface Deal { ... }
// export interface ChatMessage { ... }
// export interface Review { ... }

// It's good practice to have a base API response type if your backend is consistent
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code?: string;
    details?: any;
  };
}
