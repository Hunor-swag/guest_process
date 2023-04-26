import { ChangeEvent, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import en from "@/dictionaries/en.json";
import hu from "@/dictionaries/hu.json";
import { Language } from "@/types/typings";

export function useDictionary() {
  const [lang, setLang] = useLocalStorage("lang", {
    key: "hu",
    value: "Magyar",
  });

  const [dict, setDict] = useState(hu);

  useEffect(() => {
    switch (lang.key) {
      case "hu":
        setDict(hu);
        break;
      case "en":
        setDict(en);
        break;
      default:
        break;
    }
  }, []);

  return dict;
}
