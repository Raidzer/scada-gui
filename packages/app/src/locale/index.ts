import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { ru } from "./ru";
import { baseLocalization } from "@algont/m7-localization";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            ...en,
            ...baseLocalization.en,
        },
        ru: {
            ...ru,
            ...baseLocalization.ru,
        },
    },
    lng: "ru",
    debug: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
