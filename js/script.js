document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. RESPONSIVE SLIDER LOGIC
     ========================================================================== */
  const slider = document.getElementById("slider");
  
  const updateSliderSpeed = () => {
    if (slider) {
      // Calculate width based on current screen rendering
      const width = slider.scrollWidth / 2; 
      // Adjusting speed: higher divisor = faster, lower = slower
      const seconds = width / 45; 
      slider.style.animationDuration = seconds + "s";
    }
  };

  // Run on load
  updateSliderSpeed();
  
  // Re-run if window is resized (crucial for responsiveness)
  window.addEventListener('resize', updateSliderSpeed);

  /* ==========================================================================
     2. NAVIGATION & MOBILE MENU
     ========================================================================== */
  const menuToggle = document.querySelector('#mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('is-active');
    });

    // Close menu when a link is clicked (useful for one-page navigation)
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
      });
    });
  }

  /* ==========================================================================
     3. UI ENHANCEMENTS (Scroll, Counters, Modals)
     ========================================================================== */
  
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Navbar shadow on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.boxShadow = "0 4px 25px rgba(0,0,0,0.2)";
      } else {
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
      }
    }
  });

  // Animated counters in hero (with IntersectionObserver)
  const counters = document.querySelectorAll(".stat-num");
  const heroStats = document.querySelector(".hero-stats");

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      let current = 0;
      const increment = Math.max(1, Math.floor(target / 100)); // Adjusted for smoother mobile performance

      const step = () => {
        current += increment;
        if (current < target) {
          counter.textContent = current;
          requestAnimationFrame(step);
        } else {
          counter.textContent = target;
        }
      };
      step();
    });
  };

  if (heroStats && counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(heroStats);
  }

  /* ==========================================================================
     4. FORMS & MODALS
     ========================================================================== */
  
  const modal = document.getElementById("donateModal");
  const closeBtn = document.querySelector(".close");
  const amountInput = document.getElementById("customAmount");

  // Open modal and set amount
  document.querySelectorAll(".btn-donate[data-amount]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const amount = e.currentTarget.getAttribute("data-amount");
      if (amountInput) amountInput.value = amount;
      if (modal) modal.style.display = "flex";
    });
  });

  // Close modal
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  // Donation dummy submit
  const donationForm = document.querySelector(".donation-form");
  if (donationForm && modal) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your generous donation!");
      modal.style.display = "none";
    });
  }

  // Contact form validation
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const name = contactForm.elements["name"].value.trim();
      const email = contactForm.elements["email"].value.trim();
      const message = contactForm.elements["message"].value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        alert("Please fill all fields before sending.");
      }
    });
  }

  // Success message handler
  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "1") {
    alert("Your message has been sent successfully. Thank you!");
  }
});


