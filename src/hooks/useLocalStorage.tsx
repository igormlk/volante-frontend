import { useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue?: T): [T, (newValue: T) => void] {
    const setLocalStorage = (newValue: T) => {
        window.localStorage.setItem(key, JSON.stringify(newValue));
    };

    const getLocalStorage = (key: string): T | null => {
        try {
            const stored = window.localStorage.getItem(key);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = getLocalStorage(key);
            if (value !== null) return value;

            if (defaultValue !== undefined) {
                setLocalStorage(defaultValue);
                return defaultValue;
            }
        } catch {
            return defaultValue as T;
        }
        return defaultValue as T;
    });

    const setValue = (value: T) => {
        setLocalStorage(value);
        setStoredValue(value);
    };

    return [storedValue, setValue];
}