"use client";

import Image from "next/image";
import Script from "next/script";
import React, { useState } from "react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Navigation  */}
      <nav
        className={`fixed inset-x-0 top-0 z-[10000] border-b border-line transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] px-4 lg:px-[84px] ${isScrolled
          ? "h-[72px] bg-white/85 backdrop-blur-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
          : "h-[72px] lg:h-[90px] bg-bg"
          }`}
        aria-label="Primary navigation"
      >
        <div className="max-w-[1440px] mx-auto h-full flex justify-between items-center relative w-full">
          <a
            className="font-display text-2xl font-extrabold tracking-[-0.02em] text-text-main transition-colors duration-200 hover:text-[#10b981]"
            href="#top"
            aria-label="Jivara home"
          >
            Jivara
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-12 absolute left-1/2 -translate-x-1/2">
            <a href="#fitur" className="group text-xs font-bold tracking-[0.16em] uppercase text-text-main relative transition-colors duration-200 hover:text-[#10b981]">
              Fitur
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#10b981] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#alur" className="group text-xs font-bold tracking-[0.16em] uppercase text-text-main relative transition-colors duration-200 hover:text-[#10b981]">
              Alur
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#10b981] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#keamanan" className="group text-xs font-bold tracking-[0.16em] uppercase text-text-main relative transition-colors duration-200 hover:text-[#10b981]">
              Keamanan
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#10b981] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop Login Button */}
            <a
              href="#"
              className="hidden lg:inline-flex items-center justify-center py-3 px-7 bg-primary text-white !text-white text-[13px] font-bold tracking-[0.05em] uppercase rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_4px_15px_rgba(16,185,129,0.2)] border border-white/10 relative overflow-hidden gap-2.5 hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(16,185,129,0.4)] hover:brightness-105 active:-translate-y-px active:scale-[0.97] active:shadow-[0_5px_15px_rgba(16,185,129,0.3)] group"
            >
              Login
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-[3px] text-white"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
            </a>

            {/* Mobile Hamburger */}
            <button
              className={`flex lg:hidden flex-col gap-[5px] w-11 h-11 justify-center items-center z-[40000] rounded-xl border-[1.5px] cursor-pointer transition-all duration-300 shrink-0 ${isMenuOpen
                ? "bg-primary border-primary"
                : "bg-surface border-line"
                }`}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`w-5 h-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${isMenuOpen ? "bg-white translate-y-[7px] rotate-45" : "bg-text-main"}`} />
              <span className={`w-5 h-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${isMenuOpen ? "bg-white opacity-0 translate-x-[10px]" : "bg-text-main"}`} />
              <span className={`w-5 h-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${isMenuOpen ? "bg-white -translate-y-[7px] -rotate-45" : "bg-text-main"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer  */}
      <div className={`fixed inset-0 z-[35000] transition-[visibility] duration-500 lg:hidden ${isMenuOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-[8px] transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`absolute top-0 right-0 w-4/5 max-w-[340px] h-full bg-bg pt-8 px-8 pb-10 flex flex-col shadow-[-10px_0_50px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          {/* Brand Header */}
          <div className="flex items-center mb-12">
            <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-text-main">
              Jivara
            </span>
          </div>

          <div className="flex flex-col gap-8">
            <a
              href="#fitur"
              onClick={() => setIsMenuOpen(false)}
              className="group w-fit text-xs font-medium tracking-[0.16em] uppercase text-text-main relative transition-colors duration-200 hover:text-primary"
            >
              Fitur
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href="#alur"
              onClick={() => setIsMenuOpen(false)}
              className="group w-fit text-xs font-medium tracking-[0.16em] uppercase text-text-main relative transition-colors duration-200 hover:text-primary"
            >
              Alur
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href="#keamanan"
              onClick={() => setIsMenuOpen(false)}
              className="group w-fit text-xs font-medium tracking-[0.16em] uppercase text-text-main relative transition-colors duration-200 hover:text-primary"
            >
              Keamanan
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div className="mt-auto">
            <a
              href="#"
              className="w-full inline-flex items-center justify-center py-5 px-7 bg-primary text-white !text-white text-base font-bold tracking-[0.05em] uppercase rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_4px_15px_rgba(16,185,129,0.2)] border border-white/10 gap-2.5 hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(16,185,129,0.4)] hover:brightness-105 active:-translate-y-px active:scale-[0.97] active:shadow-[0_5px_15px_rgba(16,185,129,0.3)] group"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-[3px] text-white"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content  */}
      <main id="top">
        {/* Hero  */}
        <section className="relative min-h-[auto] lg:min-h-screen flex flex-col lg:flex-row items-center pt-20 sm:pt-[100px] lg:pt-[140px] px-5 lg:px-[76px] pb-[60px] lg:pb-20 bg-bg isolate text-center lg:text-left gap-10 lg:gap-0" aria-labelledby="hero-title">
          <div className="relative lg:absolute lg:top-[15vh] lg:right-[2vw] w-[min(280px,70vw)] lg:w-[min(460px,40vw)] h-auto lg:h-[min(580px,60vh)] flex items-center justify-center z-10 mx-auto lg:mx-0" aria-label="Jiva mascot window">
            <Image
              src="/jiva-nobg.png"
              alt="Jiva — maskot Jivara"
              width={420}
              height={420}
              priority
              className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] animate-mascot-float"
            />
          </div>

          <div className="relative z-[5] w-full lg:w-[min(900px,100%)] flex flex-col items-center lg:items-start">
            <h1 id="hero-title" className="font-display text-[clamp(30px,10vw,48px)] lg:text-[clamp(42px,8vw,92px)] font-extrabold leading-[1.1] lg:leading-[1.05] tracking-[-0.02em] uppercase">
              <span className="block text-primary animate-[fadeLift_0.85s_cubic-bezier(0.16,1,0.3,1)_0.22s_both]">Jivara</span>
              <span className="block text-[#111] animate-[fadeLift_0.85s_cubic-bezier(0.16,1,0.3,1)_0.32s_both]">Stay on Track, Stay Healthy</span>
            </h1>
            <p className="w-full max-w-[450px] lg:max-w-[600px] mt-4 lg:mt-7 text-muted text-base lg:text-[19px] font-normal leading-relaxed lg:leading-[1.6] animate-[fadeLift_0.85s_cubic-bezier(0.16,1,0.3,1)_0.45s_both]">
              <strong className="text-primary font-extrabold">Jivara</strong> membantu pasien patuh minum obat dan mendeteksi interaksi berbahaya dengan makanan menggunakan teknologi <i className="text-[#111] font-extrabold not-italic">Computer Vision</i>
            </p>
          </div>
        </section>

        {/* Marquee  */}
        <div className="overflow-hidden border-t border-b border-line bg-black text-white font-display text-2xl md:text-[38px] font-extrabold tracking-[0.05em] leading-none uppercase whitespace-nowrap" aria-hidden="true">
          <div className="w-max py-4 md:py-8 pr-20 animate-marquee">
            Pengingat Obat - Deteksi Makanan - Cegah Interaksi Berbahaya - Pemantauan Realtime - Pengingat Obat - Deteksi Makanan -
          </div>
        </div>

        {/* About / Fitur  */}
        <section id="fitur" className="group relative min-h-[auto] md:min-h-[840px] grid place-items-center overflow-hidden bg-[#10b981] text-white text-center py-20 md:py-0 px-5 md:px-0" aria-labelledby="about-title">
          <div className="grid-mark absolute w-24 h-24 border border-line rounded-full opacity-70 animate-slow-spin left-[42px] top-[165px]" aria-hidden="true" />
          <div className="grid-mark absolute w-24 h-24 border border-line rounded-full opacity-70 animate-slow-spin right-7 bottom-[160px]" aria-hidden="true" />
          <Image
            className="w-[148px] h-[148px] rounded-full object-cover mb-[46px] transition-all duration-[450ms] group-hover:saturate-[1.2] group-hover:scale-[1.04]"
            src="/jiva-nobg.png"
            alt="Jiva Avatar"
            width={148}
            height={148}
            style={{ objectFit: 'contain', background: '#fff' }}
          />
          <p className="block absolute left-0 right-0 top-[180px] md:top-[304px] text-white/[0.08] font-display text-[clamp(32px,10vw,178px)] font-extrabold leading-none text-center whitespace-nowrap" aria-hidden="true">JIVARA</p>
          <div className="relative z-[2] w-[min(850px,calc(100%-48px))]">
            <h2 className="mx-auto mt-2 mb-[52px] max-w-[820px] font-display text-[28px] md:text-[45px] font-extrabold leading-[1.3] md:leading-[1.12]">
              Mencegah interaksi obat dan makanan dengan <span className="text-[#111]">cerdas</span> dan <i className="font-[Georgia,serif] italic font-medium">mudah</i> digunakan.
            </h2>
            <p className="max-w-[820px] mx-auto mb-[34px] text-white/90 text-[15px] md:text-[17px] leading-[1.75]">
              Jivara menghubungkan pasien dan perawat dalam satu ekosistem. Dengan pengingat jadwal obat otomatis, deteksi makanan berbasis AI lewat kamera, dan sistem monitoring, kami memastikan setiap dosis aman dikonsumsi.
            </p>
          </div>
        </section>

        {/* Alur Sistem  */}
        <section id="alur" className="py-20 md:pt-[128px] md:pb-[112px] px-5 md:px-[58px] bg-bg" aria-labelledby="projects-title">
          <div className="mb-8 md:mb-12">
            <h2 id="projects-title" className="font-display text-[clamp(28px,8vw,42px)] lg:text-[72px] font-extrabold leading-none lg:leading-[0.9]">
              <span className="block text-[#111]">Alur</span>
              <span className="block text-[#111]">Sistem</span>
            </h2>
          </div>
          <div className="grid max-w-[1280px] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-stretch gap-6 md:gap-[30px]">
            <article className="relative min-h-[280px] md:min-h-[320px] flex flex-col lg:flex-row items-start lg:items-end overflow-hidden rounded-[36px] bg-[#10b981] text-white border border-white/10 isolate transform-gpu transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[10px] hover:rotate-[-0.4deg] hover:shadow-[0_28px_70px_rgba(15,23,42,0.08)] col-span-1 md:col-span-1 lg:col-span-7 p-10 lg:p-0">
              <span className="relative lg:absolute lg:top-8 lg:right-8 w-12 lg:w-[58px] h-12 lg:h-[58px] grid place-items-center rounded-full bg-white text-[#10b981] text-lg lg:text-[22px] font-black mb-5 lg:mb-0">1</span>
              <div className="w-full lg:w-[min(520px,calc(100%-96px))] lg:p-[42px]">
                <h3 className="mb-3 font-display text-[22px] md:text-[26px] font-black text-white">Registrasi</h3>
                <p className="mb-4 opacity-90 text-sm leading-relaxed text-white/95">Perawat mendaftarkan pasien dan jadwal obat secara terpusat melalui dashboard administratif yang aman.</p>
              </div>
            </article>

            <article className="relative min-h-[280px] md:min-h-[320px] flex flex-col lg:flex-row items-start lg:items-end overflow-hidden rounded-[36px] bg-[#10b981] text-white border border-white/10 isolate transform-gpu transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[10px] hover:rotate-[-0.4deg] hover:shadow-[0_28px_70px_rgba(15,23,42,0.08)] col-span-1 md:col-span-1 lg:col-span-5 p-10 lg:p-0">
              <span className="relative lg:absolute lg:top-8 lg:right-8 w-12 lg:w-[58px] h-12 lg:h-[58px] grid place-items-center rounded-full bg-white text-[#10b981] text-lg lg:text-[22px] font-black mb-5 lg:mb-0">2</span>
              <div className="w-full lg:w-[min(520px,calc(100%-96px))] lg:p-[42px]">
                <h3 className="mb-3 font-display text-[22px] md:text-[26px] font-black text-white">Pengingat Cerdas</h3>
                <p className="mb-4 opacity-90 text-sm leading-relaxed text-white/95">Pasien menerima notifikasi pengingat berulang untuk konsumsi obat dan cek interaksi makanan.</p>
              </div>
            </article>

            <article className="relative min-h-[280px] md:min-h-[320px] flex flex-col lg:flex-row items-start lg:items-end overflow-hidden rounded-[36px] bg-[#10b981] text-white border border-white/10 isolate transform-gpu transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[10px] hover:rotate-[-0.4deg] hover:shadow-[0_28px_70px_rgba(15,23,42,0.08)] col-span-1 md:col-span-1 lg:col-span-6 p-10 lg:p-0">
              <span className="hidden lg:block absolute top-[44px] left-[44px] text-[rgba(15,23,42,0.06)] font-display text-lg">Scan</span>
              <span className="relative lg:absolute lg:top-8 lg:right-8 w-12 lg:w-[58px] h-12 lg:h-[58px] grid place-items-center rounded-full bg-white text-[#10b981] text-lg lg:text-[22px] font-black mb-5 lg:mb-0">3</span>
              <div className="w-full lg:w-[min(520px,calc(100%-96px))] lg:p-[42px]">
                <h3 className="mb-3 font-display text-[22px] md:text-[26px] font-black text-white">Scan Makanan</h3>
                <p className="mb-4 opacity-90 text-sm leading-relaxed text-white/95">Kamera mendeteksi jenis makanan dan langsung mencocokkan interaksinya dengan obat pasien.</p>
              </div>
            </article>

            <article className="relative min-h-[280px] md:min-h-[320px] flex flex-col lg:flex-row items-start lg:items-end overflow-hidden rounded-[36px] bg-[#10b981] text-white border border-white/10 isolate transform-gpu transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[10px] hover:rotate-[-0.4deg] hover:shadow-[0_28px_70px_rgba(15,23,42,0.08)] col-span-1 md:col-span-1 lg:col-span-6 p-10 lg:p-0">
              <span className="relative lg:absolute lg:top-8 lg:right-8 w-12 lg:w-[58px] h-12 lg:h-[58px] grid place-items-center rounded-full bg-white text-[#10b981] text-lg lg:text-[22px] font-black mb-5 lg:mb-0">4</span>
              <div className="w-full lg:w-[min(520px,calc(100%-96px))] lg:p-[42px]">
                <h3 className="mb-3 font-display text-[22px] md:text-[26px] font-black text-white">Monitoring</h3>
                <p className="mb-4 opacity-90 text-sm leading-relaxed text-white/95">Sistem memberikan alert &apos;Danger&apos; atau &apos;Caution&apos; ke perawat jika pasien mencoba mengonsumsi makanan yang berisiko.</p>
              </div>
            </article>
          </div>
        </section>

        {/* Tingkat Keamanan  */}
        <section id="keamanan" className="py-[98px] px-5 md:px-[84px] bg-surface text-text-main" aria-labelledby="stack-title">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5 lg:gap-20 items-start mb-10 lg:mb-20">
            <h2 id="stack-title" className="font-display text-[clamp(34px,10vw,44px)] lg:text-[62px] font-extrabold leading-none lg:leading-[0.98]">
              <span className="block">Tingkat</span>
              <span className="block text-muted">Keamanan</span>
            </h2>
            <p className="max-w-full lg:max-w-[500px] text-muted text-sm lg:text-sm leading-relaxed lg:leading-[1.7]">
              Klasifikasi interaksi makanan dan obat yang konsisten untuk meminimalisir risiko medis dan efek samping.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-x-[50px] lg:gap-y-[58px]">
            <article className="pt-7 border-t border-line">
              <h3 className="mb-7 text-[#16A34A] font-display text-base font-extrabold tracking-[0.16em] uppercase">Safe (Aman)</h3>
              <p className="text-[#a2a9b5] text-sm leading-relaxed">Tidak ada interaksi signifikan. Makanan ini aman dikonsumsi bersamaan dengan obat yang sedang aktif.</p>
            </article>
            <article className="pt-7 border-t border-line">
              <h3 className="mb-7 text-[#F59E0B] font-display text-base font-extrabold tracking-[0.16em] uppercase">Caution (Hati-hati)</h3>
              <p className="text-[#a2a9b5] text-sm leading-relaxed">Perlu penyesuaian porsi atau pengaturan jarak waktu konsumsi. Sebaiknya konsultasi jika ragu.</p>
            </article>
            <article className="pt-7 border-t border-line">
              <h3 className="mb-7 text-[#DC2626] font-display text-base font-extrabold tracking-[0.16em] uppercase">Danger (Bahaya)</h3>
              <p className="text-[#a2a9b5] text-sm leading-relaxed">Risiko tinggi interaksi serius. Pasien dilarang mengonsumsi makanan ini, dan peringatan akan dikirim ke perawat.</p>
            </article>
          </div>
        </section>
      </main>

      {/* Footer  */}
      <footer id="cta" className="relative overflow-hidden mt-[70px] pt-16 lg:pt-24 px-5 lg:px-[84px] pb-10 lg:pb-16 rounded-t-[54px] bg-[#10b981] text-white border-t border-line">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="relative z-10 mb-12 lg:mb-20 font-display text-[clamp(28px,8vw,48px)] lg:text-[80px] font-extrabold leading-none lg:leading-[0.9] uppercase break-words">
            <span className="block">Mulai</span>
            <span className="block text-white">Sekarang</span>
          </h2>

          <div className="relative mt-32 lg:mt-48">
            <strong className="block absolute right-0 bottom-full mb-4 lg:mb-6 text-white/[0.08] font-display text-[clamp(48px,12vw,150px)] leading-none text-right">Jivara</strong>

            <div className="flex flex-col lg:flex-row justify-between items-center pt-10 border-t border-white/10 text-white/70 text-[11px] font-bold tracking-[0.16em] uppercase gap-6 lg:gap-0 text-center lg:text-left">
              <span>&copy; {new Date().getFullYear()} Jivara</span>
              <div className="flex flex-wrap justify-center gap-4 lg:gap-[34px]">
                <a href="#" className="transition-colors duration-200 hover:text-[#064e3b]">Dokumentasi</a>
                <a href="#" className="transition-colors duration-200 hover:text-[#064e3b]">Privasi Data</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Script id="interactions-script" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
          document.documentElement.classList.add('js-ready');
          
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
              }
            });
          }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
          
          document.querySelectorAll('article').forEach((el, i) => {
            el.setAttribute('data-animate', 'true');
            el.style.setProperty('--reveal-delay', (i * 100) + 'ms');
            observer.observe(el);
          });

          window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (nav) {
              if (window.scrollY > 50) {
                nav.classList.add('scrolled');
              } else {
                nav.classList.remove('scrolled');
              }
            }
          });
        `
      }} />
    </>
  );
}
