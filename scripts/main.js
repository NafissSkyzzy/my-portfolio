document.addEventListener('DOMContentLoaded', () => {
  // Toggle & nav
  const burger = document.querySelector(".burger");
  const navLists = document.querySelector("nav");
  burger?.addEventListener("click", () => {
    navLists.classList.toggle("nav-active");
    burger.classList.toggle("toggle-burger");
    burger.classList.toggle("active");
  });

  // Theme toggle
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = document.getElementById('toggle-icon');

// === Set default theme ke light saat pertama load ===
window.addEventListener("DOMContentLoaded", () => {
  body.classList.add("light-mode");   // default light
  icon.src = "moon.svg";              // karena awalnya light -> tombol jadi moon
  icon.alt = "Light Mode";
});

toggleButton?.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    icon.src = 'moon.svg';
    icon.alt = 'Light Mode';
  } else {
    icon.src = 'sun.svg';
    icon.alt = 'Dark Mode';
  }
  icon.style.transition = 'transform 0.3s ease';
  icon.style.transform = 'rotate(180deg)';
  setTimeout(() => { icon.style.transform = 'rotate(0deg)'; }, 300);
});


  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - revealPoint) {
        el.classList.add('active');
      } else {
        // kalau mau tetap muncul setelah pertama kali, hapus baris di bawah
        el.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); // panggil sekali setelah DOM siap
});

// Certificates slider
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const items = document.querySelectorAll('.certificate-item');

if (track && prevBtn && nextBtn && items.length > 0) {
  let itemsPerSlide = window.innerWidth <= 768 ? 1 : 3; // mobile = 1, desktop = 3
  let index = 0;

  // fungsi ambil width terbaru tiap kali dipakai
  function getItemWidth() {
    return items[0].offsetWidth;
  }

  function updateSlider() {
    const itemWidth = getItemWidth();
    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  // Next button
  nextBtn.addEventListener('click', () => {
    if (index < items.length - itemsPerSlide) {
      index += itemsPerSlide;
      updateSlider();
    }
  });

  // Prev button
  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index -= itemsPerSlide;
      updateSlider();
    }
  });

  // Update ulang saat resize
  window.addEventListener('resize', () => {
    itemsPerSlide = window.innerWidth <= 768 ? 1 : 3;
    index = 0; // reset biar aman
    updateSlider();
  });

  // === Swipe gesture untuk mobile ===
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = "none"; // matiin transition pas drag
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    let diff = currentX - startX;
    const itemWidth = getItemWidth();

    // geser realtime sesuai drag jari
    track.style.transform = `translateX(${-index * itemWidth + diff}px)`;
  });

  track.addEventListener("touchend", (e) => {
    isDragging = false;
    track.style.transition = "transform 0.3s ease";

    let diff = startX - e.changedTouches[0].clientX;
    const itemWidth = getItemWidth();

    if (Math.abs(diff) > 50) {
      if (diff > 0 && index < items.length - itemsPerSlide) {
        index += itemsPerSlide; // swipe kiri -> next
      } else if (diff < 0 && index > 0) {
        index -= itemsPerSlide; // swipe kanan -> prev
      }
    }
    updateSlider();
  });
}

// Scroll Up button
const scrollUpBtn = document.getElementById('scroll-up');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
});

scrollUpBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
