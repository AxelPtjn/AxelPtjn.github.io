import './style.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@iconify/iconify';

// Initialisation des effets de scroll
AOS.init({
  duration: 1000,
  once: false,
});

const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // On détecte si la section occupe le milieu de l'écran
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active-link');
    }
  });
});

const colorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const color = entry.target.getAttribute('data-color');
      if (color) {
        document.body.style.backgroundColor = color;
      }
    }
  });
}, { threshold: 0.2 }); // Se déclenche quand 20% de la zone est visible

// L'observer utilise la liste "sections" qui contient maintenant aussi le footer
sections.forEach(sec => colorObserver.observe(sec));