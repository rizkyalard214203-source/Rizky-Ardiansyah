import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  HardHat, 
  Home, 
  Building2, 
  Hammer,
  ArrowUpRight,
  Menu,
  X,
  Calculator as CalcIcon,
  ArrowRight,
  Check,
  HelpCircle,
  AlertCircle,
  Sparkles,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const CONTACT_INFO = {
  brandName: "Ardhi Konstruksi",
  whatsapp1: "0898-8934-644",
  whatsapp2: "0823-3491-0530",
  email: "rizky042103@gmail.com",
  address: "Jln Hj Paten RT 01 RW 10 Pondok Karya, Pondok Betung, Tangerang Selatan, Banten",
  experience: "20 Tahun",
  warranty: "2 Tahun"
};

const QUALITY_LEVELS = {
  standard: {
    label: "Standard",
    multiplier: 1,
    desc: "Material berkualitas SNI, finishing rapi."
  },
  premium: {
    label: "Premium",
    multiplier: 1.35,
    desc: "Material brand ternama, finishing mewah & detail."
  }
};

const PRICING_2026 = {
  rumah: {
    label: "Bangun Rumah",
    min: 4500000,
    max: 6500000,
    unit: "m²"
  },
  ruko: {
    label: "Bangun Ruko",
    min: 4000000,
    max: 5500000,
    unit: "m²"
  },
  renovasiRingan: {
    label: "Renovasi Ringan",
    min: 1500000,
    max: 2500000,
    unit: "m²"
  },
  renovasiBerat: {
    label: "Renovasi Berat",
    min: 3000000,
    max: 5000000,
    unit: "m²"
  }
};

type ServiceKey = keyof typeof PRICING_2026;
type QualityKey = keyof typeof QUALITY_LEVELS;

