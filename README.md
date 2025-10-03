# Game Test (Cocos Creator 2.4.13)

## Tính năng đã làm
- **Đa ngôn ngữ (EN/VI/zh)**:
- Text: component `LocalizedLabel` (tự đổi font EN/VI vs zh).
- Ảnh: component `LocalizedSprite` đổi `SpriteFrame` theo `i18n/title/title_{lang}.png`.
- **LanguageToggle**: đổi ngôn ngữ realtime, ghi `localStorage` (giữ sau khi reload).
- **Fix level 5**: Xóa đoạn code chặn user không hoàn thành được màn 5
- **Giới hạn thời gian**: `10 * currentLevel` giây → quá thời gian hiện **LoseDialog** với **Retry/Quit**.
- **Ranking**:
  - Prefab `WxRankDialog` + `RankItem`.
  - Gọi API: `https://5d820f171c8ff70014ef438d.mockapi.io/1/ranking-list`
  - Lấy **Top 10**, chèn **current user** nếu chưa có, sort theo `level` giảm dần.
  - UI 3 cột **Rank | Level | Name**; highlight dòng current user.

## Thư mục i18n
- `assets/resources/i18n/en.json`, `vi.json`, `zh.json`
- Ảnh tiêu đề: `assets/resources/i18n/title/title_en.png`, `title_vi.png` và `title_zh.png`

## Cách test nhanh
- Vào **Home** → nút đổi ngôn ngữ **EN/VI**.
- Vào **Game** → xem text (steps/time), thử vượt thời gian để thấy **LoseDialog**.
- Mở **Ranking** → hiển thị Top 10, highlight current user.

## Ghi chú
- Font: EN/VI dùng **Roboto-Regular.ttf**, zh dùng **cm.fnt**.
- Một số popup được load qua `ViewManager`, các text đã thay `LocalizationManager.t(key)`.
