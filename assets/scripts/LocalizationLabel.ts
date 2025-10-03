import LocalizationManager from "./LocalizationManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LocalizedLabel extends cc.Component {

    @property({ tooltip: "Localization key" })
    key: string = "";

    // Font Latin (dùng cho EN/VI)
    @property({ type: cc.Font, tooltip: "Font Latin (EN/VI, Roboto-Regular)" })
    latinFont: cc.Font = null;

    // Font size cho English
    @property
    fontSizeEN: number = 32;

    // Font size cho Vietnamese
    @property
    fontSizeVI: number = 28;

    // Font size cho Chinese
    @property
    fontSizeZH: number = 40;

    private label: cc.Label = null;
    private chineseFont: cc.BitmapFont = null;

    onLoad() {
        this.label = this.getComponent(cc.Label);
        if (!this.label) {
            cc.error("LocalizedLabel requires cc.Label component!");
            return;
        }

        // Không shrink nữa, chỉ giữ cố định font size
        this.label.overflow = cc.Label.Overflow.NONE;
        this.label.enableWrapText = false;

        // Load font Trung từ resources
        cc.loader.loadRes("fonts/cm/cm", cc.BitmapFont, (err, font) => {
            if (err) {
                cc.error("Load Chinese font failed:", err);
                return;
            }
            this.chineseFont = font;
            this.updateLabel();
        });

        // Nghe sự kiện đổi ngôn ngữ
        cc.director.on("language-changed", this.updateLabel, this);

        // Update ban đầu
        this.updateLabel();
    }

    updateLabel = () => {
        if (!this.label || !this.key) return;

        const text = LocalizationManager.t(this.key);
        this.label.string = text;

        const lang = LocalizationManager.getLanguage();

        if (lang === "zh" && this.chineseFont) {
            this.label.font = this.chineseFont;
            this.label.fontSize = this.fontSizeZH;
        } else if (lang === "en" && this.latinFont) {
            this.label.font = this.latinFont;
            this.label.fontSize = this.fontSizeEN;
        } else if (lang === "vi" && this.latinFont) {
            this.label.font = this.latinFont;
            this.label.fontSize = this.fontSizeVI;
        }
    };

    onDestroy() {
        cc.director.off("language-changed", this.updateLabel, this);
    }
}
