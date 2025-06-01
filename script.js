// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const serverRack = document.querySelector('.server-rack');
    const mayoSplash = document.querySelector('.mayo-splash');
    const mayoTarget = document.querySelector('.mayo-target');
    const mayoSplat = document.querySelector('.mayo-splat');
    const storyWindows = document.querySelectorAll('.error-window');
    const countdownEl = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    // GSAP initialization
    gsap.registerPlugin();
    
    // Simulate loading and show main content
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            setTimeout(function() {
                document.getElementById('main-content').classList.add('visible');
                initAnimations();
            }, 100);
        }, 500);
    }, 4000); // 4 seconds for loading animation
    
    // Initialize animations after content is visible
    function initAnimations() {
        // Animate section titles
        gsap.fromTo('.section-title', {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2
        });
        
        // Animate error windows
        gsap.fromTo('.error-window', {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15
        });
        
        // Add hover effect to error windows
        storyWindows.forEach(window => {
            window.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.02,
                    boxShadow: '0 0 25px rgba(255, 60, 60, 0.6)',
                    duration: 0.3
                });
            });
            
            window.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    boxShadow: '0 0 15px rgba(255, 60, 60, 0.4)',
                    duration: 0.3
                });
            });
            
            // Close button functionality
            const closeBtn = window.querySelector('.error-buttons span');
            closeBtn.addEventListener('click', function() {
                gsap.to(window, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    onComplete: function() {
                        window.style.display = 'none';
                        // After a delay, show it again
                        setTimeout(function() {
                            window.style.display = '';
                            gsap.to(window, {
                                opacity: 1,
                                y: 0,
                                duration: 0.3
                            });
                        }, 3000);
                    }
                });
            });
        });
    }
    
    // Server rack mayo splash interaction
    if (serverRack) {
        serverRack.addEventListener('click', function() {
            if (mayoSplash) {
                mayoSplash.classList.remove('hidden');
                mayoSplash.classList.add('visible');
                
                // Add glitch effect to the container
                this.style.animation = 'glitch 0.3s forwards';
                
                // Hide the mayo splash after a delay
                setTimeout(() => {
                    mayoSplash.classList.remove('visible');
                    this.style.animation = '';
                }, 2000);
            }
        });
    }
    
    // Mayo target interaction
    if (mayoTarget) {
        mayoTarget.addEventListener('click', function() {
            if (mayoSplat) {
                mayoSplat.classList.add('visible');
                
                // Add random rotation and scale to the splat
                const randomRotation = Math.random() * 360;
                const randomScale = 0.8 + Math.random() * 0.4;
                
                gsap.to(mayoSplat, {
                    rotation: randomRotation,
                    scale: randomScale,
                    duration: 0.2
                });
                
                // Hide the mayo splat after a delay
                setTimeout(() => {
                    gsap.to(mayoSplat, {
                        opacity: 0,
                        duration: 1,
                        onComplete: () => {
                            mayoSplat.classList.remove('visible');
                            gsap.set(mayoSplat, {
                                opacity: 1,
                                rotation: 0,
                                scale: 1
                            });
                        }
                    });
                }, 2000);
            }
        });
    }
    
    // Countdown timer to May 30
    function updateCountdown() {
        const launchDate = new Date('May 30, 2024 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display
        countdownEl.days.textContent = days.toString().padStart(2, '0');
        countdownEl.hours.textContent = hours.toString().padStart(2, '0');
        countdownEl.minutes.textContent = minutes.toString().padStart(2, '0');
        countdownEl.seconds.textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is over
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownEl.days.textContent = '00';
            countdownEl.hours.textContent = '00';
            countdownEl.minutes.textContent = '00';
            countdownEl.seconds.textContent = '00';
            
            // Show launched message
            document.querySelector('.launch-button span').textContent = 'LAUNCHED!';
        }
    }
    
    // Update the countdown every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Add glitch effect to launch button on hover
    const launchButton = document.querySelector('.launch-button');
    if (launchButton) {
        launchButton.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s infinite';
        });
        
        launchButton.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }
    
    // Random glitch effect for elements
    function randomGlitch() {
        const glitchElements = document.querySelectorAll('.glitch');
        if (glitchElements.length > 0) {
            const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            
            gsap.to(randomElement, {
                skewX: Math.random() * 10 - 5,
                skewY: Math.random() * 10 - 5,
                duration: 0.1,
                onComplete: function() {
                    gsap.to(randomElement, {
                        skewX: 0,
                        skewY: 0,
                        duration: 0.1
                    });
                }
            });
        }
        
        // Schedule the next glitch
        setTimeout(randomGlitch, 3000 + Math.random() * 5000);
    }
    
    // Start random glitches
    setTimeout(randomGlitch, 5000);
    
    // Create scanlines effect
    function createScanline() {
        const scanline = document.createElement('div');
        scanline.className = 'scanline';
        scanline.style.position = 'fixed';
        scanline.style.top = '0';
        scanline.style.left = '0';
        scanline.style.width = '100%';
        scanline.style.height = '2px';
        scanline.style.background = 'rgba(255, 255, 255, 0.1)';
        scanline.style.zIndex = '3';
        scanline.style.pointerEvents = 'none';
        document.body.appendChild(scanline);
        
        // Animate the scanline
        gsap.to(scanline, {
            top: '100vh',
            duration: 3,
            ease: 'none',
            onComplete: function() {
                scanline.remove();
                setTimeout(createScanline, Math.random() * 3000);
            }
        });
    }
    
    // Start scanline effect
    setTimeout(createScanline, 2000);
    
    // Add scroll reveal effects for each section
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        // Add a small delay for each section to create a staggered effect
        setTimeout(() => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 1s ease, transform 1s ease';
            
            // Create an intersection observer to detect when the section is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                        observer.unobserve(section);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(section);
        }, index * 100);
    });
});

// Fix for mainContent reference
window.addEventListener('load', function() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        window.mainContent = mainContent;
    }
}); 