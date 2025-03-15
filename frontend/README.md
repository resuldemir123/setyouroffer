# React Projesinde Eksik JS Bağlantılarını Düzeltme

Bu belge, React tabanlı bir projede yerel JavaScript dosyalarının eksik veya hatalı bağlantılarını nasıl kontrol edip düzelteceğinizi açıklar.

## 1️⃣ Projeyi Başlatma
Öncelikle, projenin çalışabilir olduğundan emin olun. Terminal veya komut istemcisine şu komutu girerek projeyi başlatabilirsiniz:

```sh
npm install  # Bağımlılıkları yükleyin
npm run dev   # Geliştirme modunda başlatın
```

Eğer hata alıyorsanız, aşağıdaki adımları izleyerek eksik bağlantıları düzeltebilirsiniz.

---

## 2️⃣ Ana Giriş Dosyasını Kontrol Et (`main.jsx` veya `index.jsx`)

Projenizin `src` klasöründe **`main.jsx` veya `index.jsx`** olup olmadığını kontrol edin. Eğer bu dosya eksikse veya yanlış adlandırılmışsa, React uygulamanız başlamayacaktır.

📌 **Örnek `main.jsx` dosyası:**
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // App bileşeni buraya bağlı mı?

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

📌 **Yapılacaklar:**
- Eğer `main.jsx` yoksa, oluşturun.
- Eğer `App` bileşeni bulunamıyorsa, dosya yollarını kontrol edin.

---

## 3️⃣ Eksik veya Hatalı Importlar
Bileşenlerin (`components`, `pages` vs.) import edildiği yolları kontrol edin. Büyük/küçük harf duyarlılığına dikkat edin.

❌ **Yanlış:**
```jsx
import Navbar from "./Components/Navbar";  // 'Components' klasörü büyük harfle yazılmışsa hata verebilir
```

✅ **Doğru:**
```jsx
import Navbar from "./components/Navbar";  // Klasör ismi küçük harf olmalı
```

📌 **Yapılacaklar:**
- Bileşenlerin doğru yoldan import edildiğini kontrol edin.
- Büyük/küçük harf hatalarını düzeltin.

---

## 4️⃣ `index.html` İçindeki Script Bağlantılarını Kontrol Et
Vite projelerinde genellikle `index.html` içinde `<script>` etiketi bulunmaz. Eğer şu şekilde bir bağlantı varsa, kaldırın:

```html
<script src="./src/main.js"></script>  <!-- Bu gereksizdir, kaldırılmalı -->
```

Çünkü React, `index.html` içinde script olarak değil, `main.jsx` içinde başlatılır.

---

## 5️⃣ Tarayıcı Konsolundaki Hataları Kontrol Et

Tarayıcıda **Geliştirici Araçları (F12) → Console** sekmesine giderek hata mesajlarını kontrol edin.

- Eğer **"Module not found"** hatası alıyorsanız, dosyanın eksik veya yanlış import edildiğini gösterir.
- Hata mesajlarını dikkatlice okuyarak eksik veya yanlış bağlantıları düzeltin.

---

## 🔧 Sorun Giderme
| Hata Mesajı | Çözüm |
|-------------|-------|
| `Module not found` | Dosyanın import edildiği yolu kontrol edin. |
| `Cannot find module` | Bağımlılıkları yüklemek için `npm install` çalıştırın. |
| `Error: root element not found` | `index.html` içindeki `id="root"` div'ini kontrol edin. |

Eğer hala çözemediğiniz bir hata varsa, hata mesajını paylaşarak destek alabilirsiniz! 🚀

