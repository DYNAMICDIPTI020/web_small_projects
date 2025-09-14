const car = document.getElementById('car');
const progressFill = document.getElementById('progressFill');
const places = document.querySelectorAll('.place');
const journeyContainer = document.querySelector('.journey-container');
const funFacts = document.getElementById('funFacts');
const factText = document.getElementById('factText');
        
    let currentDirection = 1;
    let lastScrollY = 0;

    // Fun facts about Bhubaneswar
    const facts = [
            "Bhubaneswar has over 500 temples! 🏛️",
            "It's called the 'Temple City of India' 🕉️",
            "The city is over 3000 years old! ⏳",
            "Lingaraj Temple is 180 feet tall! 📏",
            "Bhubaneswar means 'Lord of the Universe' 🌟",
            "It's the capital of Odisha state 🏛️",
            "Home to famous Odissi dance form 💃",
            "Rasgulla was invented in Odisha! 🍮",
            "The city has ancient cave temples 🗿",
            "Modern planned city with IT hubs 💻"
        ];

        let currentFactIndex = 0;

        // Create particles
        function createParticles() {
            const particleContainer = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particleContainer.appendChild(particle);
            }
        }
        

        function startJourney() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }

        function updateCarPosition() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const heroHeight = windowHeight;
            
            // Only show car after hero section
            if (scrollY <= heroHeight * 0.8) {
                car.style.display = 'none';
                return;
            }
            
        car.style.display = 'block';
            
        const journeyScrollY = scrollY - heroHeight;
        const journeyHeight = journeyContainer.offsetHeight - windowHeight;
        const progress = Math.min(Math.max(journeyScrollY / journeyHeight, 0), 1);
            
        // Update progress bar
        progressFill.style.height = `${progress * 100}%`;
            
        // Calculate car position with enhanced curves
        const windowWidth = window.innerWidth;
        const centerX = windowWidth / 2;
        const amplitude = Math.min(windowWidth * 0.4, 400);
            
        // Enhanced curve system for more natural movement
        const totalCurves = 6;
        const curveProgress = progress * totalCurves;
        const currentCurve = Math.floor(curveProgress);
        const curvePosition = curveProgress - currentCurve;
            
        // Create different curve types for variety
            let xOffset;
            if (currentCurve % 3 === 0) {
                xOffset = Math.sin(curvePosition * Math.PI) * amplitude;
            } else if (currentCurve % 3 === 1) {
                xOffset = Math.cos(curvePosition * Math.PI) * amplitude * 0.8;
            } else {
                xOffset = Math.sin(curvePosition * Math.PI * 2) * amplitude * 0.6;
            }
            
            const carX = centerX + xOffset - 60;
            const carY = heroHeight + (journeyScrollY * 0.9);
            
            // Enhanced car rotation and direction
            const derivative = Math.cos(curvePosition * Math.PI) * totalCurves;
            const rotationAmount = Math.atan(derivative / 10) * (180 / Math.PI);
            
            let scaleX = 1;
            if (Math.abs(derivative) > 0.5) {
                scaleX = derivative > 0 ? 1 : -1;
            }
            
            // Smooth car movement with enhanced effects
            car.style.transform = `translate(${carX}px, ${carY}px) scaleX(${scaleX}) rotate(${rotationAmount * scaleX}deg)`;
            
            // Show/hide places with improved timing
            places.forEach((place, index) => {
                const placeTop = place.offsetTop;
                const placeHeight = place.offsetHeight;
                const placeCenter = placeTop + placeHeight / 2;
                const carCenter = carY + 30;
                
                const content = place.querySelector('.place-content');
                const distanceFromCar = Math.abs(carCenter - placeCenter);
                const triggerDistance = windowHeight * 0.5;
                
                if (distanceFromCar < triggerDistance) {
                    content.classList.add('visible');
                    
                    // Show fun facts when reaching certain places
                    if (index % 3 === 0 && !funFacts.classList.contains('show')) {
                        showFunFact();
                    }
                } else {
                    content.classList.remove('visible');
                }
            });
        }

        function showFunFact() {
            factText.textContent = facts[currentFactIndex];
            funFacts.classList.add('show');
            
            setTimeout(() => {
                funFacts.classList.remove('show');
                currentFactIndex = (currentFactIndex + 1) % facts.length;
            }, 4000);
        }

        // Optimized scroll handling
        let ticking = false;
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateCarPosition();
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });

        // Enhanced hover effects
        places.forEach((place, index) => {
            const image = place.querySelector('.place-image');
            const content = place.querySelector('.place-content');
            const title = place.querySelector('.place-title');
            
            place.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.08) rotate(3deg)';
                content.style.transform = 'translateY(-8px) scale(1.02)';
                title.style.textShadow = '0 0 30px rgba(255,255,255,0.8), 3px 3px 8px rgba(0,0,0,0.6)';
            });
            
            place.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) rotate(0deg)';
                content.style.transform = 'translateY(0) scale(1)';
                title.style.textShadow = '3px 3px 8px rgba(0,0,0,0.6)';
            });
        });

        // Enhanced car speed effects
        let scrollTimeout;
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            const carBody = car.querySelector('.car-body');
            const wheels = car.querySelectorAll('.wheel');
            
            if (!isScrolling) {
                isScrolling = true;
                carBody.style.animation = 'carBounce 0.4s ease-in-out infinite';
                wheels.forEach(wheel => {
                    wheel.style.animation = 'wheelSpin 0.2s linear infinite';
                });
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                carBody.style.animation = 'carBounce 2s ease-in-out infinite';
                wheels.forEach(wheel => {
                    wheel.style.animation = 'wheelSpin 0.8s linear infinite';
                });
            }, 150);
        }, { passive: true });

        // Initialize everything
        window.addEventListener('load', () => {
            createParticles();
            updateCarPosition();
            
            // Show first fun fact after a delay
            setTimeout(() => {
                showFunFact();
            }, 3000);
        });

        // Add scroll-to-top functionality
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Add touch support for mobile
        let touchStartY = 0;
        let touchEndY = 0;

        window.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        window.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe up - continue scrolling down
                    window.scrollBy({ top: window.innerHeight * 0.3, behavior: 'smooth' });
                } else {
                    // Swipe down - scroll up
                    window.scrollBy({ top: -window.innerHeight * 0.3, behavior: 'smooth' });
                }
            }
        }

        // Add intersection observer for better performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observe all place content for smoother animations
        document.querySelectorAll('.place-content').forEach(content => {
            observer.observe(content);
        });