import React, { useState, useEffect, useMemo } from 'react';
import { 
  Rocket, 
  Home, 
  Grid, 
  ShoppingBag, 
  LifeBuoy, 
  Star, 
  Check, 
  ChevronRight,
  Sparkles,
  Clock,
  Users,
  RefreshCw,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  ArrowRight
} from 'lucide-react';

// --- DATA TYPES ---
interface Variant {
  id: string;
  duration: string;
  type: string;
  price: string;
  originalPrice: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  basePrice: string; 
  baseOriginalPrice: string;
  color: string;
  icon: string; // URL string for images
  features: string[];
  variants: Variant[];
}

// --- REAL DATA (MXN) ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Netflix Premium",
    category: "Streaming",
    basePrice: "$85 MXN",
    baseOriginalPrice: "$219 MXN",
    color: "from-red-600 to-red-900",
    // Logo "N" Rojo original
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/1024px-Netflix_icon.svg.png",
    features: ["4 Dispositivos Ultra HD", "Sin anuncios", "Descargas Offline", "Audio Espacial"],
    variants: [
      { id: 'nf-1m-p', duration: '1 Mes', type: 'Perfil Extra', price: '$85 MXN', originalPrice: '$219 MXN' },
      { id: 'nf-3m-p', duration: '3 Meses', type: 'Perfil Extra', price: '$240 MXN', originalPrice: '$657 MXN' },
      { id: 'nf-1m-c', duration: '1 Mes', type: 'Cuenta Completa', price: '$180 MXN', originalPrice: '$299 MXN' },
    ]
  },
  {
    id: 2,
    name: "Spotify Premium",
    category: "Música",
    basePrice: "$40 MXN",
    baseOriginalPrice: "$129 MXN",
    color: "from-green-500 to-green-900",
    // Logo Verde original
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1024px-Spotify_icon.svg.png",
    features: ["Música sin anuncios", "Modo Offline", "Skips ilimitados", "Alta Calidad 320kbps"],
    variants: [
      { id: 'sp-1m-i', duration: '1 Mes', type: 'Individual', price: '$40 MXN', originalPrice: '$129 MXN' },
      { id: 'sp-3m-i', duration: '3 Meses', type: 'Individual', price: '$110 MXN', originalPrice: '$387 MXN' },
      { id: 'sp-1y-f', duration: '1 Año', type: 'Familiar', price: '$450 MXN', originalPrice: '$1,200 MXN' },
    ]
  },
  {
    id: 3,
    name: "Disney+ Premium",
    category: "Entretenimiento",
    basePrice: "$50 MXN",
    baseOriginalPrice: "$179 MXN",
    color: "from-blue-600 to-indigo-900",
    // Logo Azul/Negro original
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1280px-Disney%2B_logo.svg.png",
    features: ["Películas IMAX Enhanced", "Series Exclusivas", "Descargas ilimitadas", "Control Parental"],
    variants: [
      { id: 'dp-1m-p', duration: '1 Mes', type: 'Perfil', price: '$50 MXN', originalPrice: '$179 MXN' },
      { id: 'dp-6m-p', duration: '6 Meses', type: 'Perfil', price: '$280 MXN', originalPrice: '$1,074 MXN' },
    ]
  },
  {
    id: 4,
    name: "Max (HBO)",
    category: "Streaming",
    basePrice: "$45 MXN",
    baseOriginalPrice: "$149 MXN",
    color: "from-indigo-600 to-blue-800",
    // Logo Max Azul original
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Max_logo.svg/1200px-Max_logo.svg.png",
    features: ["4K UHD + Dolby Atmos", "Warner Bros & DC", "Deportes en vivo", "Discovery Channel"],
    variants: [
      { id: 'mx-1m-p', duration: '1 Mes', type: 'Perfil', price: '$45 MXN', originalPrice: '$149 MXN' },
      { id: 'mx-1y-p', duration: '1 Año', type: 'Perfil', price: '$450 MXN', originalPrice: '$1,788 MXN' },
    ]
  },
  {
    id: 5,
    name: "Canva Pro",
    category: "Diseño",
    basePrice: "$25 MXN",
    baseOriginalPrice: "$149 MXN",
    color: "from-teal-400 to-purple-600",
    icon: "https://static.vecteezy.com/system/resources/previews/032/329/175/non_2x/canva-icon-logo-symbol-free-png.png",
    features: ["Kit de Marca", "Redimensionado Mágico", "100GB Almacenamiento", "Removedor de Fondos"],
    variants: [
      { id: 'cp-1m-edu', duration: '1 Mes', type: 'Edu Team', price: '$25 MXN', originalPrice: '$149 MXN' },
      { id: 'cp-1y-edu', duration: '1 Año', type: 'Edu Team', price: '$200 MXN', originalPrice: '$1,500 MXN' },
      { id: 'cp-1m-pro', duration: '1 Mes', type: 'Pro Privada', price: '$65 MXN', originalPrice: '$250 MXN' },
    ]
  }
];

