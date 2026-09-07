# KYDD 2026 — Çalıştay Tanıtım Sitesi

**COP31'e Doğru Kaynak Verimliliği ve Düşük Karbonlu Dönüşüm Çalıştayı**
(KYDD 2026) için düz HTML + CSS + JavaScript ile yazılmış statik site. Build
aracı, paket yöneticisi veya sunucu tarafı bileşen yoktur — klasör olduğu gibi
bir web sunucusuna kopyalandığında çalışır.

## Etkinlik bilgileri

| | |
|---|---|
| Tarih | 21 Eylül 2026, Pazartesi |
| Saat | 09.00 – 18.00 |
| Yer | Yeditepe Üniversitesi Rektörlük Binası, Mario Levi Salonu (Yeşil Salon) |
| Adres | İnönü Mah., Kayışdağı Cd., 34755 Ataşehir / İstanbul |
| Katılım | Ücretsiz, katılım sertifikalı, kontenjan sınırlı |
| Düzenleyen | Yeditepe Üniversitesi Karbon Çözümleri Uygulama ve Araştırma Merkezi |

Bilgiler 3 Eylül 2026 tarihli tanıtım afişinden alınmıştır.

## Yapı

```
index.html          Ana sayfa (hero + geri sayım + hakkında + odak alanları +
                    program önizleme + sayılarla + komiteler + SSS + kayıt CTA)
program.html        Tam gün akış (taslak)
konusmacilar.html   Yer tutucu + bildiri çağrısı + kurullar
kayit.html          Kayıt formu + SSS
iletisim.html       İletişim formu + adres + harita
assets/
  kydd2026-afis.jpeg  Tanıtım afişi, hero görseli         (900x1600)
  bakanlik-logo.jpg   T.C. Sanayi ve Teknoloji Bakanlığı  (1349x438)
  yeditepe-logo.png   Yeditepe Üniversitesi               (600x600)
  istka-logo.png      İstanbul Kalkınma Ajansı            (530x383)
  css/style.css       tek ortak stil dosyası
  js/site-data.js     TÜM İÇERİK VERİSİ — düzenlenecek tek dosya
  js/layout.js        veriden HTML üretir (menü, alt bilgi, listeler)
  js/main.js          etkileşimler (menü, geri sayım, akordeon, form)
```

## İçerik nasıl güncellenir

> **Neredeyse her değişiklik için yalnızca `assets/js/site-data.js` düzenlenir.**
> HTML sayfalarına dokunmanız gerekmez.

Bu dosyada şunlar durur ve sayfalara otomatik yansır:

| Ne değişecek | `site-data.js` içinde |
|---|---|
| Tarih, saat, salon, adres, telefon | `event` |
| Geri sayım hedefi | `event.startsAt` (ISO 8601, `+03:00`) |
| Üst menü ve alt bilgi bağlantıları | `nav` |
| Logolar ve bağlantıları | `logos` |
| Odak alanı kartları (ikon dâhil) | `topics` |
| "Karbonun yolculuğu" süreç şeması | `process` |
| Afiş görseli | `event.poster` |
| Program akışı | `program.items` |
| Komite üyeleri | `committees` |
| Kişi fotoğrafları | `PHOTOS` (isimden eşleşir) |
| Sıkça sorulan sorular | `faq` |
| Alt bilgi şerh metni | `disclaimer` |

Üye sayısı rozetleri (`31 üye` vb.) listeden otomatik sayılır — elle yazılmaz.
Harita, `event.mapQuery` adresinden üretilir.

HTML tarafında veri şu iki yolla kullanılır:

- `<div data-kydd="program"></div>` → bölümün tamamını `layout.js` basar
  (`header`, `footer`, `factbar`, `topics`, `process`, `program`,
  `program-preview`, `committees`, `faq`, `stats`, `poster`, `poster-full`,
  `map`).
- `<span data-kydd-text="event.dateText"></span>` → tek bir değeri yazar.

**Not:** Başlık ve alt bilgi JavaScript ile üretildiği için site JavaScript
kapalıyken menüsüz görünür. Sayfa metinleri HTML'de statik durduğundan
içerik yine okunur.

## Komite fotoğrafları

`site-data.js` içindeki `PHOTOS` sözlüğü, kişi adını fotoğraf adresine
eşler. Fotoğraflar **kişilerin kendi kurumlarının sunucularından doğrudan
çekilir** (hotlink); projeye kopyalanmaz.

- Bir fotoğraf yalnızca kişinin **kurumunun resmî profil sayfasında**
  görüldüyse eklenmiştir. Kimliği doğrulanamayan hiç kimseye internetten
  bulunmuş bir görsel konmamıştır.
- `PHOTOS` içinde olmayan herkes, adının baş harflerinden üretilen renkli
  bir avatarla gösterilir.
- Bir bağlantı ileride kırılırsa `onerror` ile yine avatara düşer; sayfada
  kırık görsel çıkmaz.

**Hotlink'in riski:** kurumlar dosya yolunu değiştirirse o fotoğraflar
sessizce avatara döner. Kalıcı çözüm için fotoğrafları (izin alarak)
`assets/kisiler/` altına indirip `PHOTOS` adreslerini yerel yollarla
değiştirin.

