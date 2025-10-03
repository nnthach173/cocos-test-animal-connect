import LocalizationManager from "./LocalizationManager";
const { ccclass } = cc._decorator;

@ccclass
export default class LanguageToggle extends cc.Component {

    public clickToggle() {
        const current = LocalizationManager.getLanguage();
        let newLang: string;

        // Vòng qua zh -> en -> vi -> zh
        switch (current) {
            case "zh": newLang = "en"; break;
            case "en": newLang = "vi"; break;
            case "vi": newLang = "zh"; break;
            default: newLang = "zh";
        }

        LocalizationManager.setLanguage(newLang);
    }
}
