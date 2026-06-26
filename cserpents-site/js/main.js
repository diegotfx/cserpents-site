function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var answer = this.nextElementSibling;
      var isOpen = answer.classList.contains('open');
      document.querySelectorAll('.faq-a').forEach(function(a){ a.classList.remove('open'); });
      document.querySelectorAll('.faq-q').forEach(function(q){ q.classList.remove('open'); });
      if (!isOpen) { answer.classList.add('open'); this.classList.add('open'); }
    });
  });

  // Product filters
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      var filter = this.getAttribute('data-filter');
      document.querySelectorAll('.product-card[data-category]').forEach(function(card) {
        card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? '' : 'none';
      });
    });
  });

  // Contact form
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent!';
      btn.style.background = '#5a9a00';
      btn.disabled = true;
      setTimeout(function() {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

});
