/* ==========================================================================
   KYDD 2026 — Tek kaynak veri dosyası
   --------------------------------------------------------------------------
   Sitenin tekrar eden bütün içeriği (etkinlik bilgileri, menü, komiteler,
   program, SSS, alt bilgi metni) burada durur. Sayfalar bu veriyi
   layout.js ve main.js üzerinden okur.

   İÇERİK DEĞİŞİKLİĞİ İÇİN SADECE BU DOSYAYI DÜZENLEYİN.
   HTML sayfalarına dokunmanız gerekmez.
   ========================================================================== */
window.KYDD_DATA = (function () {
  "use strict";

  /* --- Etkinlik ------------------------------------------------------- */
  var event = {
    abbr: "KYDD",
    year: "2026",
    // Afişteki resmî çalıştay adı
    title: "COP31'e Doğru Kaynak Verimliliği ve Düşük Karbonlu Dönüşüm Çalıştayı",
    titleHighlight: "COP31'e Doğru",
    shortTitle: "KYDD 2026 Çalıştayı",
    project: "İkiz Dönüşüm Yoluyla Endüstriyel Dekarbonizasyon",

    dateText: "21 Eylül 2026, Pazartesi",
    timeText: "09.00 – 18.00",
    // Geri sayım hedefi (Europe/Istanbul, UTC+03:00)
    startsAt: "2026-09-21T09:00:00+03:00",
    endsAt: "2026-09-21T18:00:00+03:00",

    venueName: "Yeditepe Üniversitesi Rektörlük Binası",
    venueHall: "Mario Levi Salonu (Yeşil Salon)",
    venueAddress: "İnönü Mahallesi, Kayışdağı Cd., 34755 Ataşehir / İstanbul",
    venueCity: "İstanbul",
    mapQuery:
      "Yeditepe Üniversitesi Rektörlük Binası, İnönü Mahallesi, Kayışdağı Cd., 34755 Ataşehir/İstanbul",

    attendance: "Ücretsiz",
    attendanceNote: "Katılım sertifikalıdır",

    /* Kayıtlar Google Forms üzerinden alınıyor. kayit.html formu hem sayfaya
       gömer hem de bu adrese doğrudan bağlantı verir. */
    registerUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfNOB5hr_VWhuBr6BRjGLBqo-z8oChTPB5nf1CnIOBsHwLeRA/viewform",

    phone: "+90 534 376 83 13",
    phoneHref: "tel:+905343768313",
    email: "yukarbon@yeditepe.edu.tr",
    emailHref: "mailto:yukarbon@yeditepe.edu.tr",
    /* Sözlü sunum başvuruları bu adrese yapılır. */
    abstractEmail: "kubra.akben@yeditepe.edu.tr",
    abstractEmailHref: "mailto:kubra.akben@yeditepe.edu.tr",
    center: "Yeditepe Üniversitesi Karbon Çözümleri Uygulama ve Araştırma Merkezi",

    // Tanıtım afişi (900x1600)
    poster: "assets/kydd2026-afis.jpeg",
    posterAlt:
      "KYDD 2026 Çalıştayı tanıtım afişi — 21 Eylül 2026, Yeditepe Üniversitesi Rektörlük Binası, Mario Levi Salonu"
  };

  /* --- Menü ------------------------------------------------------------ */
  var nav = [
    { href: "index.html", label: "Çalıştay Hakkında" },
    { href: "program.html", label: "Program" },
    { href: "konusmacilar.html", label: "Konuşmacılar" },
    { href: "iletisim.html", label: "İletişim" },
    { href: "kayit.html", label: "Kayıt Ol", cta: true }
  ];

  /* --- Destekleyen kurum logoları -------------------------------------- */
  /* Sıra İSTKA Görünürlük Rehberi s.14'e göre: Bakanlık solda, yararlanıcı
     ortada, Ajans sağda. Sırayı değiştirmeyin. */
  var logos = [
    {
      src: "assets/bakanlik-logo.jpg",
      alt: "T.C. Sanayi ve Teknoloji Bakanlığı",
      href: "https://www.sanayi.gov.tr",
      key: "bakanlik"
    },
    {
      src: "assets/yeditepe-logo.png",
      alt: "Yeditepe Üniversitesi",
      href: "https://www.yeditepe.edu.tr",
      key: "yeditepe"
    },
    {
      src: "assets/istka-logo.png",
      alt: "İstanbul Kalkınma Ajansı",
      href: "https://www.istka.org.tr",
      key: "istka"
    }
  ];

  /* --- Alt bilgi şerh metni (İSTKA rehberi s.15 — DEĞİŞTİRMEYİN) -------- */
  var disclaimer =
    "Bu yayın İstanbul Kalkınma Ajansının desteklediği İkiz Dönüşüm Yoluyla " +
    "Endüstriyel Dekarbonizasyon projesi kapsamında hazırlanmıştır. İçerik ile " +
    "ilgili tek sorumluluk Yeditepe Üniversitesi'ne aittir ve Sanayi ve " +
    "Teknoloji Bakanlığının ve İstanbul Kalkınma Ajansının görüşlerini " +
    "yansıtmaz.";

  /* --- Odak alanları --------------------------------------------------- */
  /* icon değerleri layout.js içindeki ICONS listesinden seçilir. */
  var topics = [
    {
      icon: "capture",
      title: "Karbon Yakalama",
      text: "Baca gazı ve doğrudan hava yakalama teknolojileri, sorbent ve çözücü geliştirme, süreç entegrasyonu."
    },
    {
      icon: "convert",
      title: "Değerlendirme",
      text: "Yakalanan karbonun kimyasal, biyolojik ve mineralizasyon yoluyla katma değerli ürünlere dönüştürülmesi."
    },
    {
      icon: "store",
      title: "Depolama",
      text: "Jeolojik depolama, saha karakterizasyonu, izleme ve uzun vadeli güvenlik değerlendirmesi."
    },
    {
      icon: "loop",
      title: "Kaynak Verimliliği",
      text: "Endüstriyel simbiyoz, döngüsel üretim modelleri ve enerji yoğun sektörlerde verimlilik kazanımları."
    },
    {
      icon: "chip",
      title: "İkiz Dönüşüm",
      text: "Dijitalleşme ile yeşil dönüşümün birlikte kurgulanması; veri, otomasyon ve karbon izleme sistemleri."
    },
    {
      icon: "policy",
      title: "Politika ve Sanayi",
      text: "COP31 yol haritası, SKDM uyumu, teşvik mekanizmaları ve üniversite–sanayi iş birliği modelleri."
    }
  ];

  /* --- Karbonun yolculuğu (süreç şeması) -------------------------------- */
  var process = [
    {
      icon: "factory",
      code: "01",
      title: "Kaynak",
      text: "Enerji yoğun sanayide açığa çıkan CO₂ emisyonu."
    },
    {
      icon: "capture",
      code: "02",
      title: "Yakalama",
      text: "Baca gazından veya doğrudan havadan ayrıştırma."
    },
    {
      icon: "convert",
      code: "03",
      title: "Değerlendirme",
      text: "Yakıt, kimyasal ve yapı malzemesine dönüştürme."
    },
    {
      icon: "store",
      code: "04",
      title: "Depolama",
      text: "Jeolojik formasyonlarda kalıcı ve izlenen depolama."
    }
  ];

  /* --- Program taslağı -------------------------------------------------- */
  /* Saatler afişteki 09.00–18.00 çerçevesine göre taslaktır; oturum
     başlıkları kesinleştikçe burayı güncelleyin ve draft:false yapın. */
  var program = {
    draft: true,
    items: [
      {
        time: "09.00 – 09.30",
        title: "Kayıt ve karşılama",
        desc: "Katılımcı kayıt masası, yaka kartı dağıtımı ve karşılama ikramı.",
        tag: "Kayıt",
        type: "break"
      },
      {
        time: "09.30 – 10.15",
        title: "Açılış konuşmaları",
        desc: "Yeditepe Üniversitesi, İstanbul Kalkınma Ajansı ve proje ekibi açılış konuşmaları."
      },
      {
        time: "10.15 – 11.15",
        title: "Davetli konuşmacı oturumu I",
        desc: "COP31 yolunda Türkiye'nin dekarbonizasyon gündemi."
      },
      {
        time: "11.15 – 11.30",
        title: "Kahve arası",
        tag: "Ara",
        type: "break"
      },
      {
        time: "11.30 – 12.30",
        title: "Oturum: Karbon yakalama ve değerlendirme",
        desc: "Akademi ve sanayiden teknoloji sunumları."
      },
      {
        time: "12.30 – 13.30",
        title: "Öğle arası ve poster sunumları",
        tag: "Ara",
        type: "break"
      },
      {
        time: "13.30 – 14.45",
        title: "Oturum: Kaynak verimliliği ve ikiz dönüşüm",
        desc: "Endüstriyel simbiyoz, dijital karbon izleme ve verimlilik uygulamaları."
      },
      {
        time: "14.45 – 15.00",
        title: "Kahve arası",
        tag: "Ara",
        type: "break"
      },
      {
        time: "15.00 – 16.15",
        title: "Oturum: Depolama ve politika çerçevesi",
        desc: "Jeolojik depolama, mevzuat ve teşvik mekanizmaları."
      },
      {
        time: "16.15 – 17.30",
        title: "Panel: Üniversite–sanayi iş birliği",
        desc: "Ortak proje geliştirme ve finansman olanakları üzerine tartışma."
      },
      {
        time: "17.30 – 18.00",
        title: "Değerlendirme, kapanış ve sertifika takdimi",
        tag: "Kapanış"
      }
    ]
  };

  /* --- Komiteler -------------------------------------------------------- */
  /* İsimler soyadına göre Türk alfabesi sırasındadır. */
  var committees = [
    {
      id: "organizasyon",
      name: "Organizasyon Komitesi",
      narrow: true,
      members: [
        { name: "Dr. Öğr. Üyesi Hatice Kübra Akben", org: "Yeditepe Üniversitesi", role: "Organizasyon Komitesi Başkanı" },
        { name: "Prof. Dr. Şule Aydeniz", org: "Yeditepe Üniversitesi" },
        { name: "Dr. Öğr. Üyesi Zeliha Cansu Canbek Özdil", org: "Yeditepe Üniversitesi" },
        { name: "Arş. Gör. Umay Çınarlı", org: "Yeditepe Üniversitesi" },
        { name: "Arş. Gör. Bayram Güneş", org: "Yeditepe Üniversitesi" },
        { name: "Uzm. Aleyna İşler", org: "Yeditepe Üniversitesi" },
        { name: "Uzm. Ahmet Atakan Okutan", org: "Yeditepe Üniversitesi" },
        { name: "Prof. Dr. Didem Saloğlu Dertli", org: "İstanbul Teknik Üniversitesi" },
        { name: "Doç. Dr. Ahmet Turan", org: "Yeditepe Üniversitesi" },
        { name: "Burs. Öğr. Hussein Aldweik", org: "Yeditepe Üniversitesi" },
        { name: "Burs. Öğr. Türkü Sıla Özkan", org: "Yeditepe Üniversitesi" }
      ]
    },
    {
      id: "bilim",
      name: "Bilim Kurulu",
      members: [
        /* Soyadı "Duman" olarak yazılmıştı; Yeditepe Rektörü Prof. Dr. Mehmet
           DURMAN'dır (yeditepe.edu.tr/tr/akademik-kadro/4930). Düzeltildi. */
        { name: "Prof. Dr. Mehmet Durman", org: "Yeditepe Üniversitesi — Rektör" },
        { name: "Prof. Dr. Oğuz Bayat", org: "Yeditepe Üniversitesi — Rektör Yardımcısı" },
        { name: "Dr. Öğr. Üyesi Hatice Kübra Akben", org: "Yeditepe Üniversitesi" },
        { name: "Prof. Dr. Ülkü Alver Şahin", org: "İstanbul Üniversitesi" },
        { name: "Prof. Dr. Şule Aydeniz", org: "Yeditepe Üniversitesi" },
        { name: "Dr. Meriam Bouri Yıldız" },
        { name: "Dr. Öğr. Üyesi Volkan Can", org: "Yeditepe Üniversitesi" },
        { name: "Dr. Öğr. Üyesi Zeliha Cansu Canbek Özdil", org: "Yeditepe Üniversitesi" },
        { name: "Prof. Dr. Filiz Çınar Şahin", org: "İstanbul Teknik Üniversitesi" },
        { name: "Dr. Kenan Dalkılıç", org: "State Airports, Hacettepe Üniversitesi" },
        { name: "Doç. Dr. Şeyma Duman", org: "Bursa Teknik Üniversitesi" },
        { name: "Prof. Dr. Tunç Durmaz", org: "Yıldız Teknik Üniversitesi" },
        { name: "Doç. Dr. Ali Rıza Erson" },
        { name: "Prof. Dr. Güldem Kartal Şireli", org: "İstanbul Teknik Üniversitesi" },
        { name: "Prof. Dr. Hasan Can Okutan", org: "İstanbul Teknik Üniversitesi" },
        { name: "Doç. Dr. Didem Ovalı Döndaş", org: "Osmaniye Korkut Ata Üniversitesi" },
        { name: "Dr. Öğr. Üyesi Zahra Ranjbar Navazi", org: "Yeditepe Üniversitesi" },
        { name: "Prof. Dr. Didem Saloğlu Dertli", org: "İstanbul Teknik Üniversitesi" },
        { name: "Prof. Dr. Alper Sarıoğlan", org: "İstanbul Teknik Üniversitesi" },
        { name: "Dr. Öğr. Üyesi Eylül Sezer", org: "Yeditepe Üniversitesi" },
        { name: "Prof. Dr. Fikrettin Şahin", org: "Yeditepe Üniversitesi" },
        { name: "Doç. Dr. Hilal Taymaz Nikerel", org: "Boğaziçi Üniversitesi" },
        { name: "Dr. Öğr. Üyesi Mustafa Tekin", org: "Yeditepe Üniversitesi" },
        { name: "Prof. Dr. Servet Timur", org: "İstanbul Teknik Üniversitesi" },
        { name: "Doç. Dr. Ahmet Turan", org: "Yeditepe Üniversitesi" },
        { name: "Prof. Dr. Tülin Ural", org: "Yeditepe Üniversitesi" },
        { name: "Prof. Dr. Alper Uzun", org: "Koç Üniversitesi" },
        { name: "Monika Vitvarova", org: "Prag Kimya ve Teknoloji Üniversitesi" },
        { name: "Dr. Öğr. Üyesi Halil İbrahim Yavuz", org: "Yeditepe Üniversitesi" },
        { name: "Dr. Öğr. Üyesi Hamed Yousefzadeh", org: "Yeditepe Üniversitesi" },
        { name: "Prof. Dr. Onuralp Yücel", org: "İstanbul Teknik Üniversitesi" }
      ]
    },
    {
      id: "ogrenci",
      name: "Öğrenci Komitesi",
      narrow: true,
      members: [
        { name: "Arş. Gör. Umay Çınarlı", org: "Yeditepe Üniversitesi" },
        { name: "Arş. Gör. Bayram Güneş", org: "Yeditepe Üniversitesi" },
        { name: "Uzm. Aleyna İşler", org: "Yeditepe Üniversitesi" },
        { name: "Uzm. Ahmet Atakan Okutan", org: "Yeditepe Üniversitesi" },
        { name: "Burs. Öğr. Hussein Aldweik", org: "Yeditepe Üniversitesi" },
        { name: "Burs. Öğr. Türkü Sıla Özkan", org: "Yeditepe Üniversitesi" }
      ]
    }
  ];

  /* --- Kişi fotoğrafları ------------------------------------------------
     Fotoğraflar kişilerin KENDİ KURUMLARININ resmî profil sayfalarından
     alınmıştır ve doğrudan o sunuculardan çekilir (hotlink). Bir fotoğrafı
     ancak kişinin kurum sayfasında gördüysem buraya ekledim; adı doğrulanamayan
     hiç kimseye internetten bulunmuş bir görsel konmamıştır.

     Listede olmayan herkes otomatik olarak baş harf avatarıyla gösterilir.
     Bir bağlantı ileride kırılırsa da sayfa avatara döner, kırık görsel çıkmaz.

     Adreslerdeki "?itok=..." parametresi gereksiz: hepsi token'sız ve HTTPS
     üzerinden çalışıyor, o yüzden kısa hâlleri yazıldı. */
  var YU =
    "https://myyu.yeditepe.edu.tr/sites/default/files/styles/large/public/pictures/";
  var YU272 =
    "https://myyu.yeditepe.edu.tr/sites/default/files/styles/272x272_image_style/public/pictures/";
  var YUENG =
    "https://mdbf.yeditepe.edu.tr/sites/eng.yeditepe.edu.tr/files/styles/person_image_270x160/public/";
  var ITU = "https://akademi.itu.edu.tr/PublicPhoto/";

  var PHOTOS = {
    /* Yeditepe Üniversitesi — yeditepe.edu.tr/tr/akademik-kadro/<id> */
    "Prof. Dr. Mehmet Durman": YU + "2024-12/mehmet_durman.jpg",          /* 4930 */
    "Prof. Dr. Oğuz Bayat": YU + "2025-08/oguz-bayat.png",                /* 4931 */
    "Dr. Öğr. Üyesi Hatice Kübra Akben": YU + "2025-08/hatice.png",       /*  639 */
    "Prof. Dr. Şule Aydeniz": YU + "2024-07/sule_aydeniz_0.jpg",          /*  427 */
    "Doç. Dr. Ahmet Turan": YU + "2024-12/dscf5986-min_2_0.jpg",          /*  756 */
    "Dr. Öğr. Üyesi Zahra Ranjbar Navazi":
      YU + "2024-12/246474_zehra_navazi_2_copy.jpg",                      /* 4190 */
    "Dr. Öğr. Üyesi Eylül Sezer": YU + "2024-12/eylulsezer.png",          /* 2742 */
    "Prof. Dr. Tülin Ural": YU + "2024-07/tulin_ural.jpg",                /* 3419 */
    "Dr. Öğr. Üyesi Halil İbrahim Yavuz": YU + "2025-08/halil.png",       /* 4205 */
    "Dr. Öğr. Üyesi Hamed Yousefzadeh": YU + "2024-12/hy.png",            /* 3121 */
    "Dr. Öğr. Üyesi Mustafa Tekin": YU + "2025-08/mustafa.png",           /* 4163 */
    /* Profil sayfası (id 175) kopuk ama dosya sunucuda duruyor. */
    "Prof. Dr. Fikrettin Şahin": YU + "2024-12/fikrettin_sahin%20%281%29.jpg",
    /* Dosya adı "personel.png" olsa da içeriği gerçek bir portredir. */
    "Dr. Öğr. Üyesi Zeliha Cansu Canbek Özdil": YU + "2025-08/personel.png",
    "Arş. Gör. Bayram Güneş": YU272 + "2024-12/124518_dijital.jpg",
    "Arş. Gör. Umay Çınarlı": YU272 + "2024-12/umay_cinarli_vesikalikrev.jpeg",
    "Uzm. Aleyna İşler": YUENG + "2026-07/aleyna-isler.png.webp",
    "Uzm. Ahmet Atakan Okutan": YUENG + "2026-07/ahmet-atakan-okutan.png.webp",

    /* İstanbul Teknik Üniversitesi — akademi.itu.edu.tr/<kullanıcı>/ */
    "Prof. Dr. Onuralp Yücel":
      ITU + "6cea43ee-3342-40bf-b48e-155a8fdc3fbe.jpg",                   /* yucel      */
    "Prof. Dr. Servet Timur":
      ITU + "a321263a-2ee2-44ed-bbf6-0881be22c045.jpg",                   /* timur      */
    "Prof. Dr. Filiz Çınar Şahin":
      ITU + "901824b2-7f46-4d07-a707-b270da3df2a4.jpg",                   /* cinar      */
    "Prof. Dr. Güldem Kartal Şireli":
      ITU + "aa778407-2ee3-4153-a987-46488db67352.jpg",                   /* kartalgu   */
    "Prof. Dr. Hasan Can Okutan":
      ITU + "fef55de9-66a7-424d-a000-d7ff34d5db6a.jpg",                   /* okutan     */
    "Prof. Dr. Didem Saloğlu Dertli":
      ITU + "c4d9198e-0a7b-4e6a-8306-31ac0b24b773.jpg",                   /* saloglu    */
    "Prof. Dr. Alper Sarıoğlan":
      ITU + "78502145-0e3f-4efd-a9d5-6bbccd064585.jpg",                   /* asarioglan */

    /* Diğer kurumlar */
    "Prof. Dr. Ülkü Alver Şahin":
      "https://avesis.iuc.edu.tr/user/image/3087",       /* İstanbul Ü. – Cerrahpaşa */
    "Prof. Dr. Tunç Durmaz":
      "https://avesis.yildiz.edu.tr/user/image/3925",    /* Yıldız Teknik Ü.         */
    "Doç. Dr. Şeyma Duman":
      "https://depo.btu.edu.tr/img/profil_resim/1494169890sdjabdai.png", /* Bursa Teknik Ü. */
    "Prof. Dr. Alper Uzun":
      "https://cdn.ku.edu.tr/auzun.jpg",                 /* Koç Ü. — eng.ku.edu.tr */

    /* --- LinkedIn profil fotoğrafları --------------------------------------
       Aşağıdaki adresler proje ekibi tarafından verildi ve kurum sayfalarında
       fotoğrafı bulunmayan kişiler için kullanılıyor.

       DİKKAT — bunlar kurum sunucuları kadar kalıcı DEĞİL:
       1) İmzalı adreslerdir; "e=" parametresi son kullanma tarihini taşır.
          "e=2147483647" pratikte süresizdir, ama LinkedIn adresleri kişi
          fotoğrafını değiştirdiğinde de yenilenir ve eskisi ölür.
       2) Ali Rıza Erson'un adresi 24 Eylül 2026'da sona eriyor (çalıştaydan
          3 gün sonra). O tarihten sonra avatara döner.
       Kalıcı çözüm: görselleri indirip assets/kisiler/ altına koymak. */
    "Dr. Öğr. Üyesi Volkan Can":
      "https://media.licdn.com/dms/image/v2/D4E03AQHIWggXc1MlmA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701847719319?e=2147483647&v=beta&t=hX8xkDkiuy_4k2MBr5euGUM6SauiRH9C_byfwyc3cg0",
    "Doç. Dr. Hilal Taymaz Nikerel":
      "https://media.licdn.com/dms/image/v2/C4E03AQG8KRhjGlgARQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1566284114435?e=2147483647&v=beta&t=rsqyecLNy44bzIlo120qiMwhdQ84nF5cm9Otqcco8qY",
    "Doç. Dr. Didem Ovalı Döndaş":
      "https://media.licdn.com/dms/image/v2/C4E03AQEYjC-OJW_9hQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1592471719821?e=2147483647&v=beta&t=PFOnQOH_3A4lQh18IixOpsobKkVWLxVu7AeEon-cp3I",
    /* Bu adres 2026-09-24'te sona eriyor. */
    "Doç. Dr. Ali Rıza Erson":
      "https://media.licdn.com/dms/image/v2/D4E03AQEj3_eu9DRYjA/profile-displayphoto-scale_400_400/B4EZ7L1gcbJIAk-/0/1781536262950?e=1790208000&v=beta&t=N39KctLj0oyySv0RYwkbfkXiqD00yfOEGzWlUUY5cIY",
    "Monika Vitvarova":
      "https://media.licdn.com/dms/image/v2/D4D03AQHNGQef_GHUyA/profile-displayphoto-shrink_200_200/B4DZcVZSP6GUAY-/0/1748410639709?e=2147483647&v=beta&t=t8DL14qxbpzH2RZ0SkfdSS3cLyqFhkcc_kbOhSKRnik",

    /* ResearchGate CDN'i sunucu tarafı isteklere 403 veriyor (tam tarayıcı
       başlıkları ve Referer ile de). Ziyaretçinin tarayıcısında açılma
       ihtimali var; açılmazsa onerror ile baş harf avatarına döner, yani
       eklemenin bir zararı yok. Kesin çözüm: dosyayı indirip
       assets/kisiler/ altına koymak. */
    "Dr. Kenan Dalkılıç":
      "https://i1.rgstatic.net/ii/profile.image/418960303509504-1476899328412_Q512/Kenan-Dalkilic.jpg"

    /* Fotoğrafı hâlâ olmayan 3 kişi:
       - Burs. Öğr. Hussein Aldweik, Burs. Öğr. Türkü Sıla Özkan → akademik
         kadro dizininde kayıt yok.
       - Dr. Meriam Bouri Yıldız → Yeditepe Genetik ve Biyomühendislik'te
         doktora sonrası araştırmacı olduğu için akademik kadro dizininde
         profili yok. ResearchGate ve SciProfiles sayfaları var ama her
         ikisinin de sunucusu dış isteklere 403 veriyor, fotoğraf adresi
         alınamıyor.

       Not: Yeditepe bölüm "akademik kadro" sayfaları içeriği tamamen
       tarayıcıda (JavaScript ile) üretiyor; sunucudan gelen HTML'de isim de
       fotoğraf da yok. Dosya adı tahmini (ad-soyad.png.webp) ve Drupal'ın
       big_pipe_nojs modu da sonuç vermedi. Bu yüzden kalan isimler toplu
       olarak taranamıyor; adresleri tarayıcıdan tek tek almak gerekiyor. */
  };

  /* Fotoğrafları isimden eşleştirip üyelere ekler. Aynı kişi birden fazla
     komitede olsa da tek yerden yönetilir. */
  committees.forEach(function (c) {
    c.members.forEach(function (m) {
      if (PHOTOS[m.name]) m.photo = PHOTOS[m.name];
    });
  });

  /* --- Sıkça sorulan sorular -------------------------------------------- */
  var faq = [
    {
      q: "Çalıştaya katılım ücretli mi?",
      a: "Hayır. Çalıştaya katılım tamamen ücretsizdir ve katılımcılara katılım sertifikası verilir. Kontenjan sınırlı olduğu için ön kayıt yapılması gerekmektedir."
    },
    {
      q: "Kimler katılabilir?",
      a: "Karbon yakalama, değerlendirme, depolama ve kaynak verimliliği alanlarında çalışan akademisyenler, lisansüstü öğrenciler, araştırmacılar ile sanayi ve kamu temsilcileri katılabilir."
    },
    {
      q: "Kayıt onayını nasıl alacağım?",
      a: "Kayıt formunu doldurduktan sonra e-posta adresinize bir onay iletisi gönderilir. Onay iletisi ulaşmazsa lütfen iletişim sayfasından bize yazın."
    },
    {
      q: "Kampüse araçla gelebilir miyim?",
      a: "Evet. Araçla gelecek katılımcıların kayıt formundaki araç plakası alanını doldurması, kampüs girişindeki işlemleri hızlandırır."
    },
    {
      q: "Sertifika nasıl verilecek?",
      a: "Katılım sertifikaları çalıştay sonunda, kapanış oturumunun ardından takdim edilir. Gün içinde katılım listesinin imzalanması gerekir."
    },
    {
      q: "Sunum veya poster başvurusu yapabilir miyim?",
      a: "Bildiri çağrısı, gönderim biçimi ve değerlendirme takvimi Bilim Kurulu tarafından belirlendikten sonra Konuşmacılar sayfasında duyurulacaktır."
    },
    {
      q: "Program kesinleşti mi?",
      a: "Program sayfasındaki akış taslaktır. Oturum başlıkları ve davetli konuşmacılar kesinleştikçe aynı sayfada güncellenecek ve PDF olarak indirilebilir hâle getirilecektir."
    },
    {
      q: "Öğle yemeği ve ikramlar dâhil mi?",
      a: "Evet. Gün boyu kahve araları ve öğle arası ikramları organizasyon tarafından karşılanmaktadır."
    }
  ];

  return {
    event: event,
    nav: nav,
    logos: logos,
    disclaimer: disclaimer,
    topics: topics,
    process: process,
    program: program,
    committees: committees,
    faq: faq
  };
})();
