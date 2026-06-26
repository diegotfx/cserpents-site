const HEADER = `
<div class="announcement-bar">
  Orders ship within approximately 3 weeks. We appreciate your patience — great things take time.
</div>
<header class="site-header">
  <div class="container header-inner">
    <a href="index.html" class="logo">
      <img src="images/logo.png" alt="C Serpents" height="52">
    </a>
    <nav class="main-nav">
      <a href="rack-systems.html">Rack Systems</a>
      <a href="incubators.html">Incubators</a>
      <a href="accessories.html">Accessories</a>
      <a href="shows.html">Shows</a>
      <a href="faq.html">FAQ</a>
      <a href="contact.html">Contact</a>
    </nav>
    <button class="menu-toggle" onclick="toggleMenu()">☰</button>
  </div>
  <nav class="mobile-nav" id="mobileNav">
    <a href="rack-systems.html">Rack Systems</a>
    <a href="incubators.html">Incubators</a>
    <a href="accessories.html">Accessories</a>
    <a href="shows.html">Shows</a>
    <a href="faq.html">FAQ</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>`;

const FOOTER = `
<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <img src="images/logo.png" alt="C Serpents" height="56">
      <span class="footer-tagline">Part of the Cycle</span>
      <p>Thank you for visiting C Serpents. Questions? Don't hesitate to reach out.</p>
    </div>
    <div class="footer-links">
      <h4>Shop</h4>
      <a href="rack-systems.html">Rack Systems</a>
      <a href="incubators.html">Incubators</a>
      <a href="accessories.html">Accessories</a>
    </div>
    <div class="footer-links">
      <h4>Company</h4>
      <a href="about.html">About Us</a>
      <a href="shows.html">Shows</a>
      <a href="faq.html">FAQ</a>
      <a href="contact.html">Contact</a>
    </div>
    <div class="footer-contact">
      <h4>Get in Touch</h4>
      <p>📧 chris@cserpents.com</p>
      <p>📞 954-605-1385</p>
      <p>⏰ Mon–Fri 9AM–5PM EST</p>
      <div class="social-links">
        <a href="https://www.facebook.com/C-Serpents-Reptiles-and-Racks-219701221396232/" target="_blank">Facebook</a>
        <a href="https://www.instagram.com/cserpents/" target="_blank">Instagram</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <span>© 2025 C Serpents Rack Systems & Hot Box Incubators</span>
      <span>Website by <strong>DT Consulting</strong></span>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', function() {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = HEADER;
  if (footerEl) footerEl.innerHTML = FOOTER;
});
