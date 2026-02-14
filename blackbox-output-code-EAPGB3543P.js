document.addEventListener('DOMContentLoaded', () => {
    // GSAP Timeline for smooth transitions
    const tl = gsap.timeline();

    // Elements
    const hero = document.getElementById('hero');
    const message = document.getElementById('message');
    const timelineSec = document.getElementById('timeline');
    const gallery = document.getElementById('gallery');
    const reasons = document.getElementById('reasons');
    const countdownSec = document.getElementById('countdown');
    const final = document.getElementById('final');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const music = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // No Button Dodge
    const sarcasticTexts = ["Are you sure?", "Think again 👀", "Nice try 😜", "Not today!", "Try harder 💔"];
    let textIndex = 0;
    noBtn.addEventListener('mouseenter', () => {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        gsap.to(noBtn, { x: x - noBtn.offsetLeft, y: y - noBtn.offsetTop, scale: 0.8, rotation: 10, duration: 0.5 });
        noBtn.textContent = sarcasticTexts[textIndex % sarcasticTexts.length] + " 💔";
        textIndex++;
    });

    // Yes Button Click
    yesBtn.addEventListener('click', () => {
        // Celebration
        confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
        gsap.to(hero, { opacity: 0, duration: 1, onComplete: () => {
            hero.classList.add('hidden');
            message.classList.remove('hidden');
            tl.from(message, { y: 50, opacity: 0, duration: 1 });
            music.play();
        }});
    });

    // Section Transitions (Simulated scroll or button-based; add scroll triggers if needed)
    // For simplicity, auto-transition after Yes; in real use, add scroll events
    setTimeout(() => {
        message.classList.add('hidden');
        timelineSec.classList.remove('hidden');
        tl.from(timelineSec, { x: -100, opacity: 0, duration: 1 });
    }, 3000); // Adjust timings

    setTimeout(() => {
        timelineSec.classList.add('hidden');
        gallery.classList.remove('hidden');
        tl.from(gallery, { scale: 0.8, opacity: 0, duration: 1 });
    }, 6000);

    setTimeout(() => {
        gallery.classList.add('hidden');
        reasons.classList.remove('hidden');
        tl.from(reasons, { y: 50, opacity: 0, duration: 1 });
    }, 9000);

    setTimeout(() => {
        reasons.classList.add('hidden');
        countdownSec.classList.remove('hidden');
        tl.from(countdownSec, { scale: 0.8, opacity: 0, duration: 1 });
        startCountdown();
    }, 12000);

    setTimeout(() => {
        countdownSec.classList.add('hidden');
        final.classList.remove('hidden');
        tl.from(final, { y: 50, opacity: 0, duration: 1 });
    }, 15000);

    // Slider Controls
    document.getElementById('next-slide').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    });
    document.getElementById('prev-slide').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    });

    // Countdown
    function startCountdown() {
        const valentineDate = new Date('2024-02-14T00:00:00'); // Adjust year
        setInterval(() => {
            const now = new Date();
            const diff = valentineDate - now;
            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 *