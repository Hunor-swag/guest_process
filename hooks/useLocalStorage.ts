import { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue: any) {
  // if (!window) return initialValue;
  // const savedValue = JSON.parse(window.localStorage.getItem(key)!);
  // if (savedValue) return savedValue;
  // if (initialValue instanceof Function) return initialValue();
  // return initialValue;
}

export function useLocalStorage(key: string, initialValue: any) {
  // if (!window) return initialValue;
  // const [value, setValue] = useState(() => {
  //   return getSavedValue(key, initialValue);
  // });
  // useEffect(() => {
  //   window.localStorage.setItem(key, JSON.stringify(value));
  // }, [value]);
  // return [value, setValue];
}