// --- COMPONENTS ---

// 1. Header Component
const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-6 transition-all duration-300">
    <div className="flex items-center gap-2">
      <div className="relative group">
        <Rocket className="w-6 h-6 text-neon-cyan animate-pulse-slow group-hover:rotate-12 transition-transform duration-500" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-neon-fuchsia rounded-full animate-ping" />
      </div>
      <h1 className="text-xl font-black tracking-tighter italic select-none">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-white to-neon-fuchsia drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
          TAKEOFF
        </span>
      </h1>
    </div>
    
    <div className="relative group cursor-pointer">
      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-neon-fuchsia to-neon-cyan p-[2px] shadow-[0_0_10px_rgba(6,182,212,0.3)]">
        <img 
          src="https://picsum.photos/100/100" 
          alt="User" 
          className="rounded-full w-full h-full object-cover border-2 border-slate-950"
        />
      </div>
      <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
    </div>
  </header>
);

// 2. Hero Banner Component
const Hero = ({ onNavigate }: { onNavigate: () => void }) => (
  <div className="relative w-full h-72 rounded-[2rem] overflow-hidden mt-6 mb-8 group shadow-2xl shadow-neon-fuchsia/10">
    {/* Background Image & Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-10"></div>
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614726365723-49cfae967a1a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-60"></div>
    
    {/* Animated Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-cyan-900/40 mix-blend-overlay z-0"></div>

    {/* Content */}
    <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-6 items-start">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-widest text-neon-cyan mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <Sparkles size={12} className="animate-pulse" />
        <span>Premium Access</span>
      </div>
      
      <h2 className="text-3xl font-black leading-[1.1] mb-2 tracking-tight text-white">
        Despega tu <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-fuchsia to-white drop-shadow-lg">
          Entretenimiento
        </span>
      </h2>
      
      <p className="text-slate-300 font-medium text-sm mb-6 max-w-[85%] leading-relaxed">
        Suscripciones premium a precios increíbles. Ahorra hasta un 70% hoy.
      </p>
      
      <button 
        onClick={onNavigate}
        className="relative overflow-hidden bg-gradient-to-r from-[#d946ef] to-[#06b6d4] hover:brightness-110 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all duration-300 transform active:scale-95 flex items-center gap-2 group/btn"
      >
        <span className="relative z-10">Ver Planes</span>
        <ChevronRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
      </button>
    </div>
  </div>
);

