// ============================================================
// Firestore API pro nastavení aplikace (settings/app).
// Dokument obsahuje aktivní profily a další runtime konfiguraci.
// ============================================================

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { hiveHouseConfig } from "../data/hive-house";
import type { ProfileName } from "../config/profiles";

const cfg = hiveHouseConfig.firestore;

export type AppSettings = {
  activeProfiles: ProfileName[];
};

const DEFAULTS: AppSettings = {
  activeProfiles: ["VE_VYSTAVBE", "BEZ_REKLAMY"],
};

/**
 * Načte nastavení z Firestore (settings/app).
 * Pokud dokument neexistuje, vrátí fallback hodnoty.
 */
export async function fetchAppSettings(): Promise<AppSettings> {
  try {
    const snap = await getDoc(doc(db, cfg.settingsCollection, cfg.settingsDoc));
    if (snap.exists()) {
      const data = snap.data() as Partial<AppSettings>;
      return {
        activeProfiles: data.activeProfiles ?? DEFAULTS.activeProfiles,
      };
    }
    return DEFAULTS;
  } catch (err) {
    console.warn("[appSettings] Failed to fetch, using defaults:", err);
    return DEFAULTS;
  }
}

/**
 * Uloží nastavení do Firestore (settings/app).
 */
export async function saveAppSettings(settings: AppSettings): Promise<void> {
  await setDoc(doc(db, cfg.settingsCollection, cfg.settingsDoc), settings, { merge: true });
}
