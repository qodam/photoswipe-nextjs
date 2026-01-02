"use client"

import React, { useState, useEffect } from 'react';
import { 
  Download, Trash2, Calendar, CheckCircle, ArrowRight, 
  ArrowLeft, Menu, X, HardDrive, Apple, Play, Smartphone
} from 'lucide-react';

const PhotoSwipeLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deviceType, setDeviceType] = useState('unknown');

  // --- CONFIGURATION DES LIENS ---
  const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.codinghub.photoswipe";
  // Remplace par ton vrai lien App Store
  const APP_STORE_LINK = "https://apps.apple.com/us/app/photo-cleaner-pro-photoswipe/id6757101234"; 

  useEffect(() => {
    // Gestion du scroll pour la nav
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Détection basique du device pour adapter l'UX
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) setDeviceType('ios');
    else if (/android/.test(ua)) setDeviceType('android');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Composant Mockup Téléphone (Réutilisable)
  const PhoneMockup = ({ children, className = "" }) => (
    <div className={`relative mx-auto ${className}`} style={{ width: 270 }}>
      <div className="relative border-gray-900 bg-gray-900 border-[14px] rounded-[3rem] h-[540px] shadow-2xl flex flex-col overflow-hidden z-20">
          
          {/* Écran (Contenu) */}
          <div className="flex-1 bg-white relative overflow-hidden flex flex-col rounded-[2.2rem]">


              {/* Le contenu passé en props */}
              {children}

          </div>
      </div>
    </div>
  );


  return (
    <div className="font-sans text-slate-800 min-h-screen selection:bg-rose-200 relative overflow-hidden bg-white">
      
      {/* --- FOND AMBIANT --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-rose-400/10 rounded-full blur-[120px] opacity-60 mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[100px] opacity-50 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10">
      
        {/* --- NAVIGATION --- */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white transform -rotate-6 shadow-lg shadow-rose-500/20">
                  <img src="logo.png" className='w-full h-full rounded-lg' />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">PhotoSwipe</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-rose-500 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-rose-500 font-medium transition-colors">How it works</a>
              
              <div className="flex items-center gap-2">
                <a href={APP_STORE_LINK} className="p-2 text-slate-500 hover:text-black transition-colors" title="iOS"><Apple size={22}/></a>
                <a href={PLAY_STORE_LINK} className="p-2 text-slate-500 hover:text-green-600 transition-colors" title="Android"><Play size={22}/></a>
                
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 text-slate-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* --- MOBILE MENU OVERLAY --- */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-in slide-in-from-top-10 fade-in duration-200">
             <div className="flex flex-col space-y-6 text-center">
                <a href="#features" onClick={toggleMenu} className="text-2xl font-bold text-slate-800">Features</a>
                <a href="#how-it-works" onClick={toggleMenu} className="text-2xl font-bold text-slate-800">How it works</a>
                <hr className="border-slate-100 my-4"/>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a 
                    href={APP_STORE_LINK}
                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.93-.91 1.32.05 2.54.53 3.4 1.36-1.87 1.13-2.8 2.88-2.66 4.86.13 2.05 1.77 3.79 3.75 4.31l-.22.12zm-4.43-15.6c.71-1.03 1.2-2.33 1.07-3.66-1.21.05-2.61.81-3.41 1.78-.65.78-1.25 2.09-1.07 3.43 1.32.1 2.71-.65 3.41-1.55z"/></svg>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">Download on the</div>
                      <div className="text-lg font-bold leading-none mt-0.5">App Store</div>
                    </div>
                  </a>
                  
                  <a 
                    href={PLAY_STORE_LINK}
                    className="flex items-center gap-3 bg-white border border-slate-200 text-slate-900 px-6 py-3.5 rounded-xl hover:bg-slate-50 transition-all hover:scale-105 shadow-lg shadow-slate-200/50 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-7 h-7 text-slate-600" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-500 leading-none">Get it on</div>
                      <div className="text-lg font-bold leading-none mt-0.5">Google Play</div>
                    </div>
                  </a>
                </div>
             </div>
          </div>
        )}

        {/* --- HERO SECTION --- */}
        <header className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden" id="download">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Hero Text */}
              <div className="flex-1 text-center lg:text-left space-y-8 z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 font-bold text-sm border border-rose-100 mb-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                  Stop "Storage Full" Warnings
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Clean your gallery. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                    Just Swipe It.
                  </span>
                </h1>
                
                <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  The fastest way to clean up your iPhone or Android. Swipe left to delete duplicates, swipe right to keep memories.
                </p>
                
                {/* --- DOWNLOAD BUTTONS AREA --- */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a 
                    href={APP_STORE_LINK}
                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.93-.91 1.32.05 2.54.53 3.4 1.36-1.87 1.13-2.8 2.88-2.66 4.86.13 2.05 1.77 3.79 3.75 4.31l-.22.12zm-4.43-15.6c.71-1.03 1.2-2.33 1.07-3.66-1.21.05-2.61.81-3.41 1.78-.65.78-1.25 2.09-1.07 3.43 1.32.1 2.71-.65 3.41-1.55z"/></svg>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">Download on the</div>
                      <div className="text-lg font-bold leading-none mt-0.5">App Store</div>
                    </div>
                  </a>
                  
                  <a 
                    href={PLAY_STORE_LINK}
                    className="flex items-center gap-3 bg-white border border-slate-200 text-slate-900 px-6 py-3.5 rounded-xl hover:bg-slate-50 transition-all hover:scale-105 shadow-lg shadow-slate-200/50 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-7 h-7 text-slate-600" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-500 leading-none">Get it on</div>
                      <div className="text-lg font-bold leading-none mt-0.5">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Hero Phone Mockup */}
              <div className="flex-1 relative flex justify-center perspective-1000">
                  {/* Floating Elements */}
                  <div className="absolute top-20 -left-12 bg-white p-4 rounded-2xl shadow-xl z-30 animate-bounce duration-[3000ms] border border-rose-50 hidden md:block">
                     <div className="flex items-center gap-3">
                        <div className="bg-rose-100 p-2 rounded-lg text-rose-500"><Trash2 size={20}/></div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase">Deleted</p>
                          <p className="text-lg font-bold text-slate-900">1,402 pics</p>
                        </div>
                     </div>
                  </div>

                  <PhoneMockup className="transform rotate-3 hover:rotate-0 transition-all duration-700">
                      <img src="delete.jpg" alt="App Screenshot Main" className='w-full h-full  ounded-3xl' />
                  </PhoneMockup>
              </div>
            </div>
          </div>
        </header>


        {/* --- SECTION 1: CALENDAR SELECTION --- */}
        <section id="how-it-works" className="py-24 bg-rose-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-20">
              
              <div className="flex-1 order-2 md:order-1">

                  <PhoneMockup>
                      <img src="calendar.jpg" alt="Calendar" className='w-full h-full  ounded-3xl' />
                  </PhoneMockup>
              </div>

              <div className="flex-1 order-1 md:order-2 space-y-6">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-lg shadow-rose-100 mb-4">
                   <Calendar className="w-8 h-8" />
                 </div>
                 <h2 className="text-4xl font-bold text-slate-900">Don't organize everything at once.</h2>
                 <p className="text-lg text-slate-600 leading-relaxed">
                   Cleaning 5,000 photos is overwhelming. <br/>
                   Our <strong>Calendar View</strong> lets you tackle one month at a time. Pick "August", swipe for 5 minutes, and feel the satisfaction of a clean month.
                 </p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3 font-medium text-slate-700">
                        <CheckCircle className="text-rose-500 w-5 h-5"/> Grouped by date automatically
                    </li>
                    <li className="flex items-center gap-3 font-medium text-slate-700">
                        <CheckCircle className="text-rose-500 w-5 h-5"/> Track your progress
                    </li>
                 </ul>
              </div>

            </div>
          </div>
        </section>


        {/* --- SECTION 2: THE SWIPE (Core Feature) --- */}
        <section id="features" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
             <span className="text-rose-500 font-bold tracking-wider uppercase text-sm">The Game Changer</span>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6">Swipe to Decide</h2>
             <p className="text-slate-500 max-w-2xl mx-auto text-lg">It's as easy as a dating app. We show you the photo, you decide its fate.</p>
          </div>

          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 relative">
             {/* Left Text */}
             <div className="hidden md:block text-right space-y-2 translate-y-12">
                 <h3 className="text-2xl font-bold text-rose-500">Trash It</h3>
                 <p className="text-slate-500 text-sm w-48 ml-auto">Blurry pics, duplicates, and screenshots go here.</p>
                 <div className="inline-flex items-center gap-2 text-rose-500 font-bold border border-rose-200 px-4 py-2 rounded-full bg-rose-50">
                    <ArrowLeft className="w-4 h-4" /> Swipe Left
                 </div>
             </div>

             {/* CENTER PHONE */}
             <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-[100px] opacity-40"></div>

                  <PhoneMockup>
                      <img src="save.jpg" alt="Swipe" className='w-full h-full  ounded-3xl' />
                  </PhoneMockup>
             </div>

             {/* Right Text */}
             <div className="hidden md:block text-left space-y-2 translate-y-12">
                 <h3 className="text-2xl font-bold text-green-500">Keep It</h3>
                 <p className="text-slate-500 text-sm w-48">Only your absolute best memories stay.</p>
                 <div className="inline-flex items-center gap-2 text-green-500 font-bold border border-green-200 px-4 py-2 rounded-full bg-green-50">
                     Swipe Right <ArrowRight className="w-4 h-4" />
                 </div>
             </div>
          </div>
        </section>


        {/* --- SECTION 3: THE RESULT (Space Saved) --- */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600 rounded-full blur-[150px] opacity-20"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-20">
              
              <div className="flex-1 space-y-8 relative z-10">
                 <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-rose-400 border border-white/10 mb-4">
                   <HardDrive className="w-8 h-8" />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black">Reclaim Gigabytes<br/>in Seconds.</h2>
                 <p className="text-xl text-slate-300 leading-relaxed">
                   Before deleting, review your trash. One tap on "Empty Trash" and boom—you just saved 2GB of space. Your phone will run faster.
                 </p>
                 
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a 
                    href={APP_STORE_LINK}
                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.93-.91 1.32.05 2.54.53 3.4 1.36-1.87 1.13-2.8 2.88-2.66 4.86.13 2.05 1.77 3.79 3.75 4.31l-.22.12zm-4.43-15.6c.71-1.03 1.2-2.33 1.07-3.66-1.21.05-2.61.81-3.41 1.78-.65.78-1.25 2.09-1.07 3.43 1.32.1 2.71-.65 3.41-1.55z"/></svg>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">Download on the</div>
                      <div className="text-lg font-bold leading-none mt-0.5">App Store</div>
                    </div>
                  </a>
                  
                  <a 
                    href={PLAY_STORE_LINK}
                    className="flex items-center gap-3 bg-white border border-slate-200 text-slate-900 px-6 py-3.5 rounded-xl hover:bg-slate-50 transition-all hover:scale-105 shadow-lg shadow-slate-200/50 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-7 h-7 text-slate-600" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-bold text-slate-500 leading-none">Get it on</div>
                      <div className="text-lg font-bold leading-none mt-0.5">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex-1 relative z-10">
                 
                  <PhoneMockup>
                      <img src="end.jpg" alt="End Page" className='w-full h-full  ounded-3xl' />
                  </PhoneMockup>
              </div>

            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-white border-t border-slate-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                  <img src="logo.png" className='w-full h-full rounded-lg' />
                </div>
                <span className="font-bold text-xl text-slate-900">PhotoSwipe</span>
             </div>
             
             <div className="flex gap-8 text-slate-500 text-sm font-medium">
                <a href="#" className="hover:text-rose-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-rose-500 transition-colors">Terms of Use</a>
                <a href="mailto:contact@photoswipe.com" className="hover:text-rose-500 transition-colors">Contact</a>
             </div>
             
             <div className="text-slate-400 text-sm">
                © {new Date().getFullYear()} Qodam.
             </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default PhotoSwipeLanding;