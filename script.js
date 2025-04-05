document.addEventListener('DOMContentLoaded', function() {
    // Get all social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check if we're in an in-app browser
    const isInAppBrowser = /FBAN|FBAV|Instagram|Twitter|Line|wv|Line\/|FB_IAB|TWITTER_APP|Pinterest/.test(navigator.userAgent);
    
    // Store the last attempt time to avoid double openings
    let lastAppLinkAttempt = 0;
    
    socialLinks.forEach(link => {
        // Remove target attribute from all links - this prevents automatic new tabs
        link.removeAttribute('target');
        
        // For mobile devices with app links
        if (isMobile && link.dataset.appLink) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Prevent double clicks/attempts within 2 seconds
                const now = Date.now();
                if (now - lastAppLinkAttempt < 2000) {
                    return;
                }
                lastAppLinkAttempt = now;
                
                // Get the app link and web link
                const appLink = link.dataset.appLink;
                const webLink = link.href;
                
                // Special rule for in-app browsers:
                // If we're already in an app's browser and user is trying to open the SAME platform
                // For example: Inside Instagram browser, tapping Instagram link
                // Or inside TikTok browser, tapping TikTok link
                // We do nothing in these cases because it causes issues
                if (isInAppBrowser) {
                    const appName = link.className.replace('social-link', '').trim();
                    if ((appName === 'instagram' && /Instagram/.test(navigator.userAgent)) ||
                        (appName === 'twitter' && /Twitter|TWITTER_APP/.test(navigator.userAgent)) ||
                        (appName === 'facebook' && /FBAN|FBAV|FB_IAB/.test(navigator.userAgent)) ||
                        (appName === 'tiktok' && /TikTok/.test(navigator.userAgent))) {
                        console.log(`Inside ${appName} browser, clicking ${appName} link - no action needed`);
                        return;
                    }
                }
                
                // If we're in any in-app browser, try to open the app directly WITHOUT redirecting to the web version
                if (isInAppBrowser) {
                    // Just try to open the app with no fallback
                    window.location.href = appLink;
                    return;
                }
                
                // For standard mobile browsers only: use fallback mechanism
                if (!isInAppBrowser) {
                    // Track if the page visibility changes (indicates app opened)
                    let hasLeftPage = false;
                    
                    const visibilityHandler = function() {
                        if (document.visibilityState === 'hidden') {
                            hasLeftPage = true;
                            document.removeEventListener('visibilitychange', visibilityHandler);
                        }
                    };
                    
                    // Add visibility change listener
                    document.addEventListener('visibilitychange', visibilityHandler);
                    
                    // Try to open the app
                    window.location.href = appLink;
                    
                    // Only in standard browsers: fallback to web if app doesn't open
                    // BUT without opening a new tab - use same tab instead
                    setTimeout(function() {
                        // If page is still visible and we haven't left (app didn't open)
                        if (!hasLeftPage && document.visibilityState !== 'hidden') {
                            // Remove our visibility listener
                            document.removeEventListener('visibilitychange', visibilityHandler);
                            
                            // If app didn't open, open web link in SAME tab
                            window.location.href = webLink;
                        }
                    }, 1500);
                }
            });
        } else {
            // For desktop and non-app-links, handle click normally
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Open in same window for better user experience
                window.location.href = this.href;
            });
        }
    });
    
    // Add a simple animation when the page loads
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.style.transition = 'opacity 0.5s ease';
        container.style.opacity = '1';
    }, 100);
}); 