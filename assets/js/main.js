// ==========================================================================
// ANDROGEN — THE FITNESS STUDIO Interactive Controller
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Athletic Typewriter
  const twElement = document.getElementById('heroTypewriter');
  if (twElement) {
    const phrases = [
      'Heavy Olympic Powerlifting',
      'Hypertrophy & Strength Protocols',
      'Precision Biomechanical Machines',
      'Metabolic Conditioning & Turf',
      '1-on-1 Personal Transformations'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        twElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        twElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 35 : 75;

      if (!isDeleting && charIndex === current.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // 3. Interactive Workout Split & Goal Estimator
  const fitGoal = document.getElementById('fitGoal');
  const fitDays = document.getElementById('fitDays');
  const fitSplit = document.getElementById('fitSplit');
  const fitCoaching = document.getElementById('fitCoaching');
  const fitWaBtn = document.getElementById('fitWaBtn');

  function updateFitnessPlan() {
    if (!fitGoal || !fitDays) return;
    const goalVal = fitGoal.value;
    const daysVal = fitDays.value;

    let splitName = 'Push / Pull / Legs (PPL)';
    let coachRec = 'Certified Strength Coach Included';

    if (daysVal === '3 Days / Week') {
      splitName = 'Full Body Compound Frequency';
    } else if (daysVal === '4 Days / Week') {
      splitName = 'Upper / Lower Hypertrophy Split';
    } else if (daysVal === '5 Days / Week') {
      splitName = 'Upper / Lower + Push / Pull / Legs';
    } else if (daysVal === '6 Days / Week') {
      splitName = 'Classic PPL 2x Frequency Periodization';
    }

    if (goalVal.includes('Fat Loss')) {
      coachRec = 'Caloric Deficit + HIIT Sprint Intervals';
    } else if (goalVal.includes('Strength')) {
      coachRec = 'RPE-Based Compound Progressive Overload';
    }

    if (fitSplit) fitSplit.textContent = splitName;
    if (fitCoaching) fitCoaching.textContent = coachRec;

    if (fitWaBtn) {
      const msg = `Hello Androgen Studio! I want to achieve ${goalVal} training ${daysVal}. Recommended split: ${splitName}. I would like to book a 1-day complimentary guest trial pass.`;
      fitWaBtn.href = `https://wa.me/919007277594?text=${encodeURIComponent(msg)}`;
    }
  }

  if (fitGoal && fitDays) {
    fitGoal.addEventListener('change', updateFitnessPlan);
    fitDays.addEventListener('change', updateFitnessPlan);
    updateFitnessPlan();
  }

  // 4. Hero Video Play/Pause
  const heroVid = document.getElementById('heroVideo');
  const vidToggle = document.getElementById('vidToggle');
  if (heroVid && vidToggle) {
    vidToggle.addEventListener('click', () => {
      if (heroVid.paused) {
        heroVid.play();
        vidToggle.innerHTML = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      } else {
        heroVid.pause();
        vidToggle.innerHTML = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      }
    });
  }

  // 5. Scroll Animations
  const revealElements = document.querySelectorAll('.bento-card, .review-card, .estimator-card, .section-header');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
