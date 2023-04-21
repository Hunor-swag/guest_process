"use client";

import { Language } from "@/types/typings";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

function LanguageSelectorMenu({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const LANGUAGE_SELECTOR_ID = "language-selector";
  const languages = [
    { key: "hu", name: "Magyar" },
    { key: "en", name: "English" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages.find((l) => l.key === lang) as Language
  );

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest("button");
      if (target && target.id === LANGUAGE_SELECTOR_ID) {
        return;
      }
      setIsOpen(false);
    };
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const getCountryCode = (languageKey: string) => {
    switch (languageKey) {
      case "hu":
        return "HU";
      case "en":
        return "US";
      default:
        return "UNKNOWN";
    }
  };

  const handleLanguageChange = (
    e: MouseEvent<HTMLButtonElement>,
    lang: Language
  ) => {
    const currentPathname = window.location.pathname;
    const newPathname = currentPathname.replace(
      currentPathname.split("/")[1],
      lang.key
    );
    window.location.href = newPathname;
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-0 focus:ring-indigo-500 border-none "
        id={LANGUAGE_SELECTOR_ID}
        aria-expanded={isOpen}
      >
        <ReactCountryFlag
          countryCode={getCountryCode(lang)}
          className="rounded-full mr-3"
          style={{ height: "30px", width: "30px" }}
          svg
        />
        {languages.find((l) => l.key === lang)?.name}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 rounded-lg shadow-lg bg-white z-1">
          {languages.map(
            (option: { key: string; name: string }, index: number) => {
              return (
                <button
                  key={index}
                  type="button"
                  className="block w-full text-left py-2 px-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  onClick={(e: MouseEvent<HTMLButtonElement>) =>
                    handleLanguageChange(e, option)
                  }
                  value={option.name}
                >
                  {option.name}
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default LanguageSelectorMenu;
