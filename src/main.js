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
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalBody = document.getElementById('modal-body');
const backdrop = document.getElementById('modal-backdrop');
const closeBtn = document.getElementById('close-modal');
const projectCards = document.querySelectorAll('.project-card');

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

function openModal(card) {
  const data = card.dataset;
  
  // Injection du contenu HTML dans la modale
  modalBody.innerHTML = `
    <div class="flex items-center gap-4 mb-6">
      <span class="iconify text-5xl ${data.color}" data-icon="${data.icon}"></span>
      <h3 class="text-4xl font-bold text-white">${data.title}</h3>
    </div>
    <div class="flex flex-wrap gap-2 mb-6">
      ${data.tags.split(',').map(tag => `<span class="text-[10px] font-bold uppercase tracking-widest text-blue-400 border border-blue-500/20 px-2 py-1 rounded-md">${tag.trim()}</span>`).join('')}
    </div>
    <div class="prose prose-invert">
      <p class="text-slate-300 text-lg leading-relaxed mb-8">${data.full}</p>
    </div>
    <div class="pt-8 border-t border-slate-800 flex justify-between items-center">
      <a href="${data.github}" target="_blank" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-all font-bold shadow-lg shadow-blue-500/20">
        <span class="iconify text-xl" data-icon="lucide:github"></span>
        Voir le dépôt GitHub
      </a>
    </div>
  `;

  // Animation : on affiche la modale et on fait "grossir" le contenu vers nous
  document.body.classList.add('modal-open');
  modal.classList.remove('opacity-0', 'pointer-events-none');
  setTimeout(() => {
    modalContent.classList.remove('scale-90');
    modalContent.classList.add('scale-100');
  }, 10);
}

function closeModal() {
  modalContent.classList.remove('scale-100');
  modalContent.classList.add('scale-90'); // Effet de recul
  modal.classList.add('opacity-0', 'pointer-events-none');
  
  setTimeout(() => {
    document.body.classList.remove('modal-open');
  }, 300);
}

// Écouteurs d'événements
projectCards.forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

// Fermer avec la touche Echap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
    closeModal();
  }
});