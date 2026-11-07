/* ===== Автосервис на Шоссейной — общие скрипты ===== */
(function () {
  "use strict";

  // Мобильное меню
  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Диалог «ещё» в отзывах: внутрисайтовое окно с кнопками на 2ГИС и Яндекс.Карты
  var dialog = document.getElementById("reviews-dialog");
  document.querySelectorAll("[data-open-reviews]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!dialog) return;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  });
  if (dialog) {
    dialog.querySelectorAll("[data-close-dialog]").forEach(function (btn) {
      btn.addEventListener("click", function () { dialog.close(); });
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  // Плавное появление секций
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { io.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  // Год в подвале
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Лайтбокс для галереи (без библиотек)
  var galleryLinks = document.querySelectorAll("[data-lightbox]");
  if (galleryLinks.length) {
    var overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = '<button type="button" class="lightbox__close" aria-label="Закрыть">×</button><img alt="">';
    document.body.appendChild(overlay);
    var overlayImg = overlay.querySelector("img");
    var closeBtn = overlay.querySelector(".lightbox__close");
    function closeLightbox() {
      overlay.classList.remove("is-open");
      overlayImg.removeAttribute("src");
      document.body.style.overflow = "";
    }
    galleryLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var img = link.querySelector("img");
        if (!img) return;
        overlayImg.src = link.getAttribute("href") || img.src;
        overlayImg.alt = img.alt || "";
        overlay.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });
    closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) closeLightbox();
    });
  }
})();