// --- Calculator Component ---
function Calculator() {
  const [service, setService] = useState<ServiceKey>('rumah');
  const [area, setArea] = useState<number>(50);
  const [quality, setQuality] = useState<QualityKey>('standard');
  const [isInteracted, setIsInteracted] = useState({ service: false, area: false, quality: false });
  const [error, setError] = useState<string | null>(null);

  const currentPricing = PRICING_2026[service];
  const currentQuality = QUALITY_LEVELS[quality];
  
  const minTotal = area * currentPricing.min * currentQuality.multiplier;
  const maxTotal = area * currentPricing.max * currentQuality.multiplier;

  const progress = 
    (isInteracted.service ? 33.3 : 15) + 
    (area > 0 ? 33.3 : 0) + 
    (isInteracted.quality ? 33.4 : 0);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleServiceChange = (key: ServiceKey) => {
    setService(key);
    setIsInteracted(prev => ({ ...prev, service: true }));
  };

  const handleAreaChange = (val: number) => {
    if (val <= 0) {
      setError("Luas harus lebih besar dari 0");
      setArea(0);
    } else {
      setError(null);
      setArea(val);
      setIsInteracted(prev => ({ ...prev, area: true }));
    }
  };

  const handleQualityChange = (key: QualityKey) => {
    setQuality(key);
    setIsInteracted(prev => ({ ...prev, quality: true }));
  };

  return (
    <div id="kalkulator" className="bg-white rounded-[40px] shadow-2xl shadow-navy-200/60 overflow-hidden border border-navy-100">
      {/* Progress Bar */}
      <div className="h-2 bg-navy-100 w-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gold-500 shadow-[0_0_10px_rgba(197,160,89,0.5)]"
        />
      </div>

      <div className="p-8 md:p-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gold-500 text-white rounded-2xl shadow-lg shadow-gold-200">
              <CalcIcon size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-navy-950">Kalkulator Estimasi</h2>
              <p className="text-navy-500 font-medium">Dapatkan perkiraan biaya dalam hitungan detik</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isInteracted.service ? 'bg-green-50 text-green-600' : 'bg-navy-50 text-navy-400'}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isInteracted.service ? 'bg-green-500 text-white' : 'bg-navy-200 text-navy-400'}`}>
                {isInteracted.service ? <Check size={10} /> : '1'}
              </div>
              Layanan
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isInteracted.area ? 'bg-green-50 text-green-600' : 'bg-navy-50 text-navy-400'}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isInteracted.area ? 'bg-green-500 text-white' : 'bg-navy-200 text-navy-400'}`}>
                {isInteracted.area ? <Check size={10} /> : '2'}
              </div>
              Luas
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isInteracted.quality ? 'bg-green-50 text-green-600' : 'bg-navy-50 text-navy-400'}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isInteracted.quality ? 'bg-green-500 text-white' : 'bg-navy-200 text-navy-400'}`}>
                {isInteracted.quality ? <Check size={10} /> : '3'}
              </div>
              Kualitas
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <motion.div layout>
              <label className="block text-sm font-bold text-navy-400 uppercase tracking-[0.2em] mb-6">
                1. Pilih Jenis Pekerjaan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(Object.keys(PRICING_2026) as ServiceKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleServiceChange(key)}
                    className={`group relative text-left px-6 py-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      service === key
                        ? 'border-gold-500 bg-gold-50/50'
                        : 'border-navy-100 hover:border-navy-200 hover:bg-navy-50'
                    }`}
                  >
                    <div className="relative z-10">
                      <p className={`font-bold transition-colors ${service === key ? 'text-gold-700' : 'text-navy-600'}`}>
                        {PRICING_2026[key].label}
                      </p>
                      <p className={`text-[10px] font-bold mt-1 uppercase tracking-wider transition-colors ${service === key ? 'text-gold-600/70' : 'text-navy-400'}`}>
                        {formatIDR(PRICING_2026[key].min)} - {formatIDR(PRICING_2026[key].max)} / {PRICING_2026[key].unit}
                      </p>
                    </div>
                    {service === key && (
                      <motion.div 
                        layoutId="active-bg"
                        className="absolute inset-0 bg-gold-500/5 z-0"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div layout>
              <div className="flex items-center justify-between mb-6">
                <label className="block text-sm font-bold text-navy-400 uppercase tracking-[0.2em]">
                  2. Tentukan Luas Bangunan
                </label>
                <div className="group relative">
                  <HelpCircle size={18} className="text-navy-300 cursor-help hover:text-gold-500 transition-colors" />
                  <div className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-navy-950 text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20 leading-relaxed">
                    <p className="font-bold mb-1">Satuan Luas (m²)</p>
                    Masukkan total luas lantai bangunan yang akan dikerjakan. Contoh: Rumah 6m x 10m = 60m².
                  </div>
                </div>
              </div>
              
              <div className={`bg-navy-50 p-8 rounded-3xl border-2 transition-all ${error ? 'border-red-200 bg-red-50/30' : 'border-navy-100'}`}>
                <div className="flex items-end gap-4 mb-8">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={area || ''}
                      onChange={(e) => handleAreaChange(parseInt(e.target.value) || 0)}
                      className={`w-full bg-transparent text-5xl font-bold focus:outline-none ${error ? 'text-red-500' : 'text-navy-950'}`}
                      placeholder="0"
                    />
                  </div>
                  <span className="text-2xl font-bold text-navy-300 mb-2">{currentPricing.unit}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={area}
                  onChange={(e) => handleAreaChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-navy-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
                <div className="flex justify-between mt-4 text-xs font-bold text-navy-400 uppercase tracking-widest">
                  <span>1 {currentPricing.unit}</span>
                  <span>1000 {currentPricing.unit}</span>
                </div>
              </div>
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center gap-2 text-red-500 text-sm font-semibold"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div layout>
              <label className="block text-sm font-bold text-navy-400 uppercase tracking-[0.2em] mb-6">
                3. Pilih Kualitas Material
              </label>
              <div className="grid grid-cols-2 gap-4">
                {(Object.keys(QUALITY_LEVELS) as QualityKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleQualityChange(key)}
                    className={`text-left p-6 rounded-3xl border-2 transition-all duration-300 ${
                      quality === key
                        ? 'border-gold-500 bg-gold-50/50'
                        : 'border-navy-100 hover:border-navy-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-xl ${quality === key ? 'bg-gold-500 text-white' : 'bg-navy-100 text-navy-400'}`}>
                        {key === 'standard' ? <Package size={18} /> : <Sparkles size={18} />}
                      </div>
                      <p className={`font-bold ${quality === key ? 'text-gold-700' : 'text-navy-600'}`}>
                        {QUALITY_LEVELS[key].label}
                      </p>
                    </div>
                    <p className="text-xs text-navy-500 leading-relaxed">
                      {QUALITY_LEVELS[key].desc}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="sticky top-32">
              <motion.div 
                animate={{ 
                  scale: area > 0 ? [1, 1.02, 1] : 1,
                  transition: { duration: 2, repeat: Infinity }
                }}
                className={`bg-navy-950 rounded-[32px] p-10 text-white shadow-2xl transition-all duration-500 relative overflow-hidden ${area > 0 ? 'shadow-gold-900/20 opacity-100' : 'opacity-50 grayscale'}`}
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-[80px] -mr-32 -mt-32" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-gold-400 mb-8">
                    <div className={`w-2 h-2 bg-gold-500 rounded-full ${area > 0 ? 'animate-pulse' : ''}`} />
                    <span className="text-xs font-bold uppercase tracking-[0.3em]">Hasil Estimasi 2026</span>
                  </div>

                  <div className="space-y-10">
                    <div>
                      <p className="text-navy-500 text-sm font-bold uppercase tracking-widest mb-3">Mulai Dari</p>
                      <AnimatePresence mode="wait">
                        <motion.p 
                          key={`${service}-${area}-${quality}-min`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                        >
                          {area > 0 ? formatIDR(minTotal) : 'Rp 0'}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    
                    <div className="h-px bg-navy-800 w-full" />
                    
                    <div>
                      <p className="text-navy-500 text-sm font-bold uppercase tracking-widest mb-3">Hingga</p>
                      <AnimatePresence mode="wait">
                        <motion.p 
                          key={`${service}-${area}-${quality}-max`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-4xl md:text-5xl font-bold text-gold-500 tracking-tight"
                        >
                          {area > 0 ? formatIDR(maxTotal) : 'Rp 0'}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-navy-800/50">
                    <p className="text-sm text-navy-400 leading-relaxed italic mb-8">
                      *Harga mencakup jasa tukang & material <span className="text-gold-400 font-bold">{QUALITY_LEVELS[quality].label}</span> standar 2026. 
                    </p>
                    <motion.a 
                      whileHover={area > 0 ? { scale: 1.02 } : {}}
                      whileTap={area > 0 ? { scale: 0.98 } : {}}
                      href={area > 0 ? `https://wa.me/62${service === 'rumah' ? '8988934644' : '82334910530'}` : '#'}
                      target={area > 0 ? "_blank" : "_self"}
                      className={`flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-lg ${area > 0 ? 'bg-gold-500 hover:bg-gold-600 text-white shadow-gold-500/20' : 'bg-navy-800 text-navy-600 cursor-not-allowed'}`}
                    >
                      Konsultasi Via WhatsApp <ArrowRight size={22} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const services = [
    {
      title: "Bangun Rumah",
      desc: "Wujudkan rumah impian Anda dengan desain modern dan struktur kokoh.",
      icon: <Home className="w-8 h-8" />,
    },
    {
      title: "Bangun Ruko",
      desc: "Konstruksi ruko fungsional untuk mendukung kesuksesan bisnis Anda.",
      icon: <Building2 className="w-8 h-8" />,
    },
    {
      title: "Renovasi Ringan",
      desc: "Perbaikan atap, pengecatan, hingga penggantian lantai dengan rapi.",
      icon: <Hammer className="w-8 h-8" />,
    },
    {
      title: "Renovasi Berat",
      desc: "Perubahan struktur, penambahan lantai, hingga perombakan total.",
      icon: <HardHat className="w-8 h-8" />,
    }
  ];

  return (
    <div className="min-h-screen selection:bg-gold-100 selection:text-gold-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">A</div>
            <span className="text-xl font-bold tracking-tight text-navy-950">{CONTACT_INFO.brandName}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#layanan" className="text-sm font-medium text-navy-600 hover:text-gold-500 transition-colors">Layanan</a>
            <a href="#tentang" className="text-sm font-medium text-navy-600 hover:text-gold-500 transition-colors">Tentang Kami</a>
            <a href="#kalkulator" className="text-sm font-medium text-navy-600 hover:text-gold-500 transition-colors">Kalkulator</a>
            <a href="#kontak" className="px-5 py-2.5 bg-navy-950 text-white rounded-full text-sm font-semibold hover:bg-navy-900 transition-all">Hubungi Kami</a>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-navy-100 p-6 space-y-4"
          >
            <a href="#layanan" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Layanan</a>
            <a href="#tentang" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Tentang Kami</a>
            <a href="#kalkulator" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Kalkulator</a>
            <a href="#kontak" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Hubungi Kami</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 text-gold-600 rounded-full text-sm font-bold mb-6">
                <ShieldCheck size={16} />
                Garansi Bangunan {CONTACT_INFO.warranty}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
                Membangun Masa Depan dengan <span className="text-gold-500 italic">Presisi</span> & Kepercayaan.
              </h1>
              <p className="text-xl text-navy-600 mb-10 leading-relaxed max-w-xl">
                Lebih dari {CONTACT_INFO.experience} pengalaman dalam mewujudkan hunian dan ruang usaha berkualitas tinggi di Tangerang Selatan dan sekitarnya.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#kalkulator" className="px-8 py-4 bg-gold-500 text-white rounded-2xl font-bold text-lg hover:bg-gold-600 transition-all shadow-lg shadow-gold-200 flex items-center gap-2">
                  Cek Estimasi Biaya <ArrowUpRight size={20} />
                </a>
                <a href="#tentang" className="px-8 py-4 bg-white border-2 border-navy-100 text-navy-950 rounded-2xl font-bold text-lg hover:border-navy-200 transition-all">
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-[40px] overflow-hidden bg-navy-100">
                <img 
                  src="https://picsum.photos/seed/construction/800/800" 
                  alt="Construction Site" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-navy-50 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-gold-500">{CONTACT_INFO.experience.split(' ')[0]}</div>
                  <div className="text-sm font-bold text-navy-500 uppercase tracking-widest leading-tight">
                    Tahun<br />Pengalaman
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-24 bg-navy-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Layanan Konstruksi Kami</h2>
            <p className="text-lg text-navy-600">
              Kami menyediakan solusi konstruksi menyeluruh dengan standar kualitas tinggi untuk setiap proyek Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl border border-navy-100 hover:shadow-xl hover:shadow-navy-200/50 transition-all"
              >
                <div className="w-16 h-16 bg-navy-50 text-gold-500 rounded-2xl flex items-center justify-center mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-navy-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://picsum.photos/seed/build1/400/600" className="rounded-3xl w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                  <div className="bg-gold-500 p-6 rounded-3xl text-white">
                    <p className="text-sm font-bold uppercase tracking-widest mb-2">Garansi</p>
                    <p className="text-2xl font-bold">{CONTACT_INFO.warranty} Full</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="bg-navy-950 p-6 rounded-3xl text-white">
                    <p className="text-sm font-bold uppercase tracking-widest mb-2">Kualitas</p>
                    <p className="text-2xl font-bold">Premium</p>
                  </div>
                  <img src="https://picsum.photos/seed/build2/400/600" className="rounded-3xl w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Mengapa Memilih Ardhi Konstruksi?</h2>
              <div className="space-y-8">
                {[
                  { title: "Pengalaman 20 Tahun", desc: "Dua dekade menangani berbagai skala proyek konstruksi dengan hasil memuaskan." },
                  { title: "Transparansi Biaya", desc: "Estimasi harga yang akurat dan jujur tanpa biaya tersembunyi di tengah jalan." },
                  { title: "Garansi Bangunan", desc: "Kami memberikan jaminan struktur selama 2 tahun untuk ketenangan pikiran Anda." },
                  { title: "Tenaga Ahli Profesional", desc: "Tim tukang dan pengawas berpengalaman yang bekerja dengan standar SOP ketat." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-navy-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-24 bg-navy-50 px-6">
        <div className="max-w-7xl mx-auto">
          <Calculator />
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-navy-950 rounded-[40px] p-8 md:p-20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 blur-[120px] -mr-48 -mt-48" />
            
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Siap Memulai Proyek Anda?</h2>
                <p className="text-xl text-navy-400 mb-12 leading-relaxed">
                  Konsultasikan kebutuhan bangun atau renovasi Anda sekarang. Tim kami siap memberikan solusi terbaik.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-navy-500 font-bold uppercase tracking-widest">WhatsApp</p>
                      <p className="text-lg font-medium">{CONTACT_INFO.whatsapp1} / {CONTACT_INFO.whatsapp2}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-navy-500 font-bold uppercase tracking-widest">Email</p>
                      <p className="text-lg font-medium">{CONTACT_INFO.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-navy-500 font-bold uppercase tracking-widest">Alamat Kantor</p>
                      <p className="text-lg font-medium max-w-sm">{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 text-navy-950">
                <h3 className="text-2xl font-bold mb-6">Kirim Pesan Cepat</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-bold text-navy-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                    <input type="text" className="w-full px-5 py-3 bg-navy-50 border border-navy-100 rounded-xl focus:outline-none focus:border-gold-500" placeholder="Nama Anda" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-500 uppercase tracking-widest mb-2">Nomor WhatsApp</label>
                    <input type="text" className="w-full px-5 py-3 bg-navy-50 border border-navy-100 rounded-xl focus:outline-none focus:border-gold-500" placeholder="0812..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-500 uppercase tracking-widest mb-2">Pesan</label>
                    <textarea className="w-full px-5 py-3 bg-navy-50 border border-navy-100 rounded-xl focus:outline-none focus:border-gold-500 h-32" placeholder="Ceritakan proyek Anda..."></textarea>
                  </div>
                  <button className="w-full py-4 bg-gold-500 text-white rounded-xl font-bold hover:bg-gold-600 transition-colors">
                    Kirim ke WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-navy-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold tracking-tight text-navy-950">{CONTACT_INFO.brandName}</span>
          </div>
          <p className="text-navy-500 text-sm">
            © 2026 {CONTACT_INFO.brandName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-navy-400 hover:text-gold-500 transition-colors"><Clock size={20} /></a>
            <a href="#" className="text-navy-400 hover:text-gold-500 transition-colors"><ShieldCheck size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
