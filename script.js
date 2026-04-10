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
});