export type TransactionType = 'expense' | 'income' | 'transfer';

export interface Transaction {
  id: string;
  merchant: string;
  category: string;
  categoryIcon: string; // icon name or key
  amount: number;
  type: TransactionType;
  date: string; // e.g. "2026-11-01" or display relative "Today, 2:45 PM"
  group: 'Today' | 'Yesterday' | 'Earlier this week';
  account: string;
  status: 'completed' | 'pending';
  categoryColor: string; // for icon background
}

export interface CardItem {
  id: string;
  name: string;
  tagline: string;
  gradient: string;
  last4: string;
  expiry: string;
  cvv: string;
  balance: number;
  limit: number;
  brand: 'visa' | 'mastercard' | 'amex';
  isFrozen: boolean;
  isVirtual: boolean;
  accentColor: string;
}

export interface LinkedAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  institution: string;
  apy?: string;
  icon: string;
  lastSync: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  spent: number;
  allocated: number;
  color: string;
  icon: string;
  itemsCount: number;
}