## Yerel önizleme

```
python -m http.server 8000
```

Ardından http://127.0.0.1:8000 adresini açın. Dosyaya çift tıklayarak açmak da
çalışır (`file://` altında da test edilmiştir).

## Yapılacaklar

- [ ] **Form `action` adreslerini bağlayın.** `kayit.html` ve `iletisim.html`
      içindeki `<form action="">` boş. Boş kaldığı sürece `main.js` formu
      göndermez, sadece alanları doğrular ve bilgi mesajı gösterir.
- [ ] Program kesinleştiğinde `site-data.js` → `program.items` güncellenip
      `program.draft` `false` yapılmalı; PDF bağlantısı eklenmeli.
- [ ] Davetli konuşmacılar kesinleştiğinde `konusmacilar.html` yer tutucusu
      değiştirilmeli.
- [ ] KVKK aydınlatma metni yazıldığında formlardaki onay kutusu etiketine
      bağlantı eklenmeli (`kayit.html`, `iletisim.html` — `#kvkk` alanı).
- [ ] Afişteki **Yeditepe 30. yıl** ve **KARBON merkezi** logoları dosya olarak
      elde edilirse `assets/` içine konup `site-data.js` → `logos` dizisine
      eklenebilir. (Not: logo şeridine ekleme yapmadan önce aşağıdaki İSTKA
      görünürlük kurallarını okuyun.)
- [ ] İletişim telefonu KYDD 2025 sitesinden alındı (+90 534 376 83 13).
      2026 için değişecekse `site-data.js` → `event.phone` güncellenmeli.

## Logo görünürlük kuralları (İSTKA Görünürlük Rehberi)

Tüm ölçüler `assets/css/style.css` içindeki `:root` değişkenlerinden yönetilir.

Logolar iki yerde görünür: **üst menüde** "Kayıt Ol" düğmesinin yanındaki
beyaz grupta (`.header-logos`) ve **alt bilgide** şerh metninin yanında.

- **Sıra (s. 14):** Bakanlık en solda, İSTKA en sağda, yararlanıcı (Yeditepe)
  ortada. Sıra `site-data.js` → `logos` dizisinden gelir; değiştirmeyin.
- **Eşit boyut (s. 14):** Bakanlık ve İSTKA logoları her iki yerleşimde de
  aynı yüksekliktedir — üst menüde `--header-logo-h` (42 px; ≤1180 px'te
  34 px, ≤720 px'te 30 px), alt bilgide `--footer-logo-h` (90 px, ≥768 px'te
  110 px).
- **⚠ İSTKA asgari ölçüsü (s. 13):** sanal ortamda 120×84 px. Bu ölçü
  **alt bilgide sağlanır** (90/110 px yükseklik → 125/152 px genişlik).
  **Üst menüdeki logo grubu bu asgari ölçünün altındadır** (42 px), çünkü
  gezinme çubuğuna sığması gerekiyor. Rehbere tam uyum isteniyorsa iki
  seçenek var: `--header-logo-h` değerini 84 px'e çıkarmak (başlık belirgin
  biçimde yükselir) veya logoları yeniden sayfanın en üstünde ayrı bir
  şeride almak. Karar proje ekibinindir.
- **Güvenlik alanı (s. 12–13):** X = 1/4 R. Marka dairesi logo yüksekliği
  kadar olduğundan `--header-istka-x` = logo yüksekliği / 4. İSTKA logosunun
  solunda 3X (grup boşluğu X + ek 2X), diğer yönlerde X korunur. Alt bilgide
  logolar arası boşluk `max(4rem, --footer-logo-h × 0.75)` ile 3X'in
  üzerindedir.
- **Yararlanıcı logosu sınırı (s. 14):** dikey/kare logolar Bakanlık **arma
  çapını** aşamaz. Arma, çerçeveli yatay Bakanlık logosunun yüksekliği
  `bakanlik-logo.jpg` (1349×438) üzerinde ölçüldü: arma çapı 210 px, yani
  yüksekliğin **%47,9**'u (`--arma-orani: 0.48`). `yeditepe-logo.png`
  (600×600) çevresinde beyaz boşluk olduğu için görünür marka dosyanın
  yalnızca **%63,5**'ini kaplar (`--yeditepe-doluluk`); sınır görünür markaya
  uygulandığından logo kutusu taban yüksekliğin ≈%75,6'sı olur (42 px'te
  32 px kutu, 20 px görünür = arma çapı). Logo dosyalarından biri değişirse
  bu iki oran yeniden ölçülmelidir.
- **Şerh metni (s. 15):** alt bilgideki metin rehberdeki ifadeyle birebir
  aynıdır (`site-data.js` → `disclaimer`); değiştirmeyin.
- **Bağlantılar (s. 24):** Bakanlık → www.sanayi.gov.tr, İSTKA →
  www.istka.org.tr; şerh metni sayfanın en altındadır.

Logolar `max-height` + `max-width: 100%` ile ölçeklenir: dar ekranda en/boy
oranı bozulmaz ve şerit hiçbir genişlikte yatay taşma yapmaz.
