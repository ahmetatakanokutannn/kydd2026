/* ==========================================================================
   KYDD 2026 — Etkileşimler
   Mobil menü, sticky başlık, geri sayım, kaydırma animasyonu, sayaçlar,
   komite filtresi, SSS akordeonu, form doğrulama.
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.KYDD_DATA || {};
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Sayfaya yerleştirilen bölümleri önce üret. */
  if (window.KYDD && window.KYDD.mountSections) {
    window.KYDD.mountSections();
  }

  /* ---------------------------------------------------------------------
     Mobil menü
     --------------------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Menü açıkken sayfaya tıklanınca kapansın
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        close();
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------------
     Sticky başlık gölgesi + başa dön düğmesi
     --------------------------------------------------------------------- */
  function initScrollChrome() {
    var header = document.querySelector(".site-header");
    var toTop = document.querySelector(".to-top");
    if (!header && !toTop) return;

    var ticking = false;

    function update() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (header) header.classList.toggle("is-stuck", y > 140);
      if (toTop) toTop.classList.toggle("is-visible", y > 600);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    update();

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "auto" : "smooth"
        });
      });
    }
  }

  /* ---------------------------------------------------------------------
     Geri sayım
     --------------------------------------------------------------------- */
  function initCountdown() {
    var box = document.querySelector("[data-countdown]");
    if (!box || !DATA.event) return;

    var target = new Date(DATA.event.startsAt).getTime();
    var end = new Date(DATA.event.endsAt).getTime();
    if (isNaN(target)) return;

    var cells = {
      gun: box.querySelector('[data-unit="gun"]'),
      saat: box.querySelector('[data-unit="saat"]'),
      dakika: box.querySelector('[data-unit="dakika"]'),
      saniye: box.querySelector('[data-unit="saniye"]')
    };
    var note = box.querySelector(".countdown__note");

    function pad(n) {
      return n < 10 ? "0" + n : String(n);
    }

    function tick() {
      var now = Date.now();
      var diff = target - now;

      if (diff <= 0) {
        box.classList.add("is-past");
        if (note) {
          note.textContent =
            now <= end
              ? "Çalıştay bugün devam ediyor."
              : "Çalıştay tamamlandı. İlginiz için teşekkür ederiz.";
        }
        window.clearInterval(timer);
        return;
      }

      var s = Math.floor(diff / 1000);
      if (cells.gun) cells.gun.textContent = String(Math.floor(s / 86400));
      if (cells.saat) cells.saat.textContent = pad(Math.floor(s / 3600) % 24);
      if (cells.dakika) cells.dakika.textContent = pad(Math.floor(s / 60) % 60);
      if (cells.saniye) cells.saniye.textContent = pad(s % 60);
    }

    tick();
    var timer = window.setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------------------
     Kaydırma animasyonu
     --------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    Array.prototype.forEach.call(items, function (el) {
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     Sayaçlar (Sayılarla bölümü)
     --------------------------------------------------------------------- */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count-to]");
    if (!nums.length) return;

    function run(el) {
      var to = Number(el.getAttribute("data-count-to")) || 0;
      if (reduceMotion) {
        el.textContent = to;
        return;
      }
      var dur = 1100;
      var start = null;

      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased);
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(nums, run);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          run(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    Array.prototype.forEach.call(nums, function (el) {
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     Komite filtresi
     --------------------------------------------------------------------- */
  function initCommitteeTabs() {
    var tabs = document.querySelector(".tabs");
    if (!tabs) return;
    var groups = document.querySelectorAll("[data-committee]");

    tabs.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      var filter = btn.getAttribute("data-filter");

      Array.prototype.forEach.call(tabs.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });

      Array.prototype.forEach.call(groups, function (g) {
        var show = filter === "all" || g.getAttribute("data-committee") === filter;
        g.hidden = !show;
      });
    });
  }

  /* ---------------------------------------------------------------------
     SSS akordeonu
     --------------------------------------------------------------------- */
  function initFaq() {
    var faq = document.querySelector(".faq");
    if (!faq) return;

    faq.addEventListener("click", function (e) {
      var btn = e.target.closest(".faq__q");
      if (!btn) return;
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) panel.classList.toggle("is-open", !open);
    });
  }

  /* ---------------------------------------------------------------------
     Form doğrulama
     Tarayıcının kendi baloncukları yerine alan altında Türkçe mesaj gösterir.
     --------------------------------------------------------------------- */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function fieldOf(input) {
    return input.closest(".field");
  }

  function setError(input, message) {
    var field = fieldOf(input);
    if (!field) return;
    var box = field.querySelector(".field__error");
    field.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    if (box) box.textContent = message;
  }

  function clearError(input) {
    var field = fieldOf(input);
    if (!field) return;
    field.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
  }

  function validate(input) {
    if (input.type === "checkbox") {
      if (input.hasAttribute("required") && !input.checked) {
        setError(input, "Devam etmek için bu kutuyu işaretleyin.");
        return false;
      }
      clearError(input);
      return true;
    }

    var value = (input.value || "").trim();

    if (input.hasAttribute("required") && value === "") {
      setError(input, "Bu alan zorunludur.");
      return false;
    }

    if (value === "") {
      clearError(input);
      return true;
    }

    if (input.type === "email" && !EMAIL.test(value)) {
      setError(input, "Geçerli bir e-posta adresi girin.");
      return false;
    }

    if (input.dataset.minlength && value.length < Number(input.dataset.minlength)) {
      setError(input, "En az " + input.dataset.minlength + " karakter girin.");
      return false;
    }

    clearError(input);
    return true;
  }

  function initForms() {
    var forms = document.querySelectorAll("form[data-validate]");

    Array.prototype.forEach.call(forms, function (form) {
      var inputs = form.querySelectorAll("input, select, textarea");
      var status = form.querySelector(".form__status");

      Array.prototype.forEach.call(inputs, function (input) {
        var evt = input.type === "checkbox" ? "change" : "blur";
        input.addEventListener(evt, function () {
          validate(input);
        });
        input.addEventListener("input", function () {
          var f = fieldOf(input);
          if (f && f.classList.contains("has-error")) validate(input);
        });
      });

      form.addEventListener("submit", function (e) {
        var firstInvalid = null;

        Array.prototype.forEach.call(inputs, function (input) {
          if (!validate(input) && !firstInvalid) firstInvalid = input;
        });

        if (firstInvalid) {
          e.preventDefault();
          if (status) {
            status.classList.remove("is-ok");
            status.classList.add("is-error");
            status.textContent = "Lütfen işaretli alanları kontrol edin.";
          }
          firstInvalid.focus();
          firstInvalid.scrollIntoView({
            block: "center",
            behavior: reduceMotion ? "auto" : "smooth"
          });
          return;
        }

        // action henüz bağlanmadı: form gerçekten gönderilmesin.
        if (!form.getAttribute("action")) {
          e.preventDefault();
          if (status) {
            status.classList.remove("is-error");
            status.classList.add("is-ok");
            status.textContent =
              "Alanlar geçerli. Gönderim adresi (action) henüz tanımlanmadığı için " +
              "form iletilmedi — kayıt sistemi bağlandığında bu mesaj kaybolacak.";
            status.scrollIntoView({
              block: "center",
              behavior: reduceMotion ? "auto" : "smooth"
            });
          }
          return;
        }

        if (status) {
          status.classList.remove("is-error", "is-ok");
          status.textContent = "";
        }
      });

      form.addEventListener("reset", function () {
        Array.prototype.forEach.call(inputs, clearError);
        if (status) {
          status.classList.remove("is-error", "is-ok");
          status.textContent = "";
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Başlat
     --------------------------------------------------------------------- */
  initNav();
  initScrollChrome();
  initCountdown();
  initReveal();
  initCounters();
  initCommitteeTabs();
  initFaq();
  initForms();
})();
