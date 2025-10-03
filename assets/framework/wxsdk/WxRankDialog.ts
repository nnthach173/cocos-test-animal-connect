import View from "../plugin_boosts/ui/View";
import ViewManager from "../plugin_boosts/ui/ViewManager";
import LocalizationManager from "../../scripts/LocalizationManager";
import { UserInfo } from "../../Game/Scripts/Info";
import RankItem from "./RankItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WxRankDialog extends cc.Component {
    @property(cc.Node)
    content: cc.Node = null;   // Content node trong ScrollView

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;  // Prefab RankItem (chứa Name + Score)

    onLoad() {
        this.loadRanking();
    }

    /** Gọi API và render danh sách */
    loadRanking() {
        fetch("https://5d820f171c8ff70014ef438d.mockapi.io/1/ranking-list")
            .then(res => res.json())
            .then((data) => {
                cc.log("Ranking API data:", data);

                // Thông tin user hiện tại
                const currentUser = {
                    name: "You",
                    level: UserInfo.level || 1,
                };

                // Nếu user chưa có trong danh sách → thêm vào
                let exists = data.some((p) => p.name === currentUser.name);
                if (!exists) {
                    data.push(currentUser);
                }

                // Sort theo level giảm dần
                data.sort((a, b) => b.level - a.level);

                // Lấy top 10
                const top10 = data.slice(0, 10);

                // Render UI
                this.renderRanking(top10);
            })
            .catch((err) => cc.error("Ranking API error:", err));
    }

    /** Render UI từ data */
    renderRanking(data) {
        this.content.removeAllChildren();
        data.forEach((player, index) => {
        let item = cc.instantiate(this.itemPrefab);
        let comp = item.getComponent(RankItem);

        if (comp) {
            let isMe = player.name === "You";

            comp.setData(
                index + 1, 
                player.level, 
                player.name, 
                isMe            
            );
        }

        this.content.addChild(item);
    });
    }

    /** Nút đóng */
    click_close() {
        this.getComponent(View).hide();
        ViewManager.instance.hide("wechat/WxRankDialog");
    }
}
