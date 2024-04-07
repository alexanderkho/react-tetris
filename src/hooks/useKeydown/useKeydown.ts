import { useEffect } from "react";
import { Keys, browserNavigationKeys } from "./keys";

export function useKeydown(
  code: string,
  callback: VoidFunction,
  enabled: boolean = true,
  element?: HTMLElement | null,
) {
  const elToAttach = element ?? window;
  if (code === Keys.esc) {
    console.log("TEEHEE", element);
  }
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
    elToAttach.addEventListener("keydown", onKeydown as EventListener);
    return () => {
      elToAttach.removeEventListener("keydown", onKeydown as EventListener);
    };
  }, [code, callback, enabled, elToAttach]);
}
