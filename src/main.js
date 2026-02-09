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

const translations = {
  fr: {
    "nav-home": "Accueil",
    "nav-experience": "Expériences",
    "nav-projects": "Projets",
    "nav-education": "Education",
    "nav-tech": "Technos",
    "nav-contact": "Contact",
    "hero-location": "📍 Actuellement à Montréal, Canada",
    "hero-subtitle": "Étudiant en 4ème année à ",
    "hero-subtitle2": "Epitech Lyon",
    "hero-subtitle3": ", spécialisation Business Management à",
    "hero-subtitle4": " McGill Montréal",
    "hero-description": "Passionné par le code, l'IA et l'analyse de données.",
    "hero-btn": "Découvrir mon profil",
    "exp-title": "Expériences",
    "exp-date-rt1": "Mars - Juillet 2025",
    "exp-desc-rt1": "Recherche du client unique dans les base de données, à partir de critères business, et création d'un script pour automatiser le processus.",
    "exp-date-rt2": "Septembre - Décembre 2024",
    "exp-desc-rt2": "Création de pages web optimisées SEO pour les véhicules, et amélioration continue du site.",
    "proj-title": "Projets",
    "edu-title": "Éducation",
    "contact-title": "On travaille ensemble ?",
    "internship-title-rt1": "Stage Marketing Digital",
    "internship-title-rt2": "Stage Data / IA",
    "exp-date-epitech": "Depuis Spetembre 2022",
  },
  en: {
    "nav-home": "Home",
    "nav-experience": "Experiences",
    "nav-projects": "Projects",
    "nav-education": "Education",
    "nav-tech": "Stack",
    "nav-contact": "Contact",
    "hero-location": "📍 Currently in Montreal, Canada",
    "hero-subtitle": "4th year student at ",
    "hero-subtitle2": "Epitech Lyon",
    "hero-subtitle3": ", specializing in Business Management at",
    "hero-subtitle4": " McGill Montreal",
    "hero-description": "Passionate about coding, AI, and data analysis.",
    "hero-btn": "View my profile",
    "exp-title": "Experiences",
    "exp-date-rt1": "March - July 2025",
    "exp-desc-rt1": "Customer data matching based on business criteria and script creation for process automation.",
    "exp-date-rt2": "September - December 2024",
    "exp-desc-rt2": "Creation of SEO-optimized web pages for vehicles and continuous website improvement.",
    "proj-title": "Projects",
    "edu-title": "Education",
    "contact-title": "Let's work together!",
    "internship-title-rt1": "Digital Marketing Internship",
    "internship-title-rt2": "Data / AI Internship",
    "exp-date-epitech": "Since September 2022",
  }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function updateText() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    // On vérifie si la clé existe pour éviter le "undefined"
    if (translations[currentLang][key]) {
      el.innerText = translations[currentLang][key];
    }
  });
  document.getElementById('lang-text').innerText = currentLang;
}

document.getElementById('lang-switch').addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  localStorage.setItem('lang', currentLang);
  updateText();
});

updateText();