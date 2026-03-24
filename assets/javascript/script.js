// GRAFICO
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.timeline-container');
  const svg = document.getElementById('timelineSvg');
  const dots = document.querySelectorAll('.dot');

  function drawLines() {
    if (!svg || !container || dots.length === 0) return;
    
    svg.innerHTML = '';
    const { left: cLeft, top: cTop } = container.getBoundingClientRect();

    for (let i = 0; i < dots.length - 1; i++) {
      const start = dots[i].getBoundingClientRect();
      const end = dots[i+1].getBoundingClientRect();

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      
      line.setAttribute('x1', start.left + start.width / 2 - cLeft);
      line.setAttribute('y1', start.top + start.height / 2 - cTop);
      line.setAttribute('x2', end.left + end.width / 2 - cLeft);
      line.setAttribute('y2', end.top + end.height / 2 - cTop);
      
      svg.appendChild(line);
    }
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation(); 
      const isOpen = dot.classList.contains('is-open');

      dots.forEach(d => d.classList.remove('is-open'));
      container.classList.remove('is-active');

      if (!isOpen) {
        dot.classList.add('is-open');
        container.classList.add('is-active'); 
      }
    });
  });

  document.addEventListener('click', () => {
    dots.forEach(d => d.classList.remove('is-open'));
    if (container) container.classList.remove('is-active');
  });

  window.addEventListener('resize', drawLines);
  
  setTimeout(drawLines, 500);
});






// HAMBURGER
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
});






// EMAILJS
(function() {
    emailjs.init("5YJjmC-eudVzMunqS");
})();

window.onload = function() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('button-send');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        btn.innerText = 'Invio in corso...';
        btn.disabled = true;

        emailjs.sendForm('service_ckut7dz', 'template_ruhbq9o', this)
            .then(function() {
                alert('Grazie Laura! Il messaggio è stato inviato correttamente.');
                btn.innerText = 'Invia messaggio';
                btn.disabled = false;
                form.reset(); 
            }, function(error) {
                alert('Errore nell\'invio: ' + JSON.stringify(error));
                btn.innerText = 'Riprova';
                btn.disabled = false;
            });
    });
}