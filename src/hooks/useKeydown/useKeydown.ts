import { useEffect } from "react";

export function useKeydown(
  code: string,
  callback: VoidFunction,
  enabled: boolean = true,
) {
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.code === code && enabled) {
        callback();
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [code, callback, enabled]);
}
