export type Project = {
  id: string;
  title: string;
  image: string;
  desc: string;
  tech: string[];
  createdAt: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    id: "locatour",
    title: "Locatour - Aplikasi Destinasi Wisata Virtual",
    image: "/locatour.webp",
    desc: "Locatour adalah aplikasi web berbasis direktori dan pencarian lokasi (pariwisata/kuliner/akomodasi) yang dibangun menggunakan full-stack framework CodeIgniter 4 dan antarmuka modern Bootstrap 5. Aplikasi ini dirancang untuk memberikan pengalaman pencarian lokasi yang interaktif, responsif, dan cepat bagi pengguna.",
    tech: ["CODEIGNITER 4", "BOOTSTRAP 5", "PYTHON", "MYSQL", "OPEN WEATHER API"],
    createdAt: "19 Desember 2025 - 18 Januari 2026",
    githubUrl: "https://github.com/NovebrianSP/locatour",
  },
  {
    id: "aquamass",
    title: "Aquamass - Aplikasi Pemantauan Konsumsi Air Minum",
    image: "/aquamass.webp",
    desc: "Aquamass adalah aplikasi pelacak cairan berbasis pintar dan minimalis yang dirancang untuk menghitung serta memantau asupan air harian ideal Anda berdasarkan massa tubuh secara akurat menggunakan formula hidrasi berstandar medis.",
    tech: ["FLUTTER", "DART"],
    createdAt: "03 September 2026",
    githubUrl: "https://github.com/NovebrianSP/aquamass",
  },
  {
    id: "sadar-app",
    title: "Sadar App - Aplikasi Pemantauan Kesehatan",
    image: "/sadar.webp",
    desc: "Sadar App adalah aplikasi yang dirancang untuk membantu pengguna memantau kesehatan mereka secara efektif dan mudah.",
    tech: ["HTML", "BOOTSTRAP 5", "JAVASCRIPT"],
    createdAt: "7 Juli 2025",
    githubUrl: "https://github.com/NovebrianSP/sadar-app",
  },
];
