export type Project = {
  id: string;
  title: string;
  image: string;
  desc: string;
  tech: string[];
  createdAt: string;
};

export const projects: Project[] = [
  {
    id: "locatour",
    title: "Locatour - Aplikasi Destinasi Wisata Virtual",
    image: "/locatour.webp",
    desc: "Locatour adalah aplikasi web berbasis direktori dan pencarian lokasi (pariwisata/kuliner/akomodasi) yang dibangun menggunakan full-stack framework CodeIgniter 4 dan antarmuka modern Bootstrap 5. Aplikasi ini dirancang untuk memberikan pengalaman pencarian lokasi yang interaktif, responsif, dan cepat bagi pengguna.",
    tech: ["Next.js", "Tailwind CSS", "Sanity CMS"],
    createdAt: "19 Desember 2025 - 18 Januari 2026",
  },
  {
    id: "aquamass",
    title: "Aquamass - Aplikasi Pemantauan Konsumsi Air Minum",
    image: "/aquamass.webp",
    desc: "Aquamass adalah aplikasi pelacak cairan berbasis pintar dan minimalis yang dirancang untuk menghitung serta memantau asupan air harian ideal Anda berdasarkan massa tubuh secara akurat menggunakan formula hidrasi berstandar medis.",
    tech: ["React", "Node.js", "Socket.io", "Leaflet Maps"],
    createdAt: "03 September 2026",
  },
  {
    id: "weather-app-aliran-sungai",
    title: "Weather App Aliran Sungai",
    image: "/ducky.webp",
    desc: "Prediksi cuaca dan debit air sungai akurat menggunakan integrasi OpenWeather API resmi.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "OpenWeather API"],
    createdAt: "7 Juni 2025",
  },
];
