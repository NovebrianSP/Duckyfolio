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
    title: "Locatour - Virtual Travel Destination App",
    image: "/locatour.webp",
    desc: "Locatour is a directory and location-search web application for tourism, culinary destinations, and accommodations. It is built with the CodeIgniter 4 full-stack framework and a modern Bootstrap 5 interface, providing users with an interactive, responsive, and fast location-search experience.",
    tech: ["CODEIGNITER 4", "BOOTSTRAP 5", "PYTHON", "MYSQL", "OPEN WEATHER API"],
    createdAt: "December 19, 2025 - January 18, 2026",
    githubUrl: "https://github.com/NovebrianSP/locatour",
  },
  {
    id: "aquamass",
    title: "Aquamass - Drinking Water Intake Tracker",
    image: "/aquamass.webp",
    desc: "Aquamass is a smart, minimalist fluid tracker designed to accurately calculate and monitor your ideal daily water intake based on body mass using a medically standardized hydration formula.",
    tech: ["FLUTTER", "DART"],
    createdAt: "September 3, 2026",
    githubUrl: "https://github.com/NovebrianSP/aquamass",
  },
  {
    id: "sadar-app",
    title: "Sadar App - Health Monitoring App",
    image: "/sadar.webp",
    desc: "Sadar App is designed to help users monitor their health effectively and easily.",
    tech: ["HTML", "BOOTSTRAP 5", "JAVASCRIPT"],
    createdAt: "July 7, 2025",
    githubUrl: "https://github.com/NovebrianSP/sadar-app",
  },
  {
    id: "agaricus-lepiota",
    title: "Agaricus Lepiota - Mycological Research App",
    image: "/agaricus.webp",
    desc: "This application is a Streamlit-based mushroom classification system that can predict whether a mushroom is edible or poisonous, and it also features a data visualization dashboard. It utilizes a high-accuracy Random Forest model, with the training and prediction processes separated to ensure the application runs quickly and efficiently.",
    tech: ["PYTHON", "DJANGO", "FLASK", "STREAMLIT", "RANDOM FOREST"],
    createdAt: "June 16, 2025 - July 1, 2025",
    githubUrl: "https://github.com/NovebrianSP/agaricus-lepiota",
  },
];
