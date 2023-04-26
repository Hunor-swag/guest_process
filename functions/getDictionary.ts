import { Language } from "@/types/typings";
import dynamic from "next/dynamic";

export function getDictionary(lang: Language) {
  return dynamic(() => import(`@/dictionaries/${lang}.json`));
}
