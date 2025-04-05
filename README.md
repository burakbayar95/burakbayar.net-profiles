# Sosyal Medya Bağlantı Sayfası

Bu basit web sayfası, tüm sosyal medya hesaplarınızı tek bir yerde toplamak için tasarlanmıştır. Tasarım modern, sade ve mobil uyumludur.

## Özellikler

- Mobil öncelikli (responsive) tasarım
- Platform bağlantıları için şık ve kullanıcı dostu arayüz
- Mobil cihazlarda uygulamaya doğrudan açılma (deep-linking) özelliği
- Uygulama yüklü değilse web sürümüne yönlendirme
- Kolay özelleştirilebilir kod yapısı

## Nasıl Özelleştirilir?

### Profil Bilgilerinizi Güncelleyin

1. `index.html` dosyasında:
   - Başlıktaki adınızı değiştirin: `<h1>Burak BAYAR</h1>`
   - Bio metninizi değiştirin: `<p class="bio">Kısa bio yazısı burada olacak...</p>`

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

### Renk ve Stil Değişiklikleri

Renkleri ve stilleri değiştirmek için `styles.css` dosyasını düzenleyebilirsiniz:

- Arka plan rengini değiştirmek: `body { background-color: #f5f5f5; }`
- Profil resmi boyutunu değiştirmek: `.profile-picture { width: 120px; height: 120px; }`
- Platform renklerini değiştirmek: `.instagram { background: linear-gradient(...); }`

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
    background-color: #RENK_KODU;
}
```

## Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript
- Font Awesome ikonları

## Sayfayı Çalıştırma

Dosyaları bir web sunucusuna yükleyerek ya da doğrudan tarayıcıda açarak sayfayı görüntüleyebilirsiniz. 