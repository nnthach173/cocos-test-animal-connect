const { ccclass, property } = cc._decorator;

@ccclass
export default class RankItem extends cc.Component {
    @property(cc.Label)
    rankLabel: cc.Label = null;

    @property(cc.Label)
    levelLabel: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    /** Gán dữ liệu cho item */
    setData(rank: number, level: number, name: string, isCurrentUser: boolean = false) {
        // Tạo màu
        let normalColor = cc.color(101, 67, 33);   // nâu đậm (RGB)
        let highlightColor = cc.color(186, 85, 211); // tím

        if (isCurrentUser) {
            // Highlight cho người chơi hiện tại
            this.rankLabel.string = rank.toString();
            this.rankLabel.fontSize = 30;
            this.rankLabel.node.color = highlightColor;

            this.levelLabel.string = level.toString();
            this.levelLabel.fontSize = 30;
            this.levelLabel.node.color = highlightColor;

            this.nameLabel.string = name;
            this.nameLabel.fontSize = 30;
            this.nameLabel.node.color = highlightColor;
        } else {
            // Style cho người chơi bình thường
            this.rankLabel.string = rank.toString();
            this.rankLabel.fontSize = 26;
            this.rankLabel.node.color = normalColor;

            this.levelLabel.string = level.toString();
            this.levelLabel.fontSize = 26;
            this.levelLabel.node.color = normalColor;

            this.nameLabel.string = name;
            this.nameLabel.fontSize = 26;
            this.nameLabel.node.color = normalColor;
        }
    }
}
