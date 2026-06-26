// Mobile menu
function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// Order form toggle
function toggleOrder(id) {
  var form = document.getElementById(id);
  if (!form) return;
  var isOpen = form.classList.contains('open');
  document.querySelectorAll('.order-form').forEach(function(f){ f.classList.remove('open'); });
  document.querySelectorAll('.product-order-link').forEach(function(b){ b.textContent = '+ Order this rack'; });
  if (!isOpen) {
    form.classList.add('open');
    var btn = form.previousElementSibling;
    if (btn) btn.textContent = '− Close';
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

document.addEventListener('DOMContentLoaded', function() {

  // ── SCROLL ANIMATIONS ──
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(function(el) { observer.observe(el); });

  // ── FAQ ──
  document.querySelectorAll('.faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var answer = this.nextElementSibling;
      var isOpen = answer.classList.contains('open');
      document.querySelectorAll('.faq-a').forEach(function(a){ a.classList.remove('open'); });
      document.querySelectorAll('.faq-q').forEach(function(q){ q.classList.remove('open'); });
      if (!isOpen) { answer.classList.add('open'); this.classList.add('open'); }
    });
  });

  // ── FILTERS ──
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

  // ── ORDER FORMS ──
  document.querySelectorAll('.order-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      btn.textContent = '✓ Request Sent!';
      btn.style.background = '#4a8a00';
      btn.disabled = true;
      setTimeout(function() {
        btn.textContent = 'Send Order Request';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
        form.classList.remove('open');
      }, 3000);
    });
  });

  // ── CONTACT FORM ──
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#4a8a00';
      btn.disabled = true;
      setTimeout(function() {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // Active nav
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function(a) {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

});

var s = document.createElement('style');
s.textContent = '@keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }';
document.head.appendChild(s);