// 3. Product Card Component
const ProductCard = ({ product, onClick }: { product: Product, onClick: (p: Product) => void }) => (
  <div 
    onClick={() => onClick(product)}
    className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 overflow-hidden group hover:border-[#06b6d4] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 cursor-pointer active:scale-[0.98]"
  >
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start mb-4">
        {/* MODIFIED: bg-white instead of product.color for better icon visibility */}
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300 p-2">
           <img src={product.icon} alt={product.name} className="w-full h-full object-contain drop-shadow-md" />
        </div>
        <div className="bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider text-neon-cyan border border-neon-cyan/20 group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/50 transition-colors">
          PROMO
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-lg text-slate-100 mb-1 leading-tight group-hover:text-neon-cyan transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-500 text-xs font-medium tracking-wide mb-3">{product.category}</p>
        
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white tracking-tight">{product.basePrice}</span>
          <span className="text-xs text-slate-600 line-through font-medium">{product.baseOriginalPrice}</span>
        </div>
      </div>
    </div>
  </div>
);

// 5. Orders View Component
const OrdersView = ({ onNavigate }: { onNavigate: () => void }) => {
  // Mock Data for Orders
  const MOCK_ORDERS = [
    {
      id: 'ord-001',
      serviceName: 'Netflix Premium',
      plan: 'Perfil Extra - 1 Mes',
      status: 'active', // active, processing, expired
      date: '10 Oct 2023',
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/1024px-Netflix_icon.svg.png",
    },
    {
      id: 'ord-002',
      serviceName: 'Spotify Premium',
      plan: 'Individual - 3 Meses',
      status: 'expired',
      date: '15 Jul 2023',
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1024px-Spotify_icon.svg.png",
    }
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'active':
        return { 
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          text: 'Activo'
        };
      case 'processing':
        return { 
          badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
          text: 'Procesando'
        };
      case 'expired':
        return { 
          badge: 'bg-red-500/10 text-red-400 border-red-500/20',
          text: 'Vencido'
        };
      default:
        return { badge: 'bg-slate-800 text-slate-400', text: 'Desconocido' };
    }
  };

  return (
    <div className="animate-fade-in space-y-6 mt-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-8 bg-gradient-to-b from-neon-fuchsia to-purple-600 rounded-full"></div>
        <h2 className="text-2xl font-black text-white tracking-tight">Mis Pedidos</h2>
      </div>

      {MOCK_ORDERS.length > 0 ? (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => {
            const statusStyle = getStatusStyle(order.status);
            return (
              <div key={order.id} className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-2xl p-4 flex gap-4 items-center group hover:border-neon-cyan/20 transition-all duration-300 relative overflow-hidden">
                {/* Neon Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-black/20 shrink-0 p-2.5">
                   <img src={order.icon} alt={order.serviceName} className="w-full h-full object-contain" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-100 truncate pr-2">{order.serviceName}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusStyle.badge}`}>
                      {statusStyle.text}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mb-3">{order.plan}</p>
                  
                  {/* Action */}
                  {order.status === 'active' ? (
                     <button className="text-xs font-bold text-neon-cyan flex items-center gap-1 hover:text-white transition-colors">
                        Ver Datos <ArrowRight size={12} />
                     </button>
                  ) : (
                    <button 
                      onClick={onNavigate}
                      className="text-xs font-bold text-neon-fuchsia flex items-center gap-1 hover:text-white transition-colors"
                    >
                        <RefreshCw size={12} /> Renovar Ahora
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
           <ShoppingBag size={48} className="mx-auto text-slate-700 mb-4" />
           <p className="text-slate-400 mb-6">Aún no tienes suscripciones activas.</p>
           <button 
             onClick={onNavigate}
             className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm font-bold transition-colors"
           >
             Ir al Catálogo
           </button>
        </div>
      )}
    </div>
  );
};

// 6. Support View Component
const SupportView = () => {
  const FAQ_ITEMS = [
    {
      q: "¿Qué hago si mi cuenta falla?",
      a: "No te preocupes. Todas nuestras suscripciones tienen garantía de 30 días. Contáctanos y te daremos reemplazo inmediato.",
      icon: ShieldCheck
    },
    {
      q: "¿Cuánto tarda la entrega?",
      a: "El proceso es muy rápido. Generalmente entregamos entre 5 a 10 minutos después de confirmar tu pago.",
      icon: Clock
    },
    {
      q: "¿Métodos de pago aceptados?",
      a: "Aceptamos Transferencia Bancaria (SPEI) y Depósitos en OXXO. Te enviaremos los datos por WhatsApp.",
      icon: CreditCard
    }
  ];

  const handleSupportChat = () => {
     window.open("https://wa.me/5215555555555", "_blank");
  };

  return (
    <div className="animate-fade-in space-y-8 mt-4">
      {/* Hero Section */}
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4 rotate-3 hover:rotate-6 transition-transform">
           <MessageCircle size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-white leading-tight mb-2">¿Necesitas ayuda <br/> con tu cuenta?</h2>
        <p className="text-slate-400 text-sm max-w-[80%] mx-auto mb-6">
          Nuestro equipo de soporte está disponible todos los días para resolver tus dudas.
        </p>

        <button 
          onClick={handleSupportChat}
          className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-500 hover:brightness-110 text-white font-bold py-4 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] group"
        >
          <div className="flex items-center justify-center gap-2 relative z-10">
             <MessageCircle size={20} />
             <span>Chatear con Soporte</span>
          </div>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>

      {/* FAQ Section */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 pl-1">Preguntas Frecuentes</h3>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:bg-slate-800/40 transition-colors">
               <div className="flex items-start gap-3">
                 <div className="p-2 bg-slate-800 rounded-lg shrink-0 text-neon-cyan">
                    <item.icon size={18} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-200 text-sm mb-1">{item.q}</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">{item.a}</p>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. Bottom Sheet / Modal Component
const ProductModal = ({ product, isOpen, onClose }: { product: Product | null, isOpen: boolean, onClose: () => void }) => {
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  // Reset logic when product opens
  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedDuration(product.variants[0].duration);
      setSelectedType(product.variants[0].type);
    }
  }, [product]);

  // Derived state for available options based on variants
  const availableDurations = useMemo(() => {
    if (!product) return [];
    return Array.from(new Set(product.variants.map(v => v.duration)));
  }, [product]);

  const availableTypes = useMemo(() => {
    if (!product) return [];
    return Array.from(new Set(product.variants.map(v => v.type)));
  }, [product]);

  // Find the specific variant matching current selection
  const currentVariant = useMemo(() => {
    if (!product) return null;
    return product.variants.find(v => v.duration === selectedDuration && v.type === selectedType) || product.variants[0];
  }, [product, selectedDuration, selectedType]);

  // Handle WhatsApp Purchase
  const handlePurchase = () => {
    if (!product || !currentVariant) return;
    
    // Placeholder number for business
    const phoneNumber = "5215555555555"; 
    
    // Logic: Hola TAKEOFF, me interesa [Producto] plan [Variante] por [Precio].
    const message = `Hola TAKEOFF, me interesa ${product.name} plan ${currentVariant.type} (${currentVariant.duration}) por ${currentVariant.price}.`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!product && !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 transition-opacity duration-500 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0B1121] border-t border-slate-700/50 rounded-t-[2.5rem] p-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transform transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${isOpen ? 'translate-y-0' : 'translate-y-[110%]'} max-h-[90vh] overflow-y-auto no-scrollbar`}
      >
        {/* Glow Element */}
        <div className="sticky top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-neon-fuchsia/50 to-transparent blur-sm z-10"></div>

        {/* Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-700/50 rounded-full mx-auto mb-6" />
        
        {product && currentVariant && (
          <div className="animate-fade-in-up">
            <div className="flex items-start gap-5 mb-8">
              {/* MODIFIED: bg-white instead of product.color for better icon visibility */}
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-2xl shadow-neon-fuchsia/20 ring-4 ring-slate-800/50 shrink-0 p-3">
                 <img src={product.icon} alt={product.name} className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <div className="pt-1 w-full">
                <div className="flex justify-between items-start w-full">
                  <h2 className="text-2xl font-black text-white leading-none tracking-tight mb-2">{product.name}</h2>
                  <div className="flex items-center gap-1">
                     <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                     <span className="text-xs text-slate-400 font-bold">4.9</span>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-neon-cyan tracking-tight">{currentVariant.price}</span>
                  <span className="text-sm text-slate-500 line-through font-bold decoration-slate-600">{currentVariant.originalPrice}</span>
                </div>
                <div className="inline-flex px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase rounded tracking-wider">
                  Mejor Precio
                </div>
              </div>
            </div>

            {/* VARIANTS SELECTORS */}
            <div className="space-y-6 mb-8">
              {/* Type Selection */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Users size={14} /> Tipo de Cuenta
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`
                        px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-300
                        ${selectedType === type 
                          ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                          : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800 hover:text-white'}
                      `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selection */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Clock size={14} /> Duración
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableDurations.map(dur => (
                    <button
                      key={dur}
                      onClick={() => setSelectedDuration(dur)}
                      className={`
                        px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-300
                        ${selectedDuration === dur 
                          ? 'bg-neon-fuchsia/10 border-neon-fuchsia text-neon-fuchsia shadow-[0_0_10px_rgba(217,70,239,0.2)]' 
                          : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800 hover:text-white'}
                      `}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1">Incluye</h3>
              {product.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-200">
                  <div className="bg-neon-fuchsia/20 p-1 rounded-full">
                    <Check size={12} className="text-neon-fuchsia" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handlePurchase}
              className="w-full bg-gradient-to-r from-[#d946ef] to-[#06b6d4] hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-[0_0_25px_rgba(217,70,239,0.3)] active:scale-[0.98] transition-all flex justify-between px-6 items-center group relative overflow-hidden"
            >
              <div className="flex flex-col items-start relative z-10">
                <span className="text-xs font-medium text-white/80">Pedir por WhatsApp</span>
                <span className="text-lg leading-none">{currentVariant.price}</span>
              </div>
              
              <div className="flex items-center gap-2 relative z-10 bg-black/20 px-3 py-1.5 rounded-lg group-hover:bg-black/30 transition-colors">
                <span className="text-sm">Enviar</span>
                <ChevronRight size={16} />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] to-[#d946ef] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// --- MAIN APP ---
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'orders' | 'support'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening modal
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    // Small delay to allow mounting before animation
    requestAnimationFrame(() => {
        setTimeout(() => setIsModalOpen(true), 10);
    });
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 500); // Wait for animation
  };

  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-neon-fuchsia selection:text-white bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 text-slate-200 overflow-y-auto">
      <Header />

      <main className="pt-20 px-5 max-w-lg mx-auto w-full">
        {/* Render View based on Tab */}
        {activeTab === 'home' && (
          <div className="animate-fade-in space-y-8">
            <Hero onNavigate={() => setActiveTab('catalog')} />
            
            <div>
              <div className="flex items-end justify-between mb-5 px-1">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
                  <div className="p-1.5 bg-neon-fuchsia/10 rounded-lg">
                    <Grid size={18} className="text-neon-fuchsia" />
                  </div>
                  Catálogo Popular
                </h3>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="text-xs font-bold text-neon-cyan hover:text-white transition-colors uppercase tracking-wider"
                >
                  Ver todo
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {PRODUCTS.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={handleProductClick} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'catalog' && (
           <div className="animate-fade-in mt-4">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-neon-cyan to-neon-fuchsia rounded-full"></div>
                <h2 className="text-2xl font-black text-white tracking-tight">Todos los Servicios</h2>
             </div>
             {/* FIXED: Removed duplicate mapping */}
             <div className="grid grid-cols-2 gap-4">
              {PRODUCTS.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={handleProductClick} 
                />
              ))}
            </div>
           </div>
        )}

        {/* REPLACED: Orders View Integration */}
        {activeTab === 'orders' && (
          <OrdersView onNavigate={() => setActiveTab('catalog')} />
        )}

        {/* REPLACED: Support View Integration */}
        {activeTab === 'support' && (
          <SupportView />
        )}
      </main>

      {/* Glassmorphism Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 bg-slate-950/70 backdrop-blur-2xl border border-white/5 rounded-3xl flex items-center justify-evenly px-2 z-40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] max-w-lg mx-auto ring-1 ring-white/5">
        {[
            { id: 'home', icon: Home, label: 'Inicio' },
            { id: 'catalog', icon: Grid, label: 'Catálogo' },
            { id: 'orders', icon: ShoppingBag, label: 'Pedidos' },
            { id: 'support', icon: LifeBuoy, label: 'Ayuda' }
        ].map((item) => (
            <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className="group relative flex flex-col items-center justify-center gap-1 w-14 h-14"
            >
                <div className={`
                    absolute inset-0 rounded-2xl transition-all duration-300
                    ${activeTab === item.id 
                        ? 'bg-gradient-to-b from-white/10 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.15)] opacity-100 scale-100' 
                        : 'opacity-0 scale-75'}
                `}></div>
                
                <item.icon 
                    size={24} 
                    className={`
                        relative z-10 transition-all duration-300
                        ${activeTab === item.id 
                            ? 'text-neon-cyan -translate-y-0.5' 
                            : 'text-slate-500 group-hover:text-slate-300'}
                    `} 
                />
                
                {activeTab === item.id && (
                    <div className="w-1 h-1 bg-neon-fuchsia rounded-full shadow-[0_0_5px_#d946ef] animate-fade-in" />
                )}
            </button>
        ))}
      </nav>

      {/* Modal Injection */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default App;