import './style.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@iconify/iconify';

// Initialisation des effets de scroll
AOS.init({
  duration: 1000,
  once: false,
});

const sections = document.querySelectorAll('section');
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