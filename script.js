document.addEventListener('DOMContentLoaded', function() {
    // Get all social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check if we're in an in-app browser (enhanced detection)
    const isInAppBrowser = /FBAN|FBAV|Instagram|Twitter|Line|wv|Line\/|FB_IAB|TWITTER_APP|Pinterest|TikTok|YouTube/.test(navigator.userAgent);
    
    // Store the last attempt time to avoid double openings
    let lastAppLinkAttempt = 0;
    
    // Simple function to open app and return to homepage after delay
    function openApp(appLink) {
        // Try to open the app
        window.location.href = appLink;
        
        // Return to homepage after 2 seconds
        setTimeout(function() {
            window.location.href = window.location.origin + window.location.pathname;
        }, 2000);
    }
    
    socialLinks.forEach(link => {
        // Remove target attribute to prevent automatic new tabs
        link.removeAttribute('target');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Prevent rapid double clicks (within 3 seconds)
            const now = Date.now();
            if (now - lastAppLinkAttempt < 3000) {
                return;
            }
            lastAppLinkAttempt = now;
            
            // Get web link and app link
            const webLink = link.href;
            const appLink = link.dataset.appLink;
            
            // Get platform name
            const appName = link.className.replace('social-link', '').trim();
            
            // Special rule for in-app browsers (same platform)
            if (isInAppBrowser) {
                // If we're already in app A and trying to open app A, just go to web version
                if ((appName === 'instagram' && /Instagram/.test(navigator.userAgent)) ||
                    (appName === 'twitter' && /Twitter|TWITTER_APP/.test(navigator.userAgent)) ||
                    (appName === 'facebook' && /FBAN|FBAV|FB_IAB/.test(navigator.userAgent)) ||
                    (appName === 'tiktok' && /TikTok/.test(navigator.userAgent))) {
                    console.log(`Inside ${appName} browser, going to web version`);
                    window.location.href = webLink;
                    return;
                }
            }
            
            // Handle based on device type
            if (isMobile && appLink) {
                // YouTube special handling - go directly to web on mobile
                if (appName === 'youtube') {
                    window.location.href = webLink;
                } else {
                    // Open app and return to homepage after 2 seconds
                    openApp(appLink);
                }
            } else {
                // Desktop - open web link in new tab
                window.open(webLink, '_blank');
            }
        });
    });
    
    // Add a simple animation when the page loads
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.style.transition = 'opacity 0.5s ease';
        container.style.opacity = '1';
    }, 100);
}); 