# Apple Homepage v2 - Reverse Engineered with REA & AI Agents

Dự án tái tạo giao diện và hệ thống chuyển động của trang chủ [Apple.com](https://www.apple.com/) trên môi trường local, thực hiện trong khuôn khổ bài tập nghiên cứu AI Coding Agent, MCP và Web Reverse Engineering bằng bộ công cụ [morluto/rea](https://github.com/morluto/rea).

## 1. Kiến trúc & Quy trình thực hiện (Workflow)

Dự án áp dụng chiến thuật **2-Session độc lập (Progressive Context Management)** kết hợp giao thức **MCP (Model Context Protocol)** trên Antigravity IDE nhằm tối ưu hóa bộ nhớ ngữ cảnh (Context Window) và tránh tràn token khi phân tích trang web lớn:

* **Giai đoạn 1 - Trích xuất đặc tả kỹ thuật (Session 1):**
  * Khởi chạy trình duyệt Chromium qua cổng Remote Debugging `9222`.
  * Sử dụng MCP Server của `rea-agents` kết nối trực tiếp với Chrome DevTools Protocol (CDP) để quét cây DOM, đo đạc Layout Geometry, trích xuất bảng màu, Typography, đường dẫn tài nguyên gốc (Images & MP4 Videos) và thông số `cubic-bezier` từ `getComputedStyle` / `document.getAnimations()`.
  * Đóng gói toàn bộ dữ liệu vào file đặc tả `DESIGN_SPEC.md` và dữ liệu thô `apple_extract.md` mà không cần nạp toàn bộ các gói bundle JavaScript nặng vào ngữ cảnh.
* **Giai đoạn 2 - Sinh mã nguồn & Tái tạo Animation (Session 2):**
  * Khởi tạo phiên làm việc mới để giải phóng hoàn toàn bộ nhớ token của bước quét DOM.
  * AI Agent đọc trực tiếp thông số từ `DESIGN_SPEC.md` để dựng cấu trúc giao diện, nhúng video nền và tái tạo hệ thống tương tác chuẩn xác theo bản gốc.

## 2. Các hạng mục giao diện & Animation đã hoàn thiện

* **Global Navigation (`#globalnav`) & Flyout Curtains:**
  * Thanh điều hướng kính mờ (`backdrop-filter: saturate(180%) blur(20px)`), chiều cao chuẩn `44px` trên Desktop và `48px` trên thiết bị nhỏ.
  * Hiệu ứng trượt Mega Menu 3 cột (`Explore`, `Shop`, `More from...`) kèm hiệu ứng chữ xuất hiện lệch nhịp (staggered fade-in) khi di chuột vào từng danh mục.
  * Tích hợp khung rổ xuống (Flyout) khi kích hoạt biểu tượng **Search** (ô tìm kiếm + *Quick Links*) và **Bag** (trạng thái giỏ hàng + *My Profile*).
* **Hero Banners & Video Animations (`section.section-hero`):**
  * **Holiday 2026 Banner:** Tích hợp thẻ `<video>` tự động phát kèm bộ chuyển đổi 4 biến thể màu sắc tương tác trực tiếp (*Pink, Blue, Green, Yellow*).
  * **iPhone Duo:** Tích hợp video mở máy đi kèm hiệu ứng chữ phụ đề *"Hello, hello."* xuất hiện nối tiếp theo nhịp chuyển động.
  * **MacBook Pro:** Xử lý chuẩn Typography `SF Pro Display` (`font-weight: 600`) và hiệu ứng phủ màu chuyển sắc (`linear-gradient` + `background-clip: text`) cho dòng phụ đề *PROLED XDR Display*.
* **Bento Promo Grid (6 Tiles):**
  * Bố cục lưới 2 cột (`1fr 1fr`, `gap: 12px`) hiển thị các sản phẩm *Apple Watch Series 12*, *iPad*, *AirPods Pro 3*, *Apple Upgrade* (nhúng video chuyển động trực tiếp) và *Apple Card*.
* **Endless Entertainment & Services Gallery:**
  * **Apple TV+ Main Carousel (`#tv-media-gallery`):** Slider trình chiếu 9 phim tự động chuyển cảnh, làm nổi bật slide trung tâm và làm mờ 2 slide phụ hai bên, đi kèm thanh chấm phân trang tương tác.
  * **Services Marquee:** Băng chuyền ngang trôi liên tục cho các thẻ *Apple Arcade*, *Apple Music*, *Apple Fitness+* với cơ chế giảm tốc khi di chuột và nút điều khiển *Play/Pause* đồng bộ.
* **Apple Footer:**
  * Khu vực chú thích cuối trang (Footnotes) và danh mục liên kết 5 cột chuẩn bố cục Apple.

## 3. Cấu trúc thư mục

```text
apple-v2/
├── DESIGN_SPEC.md       # Tài liệu đặc tả thiết kế trích xuất từ cổng 9222 qua REA
├── apple_extract.md     # Dữ liệu DOM/Asset thô phục vụ đối chiếu đường dẫn
├── index.html           # Cấu trúc HTML chính của trang chủ Apple v2
├── styles/              # Hệ thống CSS Layout, Typography, Keyframes & Cubic-Bezier
├── scripts/             # Logic điều khiển Flyout Menu, Video Switcher & Carousel
└── README.md            # Tài liệu hướng dẫn và báo cáo quy trình dự án