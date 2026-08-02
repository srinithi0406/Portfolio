gsap.registerPlugin(ScrollTrigger);

//Hero Section Animation 
function heroEntranceAnimation() {
    gsap.from(".logo, .nav-link", { 
        y: -50, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out" 
    });

    gsap.from("#avatar", {
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)", 
        delay: 0.5
    });

    gsap.from(".hero-text", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
    });

    gsap.from(".intro-text", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.2
    });
}

window.addEventListener('load', heroEntranceAnimation);

//Timeline Scroll Animations 
gsap.from(".timeline::before", {
    height: 0,
    duration: 2,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%", 
        end: "bottom 20%",
        scrub: true 
    }
});


// Animate timeline items
gsap.utils.toArray(".timeline-item").forEach(item => {
    const xDirection = item.classList.contains("timeline-item:nth-child(odd)") ? -100 : 100;
    
    gsap.from(item.querySelector(".timeline-content"), {
        x: xDirection, 
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: item,
            start: "top 85%", 
            toggleActions: "play none none reverse" 
        }
    });

    gsap.from(item.querySelector(".timeline-dot"), {
        scale: 0,
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});


// Project Card Scroll Animation 
gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%", 
            toggleActions: "play none none reverse" 
        }
    });
});


// Function to create and manage a single sparkle element
function createSparkle(x, y) {
    const container = document.getElementById('sparkle-container');
    
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    container.appendChild(sparkle);
    
    sparkle.style.left = (x - 3 + (Math.random() * 8 - 4)) + 'px'; 
    sparkle.style.top = (y - 3 + (Math.random() * 8 - 4)) + 'px'; 

 
    setTimeout(() => {
        sparkle.classList.add('sparkle-fade');
    }, 10); 

    const transitionDuration = 600; 
    
    setTimeout(() => {
        sparkle.remove();
    }, transitionDuration + 50); 
}

// Event Listener to trigger spark creation on mouse movement
document.addEventListener('mousemove', (e) => {
   
    if (Math.random() < 0.2) { 
        createSparkle(e.clientX, e.clientY);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-links-container');

    menuToggle.addEventListener('click', () => {
        navContainer.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('open');
        });
    });

    // Experience Carousel Logic
    const expCarousel = document.querySelector('.experience-grid');
    const expPrevBtn = document.querySelector('#experience-carousel-container .prev');
    const expNextBtn = document.querySelector('#experience-carousel-container .next');

    if (expCarousel && expPrevBtn && expNextBtn) {
        expPrevBtn.addEventListener('click', () => {
            const cardWidth = expCarousel.querySelector('.experience-card').offsetWidth;
            expCarousel.scrollBy({ left: -(cardWidth + 30), behavior: 'smooth' });
        });

        expNextBtn.addEventListener('click', () => {
            const cardWidth = expCarousel.querySelector('.experience-card').offsetWidth;
            expCarousel.scrollBy({ left: cardWidth + 30, behavior: 'smooth' });
        });
    }
});

// Space Background Animation
const canvas = document.getElementById('space-background');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    const numStars = 1000;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() {
            this.x = (Math.random() - 0.5) * width * 2;
            this.y = (Math.random() - 0.5) * height * 2;
            this.z = Math.random() * width + 100;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        update() {
            this.z -= 3; // Z speed
            if (this.z <= 0) {
                this.x = (Math.random() - 0.5) * width * 2;
                this.y = (Math.random() - 0.5) * height * 2;
                this.z = width;
            }
        }

        draw() {
            let x = (this.x / this.z) * width + width / 2;
            let y = (this.y / this.z) * width + height / 2;
            let size = Math.min(this.radius * (width / this.z) * 0.5, 3.5);
            let opacity = 1 - (this.z / width);

            // only draw if within screen
            if (x >= 0 && x <= width && y >= 0 && y <= height && this.z > 0) {
                ctx.beginPath();
                ctx.arc(x, y, Math.max(0, size), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(224, 231, 255, ${opacity})`; // Match text-light color
                ctx.fill();
            }
        }
    }

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    // Interactive mouse tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX - width / 2) * 0.05;
        targetMouseY = (e.clientY - height / 2) * 0.05;
    });

    function animate() {
        // Smooth mouse interpolation
        mouseX += (targetMouseX - mouseX) * 0.1;
        mouseY += (targetMouseY - mouseY) * 0.1;

        // Clear with slight transparency for a subtle trailing effect (nebula feel)
        ctx.fillStyle = 'rgba(2, 1, 10, 0.3)'; // Match dark base color
        ctx.fillRect(0, 0, width, height);

        // Optional subtle nebula gradient overlay
        let gradient = ctx.createRadialGradient(width/2 - mouseX*10, height/2 - mouseY*10, 0, width/2, height/2, width);
        gradient.addColorStop(0, 'rgba(36, 176, 158, 0.02)');
        gradient.addColorStop(1, 'rgba(9, 11, 26, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        stars.forEach(star => {
            // Slight pan based on mouse
            star.x -= mouseX * 0.2;
            star.y -= mouseY * 0.2;
            
            star.update();
            star.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();
}