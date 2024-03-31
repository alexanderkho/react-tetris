import { useEffect } from "react";
import { Keys, browserNavigationKeys } from "./keys";

export function useKeydown(
  code: string,
  callback: VoidFunction,
  enabled: boolean = true,
) {
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (!enabled || event.code !== code) {
        return;
      }
      if (browserNavigationKeys.includes(event.code as Keys)) {
        event.preventDefault();
      }
      callback();
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [code, callback, enabled]);
}
