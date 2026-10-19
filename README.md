# Duckfolio

Duckfolio adalah website portofolio pribadi bertema danau, air, serta bebek.
Website ini menampilkan profil dan kumpulan proyek dengan pengalaman visual
interaktif, sehingga pengunjung seolah-olah menyelam dari permukaan air menuju
bagian portofolio yang lebih dalam.

## Fitur

- Halaman utama dengan tema permukaan danau.
- Tombol **Selam ke Portofolio** untuk membuka halaman proyek.
- Animasi transisi wave saat berpindah halaman.
- Halaman project dengan:
  - Informasi profil.
  - Daftar proyek.
  - Indikator progress scroll berbentuk bebek berenang.
  - Efek bubble pada foto profil.
  - Tombol **Kembali ke Permukaan** dengan transisi wave.
- Mode terang dan gelap.
- Efek riak air mengikuti pergerakan kursor.
- Animasi elemen halaman menggunakan Framer Motion.
- Scrollbar browser disembunyikan agar indikator bebek menjadi elemen visual
  utama untuk progress scroll.
- Tampilan responsif untuk berbagai ukuran layar.

## Teknologi

- [Next.js](https://nextjs.org) 16 dengan App Router.
- [React](https://react.dev) 19.
- [TypeScript](https://www.typescriptlang.org).
- [Tailwind CSS](https://tailwindcss.com).
- [Framer Motion](https://motion.dev).
- [Lucide React](https://lucide.dev) untuk ikon.

## Struktur Halaman

### Halaman utama

File: `app/page.tsx`

Halaman utama berisi hero section, pilihan mode terang atau gelap, ilustrasi
bebek, efek riak kursor, serta tombol **Selam ke Portofolio**. Navigasi tombol
menjalankan animasi wave terlebih dahulu sebelum berpindah ke `/project`.

### Halaman project

File: `app/project/page.tsx`

Halaman project menampilkan profil singkat dan daftar proyek. Bebek berenang di
bagian atas halaman mengikuti posisi scroll sebagai indikator kedalaman
portofolio. Tombol **Kembali ke Permukaan** menggunakan transisi yang sama untuk
kembali ke halaman utama.

### Transisi halaman

File: `components/WaveTransition.tsx`

Komponen ini membungkus seluruh halaman melalui `app/layout.tsx`. Navigasi
menunggu wave menutupi halaman lama terlebih dahulu, kemudian halaman baru
ditampilkan di balik wave sebelum wave bergerak turun untuk membukanya.

## Menjalankan Secara Lokal

Pastikan Node.js dan npm sudah terpasang, kemudian jalankan:

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser.

## Perintah yang Tersedia

```bash
npm run dev
npm run build
npm run start
npm run lint
```

- `npm run dev` menjalankan server development dengan hot refresh.
- `npm run build` membuat build production.
- `npm run start` menjalankan hasil build production.
- `npm run lint` menjalankan pemeriksaan lint.

## Menyesuaikan Konten

- Ubah konten halaman utama di `app/page.tsx`.
- Ubah data dan tampilan proyek di `app/project/page.tsx`.
- Ubah animasi transisi di `components/WaveTransition.tsx`.
- Tambahkan atau ganti aset gambar di folder `public`.
- Sesuaikan warna global dan perilaku scrollbar di `app/globals.css`.
