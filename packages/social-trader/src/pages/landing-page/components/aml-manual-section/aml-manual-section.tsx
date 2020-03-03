import "./aml-manual-section.scss";

import { useTranslation } from "i18n";
import React from "react";

const AmlManualSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="aml-manual">
      <h1>{t("landing-page.aml-manual.title")}</h1>
      <article className="internal__article">
        <p>{t("landing-page.aml-manual.subtitle")}</p>
        <ol>
          {t("landing-page.aml-manual.list-1")
            .split("\n")
            .map((line, index) => (
              <li key={index}>{line}</li>
            ))}
        </ol>
        <ol>
          <li>
            <p>{t("landing-page.aml-manual.point-1")}</p>
            <ol>
              {t("landing-page.aml-manual.point-list-1")
                .split("\n\n")
                .map((paragraphs, index) => (
                  <li key={index}>
                    {paragraphs.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </li>
                ))}
            </ol>
          </li>
          <li>
            <p>{t("landing-page.aml-manual.point-2")}</p>
            {t("landing-page.aml-manual.paragraphs-1")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </li>
          <li>
            <p>{t("landing-page.aml-manual.point-3")}</p>
            {t("landing-page.aml-manual.paragraphs-2")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            <ol>
              {t("landing-page.aml-manual.list-2")
                .split("\n")
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ol>
            {t("landing-page.aml-manual.paragraphs-3")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            <ul>
              {t("landing-page.aml-manual.list-3")
                .split("\n")
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ul>
            {t("landing-page.aml-manual.paragraphs-4")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            <ol>
              {t("landing-page.aml-manual.list-4")
                .split("\n")
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ol>
          </li>
          <li>
            <p>{t("landing-page.aml-manual.point-4")}</p>
            {t("landing-page.aml-manual.paragraphs-5")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            <ol>
              {t("landing-page.aml-manual.list-5")
                .split("\n")
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ol>
            <p>{t("landing-page.aml-manual.text-1")}</p>
            <ol>
              {t("landing-page.aml-manual.list-6")
                .split("\n")
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ol>
            {t("landing-page.aml-manual.paragraphs-6")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            <ol>
              {t("landing-page.aml-manual.list-7")
                .split("\n")
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ol>
            {t("landing-page.aml-manual.paragraphs-7")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            <ol>
              {t("landing-page.aml-manual.list-8")
                .split("\n")
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ol>
            {t("landing-page.aml-manual.paragraphs-8")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            <p>
              {t("landing-page.aml-manual.text-2")}
              <a
                title={"Go to sumsub"}
                href={t("landing-page.aml-manual.text-link")}
              >
                {t("landing-page.aml-manual.text-link")}
              </a>
              {t("landing-page.aml-manual.text-3")}
            </p>
            {t("landing-page.aml-manual.paragraphs-9")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </li>
          <li>
            <p>{t("landing-page.aml-manual.point-5")}</p>
            {t("landing-page.aml-manual.paragraphs-10")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            <ol>
              {t("landing-page.aml-manual.list-9")
                .split("\n")
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ol>
          </li>
          <li>
            <p>{t("landing-page.aml-manual.point-6")}</p>
            {t("landing-page.aml-manual.paragraphs-11")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </li>
          <li>
            <p>{t("landing-page.aml-manual.point-7")}</p>
            {t("landing-page.aml-manual.paragraphs-12")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </li>
          <li>
            <p>{t("landing-page.aml-manual.point-8")}</p>
            {t("landing-page.aml-manual.paragraphs-13")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            <ul>
              {t("landing-page.aml-manual.list-10")
                .split("\n")
                .map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
            </ul>
          </li>
          <li>
            <p>{t("landing-page.aml-manual.point-9")}</p>
            {t("landing-page.aml-manual.paragraphs-14")
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </li>
          <li>
            <p>{t("landing-page.aml-manual.point-10")}</p>
            <p>{t("landing-page.aml-manual.text-4")}</p>
          </li>
        </ol>
      </article>
    </section>
  );
};

export default AmlManualSection;
