/**
 * =======================================================================
 * CORE INITIALIZATION FUNCTIONS
 * =======================================================================
 * All major functionality is wrapped in dedicated functions.
 * This allows us to re-run specific parts of the code (e.g., on 'back' button press).
 */

/**
 * Initializes the cinematic hero background logic.
 */
const initializeHeroBackground = () => {
    const heroBg = document.querySelector('.hero-video-bg');
    // The actual video initialization logic would go here.
    // Example: const video = new VideoPlayer(heroBg);
    // For now, just logging that the script runs.
    console.log("✨ Hero Background initialized.");
};

/**
 * Initializes the contact form maintenance mode handler.
 */
const setupMaintenanceMode = () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        const handleFormSubmit = (event) => {
            event.preventDefault();
            event.stopPropagation();

            // Get the maintenance notice element
            const maintenanceNotice = contactForm.querySelector('.maintenance-notice');
            if (maintenanceNotice) {
                // Animation logic remains clean
                maintenanceNotice.style.animation = 'none';
                setTimeout(() => {
                    maintenanceNotice.style.animation = 'pulse-notice 0.6s ease-in-out';
                }, 10);
            }

            // *** OPTIONAL: Use a subtle UI feedback instead of console.log ***
            // Example: Display a small, temporary notification message near the form.

            return false;
        };

        contactForm.addEventListener('submit', handleFormSubmit, true);
        console.log('✔️ Contact form maintenance mode activated.');
    }
};


/**
 * Initializes the hero video controls and state management.
 * @param {HTMLVideoElement} videoElement - The video element to control.
 * @param {HTMLButtonElement} fullscreenBtn - The fullscreen button element.
 */
const initializeFullscreenButton = (videoElement, fullscreenBtn) => {
    if (!videoElement || !fullscreenBtn) return;

    // Helper function to check current fullscreen state
    const isFullscreen = () => {
        return document.fullscreenElement === videoElement ||
               document.webkitFullscreenElement === videoElement ||
               document.mozFullScreenElement === videoElement ||
               document.msFullscreenElement === videoElement;
    };

    /**
     * Updates the fullscreen button icon based on current fullscreen state.
     */
    const updateFullscreenIcon = () => {
        const iconElement = fullscreenBtn.querySelector('.control-icon');
        if (!iconElement) return;

        const state = isFullscreen() ? 'Exit Fullscreen' : 'Toggle Fullscreen';
        fullscreenBtn.title = state;
    };

    /**
     * Toggles fullscreen mode for the video element.
     */
    const toggleFullscreen = async () => {
        try {
            const enterFullscreen = (el) => {
                if (el.requestFullscreen) return el.requestFullscreen();
                if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
                if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
                return el.msRequestFullscreen();
            };

            const exitFullscreen = () => {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            };
            
            if (isFullscreen()) {
                await exitFullscreen();
            } else {
                await enterFullscreen(videoElement);
            }

            // Animation and state update
            fullscreenBtn.classList.add('fullscreen-active');
            setTimeout(() => {
                fullscreenBtn.classList.remove('fullscreen-active');
            }, 300);
            updateFullscreenIcon();

        } catch (error) {
            console.error('❌ Fullscreen toggle failed:', error.message);
        }
    };

    // Event Listeners
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Listen for programmatic and manual fullscreen changes (e.g., pressing ESC)
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
    document.addEventListener('MSFullscreenChange', updateFullscreenIcon);
};


/**
 * Handles the specific video mute/unmute logic for a video player.
 * @param {HTMLVideoElement} videoElement - The video element.
 * @param {HTMLButtonElement} muteBtn - The mute/unmute button.
 */
