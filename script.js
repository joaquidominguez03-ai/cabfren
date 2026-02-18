// Año actual en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú hamburguesa
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', function() {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // Cerrar menú móvil
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Scroll suave
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(e) {
  if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Scroll suave para botones del hero
document.querySelectorAll('.hero-buttons a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// IntersectionObserver para animaciones al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observar tarjetas de servicios
document.querySelectorAll('.servicio-card').forEach(card => {
  observer.observe(card);
});

// Observar elementos de checklist
document.querySelectorAll('.checklist li').forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(item);
});

// Botones de WhatsApp en servicios
document.querySelectorAll('.btn-whatsapp').forEach(button => {
  button.addEventListener('click', function() {
    const servicio = this.getAttribute('data-servicio');
    const mensaje = encodeURIComponent(`Hola me interesa el servicio de ${servicio}`);
    const url = `https://wa.me/59899681278?text=${mensaje}`;
    window.open(url, '_blank');
  });
});

// ========================================
// OCULTAR HEADER AL SCROLLEAR HACIA ABAJO
// ========================================
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Si scrollea hacia abajo y pasó 100px, ocultar header
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add('hidden');
    // CERRAR EL MENÚ HAMBURGUESA si está abierto
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  } else {
    // Si scrollea hacia arriba, mostrar header
    header.classList.remove('hidden');
  }
  
  lastScroll = currentScroll;
});