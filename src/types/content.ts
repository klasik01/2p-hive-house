// ============================================================
// 2P HIVE HOUSE — TypeScript typy
// ============================================================

export type Promotion = {
  id: string;
  enabled: boolean;
  startsAt?: string;   // YYYY-MM-DD
  endsAt?: string;     // YYYY-MM-DD
  badge: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
};

export type FishingPermit = {
  id: string;
  name: string;
  email: string;
  date: string;          // YYYY-MM-DD
  persons: number;
  isFirefighter: boolean;
  isHojanoviceChild: boolean;
  pricePaid: number;
  status: "pending" | "paid" | "cancelled";
  createdAt: string;     // ISO timestamp
};

export type GiftVoucher = {
  id: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  message?: string;
  nights: number;
  pricePaid: number;
  code: string;
  status: "pending" | "paid" | "used" | "expired";
  createdAt: string;     // ISO timestamp
  validUntil: string;    // YYYY-MM-DD (1 rok od vytvoření)
};

export type HiveHouseContent = {
  promotions: Promotion[];
};

export type AppId = "hive-house";

export type CookieConsentState = "unset" | "accepted" | "rejected";
