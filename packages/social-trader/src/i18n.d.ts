import NextI18Next, { WithTranslation as WT } from "next-i18next";

declare module "i18n" {
  const NextI18Next: NextI18Next;

  export type WithTranslation = WT;
  export const withTranslation: typeof NextI18Next.withTranslation;
  export const appWithTranslation: typeof NextI18Next.appWithTranslation;
  export const useTranslation: typeof NextI18Next.useTranslation;
}