const setupVideoControls = (videoElement, muteBtn) => {
    if (!videoElement || !muteBtn) return;

    const updateMuteIcon = () => {
        const iconElement = muteBtn.querySelector('.control-icon');
        if (!iconElement) return;
        const newIcon = videoElement.muted ? '🔇' : '🔊';
        iconElement.textContent = newIcon;
    };

    // Mute/Unmute Button Handler
    const toggleVideoMute = (event) => {
        event.preventDefault();

        // 1. Toggle mute state
        videoElement.muted = !videoElement.muted;

        // 2. Re-initialize volume on unmuting (to ensure sound comes back)
        if (!videoElement.muted) {
            videoElement.volume = 1;
        }
        
        // 3. Update UI and animation
        updateMuteIcon();

        // Trigger visual animation
        muteBtn.classList.add('mute-state-change');
        setTimeout(() => {
            muteBtn.classList.remove('mute-state-change');
        }, 400);
    };

    muteBtn.addEventListener('click', toggleVideoMute);

    // Event listeners to keep the icon updated
    videoElement.addEventListener('volumechange', updateMuteIcon);
    videoElement.addEventListener('loadedmetadata', updateMuteIcon);

    // Initial state setup
    updateMuteIcon();
};


/**
 * Handles the project card click animation and navigation.
 */
const setupProjectCardAnimations = () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const link = card.querySelector('.cta-secondary-button');
            if (link) {
                e.preventDefault();
                // Apply animation classes for visual feedback
                card.classList.add('card-exit');
                document.body.classList.add('page-transition-out');
                
                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = link.href;
                }, 700);
            }
        });
    });
};


/**
 * Uses Intersection Observer to trigger animations when elements scroll into view.
 */
const setupScrollReveals = () => {
    const sections = document.querySelectorAll('.portfolio-section, .philosophy-section, .process-step');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(section => {
        // Initial hidden state
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
};

/**
 * =======================================================================
 * BROWSER HISTORY HANDLER (THE CRITICAL FIX)
 * =======================================================================
 * This function re-runs all essential initialization logic when the user
 * uses the back button to prevent the page from appearing blank.
 */
const handleBackNavigation = () => {
    console.warn("🔄 POPSTATE DETECTED: Re-initializing page content...");
    // Re-run the core initialization functions to restore the dynamic state
    setupProjectCardAnimations();
    setupScrollReveals();
    // You might also need to run initializeHeroBackground() here if the hero state is crucial.
};


/**
 * =======================================================================
 * MAIN INITIALIZATION CALL
 * =======================================================================
 * This function encapsulates the entire setup logic and runs on page load.
 */
const initWebsite = () => {
    // 1. SETUP NAVIGATION
    setupProjectCardAnimations();
    
    // 2. SETUP SCROLL EFFECTS
    setupScrollReveals();

    // 3. SETUP CONTACT FORM
    setupMaintenanceMode();
    
    // 4. GET PAGE-SPECIFIC INITIALIZATIONS
    
    // Check if we are on a project detail page (assuming element existence)
    const projectVideo = document.getElementById('project-video');
    const muteBtn = document.getElementById('mute-btn');
    setupVideoControls(projectVideo, muteBtn);
    
    // Check if we are on the home page (index.html) for hero features
    if (document.querySelector('.hero-video-bg')) {
        const heroVideoContainer = document.querySelector('.hero-video-bg');
        const heroVideo = heroVideoContainer?.querySelector('video');
        const heroFullscreenBtn = document.getElementById('fullscreen-btn');
        const heroMuteBtn = document.getElementById('hero-video-mute-btn');

        if (heroVideo && heroFullscreenBtn) {
            initializeFullscreenButton(heroVideo, heroFullscreenBtn);
        }
        if (heroVideo && heroMuteBtn) {
            setupVideoControls(heroVideo, heroMuteBtn);
        }
        initializeHeroBackground();
    }
};

/**
 * =======================================================================
 * BROWSER POPSTATE FIX (THE BUG FIX)
 * =======================================================================
 * Listener for the 'back' button event.
 * We execute the main initialization function here to restore the page state.
 */
window.addEventListener('popstate', handleBackNavigation);

// Initial call when the page first loads
document.addEventListener('DOMContentLoaded', initWebsite);
