import { useEffect } from "react";

export function useBodyModalLock(locked: boolean) {
  useEffect(() => {
    document.body.classList.toggle("modal-open", locked);
    return () => { document.body.classList.remove("modal-open"); };
  }, [locked]);
}
