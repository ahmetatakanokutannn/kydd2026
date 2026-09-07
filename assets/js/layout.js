/* ==========================================================================
   KYDD 2026 — Ortak yapı üreteci
   --------------------------------------------------------------------------
   Logo şeridi, üst menü, alt bilgi ve tekrar eden içerik blokları (odak
   alanları, program, komiteler, SSS) site-data.js'ten üretilir. Böylece
   beş HTML sayfası aynı başlığı/alt bilgiyi elle taşımak zorunda kalmaz.

   Kullanım (sayfa içinde):
     <div data-kydd="header"></div>   <script>KYDD.mountHeader();</script>
     <div data-kydd="footer"></div>   <script>KYDD.mountFooter();</script>
   ========================================================================== */
window.KYDD = (function (D) {
  "use strict";

  /* --- Yardımcılar ------------------------------------------------------ */

  /* Veri dosyasındaki metinler HTML'e gömülmeden önce kaçırılır. */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function mount(name, html) {
    var el = document.querySelector('[data-kydd="' + name + '"]');
    if (el) el.innerHTML = html;
    return el;
  }

  /* Hangi sayfadayız? file:// ve http:// altında da doğru çalışır. */
  function currentPage() {
    var explicit = document.body && document.body.getAttribute("data-page");
    if (explicit) return explicit;
    var file = window.location.pathname.split("/").pop();
    return file && file !== "" ? file : "index.html";
  }

  /* --- Destekleyen kurum logoları (üst menü içindeki beyaz grup) --------
     Bakanlık ve Ajans logoları --header-logo-h yüksekliğinde ve eşittir;
     Yeditepe logosu ölçülen arma/doluluk oranıyla türetilir, böylece üçü
     birbirine göre aynı görsel ağırlıkta durur. */
  function headerLogosHTML() {
    var items = D.logos
      .map(function (l) {
        var imgCls = "header-logos__img header-logos__img--" + esc(l.key);
        return (
          '<a class="header-logos__link" href="' + esc(l.href) + '"' +
          ' target="_blank" rel="noopener noreferrer">' +
          '<img class="' + imgCls + '" src="' + esc(l.src) + '" alt="' + esc(l.alt) + '">' +
          "</a>"
        );
      })
      .join("");

    return '<div class="header-logos">' + items + "</div>";
  }

  /* --- Üst menü --------------------------------------------------------- */
  function navHTML(active) {
    /* Kayıt düğmesi menüden ayrılır; logo grubuyla birlikte sağda durur. */
    var links = D.nav.filter(function (n) { return !n.cta; });
    var ctas = D.nav.filter(function (n) { return n.cta; });

    var items = links
      .map(function (n) {
        var isActive = n.href === active;
        return (
          "<li>" +
          '<a href="' + esc(n.href) + '"' +
          (isActive ? ' class="is-active" aria-current="page"' : "") +
          ">" + esc(n.label) + "</a></li>"
        );
      })
      .join("");

    var ctaHTML = ctas
      .map(function (n) {
        return (
          '<a class="btn btn--mint btn--sm header-cta" href="' + esc(n.href) + '"' +
          (n.href === active ? ' aria-current="page"' : "") +
          ">" + esc(n.label) + "</a>"
        );
      })
      .join("");

    return (
      '<header class="site-header"><div class="container site-header__inner">' +
      '<a class="brand" href="index.html">' +
      '<span class="brand__abbr">' + esc(D.event.abbr) + " <span>" + esc(D.event.year) + "</span></span>" +
      '<span class="brand__name">' + esc(D.event.title) + "</span>" +
      "</a>" +
      '<nav class="site-nav" id="site-nav" aria-label="Ana menü"><ul>' + items + "</ul></nav>" +
      '<div class="header-actions">' + headerLogosHTML() + ctaHTML + "</div>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">' +
      '<span class="nav-toggle__bars" aria-hidden="true"></span> Menü</button>' +
      "</div></header>"
    );
  }

  function mountHeader() {
    mount("header", navHTML(currentPage()));
  }

  /* --- Alt bilgi -------------------------------------------------------- */
  function footerHTML() {
    var e = D.event;

    var navLinks = D.nav
      .map(function (n) {
        return '<li><a href="' + esc(n.href) + '">' + esc(n.label) + "</a></li>";
      })
      .join("");

    /* Şerh metninin yanında yalnızca Bakanlık ve Ajans logoları bulunur. */
    var footLogos = D.logos
      .filter(function (l) {
        return l.key === "bakanlik" || l.key === "istka";
      })
      .map(function (l) {
        return (
          '<a class="site-footer__logo-link" href="' + esc(l.href) + '"' +
          ' target="_blank" rel="noopener noreferrer">' +
          '<img class="site-footer__logo site-footer__logo--' + esc(l.key) + '"' +
          ' src="' + esc(l.src) + '" alt="' + esc(l.alt) + '"></a>'
        );
      })
      .join("");

    return (
      '<footer class="site-footer"><div class="container">' +
      /* Menü + iletişim sütunları */
      '<div class="footer-cols">' +
      '<div class="footer-col"><h4>Çalıştay</h4><ul>' + navLinks + "</ul></div>" +
      '<div class="footer-col"><h4>Tarih ve Yer</h4><ul>' +
      "<li>" + esc(e.dateText) + "</li>" +
      "<li>" + esc(e.timeText) + "</li>" +
      "<li>" + esc(e.venueName) + "</li>" +
      "<li>" + esc(e.venueHall) + "</li>" +
      "<li>" + esc(e.venueAddress) + "</li>" +
      "</ul></div>" +
      '<div class="footer-col"><h4>İletişim</h4><ul>' +
      '<li><a href="' + esc(e.emailHref) + '">' + esc(e.email) + "</a></li>" +
      '<li><a href="' + esc(e.phoneHref) + '">' + esc(e.phone) + "</a></li>" +
      '<li><a href="iletisim.html">İletişim ve ulaşım</a></li>' +
      "<li>" + esc(e.center) + "</li>" +
      "</ul></div>" +
      '<div class="footer-col"><h4>Katılım</h4><ul>' +
      "<li>" + esc(e.attendance) + " — " + esc(e.attendanceNote) + "</li>" +
      "<li>Kontenjan sınırlıdır</li>" +
      '<li><a href="kayit.html">Kayıt formuna git</a></li>' +
      "</ul></div>" +
      "</div>" +
      /* Şerh metni + logolar */
      '<div class="site-footer__inner">' +
      '<div class="site-footer__text"><p>' + esc(D.disclaimer) + "</p></div>" +
      '<div class="site-footer__logos">' + footLogos + "</div>" +
      "</div></div></footer>" +
      '<div class="footer-bottom"><div class="container footer-bottom__inner">' +
      "<span>© " + esc(e.year) + " Yeditepe Üniversitesi — " + esc(e.abbr) + " " + esc(e.year) + "</span>" +
      '<nav class="footer-bottom__links" aria-label="Alt bilgi menüsü">' +
      '<a href="program.html">Program</a><a href="kayit.html">Kayıt</a>' +
      '<a href="iletisim.html">İletişim</a></nav>' +
      "</div></div>" +
      '<button class="to-top" type="button" aria-label="Sayfa başına dön">↑</button>'
    );
  }

  function mountFooter() {
    mount("footer", footerHTML());
  }

  /* --- Hızlı bilgi şeridi ----------------------------------------------- */
  var ICONS = {
    calendar:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    ticket:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/>' +
      '<path d="M14 6v12"/></svg>',

    /* Odak alanı ve süreç şeması simgeleri */
    capture:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
      '<path d="M6 22a6 6 0 0 1 1.6-11.8A8 8 0 0 1 23 11a5.5 5.5 0 0 1 1.4 10.8"/>' +
      '<path d="M16 17v9M12.5 22.5 16 26l3.5-3.5"/></svg>',
    convert:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
      '<circle cx="16" cy="16" r="4.2"/>' +
      '<path d="M16 4.5v3.3M16 24.2v3.3M4.5 16h3.3M24.2 16h3.3M8 8l2.4 2.4M21.6 21.6 24 24M24 8l-2.4 2.4M10.4 21.6 8 24"/></svg>',
    store:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
      '<ellipse cx="16" cy="9" rx="10" ry="4"/>' +
      '<path d="M6 9v14c0 2.2 4.5 4 10 4s10-1.8 10-4V9"/><path d="M6 16c0 2.2 4.5 4 10 4s10-1.8 10-4"/></svg>',
    loop:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
      '<path d="M27 16A11 11 0 0 1 8.2 23.8M5 16A11 11 0 0 1 23.8 8.2"/>' +
      '<path d="M23 4.5v4h-4M9 27.5v-4h4"/></svg>',
    chip:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
      '<rect x="10" y="10" width="12" height="12" rx="2.5"/>' +
      '<path d="M13 4v6M19 4v6M13 22v6M19 22v6M4 13h6M4 19h6M22 13h6M22 19h6"/></svg>',
    policy:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
      '<path d="M16 3.5 27 8v8c0 6.6-4.6 11.4-11 12.5C9.6 27.4 5 22.6 5 16V8z"/>' +
      '<path d="m11.5 16 3 3 6-6.5"/></svg>',
    factory:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
      '<path d="M4 27V15l7 4.5V15l7 4.5V15l7 4.5V27z"/><path d="M8 15V6h5v5"/>' +
      '<path d="M4 27h24"/></svg>'
  };

  function factbarHTML() {
    var e = D.event;
    var facts = [
      { icon: "calendar", label: "Tarih", value: e.dateText },
      { icon: "clock", label: "Saat", value: e.timeText },
      {
        icon: "pin",
        label: "Yer",
        value: e.venueName,
        sub: e.venueHall + " / " + e.venueCity
      },
      {
        icon: "ticket",
        label: "Katılım",
        value: e.attendance,
        sub: e.attendanceNote
      }
    ];

    var cells = facts
      .map(function (f) {
        return (
          '<div class="factbar__item">' +
          '<span class="factbar__icon" aria-hidden="true">' + ICONS[f.icon] + "</span>" +
          "<span><span class=\"factbar__label\">" + esc(f.label) + "</span>" +
          '<span class="factbar__value">' + esc(f.value) +
          (f.sub ? "<small>" + esc(f.sub) + "</small>" : "") +
          "</span></span></div>"
        );
      })
      .join("");

    return '<div class="factbar"><div class="container"><div class="factbar__grid">' + cells + "</div></div></div>";
  }

  /* --- Odak alanları ---------------------------------------------------- */
  function topicsHTML() {
    return D.topics
      .map(function (t, i) {
        var icon = ICONS[t.icon] || "";
        return (
          '<article class="card reveal" data-delay="' + (i % 4) + '">' +
          '<span class="card__icon" aria-hidden="true">' + icon + "</span>" +
          "<h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + "</p></article>"
        );
      })
      .join("");
  }

  /* --- Karbonun yolculuğu (süreç şeması) -------------------------------- */
  function processHTML() {
    if (!D.process) return "";
    return D.process
      .map(function (p, i) {
        var icon = ICONS[p.icon] || "";
        return (
          '<li class="flow__step reveal" data-delay="' + (i % 4) + '">' +
          '<span class="flow__ring" aria-hidden="true">' + icon + "</span>" +
          '<span class="flow__code">' + esc(p.code) + "</span>" +
          '<span class="flow__title">' + esc(p.title) + "</span>" +
          '<span class="flow__text">' + esc(p.text) + "</span>" +
          "</li>"
        );
      })
      .join("");
  }

  /* --- Afiş -------------------------------------------------------------- */
  function posterHTML(withCaption) {
    var e = D.event;
    if (!e.poster) return "";
    return (
      '<figure class="poster">' +
      '<a class="poster__frame" href="' + esc(e.poster) + '" target="_blank" rel="noopener noreferrer">' +
      '<img src="' + esc(e.poster) + '" alt="' + esc(e.posterAlt) + '"' +
      ' width="900" height="1600" loading="lazy" decoding="async">' +
      "</a>" +
      (withCaption
        ? '<figcaption class="poster__caption">Afişi büyütmek için tıklayın</figcaption>'
        : "") +
      "</figure>"
    );
  }

  /* --- Program ---------------------------------------------------------- */
  function programHTML(limit) {
    var items = D.program.items.slice(0, limit || D.program.items.length);
    return items
      .map(function (p) {
        var tag = p.tag
          ? '<span class="timeline__tag' +
            (p.type === "break" ? " timeline__tag--break" : "") +
            '">' + esc(p.tag) + "</span>"
          : "";
        return (
          '<li class="reveal">' +
          '<span class="timeline__time">' + esc(p.time) + "</span>" +
          '<span class="timeline__body">' +
          '<span class="timeline__title">' + esc(p.title) + "</span>" +
          (p.desc ? '<span class="timeline__desc">' + esc(p.desc) + "</span>" : "") +
          tag +
          "</span></li>"
        );
      })
      .join("");
  }

  /* --- Kişi görseli -----------------------------------------------------
     m.photo doluysa fotoğraf, boşsa baş harflerden oluşan bir avatar
     gösterilir. Fotoğraf yüklenemezse (bağlantı kopmuşsa) onerror ile
     yine baş harflere düşer — kırık görsel çıkmaz. */

  /* Unvanları atıp ad ve soyadın baş harflerini alır. */
  var TITLES = /^(prof\.|doç\.|dr\.|öğr\.|üyesi|arş\.|gör\.|uzm\.|burs\.|öğr|araş\.)$/i;

  function initialsOf(name) {
    var words = String(name || "")
      .split(/\s+/)
      .filter(function (w) {
        return w && !TITLES.test(w);
      });
    if (!words.length) return "?";
    var first = words[0].charAt(0);
    var last = words.length > 1 ? words[words.length - 1].charAt(0) : "";
    return (first + last).toLocaleUpperCase("tr-TR");
  }

  /* Ada göre sabit bir renk seçer, böylece avatarlar tek düze görünmez. */
  function hueOf(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) {
      h = (h * 31 + name.charCodeAt(i)) % 360;
    }
    return h;
  }

  function avatarHTML(m) {
    var initials = initialsOf(m.name);
    var fallback =
      '<span class="avatar__initials" style="--avatar-hue:' + hueOf(m.name) + '">' +
      esc(initials) + "</span>";

    if (!m.photo) {
      return '<span class="avatar">' + fallback + "</span>";
    }

    return (
      '<span class="avatar avatar--photo">' +
      '<img src="' + esc(m.photo) + '" alt="' + esc(m.name) + '"' +
      ' loading="lazy" decoding="async"' +
      ' onerror="this.closest(\'.avatar\').classList.remove(\'avatar--photo\');this.remove();">' +
      fallback +
      "</span>"
    );
  }

  /* --- Komiteler -------------------------------------------------------- */
  function committeesHTML() {
    return D.committees
      .map(function (c) {
        var members = c.members
          .map(function (m) {
            return (
              "<li>" +
              avatarHTML(m) +
              '<span class="committee__body">' +
              '<span class="committee__name">' + esc(m.name) + "</span>" +
              (m.org ? '<span class="committee__org">' + esc(m.org) + "</span>" : "") +
              (m.role ? '<span class="committee__role">' + esc(m.role) + "</span>" : "") +
              "</span></li>"
            );
          })
          .join("");

        return (
          '<div class="committee reveal" data-committee="' + esc(c.id) + '">' +
          '<div class="committee__title"><h3>' + esc(c.name) + "</h3>" +
          '<span class="committee__count">' + c.members.length + " üye</span></div>" +
          '<ul class="committee__list' + (c.narrow ? " committee__list--narrow" : "") + '">' +
          members +
          "</ul></div>"
        );
      })
      .join("");
  }

  function committeeTabsHTML() {
    var buttons = [{ id: "all", name: "Tümü" }]
      .concat(D.committees)
      .map(function (c, i) {
        return (
          '<button type="button" role="tab" data-filter="' + esc(c.id) + '"' +
          ' aria-selected="' + (i === 0 ? "true" : "false") + '">' +
          esc(c.name) + "</button>"
        );
      })
      .join("");
    return '<div class="tabs" role="tablist" aria-label="Komite filtresi">' + buttons + "</div>";
  }

  /* --- SSS -------------------------------------------------------------- */
  function faqHTML() {
    return (
      '<div class="faq">' +
      D.faq
        .map(function (f, i) {
          var id = "faq-a-" + i;
          return (
            '<div class="faq__item">' +
            '<h3 style="margin:0;font-size:inherit;">' +
            '<button class="faq__q" type="button" aria-expanded="false" aria-controls="' + id + '">' +
            "<span>" + esc(f.q) + "</span></button></h3>" +
            '<div class="faq__a" id="' + id + '">' + esc(f.a) + "</div>" +
            "</div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  /* --- Sayılarla -------------------------------------------------------- */
  function statsHTML() {
    var counts = D.committees.reduce(
      function (acc, c) {
        acc[c.id] = c.members.length;
        return acc;
      },
      {}
    );

    var stats = [
      { num: counts.bilim || 0, label: "Bilim Kurulu üyesi" },
      { num: counts.organizasyon || 0, label: "Organizasyon Komitesi üyesi" },
      { num: D.topics.length, label: "Odak alanı" },
      { num: 1, label: "Tam gün, 9 saat program" }
    ];

    return stats
      .map(function (s) {
        return (
          '<div class="stat reveal">' +
          '<span class="stat__num" data-count-to="' + s.num + '">0</span>' +
          '<span class="stat__label">' + esc(s.label) + "</span></div>"
        );
      })
      .join("");
  }

  /* --- Harita ----------------------------------------------------------- */
  function mapSrc() {
    return (
      "https://maps.google.com/maps?q=" +
      encodeURIComponent(D.event.mapQuery) +
      "&t=&z=16&ie=UTF8&iwloc=&output=embed"
    );
  }

  /* --- Veriyi sayfaya yazan basit yer tutucular -------------------------
     <span data-kydd-text="event.dateText"></span> gibi kullanılır. */
  function fillTextSlots() {
    var slots = document.querySelectorAll("[data-kydd-text]");
    Array.prototype.forEach.call(slots, function (el) {
      var path = el.getAttribute("data-kydd-text").split(".");
      var val = D;
      for (var i = 0; i < path.length && val != null; i++) val = val[path[i]];
      if (val != null) el.textContent = val;
    });
  }

  /* --- Bölüm bağlayıcı: data-kydd="..." olan her yeri doldurur ---------- */
  function mountSections() {
    var e = D.event;

    mount("factbar", factbarHTML());
    mount("topics", topicsHTML());
    mount("process", processHTML());
    mount("committees", committeeTabsHTML() + committeesHTML());
    mount("faq", faqHTML());
    mount("stats", statsHTML());
    mount("poster", posterHTML(false));
    mount("poster-full", posterHTML(true));

    var progFull = document.querySelector('[data-kydd="program"]');
    if (progFull) progFull.innerHTML = programHTML();

    var progPreview = document.querySelector('[data-kydd="program-preview"]');
    if (progPreview) progPreview.innerHTML = programHTML(5);

    /* Google Forms'a doğrudan gitmesi istenen bağlantılar */
    var regLinks = document.querySelectorAll("[data-kydd-register]");
    Array.prototype.forEach.call(regLinks, function (a) {
      if (!e.registerUrl) return;
      a.setAttribute("href", e.registerUrl);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });

    var mapEl = document.querySelector('[data-kydd="map"]');
    if (mapEl) {
      mapEl.innerHTML =
        '<div class="map"><iframe title="' + esc(e.venueName) + ' haritası"' +
        ' src="' + esc(mapSrc()) + '" loading="lazy"' +
        ' referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>';
    }

    fillTextSlots();
  }

  return {
    data: D,
    mountHeader: mountHeader,
    mountFooter: mountFooter,
    mountSections: mountSections,
    currentPage: currentPage,
    esc: esc
  };
})(window.KYDD_DATA);
