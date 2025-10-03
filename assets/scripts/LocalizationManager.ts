const { ccclass } = cc._decorator;

@ccclass
export default class LocalizationManager {
    private static languages: { [key: string]: any } = {};
    private static currentLang: string = "zh";
    private static allLangs: string[] = ["zh", "en", "vi"];

    /** Khởi tạo game, load tất cả JSON trước */
    public static init(callback?: Function) {
        const saved = cc.sys.localStorage.getItem("lang");
        this.currentLang = saved || "zh";

        const langs = ["zh", "en", "vi"];
        let loaded = 0;

        langs.forEach(lang => {
            this.loadLanguage(lang, () => {
                loaded++;
                if (loaded === langs.length) {
                    cc.director.emit("language-changed");
                    if (callback) callback();
                }
            });
        });
    }

    /** Load JSON theo ngôn ngữ */
    private static loadLanguage(lang: string, callback?: Function) {
        cc.loader.loadRes(`i18n/${lang}`, cc.JsonAsset, (err, asset: cc.JsonAsset) => {
            if (err) {
                cc.error("Load language failed: " + lang, err);
                if (callback) callback();
                return;
            }
            this.languages[lang] = asset.json;
            if (callback) callback();
        });
    }

    /** Lấy text theo key */
    public static t(key: string): string {
        const pack = this.languages[this.currentLang];
        if (pack && pack[key]) return pack[key];
        return key;
    }

    /** Đổi ngôn ngữ */
    public static setLanguage(lang: string) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        cc.sys.localStorage.setItem("lang", lang);
        cc.director.emit("language-changed");
    }

    /** Lấy ngôn ngữ hiện tại */
    public static getLanguage(): string {
        return this.currentLang;
    }
}
