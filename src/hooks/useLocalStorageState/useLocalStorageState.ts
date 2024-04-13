import { useRef, useState } from "react";

function initializeStateFromLocalStorage<T>(key: string, defaultValue: T): T {
  let initialValue = defaultValue;
  try {
    const initStorageVal = localStorage.getItem(key);
    if (initStorageVal !== null) {
      initialValue = JSON.parse(initStorageVal);
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : e;
    console.warn(`Could not read local storage value ${key}: ${msg}`);
  }

  return initialValue as T;
}

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [value: T, setState: (newVal: T) => void] {
  const [val, setVal] = useState(() =>
    initializeStateFromLocalStorage(key, defaultValue),
  );
  useRef();

  function setState(newVal: T) {
    localStorage.set(key, JSON.stringify(newVal));
    setVal(newVal);
  }

  return [val, setState];
}
