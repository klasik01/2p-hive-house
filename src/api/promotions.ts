import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Promotion } from "../types";

// Sdílená kolekce "promotions" pro 2p-hive-house; lze upravit dle potřeby
export const PROMOTIONS_COLLECTION = "2p-hive-house-promotions";

export function subscribePromotions(
  onData: (promos: Promotion[]) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, PROMOTIONS_COLLECTION),
    (snapshot) => {
      const promos = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Promotion);
      onData(promos);
    },
    () => onError?.(),
  );
}

export async function savePromotion(promo: Promotion): Promise<void> {
  const { id, ...data } = promo;
  await setDoc(doc(db, PROMOTIONS_COLLECTION, id), data);
}

export async function deletePromotion(id: string): Promise<void> {
  await deleteDoc(doc(db, PROMOTIONS_COLLECTION, id));
}
