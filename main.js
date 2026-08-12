/* Lumora — site interactivity
   Handles: cart count, wishlist hearts, image dot indicators,
   newsletter subscribe, and small UX niceties. No external deps. */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- CART ---------- */
  var cartCountEl = document.getElementById('cartCount');
  var cartIcon = document.getElementById('cartIcon');
  var cartCount = parseInt(cartCountEl ? cartCountEl.textContent : '0', 10) || 0;
  var cartTotal = 0;

  function updateCartBadge() {
    if (cartCountEl) cartCountEl.textContent = cartCount;
  }

  function bounceCartIcon() {
    if (!cartIcon) return;
    cartIcon.style.transform = 'scale(1.25)';
    setTimeout(function () {
      cartIcon.style.transform = 'scale(1)';
    }, 180);
  }

  document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var name = btn.getAttribute('data-product') || 'Item';
      var price = parseFloat(btn.getAttribute('data-price')) || 0;

      cartCount += 1;
      cartTotal += price;
      updateCartBadge();
      bounceCartIcon();

      var original = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
      }, 1000);

      console.log('Cart:', cartCount, 'items — Total: $' + cartTotal.toFixed(2), '| Last added:', name);
    });
  });

  /* ---------- WISHLIST HEARTS ---------- */
  document.querySelectorAll('[data-wish-toggle]').forEach(function (heart) {
    heart.addEventListener('click', function (e) {
      e.stopPropagation();
      var isActive = heart.classList.toggle('active');
      heart.innerHTML = isActive ? '&#9829;' : '&#9825;'; // filled vs outline heart
      heart.style.color = isActive ? '#E9525A' : '';
    });
  });

  /* ---------- PRODUCT IMAGE DOT INDICATORS ---------- */
  document.querySelectorAll('[data-dots]').forEach(function (dotsWrap) {
    var dots = dotsWrap.querySelectorAll('span');
    dots.forEach(function (dot, index) {
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', function () {
        dots.forEach(function (d) { d.style.background = '#ccc'; });
        dot.style.background = 'var(--green)';
        // In a full build, this would swap the product image to index `index`.
      });
    });
  });

  /* ---------- NEWSLETTER FORM ---------- */
  var newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = document.getElementById('newsletterEmail');
      var email = emailInput.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.style.boxShadow = '0 0 0 2px #E9525A';
        emailInput.focus();
        setTimeout(function () { emailInput.style.boxShadow = 'none'; }, 1500);
        return;
      }

      var button = newsletterForm.querySelector('button');
      var originalLabel = button.textContent;
      button.textContent = 'Subscribed ✓';
      button.disabled = true;
      emailInput.value = '';

      setTimeout(function () {
        button.textContent = originalLabel;
        button.disabled = false;
      }, 2000);
    });
  }

  /* ---------- SMOOTH SCROLL FOR IN-PAGE NAV LINKS ---------- */
  document.querySelectorAll('nav a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});