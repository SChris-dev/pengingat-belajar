# 📚 Aplikasi Pengingat Belajar

Aplikasi mobile untuk mengingatkan jadwal belajar dengan notifikasi lokal. Dibuat dengan Expo React Native.

## ✨ Fitur

✅ **Tambah Pengingat** - Buat pengingat belajar dengan judul dan waktu
✅ **Edit Pengingat** - Ubah detail pengingat yang sudah ada
✅ **Hapus Pengingat** - Hapus pengingat yang tidak diperlukan
✅ **Notifikasi Lokal** - Notifikasi muncul tepat waktu (meski app ditutup)
✅ **Pengulangan** - Pilihan harian atau sekali saja
✅ **Data Persisten** - Data tersimpan lokal dengan AsyncStorage
✅ **UI Modern** - Antarmuka clean dan mudah digunakan

## 🛠️ Teknologi

- **Framework**: Expo React Native (SDK 54)
- **Language**: JavaScript
- **Storage**: AsyncStorage
- **Notifications**: expo-notifications
- **State Management**: Context API + Hooks
- **Navigation**: Custom simple navigator

## 📱 Cara Menjalankan

### Development (Expo Go)

```bash
# Install dependencies
cd PengingatBelajarV2
npm install

# Start development server
npm start

# Scan QR code dengan Expo Go app
```

### Build APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK
eas build --platform android --profile preview
```

**Detail lengkap di:** `BUILD_APK_GUIDE.md`

## 📁 Struktur Folder

```
PengingatBelajarV2/
├── app/
│   ├── components/        # UI Components
│   │   ├── ReminderCard.js
│   │   ├── EmptyState.js
│   │   └── LoadingSpinner.js
│   ├── screens/          # App Screens
│   │   ├── HomeScreen.js
│   │   ├── AddReminderScreen.js
│   │   └── EditReminderScreen.js
│   ├── context/          # State Management
│   │   └── ReminderContext.js
│   ├── hooks/            # Custom Hooks
│   │   └── useReminders.js
│   ├── services/         # Business Logic
│   │   ├── reminderService.js
│   │   └── notificationService.js
│   └── navigation/       # Navigation
│       └── SimpleNavigator.js
├── storage/              # AsyncStorage wrapper
│   └── index.js
├── utils/                # Helpers & Constants
│   ├── constants.js
│   └── helpers.js
├── App.js               # Entry point
└── eas.json             # Build configuration
```

## 🎯 Cara Menggunakan

### 1. Tambah Pengingat
- Tap tombol **"+"** di kanan bawah
- Isi judul (contoh: "Belajar Matematika")
- Pilih jam pengingat
- Pilih "Harian" atau "Sekali Saja"
- Tap "Simpan Pengingat"

### 2. Edit Pengingat
- Tap pada card reminder
- Ubah judul, jam, atau pengulangan
- Tap "Simpan Perubahan"

### 3. Hapus Pengingat
- Tap icon 🗑️ di card reminder
- Atau tap card → tap 🗑️ di header
- Konfirmasi hapus

### 4. Test Notifikasi
- Buat reminder 2 menit dari sekarang
- Close app (swipe dari recent apps)
- Tunggu 2 menit
- Notifikasi akan muncul! 🔔

## 📊 Data Model

```javascript
{
  "id": "unique-id",
  "title": "Belajar Matematika",
  "hour": 19,
  "minute": 0,
  "repeat": true,
  "notificationId": "notification-id",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

### Clear Cache

```bash
npm start -- --clear
```

### View Logs

```bash
# Di terminal akan muncul logs seperti:
LOG  🚀 Initializing app...
LOG  ✅ Notification permission granted
LOG  📚 Loaded reminders: 3
LOG  ✅ Reminder saved: Belajar Matematika
```

## 🐛 Troubleshooting

### Notifikasi tidak muncul
- Cek izin notifikasi di Settings → Apps
- Matikan Battery Optimization untuk app ini
- Pastikan app tidak di-force stop

### Data hilang
- Data tersimpan di AsyncStorage (lokal)
- Jika uninstall app, data akan hilang
- Untuk backup, perlu implement export/import feature

### App crash
```bash
# Clear cache dan restart
npm start -- --clear
```

## 🎨 Customization

### Ubah Warna

Edit `utils/constants.js`:

```javascript
export const COLORS = {
  primary: '#6366f1',  // Ubah warna utama
  success: '#10b981',
  // ...
};
```

### Ubah Storage Key

Edit `utils/constants.js`:

```javascript
export const STORAGE_KEY = '@reminders_custom';
```

## 📈 Roadmap / Saran Peningkatan

### Fase 1 - UI/UX
- [ ] Dark mode
- [ ] Swipe to delete gesture
- [ ] Pull to refresh
- [ ] Search/filter reminders

### Fase 2 - Features
- [ ] Kategori/Tags (Matematika, Fisika, etc)
- [ ] Statistics & analytics
- [ ] Export/Import data
- [ ] Calendar view
- [ ] Custom repeat patterns (weekly, monthly)

### Fase 3 - Advanced
- [ ] Cloud sync (Firebase)
- [ ] Multi-language support
- [ ] Widget home screen
- [ ] Study streak tracking
- [ ] Pomodoro timer integration

## 📄 License

MIT License - Bebas digunakan untuk personal atau komersial

## 🙏 Credits

- Built with [Expo](https://expo.dev/)
- Icons: Emoji (built-in)
- Storage: [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)
- Notifications: [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)

## 📞 Support

Jika ada pertanyaan atau issue:
- Baca `BUILD_APK_GUIDE.md` untuk build instructions
- Check Expo docs: https://docs.expo.dev/
- React Native docs: https://reactnative.dev/

---

**Dibuat dengan ❤️ menggunakan Expo React Native**

**Version 1.0.0** | **November 2024**
# pengingat-belajar
