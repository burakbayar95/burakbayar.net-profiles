document.addEventListener('DOMContentLoaded', function() {
    // Get all social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check if we're in an in-app browser (enhanced detection)
    const isInAppBrowser = /FBAN|FBAV|Instagram|Twitter|Line|wv|Line\/|FB_IAB|TWITTER_APP|Pinterest|TikTok|YouTube/.test(navigator.userAgent);
    
    // Store the last attempt time to avoid double openings
    let lastAppLinkAttempt = 0;
    
    // Invisible iframe for app links to prevent page navigation
    let hiddenFrame = document.createElement('iframe');
    hiddenFrame.style.display = 'none';
    document.body.appendChild(hiddenFrame);
    
    socialLinks.forEach(link => {
        // For all devices, prevent default target="_blank"
        link.removeAttribute('target');
        
        if (isMobile && link.dataset.appLink) {
            // Override click for mobile devices with app links
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Prevent rapid double clicks (within 2 seconds)
                const now = Date.now();
                if (now - lastAppLinkAttempt < 2000) {
                    return;
                }
                lastAppLinkAttempt = now;
                
                // Special rule for in-app browsers (same platform)
                // If we're already in app A and trying to open app A, do nothing
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
                
                // Get app link and check if it's YouTube
                const appLink = link.dataset.appLink;
                const isYoutube = link.classList.contains('youtube');

                // Different approach based on the platform and browser
                if (isInAppBrowser) {
                    // In app browsers require special handling to prevent white screen
                    try {
                        // Use the hidden iframe to open the app without navigating
                        hiddenFrame.src = appLink;
                        
                        // After a delay, check if we need to redirect to web
                        setTimeout(function() {
                            if (confirm('Uygulamayı açamadık. Web sayfasına gitmek ister misiniz?')) {
                                window.location.href = link.href;
                            }
                        }, 1500);
                    } catch(e) {
                        console.error('App link error:', e);
                        window.location.href = link.href;
                    }
                } else {
                    // Regular mobile browser
                    if (isYoutube) {
                        // YouTube requires special handling
                        window.location.href = link.href;
                    } else {
                        // For other platforms, use direct replacement
                        window.location.replace(appLink);
                        
                        // After a slight delay, check if the app opened
                        setTimeout(function() {
                            // If the app didn't open, navigate to the web link
                            window.location.href = link.href;
                        }, 1200); // Increased delay to ensure app opening
                    }
                }
            });
        } else {
            // For desktop devices, open in new tab
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(this.href, '_blank');
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