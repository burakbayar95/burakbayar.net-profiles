// Matrix Rain effect
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Set canvas dimensions to match window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Ensure full viewport coverage, especially on mobile
        if (isMobile) {
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            document.body.style.minHeight = '100vh';
        }
    }
    
    resizeCanvas();

    // Characters to use - reduce character set on mobile
    const chars = isMobile ? '01ハカサナマヤラワ' : '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');

    // Column settings - adjust based on device
    const fontSize = isMobile ? 10 : 14;
    // Reduce number of columns on mobile for better performance
    const columnDensity = isMobile ? 0.7 : 1; // 70% density on mobile
    const columns = Math.floor(canvas.width / fontSize * columnDensity);

    // Initialize drops at random positions
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    // Set dark green color for matrix effect
    let alpha = isMobile ? 0.02 : 0.03; // Reduced opacity for the fade effect on mobile

    // For mobile, reduce drawing operation frequency
    let drawCounter = 0;
    const skipFrames = isMobile ? 2 : 0; // Skip every 2 frames on mobile

    function draw() {
        // Skip frames on mobile for better performance
        if (isMobile && drawCounter < skipFrames) {
            drawCounter++;
            return;
        }
        drawCounter = 0;
        
        // Background with opacity for trail effect
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text properties
        ctx.font = `${fontSize}px monospace`;

        // Draw each drop
        for (let i = 0; i < drops.length; i++) {
            // Skip more columns for performance on mobile
            if (isMobile && Math.random() > 0.7) continue;
            
            // Get random character
            const char = charArray[Math.floor(Math.random() * charArray.length)];

            // Calculate x position
            const x = i * fontSize;
            
            // Calculate y position
            const y = drops[i] * fontSize;

            // Draw character
            // Vary the opacity based on position to create visual interest
            const randomOpacity = 0.3 + Math.random() * 0.3;
            ctx.fillStyle = `rgba(0, 255, 0, ${randomOpacity})`;
            ctx.fillText(char, x, y);

            // Reset drop if it reaches bottom or randomly
            if (y > canvas.height && Math.random() > (isMobile ? 0.988 : 0.975)) {
                drops[i] = 0;
            }

            // Move drop down - further reduced speed
            drops[i] += 1.0; // Reduced from 1.2 to 1.0
        }
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        // Recalculate columns after resize
        const newColumns = Math.floor(canvas.width / fontSize * columnDensity);
        // Adjust drops array length
        if (newColumns > drops.length) {
            // Add new drops if window got wider
            for (let i = drops.length; i < newColumns; i++) {
                drops.push(Math.random() * -100);
            }
        }
    });

    // Handle orientation change specifically for mobile
    window.addEventListener('orientationchange', function() {
        setTimeout(resizeCanvas, 100); // Slight delay to ensure correct dimensions
    });

    // Animation loop with variable frame rate based on device - slower now
    setInterval(draw, isMobile ? 80 : 55); // Changed from 70/45 to 80/55 for even slower animation

    // Add flag to pause animation when page is not visible
    document.addEventListener('visibilitychange', function() {
        alpha = document.hidden ? 0 : (isMobile ? 0.02 : 0.03);
    });
}); 