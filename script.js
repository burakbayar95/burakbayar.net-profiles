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
        // For mobile devices with app links
        if (isMobile) {
            // Remove target attribute to prevent automatic new tabs
            link.removeAttribute('target');
            
            if (link.dataset.appLink) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Prevent double clicks/attempts within 2 seconds
                    const now = Date.now();
                    if (now - lastAppLinkAttempt < 2000) {
                        return;
                    }
                    lastAppLinkAttempt = now;
                    
                    // Get the app link
                    const appLink = link.dataset.appLink;
                    
                    // Special rule for in-app browsers:
                    // If we're already in an app's browser and user is trying to open the SAME platform
                    // For example: Inside Instagram browser, tapping Instagram link
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
                    
                    // For ALL mobile browsers (in-app or standard):
                    // 1. Try to open the app
                    // 2. Reset the page location to itself after a delay - this cancels any navigation
                    
                    // First, open the app with iframe to prevent page navigation
                    // This trick keeps the page in place and just opens the app
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);
                    iframe.src = appLink;
                    
                    // Give it a bit of time to work
                    setTimeout(function() {
                        // Remove the iframe
                        document.body.removeChild(iframe);
                    }, 100);
                    
                    // Now force the page to stay on this page 
                    // This will cancel any navigation attempt from app links
                    setTimeout(function() {
                        // Get the current URL and reload it - much safer approach
                        window.location.href = window.location.href;
                    }, 500);
                });
            }
        } else {
            // For desktop, open in new tab
            link.setAttribute('target', '_blank');
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