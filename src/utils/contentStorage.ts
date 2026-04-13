import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  addDoc,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Promotion, FishingPermit, GiftVoucher } from "../types/content";

// --- Konstanty ---
export const ADMIN_ROUTE = "#/admin";
export const ADMIN_SESSION_KEY = "hive-house-admin-session";
export const COLLECTION_PROMOTIONS = "hive-house-promotions";
export const COLLECTION_PERMITS = "hive-house-permits";
export const COLLECTION_VOUCHERS = "hive-house-vouchers";

// --- Session ---
export function isAdminSessionActive() {
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function setAdminSession(active: boolean) {
  if (active) {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  } else {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

// --- Promotions ---
export function subscribePromotions(
  onData: (promos: Promotion[]) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, COLLECTION_PROMOTIONS),
    (snapshot) => {
      const promos = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Promotion);
      onData(promos);
    },
    () => onError?.(),
  );
}

export async function savePromotion(promo: Promotion): Promise<void> {
  const { id, ...data } = promo;
  await setDoc(doc(db, COLLECTION_PROMOTIONS, id), data);
}

export async function deletePromotion(id: string): Promise<void> {
  const { deleteDoc } = await import("firebase/firestore");
  await deleteDoc(doc(db, COLLECTION_PROMOTIONS, id));
}

// --- Fishing Permits ---
export async function createFishingPermit(
  permit: Omit<FishingPermit, "id">,
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION_PERMITS), permit);
  return ref.id;
}

export async function loadFishingPermits(): Promise<FishingPermit[]> {
  const snap = await getDocs(collection(db, COLLECTION_PERMITS));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as FishingPermit);
}

export async function updatePermitStatus(
  id: string,
  status: FishingPermit["status"],
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_PERMITS, id), { status });
}

// --- Gift Vouchers ---
export async function createGiftVoucher(
  voucher: Omit<GiftVoucher, "id">,
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION_VOUCHERS), voucher);
  return ref.id;
}

export async function loadGiftVouchers(): Promise<GiftVoucher[]> {
  const snap = await getDocs(collection(db, COLLECTION_VOUCHERS));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GiftVoucher);
}

export async function updateVoucherStatus(
  id: string,
  status: GiftVoucher["status"],
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_VOUCHERS, id), { status });
}

// --- Helper: generovat unikátní kód pro voucher ---
export function generateVoucherCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "HH-";
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += "-";
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
