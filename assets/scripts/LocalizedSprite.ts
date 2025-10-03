import LocalizationManager from "./LocalizationManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LocalizedSprite extends cc.Component {
    @property
    key: string = "";   // ví dụ: "title"

    private sprite: cc.Sprite = null;

    onLoad() {
        this.sprite = this.getComponent(cc.Sprite);
        this.updateSprite();
        cc.director.on("language-changed", this.updateSprite, this);
    }

    updateSprite = () => {
        const lang = LocalizationManager.getLanguage();

        // Ví dụ đường dẫn: resources/i18n/title/title_en.png
        const path = `i18n/title/${this.key}_${lang}`;

        cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.error("Load sprite failed:", path, err);
                return;
            }
            if (this.sprite) {
                this.sprite.spriteFrame = spriteFrame;
            }
        });
    }

    onDestroy() {
        cc.director.off("language-changed", this.updateSprite, this);
    }
}
