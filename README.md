# CMLABS Front-end Developer Practical Test

**PT CMLABS INDONESIA DIGITAL** Software Engineering Division | Software Development and Maintenance Support Sector  
**Position:** Front-end Developer (Part-time)  
**Project Name:** Mealio - Daily Recipes App  
**Code:** FE-PT-02-2

---

## Overview

Project ini dikembangkan sebagai bagian dari **Pre-assessment Test** untuk posisi Front-end Developer di cmlabs. Aplikasi ini bernama **Mealio**, sebuah platform eksplorasi resep masakan yang memanfaatkan API dari `TheMealDB`.

Aplikasi ini dibangun dengan fokus pada performa, antarmuka yang modern, dan struktur kode yang modular menggunakan **Atomic Design Pattern**.

### Key Features

- **Onboarding Screen**: Animasi selama 2 detik saat aplikasi pertama kali dimuat untuk _brand awareness_.
- **Dynamic Hero Section**: Rekomendasi menu harian yang berubah secara otomatis setiap hari menggunakan _Seeded Logic_.
- **Top Ingredients Today**: Carousel bahan makanan pilihan harian dengan fitur _drag & scroll_.
- **Featured Meals**: Inspirasi masakan harian yang sudah diperkaya dengan data asal negara (_strArea_).
- **Advanced Search**: Fitur pencarian resep secara _real-time_ langsung dari Navbar dengan _debounce logic_.
- **Full Responsive**: Antarmuka yang adaptif untuk perangkat Desktop, Tablet, hingga Mobile.

---

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [Shadcn UI](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## Project Links

- **Repository**: [https://github.com/sakibfaturrahman/cmlabs-frontend-parttime-test](https://github.com/sakibfaturrahman/cmlabs-frontend-parttime-test)
- **Live Demo**: [https://mealio-recipes.vercel.app/](https://mealio-recipes.vercel.app/)

---

## Getting Started

### Prerequisites

Pastikan Anda sudah menginstal **Node.js** (versi 18.x atau terbaru).

### Installation & Running

1.  **Clone Repository**

    ```bash
    git clone [https://github.com/sakibfaturrahman/cmlabs-frontend-parttime-test.git](https://github.com/sakibfaturrahman/cmlabs-frontend-parttime-test.git)
    cd cmlabs-frontend-parttime-test
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Run Development Server**

    ```bash
    npm run dev
    ```

    Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

4.  **Build for Production**
    ```bash
    npm run build
    npm run start
    ```

---

## Architecture (Atomic Design)

Project ini mengikuti struktur komponen atomik untuk memastikan skalabilitas:

- **Atoms**: Komponen dasar seperti Button, Badge, dan Icon.
- **Molecules**: Gabungan atom seperti SearchBar, IngredientCard, dan SwiperIngredient.
- **Organisms**: Komponen kompleks seperti Navbar, Hero, TopIngredient, dan FeaturedMeals.
- **Templates**: Layout halaman seperti CategoryLayout dan DetailTemplate.
- **Hooks**: Manajemen logika bisnis terpusat pada `useMeals.ts`.
- **Services**: Abstraksi API calls pada `mealService.ts`.

---

## Technical Notes

- **Hydration Mismatch Fix**: Menggunakan state `hasMounted` untuk menangani konten dinamis berbasis waktu agar sinkron antara Server dan Client.
- **Data Enrichment**: Mengimplementasikan _parallel fetching_ pada `getMealsByIngredient` dan `getDailyFeaturedMeals` untuk melengkapi data `strArea` yang tidak disediakan secara default oleh endpoint filter API.
- **Mobile UX Optimization**: Memperbaiki masalah _sticky elements_ pada tampilan mobile untuk navigasi yang lebih mulus.

---

**Validated by:** Rifqi Ardhian (Lead)  
**Date:** 12th March 2026  
**Developer:** Sakib Faturrahman
