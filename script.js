/**
 * PROTECTIVE SHIELD & STORY LOGIC
 * Created for Andy
 */

document.addEventListener("DOMContentLoaded", function() {

    // 1. SHIELD: Ngăn chặn các phím tắt Inspect Element
    document.addEventListener('contextmenu', e => e.preventDefault()); // Chặn chuột phải

    document.onkeydown = function(e) {
        // Chặn F12
        if (e.keyCode == 123) return false;
        // Chặn Ctrl+Shift+I (Inspect)
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
        // Chặn Ctrl+Shift+C (View Element)
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
        // Chặn Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
        // Chặn Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
    };

    // 2. PHÁT HIỆN DEVTOOLS (Nếu người dùng cố tình mở console, sẽ xóa sạch log hoặc debugger)
    setInterval(function() {
        if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
            console.clear();
            console.log("%cSecurity Shield Active", "color:red; font-size:20px; font-weight:bold;");
        }
    }, 1000);

    // 3. HIỆU ỨNG CUỘN (Intersection Observer)
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                entry.target.style.opacity = "1";
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Áp dụng cho các section
    const trendingSection = document.querySelector('#trending-section');
    if (trendingSection) revealObserver.observe(trendingSection);

    // 4. MÃ HÓA PATH ẢNH TRÊN CLIENT (Mẹo nhỏ)
    // Thay vì để link ảnh trực tiếp, bạn có thể load ảnh qua JS để ẩn path trong HTML gốc
    const images = document.querySelectorAll('img[data-secure-src]');
    images.forEach(img => {
        const encryptedPath = img.getAttribute('data-secure-src');
        // Ở đây bạn có thể dùng hàm giải mã đơn giản nếu muốn
        img.src = encryptedPath;
    });

    console.log("Welcome to Andy's protected story space.");
});