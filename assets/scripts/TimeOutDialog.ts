const { ccclass, property } = cc._decorator;

@ccclass
export default class TimeoutDialog extends cc.Component {

    // Hàm gọi khi ấn nút Retry
    onRetry() {
        cc.log("Retry clicked");
        // Restart màn hiện tại
        cc.director.loadScene("Game")
    }

    // Hàm gọi khi ấn nút Quit
    onQuit() {
        cc.log("Quit clicked");
        // Quay về màn hình chính
        cc.director.loadScene("Main")
    }
}
