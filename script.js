// Function 1: Hero Video/Background Handling
document.addEventListener('DOMContentLoaded', () => {
    const heroBg = document.querySelector('.hero-video-bg');
    // In a real scenario, you would initialize a video player here:
    // const video = document.createElement('video');
    // video.src = 'path/to/your/background-reel.mp4';
    // video.loop = true;
    // video.autoplay = true;
    // video.play();
    console.log("✨ JavaScript Loaded: Cinematic Hero Background initialized.");
    
    // ========================================
    // CONTACT FORM MAINTENANCE MODE
    // ========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        /**
         * Prevent form submission while in maintenance mode
         * Display maintenance notice and prevent default behavior
         */
        const handleFormSubmit = (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            console.log('🔧 Contact form submission blocked - Maintenance mode active');
            
            // Get the maintenance notice element
            const maintenanceNotice = contactForm.querySelector('.maintenance-notice');
            if (maintenanceNotice) {
                // Add a brief flash animation to indicate the form is disabled
                maintenanceNotice.style.animation = 'none';
                setTimeout(() => {
                    maintenanceNotice.style.animation = 'pulse-notice 0.6s ease-in-out';
                }, 10);
            }
            
            // Show polite alert
            console.log('ℹ️ Contact form is currently under maintenance. Please email shuvamsaha044@gmail.com');
            
            return false;
        };
        
        // Attach submit event listener
        contactForm.addEventListener('submit', handleFormSubmit, true);
        console.log('✔️ Contact form maintenance mode activated');
        
        // Prevent input on form fields
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                console.log('📝 Form input attempted while in maintenance mode');
            });
        });
    }
    
    // ========================================
    // HERO VIDEO MUTE/UNMUTE CONTROL SYSTEM
    // ========================================
    
    // Initialize hero video controls (Only if on index.html with hero section)
    const heroMuteBtn = document.getElementById('hero-video-mute-btn');
    
    if (heroMuteBtn) {
        const heroVideoContainer = document.querySelector('.hero-video-bg');
        const heroVideo = heroVideoContainer?.querySelector('video');
        
        if (heroVideo) {
            // Set initial state - video starts muted per HTML attribute
            heroVideo.muted = true;
            console.log('📹 Video initial muted state:', heroVideo.muted);
            
            /**
             * Updates the mute button icon based on current mute state
             * @function
             */
            const updateMuteIcon = () => {
                const iconElement = heroMuteBtn.querySelector('.control-icon');
                if (!iconElement) {
                    console.error('❌ Icon element not found');
                    return;
                }
                // Show muted speaker icon if muted, unmuted speaker if not muted
                const newIcon = heroVideo.muted ? '🔇' : '🔊';
                iconElement.textContent = newIcon;
                console.log(`📊 Icon updated: ${newIcon} | Video muted: ${heroVideo.muted}`);
            };
            
            /**
             * Toggles video mute state and updates UI
             * Handles user interaction and visual feedback
             * @function
             */
            const toggleVideoMute = (event) => {
                console.log('🖱️ Mute button clicked');
                event.preventDefault();
                
                // Toggle mute state
                heroVideo.muted = !heroVideo.muted;
                console.log('🔄 Mute toggled to:', heroVideo.muted);
                
                // Update icon immediately
                updateMuteIcon();
                
                // Trigger visual animation on button
                heroMuteBtn.classList.add('mute-state-change');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    heroMuteBtn.classList.remove('mute-state-change');
                }, 400);
                
                // Console log for user feedback
                console.log(`✅ Hero Video Status: ${heroVideo.muted ? '🔇 MUTED' : '🔊 UNMUTED'}`);
            };
            
            // Attach click event listener with proper binding
            heroMuteBtn.addEventListener('click', toggleVideoMute, false);
            console.log('✔️ Click listener attached to mute button');
            
            // Listen for external mute changes (volume control, keyboard shortcuts, etc.)
            heroVideo.addEventListener('volumechange', updateMuteIcon, false);
            console.log('✔️ Volume change listener attached to video');
            
            // Initialize icon on page load
            updateMuteIcon();
            
            console.log("✨ Hero Video Mute Control Initialized Successfully");
        }
    }

    // ========================================
    // FULLSCREEN TOGGLE CONTROL SYSTEM
    // ========================================

    /**
     * Initialize fullscreen button for a given video element
     * @param {HTMLVideoElement} videoElement - The video element to control
     * @param {HTMLButtonElement} fullscreenBtn - The fullscreen button element
     */
    const initializeFullscreenButton = (videoElement, fullscreenBtn) => {
        if (!videoElement || !fullscreenBtn) return;
        
        /**
         * Updates the fullscreen button icon based on current fullscreen state
         * @function
         */
        const updateFullscreenIcon = () => {
            const iconElement = fullscreenBtn.querySelector('.control-icon');
            if (!iconElement) return;
            
            // Check if currently in fullscreen
            const isFullscreen = document.fullscreenElement === videoElement || 
                                document.webkitFullscreenElement === videoElement ||
                                document.mozFullScreenElement === videoElement ||
                                document.msFullscreenElement === videoElement;
            
            // Icon represents current state (exit vs enter)
            fullscreenBtn.title = isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen';
            console.log(`📺 Fullscreen state: ${isFullscreen ? 'ACTIVE' : 'INACTIVE'}`);
        };
        
        /**
         * Toggles fullscreen mode for the video element
         * Uses Fullscreen API with vendor prefixes for cross-browser support
         * @function
         */
        const toggleFullscreen = async () => {
            console.log('🖱️ Fullscreen button clicked');
            
            try {
                // Check if already in fullscreen
                const isCurrentlyFullscreen = document.fullscreenElement === videoElement || 
                                             document.webkitFullscreenElement === videoElement ||
                                             document.mozFullScreenElement === videoElement ||
                                             document.msFullscreenElement === videoElement;
                
                if (isCurrentlyFullscreen) {
                    // Exit fullscreen
                    if (document.exitFullscreen) {
                        await document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    console.log('📺 Exited fullscreen mode');
                } else {
                    // Enter fullscreen
                    if (videoElement.requestFullscreen) {
                        await videoElement.requestFullscreen();
                    } else if (videoElement.webkitRequestFullscreen) {
                        videoElement.webkitRequestFullscreen();
                    } else if (videoElement.mozRequestFullScreen) {
                        videoElement.mozRequestFullScreen();
                    } else if (videoElement.msRequestFullscreen) {
                        videoElement.msRequestFullscreen();
                    }
                    console.log('📺 Entered fullscreen mode');
                }
                
                // Add animation class to button
                fullscreenBtn.classList.add('fullscreen-active');
                setTimeout(() => {
                    fullscreenBtn.classList.remove('fullscreen-active');
                }, 300);
                
                // Update button title
                updateFullscreenIcon();
                
            } catch (error) {
                console.error('❌ Fullscreen toggle failed:', error.message);
            }
        };
        
        // Attach click event listener
        fullscreenBtn.addEventListener('click', toggleFullscreen, false);
        console.log('✔️ Fullscreen button initialized');
        
        // Listen for fullscreen change events (including keyboard ESC)
        document.addEventListener('fullscreenchange', updateFullscreenIcon, false);
        document.addEventListener('webkitfullscreenchange', updateFullscreenIcon, false);
        document.addEventListener('mozfullscreenchange', updateFullscreenIcon, false);
        document.addEventListener('MSFullscreenChange', updateFullscreenIcon, false);
    };

    // Initialize fullscreen for hero video (index.html)
    const heroFullscreenBtn = document.getElementById('fullscreen-btn');
    if (heroFullscreenBtn) {
        const heroVideoContainer = document.querySelector('.hero-video-bg');
        const heroVideo = heroVideoContainer?.querySelector('video');
        if (heroVideo) {
            initializeFullscreenButton(heroVideo, heroFullscreenBtn);
            console.log('✨ Hero Video Fullscreen Control Initialized');
        }
    }

    // Initialize fullscreen for project video (project-detail pages)
    const projectFullscreenBtn = document.getElementById('fullscreen-btn');
    if (projectFullscreenBtn) {
        const projectVideo = document.getElementById('project-video');
        if (projectVideo) {
            initializeFullscreenButton(projectVideo, projectFullscreenBtn);
            console.log('✨ Project Video Fullscreen Control Initialized');
        }
    }
    }, 800);

    // Function 1.5: Project Card Click Animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Find the link within the card
            const link = card.querySelector('.cta-secondary-button');
            if (link) {
                e.preventDefault();
                // Apply card exit animation
                card.classList.add('card-exit');
                // Apply page transition
                document.body.classList.add('page-transition-out');
                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = link.href;
                }, 700);
            }
        });
    });
    console.log("🎬 JavaScript Loaded: Project card click animations initialized.");

    // Function 2: Scroll Reveal Implementation (Crucial for high-end feel)
    // Use Intersection Observer API for performance
    const sections = document.querySelectorAll('.portfolio-section, .philosophy-section, .process-step');

    const observerOptions = {
        root: null, 
        rootMargin: '0px', 
        threshold: 0.2 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Example: Add a class to trigger a CSS animation on reveal
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Apply initial styles and observe the sections
    sections.forEach(section => {
        // Initial state for animation
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    console.log("🚀 JavaScript Loaded: Scroll reveals initialized for dynamic content.");

    // Function 3: Project Video Mute/Unmute Control (Only on project detail pages)
    const projectVideo = document.getElementById('project-video');
    if (projectVideo) {
        const muteBtn = document.getElementById('mute-btn');

        if (muteBtn) {
            // Set initial volume to maximum
            projectVideo.volume = 1;

            // Handle video looping
            projectVideo.addEventListener('ended', () => {
                projectVideo.currentTime = 0;
                projectVideo.play().catch(err => console.log('Loop play error:', err));
            });

            // Mute/Unmute Button Handler
            const updateMuteIcon = () => {
                muteBtn.querySelector('.control-icon').textContent = projectVideo.muted ? '🔇' : '🔊';
            };

            muteBtn.addEventListener('click', () => {
                // Toggle mute state
                projectVideo.muted = !projectVideo.muted;
                
                // Ensure video is playing when unmuting
                if (!projectVideo.muted) {
                    projectVideo.volume = 1;
                    // Ensure video plays
                    if (projectVideo.paused) {
                        projectVideo.play().catch(err => console.log('Play error:', err));
                    }
                }
                
                updateMuteIcon();
                console.log('Video muted:', projectVideo.muted, 'Volume:', projectVideo.volume);
            });

            // Update icon when mute state changes
            projectVideo.addEventListener('volumechange', updateMuteIcon);
            projectVideo.addEventListener('play', () => console.log('Video playing'));
            projectVideo.addEventListener('pause', () => console.log('Video paused'));

            // Initialize icon on page load
            updateMuteIcon();

            console.log("🔊 JavaScript Loaded: Video mute/unmute control initialized for project detail pages.");
        }
    }

// ========================================
// BROWSER HISTORY API - POPSTATE LISTENER
// ========================================
/**
 * Handle browser Back button navigation
 * Reinitializes page content when user navigates back using browser history
 * Specifically refreshes AOS animations to prevent blank content display
 */
window.addEventListener('popstate', () => {
    console.log('🔙 Back button pressed, reinitializing page content...');
    
    // Reinitialize AOS (Animate On Scroll) animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
        console.log('✨ AOS animations refreshed on history navigation');
    }
});
