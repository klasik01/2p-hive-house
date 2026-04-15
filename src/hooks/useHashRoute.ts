import { useEffect, useState } from "react";

/**
 * Jednoduchý hash router.
 * Vrací aktuální "cestu" z window.location.hash:
 *   #/            -> "/"
 *   #/rezervace   -> "/rezervace"
 *   (žádný hash)  -> "/"
 *
 * Reaguje na hashchange i popstate. Na změnu cesty scrolluje nahoru.
 */
export function useHashRoute(): string {
  const [route, setRoute] = useState<string>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      const next = parseHash(window.location.hash);
      setRoute(next);
      // Nová stránka = scroll na začátek.
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

function parseHash(hash: string): string {
  if (!hash || hash === "#") return "/";
  // Podporujeme "#/cesta" i "#cesta" (legacy anchor).
  const cleaned = hash.replace(/^#\/?/, "");
  if (!cleaned) return "/";
  return "/" + cleaned.toLowerCase();
}
