import { ComponentType, useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage/useLanguage";
import flatten from "utils/flatten/flatten";

export type t = (textPath: string) => string;

interface WithTranslationProps {
  t: t;
}

const withTranslation = <T extends object>(
  WrappedComponent: ComponentType<T & WithTranslationProps>,
  path: string
): ComponentType<Omit<T, keyof WithTranslationProps>> => {
  return function ComponentWithTranslation(
    props: Omit<T, keyof WithTranslationProps>
  ) {
    const { language } = useLanguage();

    const [translations, setTranslations] = useState<Record<
      string,
      string
    > | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const importTranslations = async () => {
        try {
          const jsonData = await import(
            `../../translations/${path}/${language}.json`
          );
          setTranslations(flatten(jsonData.default));
        } catch (err) {
          setError("Error loading translation file");
          console.error(
            `Error for path translations/${path}/${language}.json`,
            err
          );
        }
      };

      if (path) {
        importTranslations();
      } else {
        setError("Invalid path");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, language]);

    const buildTranslationPath = (): ((textPath: string) => string) => {
      return (textPath: string): string => {
        if (!translations) {
          console.error(
            `Unable to load translation file for ${path}/${language}`
          );
          return textPath;
        }
        if (!translations[textPath]) {
          console.error(
            `Unable to load translation path for ${textPath} in file ${path}/${language}`
          );
          return textPath;
        }
        return translations[textPath];
      };
    };

    if (error) {
      return <div>{error}</div>;
    }

    if (!translations) {
      return <div>Loading...</div>;
    }

    const t = buildTranslationPath();

    return <WrappedComponent {...(props as T)} t={t} />;
  };
};

export default withTranslation;
