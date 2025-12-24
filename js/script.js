document.addEventListener("DOMContentLoaded", () => {
  // Slider speed based on content width
  const slider = document.getElementById("slider");
  if (slider) {
    const width = slider.scrollWidth / 2; // one set width
    const seconds = width / 45; // adjust 45 for speed
    slider.style.animationDuration = seconds + "s";
  }

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

  // Navbar style on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.boxShadow = "0 4px 25px rgba(0,0,0,0.2)";
    } else {
      navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
    }
  });

  // Animated counters in hero
  const counters = document.querySelectorAll(".stat-num");
  const heroStats = document.querySelector(".hero-stats");

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      let current = 0;
      const increment = Math.max(1, Math.floor(target / 200));

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

  if (heroStats) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(heroStats);
  }

  // Donation modal
  const modal = document.getElementById("donateModal");
  const closeBtn = document.querySelector(".close");
  const amountInput = document.getElementById("customAmount");

  document.querySelectorAll(".btn-donate[data-amount]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const amount = e.currentTarget.getAttribute("data-amount");
      if (amountInput) {
        amountInput.value = amount;
      }
      if (modal) {
        modal.style.display = "flex";
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // Donation form submit (dummy)
  const donationForm = document.querySelector(".donation-form");
  if (donationForm && modal) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Thank you for your generous donation! Payment gateway integration will go here."
      );
      modal.style.display = "none";
    });
  }

// Contact form: basic validation, let FormSubmit handle email
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const name = contactForm.elements["name"].value.trim();
    const email = contactForm.elements["email"].value.trim();
    const message = contactForm.elements["message"].value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert("Please fill all fields before sending.");
      return;
    }
    // if valid -> do NOT preventDefault; form submits to FormSubmit
  });
}

// Show popup when redirected back with ?success=1
const params = new URLSearchParams(window.location.search);
if (params.get("success") === "1") {
  alert("Your message has been sent successfully. Thank you!");
}


});
