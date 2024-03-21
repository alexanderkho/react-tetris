import { useEffect } from "react";

export function useKeydown(code: string, callback: VoidFunction) {
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.code === code) {
        callback();
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [code, callback]);
}
