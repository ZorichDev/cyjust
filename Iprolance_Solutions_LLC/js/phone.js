  let currentSlide = 0;
        let autoPlayInterval;
        let isAutoPlaying = false;

        function updateSlider() {
            const slider = document.getElementById('slider');
            const slideIndicator = document.getElementById('slideIndicator');
            const controlBtns = document.querySelectorAll('.phone-demo-control-btn:not(.phone-demo-auto-play-btn)');
            const dots = document.querySelectorAll('.phone-demo-dot');

            slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
            slideIndicator.textContent = `${currentSlide + 1} / 3`;

            // Update active states
            controlBtns.forEach((btn, index) => {
                btn.classList.toggle('active', index === currentSlide);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % 3;
            updateSlider();
        }

        function toggleAutoPlay() {
            const autoPlayBtn = document.getElementById('autoPlayBtn');
            
            if (isAutoPlaying) {
                clearInterval(autoPlayInterval);
                autoPlayBtn.textContent = 'Auto Play';
                autoPlayBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
                isAutoPlaying = false;
            } else {
                autoPlayInterval = setInterval(nextSlide, 2000);
                autoPlayBtn.textContent = 'Stop Auto';
                autoPlayBtn.style.background = 'linear-gradient(45deg, #ee5a24, #ff9ff3)';
                isAutoPlaying = true;
            }
        }

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        const slider = document.getElementById('slider');

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left (next slide)
                    currentSlide = (currentSlide + 1) % 3;
                } else {
                    // Swipe right (previous slide)
                    currentSlide = (currentSlide - 1 + 3) % 3;
                }
                updateSlider();
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    currentSlide = (currentSlide - 1 + 3) % 3;
                    updateSlider();
                    break;
                case 'ArrowRight':
                    currentSlide = (currentSlide + 1) % 3;
                    updateSlider();
                    break;
                case ' ':
                    e.preventDefault();
                    toggleAutoPlay();
                    break;
            }
        });

                function visitSite() {
            // Replace this URL with your actual site URL
            window.open('https://your-fuel-station-app.com', '_blank');
        }
        
        // Initialize and start auto-play immediately
        updateSlider();
        
        // Auto-start the sliding
        setTimeout(() => {
            toggleAutoPlay();
        }, 1000);