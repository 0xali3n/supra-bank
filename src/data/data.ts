export interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  icon: string;
}

export interface NFT {
  id: string;
  name: string;
  collection: string;
  floorPrice: number;
  lastPrice: number;
  rarity: number;
  rank: number;
  image: string;
  traits: { type: string; value: string }[];
}

export interface StakedAsset {
  protocol: string;
  amount: number;
  apy: number;
  rewards: number;
  lockPeriod: number;
  unlockDate: Date;
  rewardToken: string;
}

export interface Transaction {
  id: string;
  type: "send" | "receive" | "swap" | "stake" | "unstake" | "approve";
  amount: number;
  token: string;
  timestamp: Date;
  status: "completed" | "pending" | "failed";
  from: string;
  to: string;
  hash: string;
  fee: number;
  method: string;
  block: number;
}

export const mockData = {
  totalBalance: 125489.32,
  totalBalanceChange24h: 5.67,
  tokens: [
    {
      symbol: "SUPRA",
      name: "Supra Token",
      balance: 15000,
      price: 2.34,
      change24h: 5.67,
      change7d: 12.5,
      marketCap: 234000000,
      volume24h: 5600000,
      icon: "/api/placeholder/32/32",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: 12.5,
      price: 3200,
      change24h: -2.3,
      change7d: -1.2,
      marketCap: 380000000000,
      volume24h: 12000000000,
      icon: "/api/placeholder/32/32",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: 1.2,
      price: 52000,
      change24h: 1.2,
      change7d: 3.4,
      marketCap: 980000000000,
      volume24h: 25000000000,
      icon: "/api/placeholder/32/32",
    },
  ] as Token[],
  nfts: [
    {
      id: "1",
      name: "Supra #123",
      collection: "Supra Collection",
      floorPrice: 1.2,
      lastPrice: 1.5,
      rarity: 94.5,
      rank: 123,
      image: "/api/placeholder/150/150",
      traits: [
        { type: "Background", value: "Blue" },
        { type: "Rarity", value: "Legendary" },
      ],
    },
    {
      id: "2",
      name: "Supra #456",
      collection: "Supra Collection",
      floorPrice: 1.5,
      lastPrice: 1.8,
      rarity: 88.2,
      rank: 456,
      image: "/api/placeholder/150/150",
      traits: [
        { type: "Background", value: "Red" },
        { type: "Rarity", value: "Epic" },
      ],
    },
  ] as NFT[],
  stakedAssets: [
    {
      protocol: "Supra Staking",
      amount: 5000,
      apy: 12.5,
      rewards: 125.5,
      lockPeriod: 30,
      unlockDate: new Date("2025-02-21"),
      rewardToken: "SUPRA",
    },
    {
      protocol: "Liquidity Pool",
      amount: 2500,
      apy: 25,
      rewards: 156.25,
      lockPeriod: 90,
      unlockDate: new Date("2025-04-21"),
      rewardToken: "SUPRA",
    },
  ] as StakedAsset[],
  transactions: [
    {
      id: "tx1",
      type: "send",
      amount: 100,
      token: "SUPRA",
      timestamp: new Date("2025-01-21T10:00:00"),
      status: "completed",
      from: "0x1234567890abcdef1234567890abcdef12345678",
      to: "0xabcdef1234567890abcdef1234567890abcdef12",
      hash: "0x123...abc",
      fee: 0.002,
      method: "transfer",
      block: 12345678,
    },
    {
      id: "tx2",
      type: "receive",
      amount: 500,
      token: "SUPRA",
      timestamp: new Date("2025-01-21T09:30:00"),
      status: "completed",
      from: "0xabcdef1234567890abcdef1234567890abcdef12",
      to: "0x1234567890abcdef1234567890abcdef12345678",
      hash: "0x456...def",
      fee: 0.003,
      method: "transfer",
      block: 12345677,
    },
  ] as Transaction[],
};
