
        // Custom Cursor
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        // Smooth cursor tracking
        document.addEventListener("mousemove", e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            follower.style.transform = `translate(${followerX}px, ${followerY}px)`;

            requestAnimationFrame(animate);
        }
        animate();

        // Hide welcome screen after animation
        setTimeout(() => {
            document.getElementById('welcomeScreen').classList.add('hidden');
        }, 3800);

        // Typing animation
        const typingText = document.getElementById('typingText');
        const phrases = [
            'Full Stack Developer',
            'UI/UX Enthusiast',
            'Problem Solver',
            'Creative Thinker'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            typingText.innerHTML += '<span class="cursor"></span>';

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 4000);

        // Floating particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }

        // Code rain effect
        const codeRain = document.getElementById('codeRain');
        const codeChars = '01</>{}[];()=+*&^%$#@!';
        for (let i = 0; i < 30; i++) {
            const span = document.createElement('span');
            span.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
            span.style.left = Math.random() * 100 + '%';
            span.style.animationDelay = Math.random() * 5 + 's';
            span.style.animationDuration = (Math.random() * 5 + 5) + 's';
            codeRain.appendChild(span);
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active nav item on scroll
        const sections = document.querySelectorAll('.section, .hero');
        const navItems = document.querySelectorAll('.nav-item');

        window.addEventListener('scroll', () => {
            let current = 'home';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === current) {
                    item.classList.add('active');
                }
            });

            // Parallax effect on sections
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                if (section.classList.contains('section')) {
                    const parallaxBg = section.querySelector('::before');
                    if (scrollPercent > 0 && scrollPercent < 1) {
                        section.style.setProperty('--scroll', scrollPercent);
                    }
                }
            });
        });

        // Scroll animations for sections
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Contact form submission
        // Removed - no backend needed

        // Scroll to section function
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Theme toggle (bonus feature)
        const themeToggle = document.getElementById('themeToggle');
        let isDark = true;

        themeToggle.addEventListener('click', () => {
            isDark = !isDark;

            if (isDark) {
                themeToggle.textContent = '🌙';
                document.body.style.background = '#0a0a0a';
            } else {
                themeToggle.textContent = '☀️';
                document.body.style.background = '#f5f5f5';
                document.body.style.color = '#1a1a1a';
            }
        });

        // Ripple effect on buttons
        document.querySelectorAll('.cta-button, .project-link, .contact-item').forEach(button => {
            button.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = '0px';
                ripple.style.height = '0px';

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Project cards click animation
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function () {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });

            // Magnetic effect
            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                this.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });

        // Skills cards interaction
        document.querySelectorAll('.skill-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;

            card.addEventListener('click', function () {
                const skillName = this.querySelector('h3').textContent;
                console.log(`Clicked on ${skillName}`);
            });
        });

        // Animate skill progress bars when visible
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const progress = card.querySelector('.skill-progress');
                    const level = card.getAttribute('data-skill');
                    setTimeout(() => {
                        progress.style.width = level + '%';
                    }, 200);
                    skillObserver.unobserve(card);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-card').forEach(card => {
            skillObserver.observe(card);
        });

        // Animate stats counter
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    const finalNumber = parseInt(statNumber.textContent);
                    let currentNumber = 0;
                    const increment = finalNumber / 50;
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= finalNumber) {
                            statNumber.textContent = finalNumber + '+';
                            clearInterval(timer);
                        } else {
                            statNumber.textContent = Math.floor(currentNumber) + '+';
                        }
                    }, 30);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-card').forEach(card => {
            statsObserver.observe(card);
        });

        // Text reveal animation for section titles
        document.querySelectorAll('.section-title').forEach(title => {
            const text = title.textContent;
            title.textContent = '';
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${index * 0.05}s`;
                title.appendChild(span);
            });
        });

        // Tooltip for project links
        const tooltip = document.getElementById('tooltip');
        document.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('mouseenter', function (e) {
                const text = this.textContent;
                tooltip.textContent = `Open ${text}`;
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top = (e.clientY - 40) + 'px';
                tooltip.classList.add('show');
            });

            link.addEventListener('mousemove', function (e) {
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top = (e.clientY - 40) + 'px';
            });

            link.addEventListener('mouseleave', function () {
                tooltip.classList.remove('show');
            });
        });

        // Mouse parallax effect on hero
        const hero = document.querySelector('.hero');
        hero.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

            document.querySelectorAll('.floating-icon').forEach((icon, index) => {
                const speed = (index + 1) * 0.5;
                icon.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });

            document.querySelectorAll('.orb').forEach((orb, index) => {
                const speed = (index + 1) * 0.3;
                orb.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        });
    