# 📦 Cara Build APK dengan EAS

## 🚀 Quick Start

### 1. Install EAS CLI

```bash
npm install -g eas-cli
```

### 2. Login ke Expo

```bash
eas login
```

Masukkan email dan password Expo account Anda. Jika belum punya, daftar di https://expo.dev/

### 3. Configure EAS

```bash
cd PengingatBelajarV2
eas build:configure
```

Pilih:
- Platform: **Android**
- Bundle identifier sudah oke (biarkan default)

### 4. Build APK

```bash
eas build --platform android --profile preview
```

**Pilihan saat ditanya:**
- Generate a new Android Keystore? → **Yes**
- Build will be created. Continue? → **Yes**

**Proses build:**
- ⏱️ Waktu: 10-15 menit
- 📊 Progress bisa dilihat di terminal atau https://expo.dev/accounts/[username]/projects/pengingat-belajar-v2/builds

### 5. Download APK

Setelah selesai:
- Link download akan muncul di terminal
- Atau buka https://expo.dev dan download dari dashboard
- Share link ke teman/keluarga untuk install

---

## 📱 Install APK di Android

### Cara 1: Scan QR Code
1. Setelah build selesai, akan ada QR code
2. Scan dengan camera HP Android
3. Download & install APK

### Cara 2: Download Manual
1. Copy link APK dari terminal
2. Buka di browser HP
3. Download APK
4. Buka file → Install
5. (Jika ada warning "Unknown sources", allow dari Settings)

---

## 🎯 Build Types

### Preview Build (Recommended untuk Testing)
```bash
eas build --platform android --profile preview
```
- APK file (langsung install)
- Ukuran file lebih besar
- Cocok untuk testing

### Production Build (Untuk Play Store)
```bash
eas build --platform android --profile production
```
- AAB file (untuk upload ke Play Store)
- Optimized & smaller
- Perlu Play Store untuk distribusi

---

## ⚙️ Konfigurasi Lanjutan (Optional)

### Edit `eas.json` untuk custom settings:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

### Edit `app.json` untuk app info:

```json
{
  "expo": {
    "name": "Pengingat Belajar",
    "slug": "pengingat-belajar-v2",
    "version": "1.0.0",
    "android": {
      "package": "com.yourname.pengingatbelajar",
      "versionCode": 1
    }
  }
}
```

---

## 🐛 Troubleshooting

### Error: "Not logged in"
```bash
eas login
```

### Error: "Project not configured"
```bash
eas build:configure
```

### Error: "Build failed"
- Check console logs
- Biasanya dependency issue
- Run: `npm install` lalu build ulang

### APK tidak bisa install
- Enable "Install from unknown sources" di Settings
- Atau: Settings → Apps → Special access → Install unknown apps → Chrome (allow)

---

## 📊 Build Status

Check build progress:
```bash
eas build:list
```

View specific build:
```bash
eas build:view [BUILD_ID]
```

---

## 🎉 Setelah Build Berhasil

### Testing APK:
1. ✅ Install di HP sendiri
2. ✅ Test semua fitur (add, edit, delete)
3. ✅ Test notifikasi (set reminder 2 menit dari sekarang)
4. ✅ Test data persistence (close & reopen app)
5. ✅ Share ke teman untuk test

### Distribusi:
- Share link download langsung
- Upload ke Google Drive / Dropbox
- Atau submit ke Play Store

---

## 🏪 Submit ke Google Play Store (Optional)

1. **Buat Developer Account** ($25 one-time fee)
   - https://play.google.com/console/

2. **Build Production AAB**
   ```bash
   eas build --platform android --profile production
   ```

3. **Upload ke Play Console**
   - Create new app
   - Upload AAB file
   - Fill app details (screenshots, description, etc)
   - Submit for review

4. **Wait for Review** (1-3 days)

---

## 💰 Estimasi Biaya

- **EAS Build**: Gratis (limited builds per month)
- **Play Store**: $25 (one-time, kalau mau publish)
- **Expo Account**: Gratis (hobby tier)

**Upgrade jika perlu:**
- Production plan: $29/month (unlimited builds)

---

## 📝 Tips

✅ **Test di Expo Go dulu** sebelum build
✅ **Increment version** setiap build baru
✅ **Backup keystore** (auto-saved by EAS)
✅ **Use consistent package name**
✅ **Test APK thoroughly** sebelum distribusi

---

## 🆘 Need Help?

- EAS Docs: https://docs.expo.dev/build/introduction/
- Expo Forum: https://forums.expo.dev/
- Discord: https://chat.expo.dev/

---

**Good luck with your build! 🚀**
