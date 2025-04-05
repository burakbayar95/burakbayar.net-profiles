// Matrix Rain effect
// Hemen çalışacak fonksiyon
(function() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return; // Canvas yoksa çık
    
    const ctx = canvas.getContext('2d');

    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Canvas'ı ekranı tamamen kaplamak için ayarla
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '1';
    canvas.style.zIndex = '-1';
    
    // Ekran boyutlarına göre canvas ayarla
    function resizeCanvas() {
        // Tam piksel değerleri için window.innerWidth/Height kullan
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Başlangıçta ve her boyut değişiminde yeniden boyutlandır
    resizeCanvas();

    // Karakterler - mobil ve masaüstü için aynı setler
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');

    // Sütun ayarları - tüm ekranı kaplamak için hesapla
    const fontSize = isMobile ? 10 : 14;
    // Tüm ekranı kaplayacak sütun sayısını hesapla
    const columns = Math.ceil(window.innerWidth / fontSize);

    // Damlaları ekranın üstünden başlat
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Ekranın üstünden başlat
    }

    // Matrix efekti renk ayarları
    let alpha = isMobile ? 0.02 : 0.03;

    // Çizim fonksiyonu
    function draw() {
        // Arka plan için opaklıkla doldur
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Yazı özellikleri
        ctx.font = `${fontSize}px monospace`;

        // Her damlayı çiz
        for (let i = 0; i < drops.length; i++) {
            // Rastgele karakter
            const char = charArray[Math.floor(Math.random() * charArray.length)];

            // X pozisyonu
            const x = i * fontSize;
            
            // Y pozisyonu
            const y = drops[i] * fontSize;

            // Karakteri çiz
            const randomOpacity = 0.3 + Math.random() * 0.5; // Daha parlak görünüm
            ctx.fillStyle = `rgba(0, 255, 0, ${randomOpacity})`;
            ctx.fillText(char, x, y);

            // Ekranın altına gelince veya rastgele sıfırla
            if (y > canvas.height && Math.random() > 0.98) {
                drops[i] = 0;
            }

            // Damlayı aşağı kaydır - daha yavaş hızda
            drops[i] += isMobile ? 0.8 : 0.6; // Hızı düşürdük
        }
        
        // Animasyonu daha yavaş devam ettir
        setTimeout(function() {
            requestAnimationFrame(draw);
        }, isMobile ? 40 : 60); // Frameler arası bekleme süresi
    }

    // Pencere boyutu değişince canvas'ı yeniden boyutlandır
    window.addEventListener('resize', function() {
        // Yeniden boyutlandır
        resizeCanvas();
        
        // Yeni sütun sayısını hesapla
        const newColumns = Math.ceil(window.innerWidth / fontSize);
        
        // Sütun sayısı değiştiyse damlaları güncelle
        if (newColumns !== drops.length) {
            // Damlaları yeniden oluştur
            drops.length = 0;
            for (let i = 0; i < newColumns; i++) {
                drops[i] = Math.random() * -100;
            }
        }
    }, { passive: true });

    // Yön değişiminde de boyutu güncelle
    window.addEventListener('orientationchange', function() {
        setTimeout(resizeCanvas, 100);
    }, { passive: true });

    // Animasyonu hemen başlat
    draw();
})(); 