import { useCallback, useEffect, useSyncExternalStore } from "react";

const listeners: { [key in string]?: (() => void)[] } = {};

const notifyListeners = (key: string) => {
  for (const listener of listeners[key] || []) {
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
    notifyListeners(key);
  },
  subscribe: (key: string) => (listener: () => void) => {
    listeners[key] = [...(listeners[key] || []), listener];
    return () => {
      const newListeners = listeners[key]
        ? listeners[key].filter((l) => l !== listener)
        : undefined;
      if (!newListeners || newListeners.length === 0) {
        delete listeners[key];
      } else {
        listeners[key] = newListeners;
      }
    };
  },
};

export const usePersistentState = (key: string) => {
  const value = useSyncExternalStore(
    useCallback(store.subscribe(key), [store.subscribe, key]),
    () => store.get(key),
  );

  useEffect(() => {
    const interval = setInterval(() => notifyListeners(key), 5000);
    return () => clearInterval(interval);
  }, [key]);

  return { value, setValue: store.set.bind(undefined, key) };
};
