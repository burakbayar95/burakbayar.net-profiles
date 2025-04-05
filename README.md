# Sosyal Medya Bağlantı Sayfası

Bu web sayfası, tüm sosyal medya hesaplarınızı estetik ve etkileyici bir şekilde tek bir yerde toplayan bir kişisel portfolyo sayfasıdır. Modern, şık ve tamamen responsive bir tasarıma sahiptir.


## Özellikler

- Etkileyici Matrix yağmur animasyonu arka planı
- Çarpıcı gradyan renk geçişleri ve efektler
- Platform bağlantıları için parlama animasyonlu şık butonlar
- Mobil cihazlarda uygulama açma (deep-linking) özelliği
- Responsive ve mobil uyumlu tasarım
- Optimum performans için mobil cihaz algılama ve animasyon yavaşlatma
- Transparan ve blur efektli bileşenler
- Kolay özelleştirilebilir kod yapısı

## Nasıl Özelleştirilir?

### Profil Bilgilerinizi Güncelleyin

1. `index.html` dosyasında:
   - Profil adınızı değiştirin: `<div class="profile-name">Burak BAYAR</div>`
   - Bio metninizi düzenleyin: 
     ```html
     <div class="bio">
       <p>Paragraf 1</p>
       <p>Paragraf 2</p>
     </div>
     ```

2. Profil resminizi değiştirmek için:
   - `profile.jpg` dosyasını kendi profil resminizle değiştirin (tercihen kare formatlı bir resim)

### Sosyal Medya Bağlantılarınızı Güncelleyin

Her sosyal medya platform için `index.html` dosyasında:

```html
<a href="https://www.instagram.com/burakbayar/" class="social-link instagram" data-app-link="instagram://user?username=burakbayar">
    <div class="icon"><i class="fab fa-instagram"></i></div>
    <div class="username">@burakbayar</div>
</a>
```

- `href` özelliğini web bağlantınızla değiştirin
- `data-app-link` özelliğini mobil uygulama bağlantınızla değiştirin
- `username` içeriğini kendi kullanıcı adınızla değiştirin

### Animasyon ve Efektleri Özelleştirme

#### Matrix Animasyonu

`matrix.js` dosyasını düzenleyerek:

- Animasyon hızını ayarlayabilirsiniz: `drops[i] += isMobile ? 0.8 : 0.6;`
- Karakter setini değiştirebilirsiniz: `const chars = '01アイウエオカキクケコサシスセソタチツテト...';`
- Rengi değiştirebilirsiniz: `ctx.fillStyle = 'rgba(0, 255, 0, ${randomOpacity})';`

#### Buton Efektleri

`styles.css` dosyasında:

- Buton parlamasını değiştirebilirsiniz: `.social-link::before { animation: linkSweep 6s ease-in-out infinite; }`
- Renk geçişlerini düzenleyebilirsiniz: 
  ```css
  .instagram {
    background: linear-gradient(45deg, 
        rgba(131, 58, 180, 0.4) 20%, 
        rgba(253, 29, 29, 0.4) 50%, 
        rgba(252, 176, 69, 0.4) 80%);
  }
  ```

## Yeni Platform Ekleme

Yeni bir sosyal medya platformu eklemek için, `index.html` dosyasında `social-links` sınıfı içine yeni bir bağlantı ekleyin:

```html
<a href="WEB_BAĞLANTISI" class="social-link PLATFORM_SINIFI" data-app-link="UYGULAMA_BAĞLANTISI">
    <div class="icon"><i class="fab fa-PLATFORM_IKONU"></i></div>
    <div class="username">KULLANICI_ADI</div>
</a>
```

Sonra `styles.css` dosyasına yeni platformun stilini ekleyin:

```css
.PLATFORM_SINIFI {
    background: linear-gradient(45deg, 
        rgba(R, G, B, 0.4) 20%, 
        rgba(R, G, B, 0.4) 50%, 
        rgba(R, G, B, 0.4) 80%);
    background-size: 300% 300%;
    animation: gradientAnimation 6s ease infinite;
    backdrop-filter: blur(3px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## Kullanılan Teknolojiler

- HTML5
- CSS3 (Animasyonlar, Gradyan efektler, Blur efektleri)
- JavaScript (Canvas API, Mobil algılama)
- Font Awesome ikonları

## Performans İpuçları

Sayfanın performansını iyileştirmek için:

- Matrix animasyonu mobil cihazlarda otomatik olarak optimize edilir
- Kaydırma sırasında animasyonlar duraklatılır
- Mobile-first tasarım ilkeleri kullanılmıştır
- Butonlarda pasif event listener'lar kullanılmıştır

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız. 