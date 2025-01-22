import { useEffect, useSyncExternalStore } from "react";

let listeners: (() => void)[] = [];

const notifyListeners = () => {
  for (const listener of listeners) {
    listener();
  }
};

const store = {
  get: (key: string): unknown => {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return value;
  },
  set: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  },
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

export const usePersistentState = (key: string) => {
  const value = useSyncExternalStore(store.subscribe, () => store.get(key));

  useEffect(() => {
    const interval = setInterval(notifyListeners, 5000);
    return () => clearInterval(interval);
  }, []);

  return { value, setValue: store.set.bind(undefined, key) };
};
