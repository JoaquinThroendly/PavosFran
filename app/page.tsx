// app/page.tsx - VERSIÓN COMPLETA CON CARRUSELES Y TODOS LOS ITEMS
'use client';

import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// 🔧 FUNCIÓN MEJORADA PARA IMÁGENES DE FORTNITE
const getValidImageUrl = (url: string | undefined | null): string => {
  if (!url || url.includes('null') || url === '' || url === 'undefined') {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb3J0bml0ZSBJdGVtPC90ZXh0Pgo8L3N2Zz4=';
  }
  
  // Si ya es una URL completa
  if (url.startsWith('http')) {
    return url;
  }
  
  // Si es una ruta relativa de Fortnite API
  if (url.startsWith('/')) {
    // Asegurar que use el dominio correcto
    if (url.includes('media.fortniteapi.io')) {
      return url;
    }
    return `https://media.fortniteapi.io${url}`;
  }
  
  // Si parece ser un ID de cosmetico
  if (url.includes('icon') || url.includes('featured') || url.includes('.png') || url.includes('.jpg')) {
    return `https://media.fortniteapi.io/images/${url}`;
  }
  
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb3J0bml0ZSBJdGVtPC90ZXh0Pgo8L3N2Zz4=';
};

// Textos traducidos COMPLETOS
const translations = {
  en: {
    home: "Home",
    products: "Products",
    payments: "Payments",
    contact: "Contact",
    welcome: "Welcome to Pavos Fran",
    welcomeText: "We offer the best service so you can get everything you want from the Fortnite Item Shop.",
    userReviews: "User Reviews",
    seeReviews: "See what our customers say. Leave your review below!",
    yourName: "Your name",
    shareExperience: "Share your experience...",
    rating: "Rating",
    submitReview: "Submit Review",
    browseProducts: "🎮 Browse All Products 🎮",
    selectCategory: "Select a Category",
    close: "Close",
    fortniteCrew: "Fortnite Crew",
    monthlySubs: "Monthly Subs",
    cosmeticsGift: "Cosmetics Gift",
    skinsItems: "Skins & Items",
    gamePass: "Game Pass",
    xboxSub: "Xbox Sub",
    exclusivePacks: "Exclusive Packs",
    specialBundles: "Special Bundles",
    vbucks: "V-Bucks",
    gameCurrency: "Game Currency",
    discounts: "Discounts",
    bulkDeals: "Bulk Deals",
    contactWhatsApp: "Contact WhatsApp",
    paymentMethods: "Payment Methods",
    creditCard: "Credit Card",
    debitCard: "Debit Card",
    mercadoPago: "Mercado Pago",
    daviPlata: "DaviPlata",
    nequi: "Nequi",
    yape: "Yape",
    pagoMovil: "Pago Móvil",
    cashApp: "Cash App",
    contactUs: "Contact Us",
    email: "📧 Email",
    phone: "📞 Phone",
    address: "📍 Address",
    followUs: "Follow Us",
    selectCurrency: "Select Currency:",
    visits: "Visits",
    whatsappMessage: "💬 Hi! Need help?",
    allRightsReserved: "All rights reserved.",
    exchangeRate: "Exchange Rate",
    loadingRates: "Loading exchange rates...",
    rateUpdate: "Last update",
    apiError: "Using default rates",
    fortniteShop: "Fortnite Item Shop",
    dailyItems: "Daily Items",
    featuredItems: "Featured Items",
    price: "Price",
    rarity: "Rarity",
    availableUntil: "Available Until",
    loadingShop: "Loading Fortnite Shop...",
    errorLoadingShop: "Error loading shop",
    refreshShop: "Refresh Shop",
    vBucks: "V-Bucks",
    today: "Today",
    noItemsAvailable: "No items available",
    tryAgain: "Try Again",
    apiStatus: "API Status",
    realTimeData: "Real-time data",
    demoData: "Demo data",
    connecting: "Connecting to API...",
    menu: "Menu",
    viewAll: "View All",
    previous: "Previous",
    next: "Next",
    slide: "Slide",
    allItems: "All Items",
    filterByRarity: "Filter by Rarity",
    allRarities: "All Rarities",
    categories: "Categories",
    totalItems: "Total Items"
  },
  es: {
    home: "Inicio",
    products: "Productos",
    payments: "Pagos",
    contact: "Contacto",
    welcome: "Bienvenido a Pavos Fran",
    welcomeText: "Ofrecemos el mejor servicio para que puedas obtener todo lo que quieras de la Tienda de Fortnite.",
    userReviews: "Opiniones de Usuarios",
    seeReviews: "Mira lo que dicen nuestros clientes. ¡Deja tu reseña abajo!",
    yourName: "Tu nombre",
    shareExperience: "Comparte tu experiencia...",
    rating: "Calificación",
    submitReview: "Enviar Reseña",
    browseProducts: "🎮 Explorar Todos los Productos 🎮",
    selectCategory: "Seleccionar Categoría",
    close: "Cerrar",
    fortniteCrew: "Fortnite Crew",
    monthlySubs: "Suscripciones Mensuales",
    cosmeticsGift: "Regalo de Cosméticos",
    skinsItems: "Skins y Artículos",
    gamePass: "Game Pass",
    xboxSub: "Suscripción Xbox",
    exclusivePacks: "Paquetes Exclusivos",
    specialBundles: "Lotes Especiales",
    vbucks: "V-Bucks",
    gameCurrency: "Moneda del Juego",
    discounts: "Descuentos",
    bulkDeals: "Ofertas al por Mayor",
    contactWhatsApp: "Contactar por WhatsApp",
    paymentMethods: "Métodos de Pago",
    creditCard: "Tarjeta de Crédito",
    debitCard: "Tarjeta de Débito",
    mercadoPago: "Mercado Pago",
    daviPlata: "DaviPlata",
    nequi: "Nequi",
    yape: "Yape",
    pagoMovil: "Pago Móvil",
    cashApp: "Cash App",
    contactUs: "Contáctanos",
    email: "📧 Correo",
    phone: "📞 Teléfono",
    address: "📍 Dirección",
    followUs: "Síguenos",
    selectCurrency: "Seleccionar Moneda:",
    visits: "Visitas",
    whatsappMessage: "💬 ¡Hola! ¿Necesitas ayuda?",
    allRightsReserved: "Todos los derechos reservados.",
    exchangeRate: "Tipo de Cambio",
    loadingRates: "Cargando tasas de cambio...",
    rateUpdate: "Última actualización",
    apiError: "Usando tasas predeterminadas",
    fortniteShop: "Tienda de Fortnite",
    dailyItems: "Items Diarios",
    featuredItems: "Items Destacados",
    price: "Precio",
    rarity: "Rareza",
    availableUntil: "Disponible Hasta",
    loadingShop: "Cargando Tienda de Fortnite...",
    errorLoadingShop: "Error cargando la tienda",
    refreshShop: "Actualizar Tienda",
    vBucks: "Pavos",
    today: "Hoy",
    noItemsAvailable: "No hay items disponibles",
    tryAgain: "Intentar de nuevo",
    apiStatus: "Estado API",
    realTimeData: "Datos en tiempo real",
    demoData: "Datos de demostración",
    connecting: "Conectando a API...",
    menu: "Menú",
    viewAll: "Ver Todos",
    previous: "Anterior",
    next: "Siguiente",
    slide: "Diapositiva",
    allItems: "Todos los Items",
    filterByRarity: "Filtrar por Rareza",
    allRarities: "Todas las Rarezas",
    categories: "Categorías",
    totalItems: "Items Totales"
  }
};

// Tasas de cambio predeterminadas
const defaultExchangeRates = {
  USD: 1,
  EUR: 0.92,
  MXN: 16.80,
  ARS: 1450,
  BRL: 5.05,
  CLP: 920,
  COP: 3900,
  PEN: 3.75,
  UYU: 39
};

interface ProductPrice {
  label: string;
  priceUSD: number;
}

interface Product {
  id: number;
  name: string;
  image: string;
  prices: ProductPrice[];
}

interface Comment {
  id: number;
  name: string;
  comment: string;
  date: string;
  rating: number;
}

// INTERFACE PARA ITEMS DE FORTNITE
interface FortniteItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rarity: {
    value: string;
    displayValue: string;
    backendValue: string;
  };
  images: {
    icon: string;
    featured?: string;
    background?: string;
  };
  type: {
    value: string;
    displayValue: string;
    backendValue: string;
  };
}

interface FortniteShop {
  allItems: FortniteItem[];
  daily: FortniteItem[];
  featured: FortniteItem[];
  lastUpdate: string;
  source: 'api' | 'mock';
}

// Función de respaldo para items con error
const createFallbackItem = (index: number): FortniteItem => ({
  id: `fallback-${index}-${Date.now()}`,
  name: 'Item no disponible',
  description: 'Este item no pudo ser cargado correctamente',
  price: 0,
  rarity: {
    value: 'common',
    displayValue: 'Común',
    backendValue: 'Common'
  },
  images: {
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5FcnJvcjwvdGV4dD4KPC9zdmc+'
  },
  type: {
    value: 'outfit',
    displayValue: 'Skin',
    backendValue: 'AthenaCharacter'
  }
});

// Función para extraer precio
const extractPrice = (item: any): number => {
  if (!item) return 0;
  
  if (item.finalPrice) return item.finalPrice;
  if (item.regularPrice) return item.regularPrice;
  if (item.price) {
    if (typeof item.price === 'object') {
      return item.price.finalPrice || item.price.regularPrice || 0;
    }
    return item.price;
  }
  return 0;
};

// Función auxiliar para procesar items
const processItemsArray = (items: any[]): FortniteItem[] => {
  if (!items || !Array.isArray(items)) {
    return [];
  }

  return items.map((item: any, index: number) => {
    if (!item) {
      return createFallbackItem(index);
    }

    try {
      const itemPrice = Number(extractPrice(item)) || 0;

      const itemName = 
        item.name || 
        item.displayName || 
        item.title || 
        `Item ${item.id || index}`;

      const itemDescription = 
        item.description || 
        item.displayDescription || 
        'Fortnite Item';

      const itemImages = item.images || item.itemImages || {};
      let mainImage = itemImages.icon || itemImages.featured || itemImages.smallIcon || '';

      return {
        id: item.id || `item-${index}-${Date.now()}`,
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        rarity: {
          value: item.rarity?.value || item.rarity?.id || 'common',
          displayValue: item.rarity?.displayValue || item.rarity?.name || 'Common',
          backendValue: item.rarity?.backendValue || item.rarity?.id || 'Common'
        },
        images: {
          icon: getValidImageUrl(mainImage),
          featured: getValidImageUrl(itemImages.featured || itemImages.largeIcon),
          background: getValidImageUrl(itemImages.background)
        },
        type: {
          value: item.type?.value || item.type?.id || 'outfit',
          displayValue: item.type?.displayValue || item.type?.name || 'Skin',
          backendValue: item.type?.backendValue || item.type?.id || 'AthenaCharacter'
        }
      };
    } catch (error) {
      console.error(`Error procesando item ${index}:`, error);
      return createFallbackItem(index);
    }
  }).filter(Boolean);
};

// FUNCIÓN PARA OBTENER COLOR SEGÚN RAREZA
const getRarityColor = (rarity: string): string => {
  const rarityColors: { [key: string]: string } = {
    'common': '#888888',
    'uncommon': '#00a8ff',
    'rare': '#9b59b6',
    'epic': '#e74c3c',
    'legendary': '#f39c12',
    'marvel': '#c0392b',
    'dark': '#2c3e50',
    'dc': '#3498db',
    'lava': '#e67e22',
    'frozen': '#1abc9c',
    'shadow': '#8e44ad',
    'icon': '#27ae60',
    'star wars': '#f1c40f'
  };
  
  return rarityColors[rarity.toLowerCase()] || '#888888';
};

// Función de procesamiento SIN LÍMITES
const processFortniteApiData = (apiData: any): FortniteShop => {
  console.log('🔧 Procesando datos de la API...');
  
  let items: any[] = [];

  if (apiData.data && apiData.data.shop) {
    items = apiData.data.shop;
    console.log('📦 Usando estructura: data.shop');
  } else if (apiData.shop) {
    items = apiData.shop;
    console.log('📦 Usando estructura: shop');
  } else if (apiData.featured && apiData.daily) {
    items = [...(apiData.featured || []), ...(apiData.daily || [])];
    console.log('📦 Combinando featured y daily');
  } else if (apiData.featured) {
    items = apiData.featured;
    console.log('📦 Usando estructura: featured');
  } else if (Array.isArray(apiData)) {
    items = apiData;
    console.log('📦 Usando estructura: array directo');
  }

  console.log(`🎯 Encontrados ${items.length} items para procesar`);

  if (items.length === 0) {
    return {
      allItems: [],
      daily: [],
      featured: [],
      lastUpdate: new Date().toISOString(),
      source: 'api'
    };
  }

  const processedItems = processItemsArray(items);
  
  const featuredItems: FortniteItem[] = [];
  const dailyItems: FortniteItem[] = [];

  // Clasificación SIN límite de cantidad
  processedItems.forEach((item) => {
    const isFeatured = 
      item.price > 1000 || 
      ['legendary', 'epic', 'marvel', 'icon'].includes(item.rarity.value.toLowerCase());

    if (isFeatured) {
      featuredItems.push(item);
    } else {
      dailyItems.push(item);
    }
  });

  console.log(`✅ Procesado final: ${featuredItems.length} featured, ${dailyItems.length} daily, ${processedItems.length} total`);

  return {
    allItems: processedItems,
    daily: dailyItems,
    featured: featuredItems,
    lastUpdate: new Date().toISOString(),
    source: 'api'
  };
};

// DATOS DE EJEMPLO
const createRealisticMockShopData = (): FortniteShop => {
  const mockItems = [
    {
      id: 'mock-1',
      name: 'Omega Knight',
      description: 'Caballero legendario con armadura cibernética',
      price: 1500,
      rarity: { value: 'legendary', displayValue: 'Legendario', backendValue: 'Legendary' },
      images: { icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5PbWVnYSBLbmlnaHQ8L3RleHQ+Cjwvc3ZnPg==' },
      type: { value: 'outfit', displayValue: 'Skin', backendValue: 'AthenaCharacter' }
    }
  ];

  return {
    allItems: mockItems,
    daily: mockItems,
    featured: mockItems,
    lastUpdate: new Date().toISOString(),
    source: 'mock'
  };
};

// COMPONENTE CARRUSEL PARA ITEMS - CORREGIDO
interface ItemsCarouselProps {
  items: FortniteItem[];
  title: string;
  itemsPerSlide?: number;
  currentLanguage: string;
}

const ItemsCarousel: React.FC<ItemsCarouselProps> = ({ 
  items, 
  title, 
  itemsPerSlide = 4,
  currentLanguage
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const t = translations[currentLanguage as keyof typeof translations];

  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const contactWhatsApp = (productName: string, price: number) => {
    const phoneNumber = "1234567890";
    const message = `¡Hola! Estoy interesado en: ${productName} - ${price} Pavos`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="carousel-container">
        <h3 className="neon-text">{title} ({items.length})</h3>
        <div className="no-items">
          <p>No hay items disponibles</p>
        </div>
      </div>
    );
  }

  // Agrupar items en slides
  const slides = [];
  for (let i = 0; i < items.length; i += itemsPerSlide) {
    slides.push(items.slice(i, i + itemsPerSlide));
  }

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h3 className="neon-text">{title} ({items.length})</h3>
        {totalSlides > 1 && (
          <div className="carousel-controls">
            <button onClick={prevSlide} className="carousel-btn">
              ◀
            </button>
            <span className="carousel-counter">
              {currentIndex + 1} / {totalSlides}
            </span>
            <button onClick={nextSlide} className="carousel-btn">
              ▶
            </button>
          </div>
        )}
      </div>

      <div className="carousel-wrapper" ref={carouselRef}>
        <div 
          className="carousel-slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slideItems, slideIndex) => (
            <div key={slideIndex} className="carousel-slide">
              <div className="items-grid">
                {slideItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="shop-item neon-card carousel-item"
                    style={{ 
                      borderColor: getRarityColor(item.rarity.value),
                      background: `linear-gradient(135deg, ${getRarityColor(item.rarity.value)}15, #000000)`
                    }}
                  >
                    <div className="item-image-container">
                      <img 
                        src={item.images.icon} 
                        alt={item.name}
                        className="item-image"
                        loading="lazy"
                        onError={(e) => {
                          console.warn(`❌ Error cargando imagen para ${item.name}`);
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb3J0bml0ZSBJdGVtPC90ZXh0Pgo8L3N2Zz4=';
                        }}
                      />
                      <div className="item-glow" style={{ backgroundColor: getRarityColor(item.rarity.value) }}></div>
                    </div>
                    <div className="item-info">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-description">{item.description}</p>
                      <div className="item-details">
                        <span 
                          className="item-rarity"
                          style={{ 
                            color: getRarityColor(item.rarity.value),
                            textShadow: `0 0 10px ${getRarityColor(item.rarity.value)}`
                          }}
                        >
                          {item.rarity.displayValue}
                        </span>
                        <span className="item-price neon-text">
                          🪙 {item.price} {t.vBucks}
                        </span>
                      </div>
                      <button 
                        className="btn neon-btn item-buy-btn"
                        onClick={() => contactWhatsApp(item.name, item.price)}
                      >
                        {t.contactWhatsApp}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`${t.slide} ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// COMPONENTE PRINCIPAL
const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [productsWindow, setProductsWindow] = useState(false);
  const [activeProductPage, setActiveProductPage] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [exchangeRates, setExchangeRates] = useState(defaultExchangeRates);
  const [rateLoading, setRateLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // ESTADOS PARA LA TIENDA FORTNITE
  const [fortniteShop, setFortniteShop] = useState<FortniteShop | null>(null);
  const [shopLoading, setShopLoading] = useState(false);
  const [shopError, setShopError] = useState<string | null>(null);
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  const t = translations[currentLanguage as keyof typeof translations];

  // Datos base de productos
  const baseProductsData: { [key: number]: Omit<Product, 'name'>[] } = {
    1: [
      {
        id: 1,
        image: "/img/products/club precios.webp",
        prices: [
          { label: "3 Months", priceUSD: 15 },
          { label: "4 Months", priceUSD: 18 },
          { label: "5 Months", priceUSD: 20 },
          { label: "6 Months", priceUSD: 23 }
        ]
      }
    ],
    2: [
      {
        id: 2,
        image: "/img/products/metodo de regalo-pica.webp",
        prices: [
          { label: "From 100 V-Bucks", priceUSD: 0.70 }
        ]
      }
    ],
    3: [
      {
        id: 3,
        image: "/img/products/1 mes game pass-pica.webp",
        prices: [
          { label: "Price", priceUSD: 16.50 }
        ]
      }
    ],
    4: [
      {
        id: 5,
        image: "/img/products/economy.webp",
        prices: [
          { label: "Price", priceUSD: 22 }
        ]
      }
    ],
    5: [
      {
        id: 10,
        image: "/img/products/pavos precios-pica.webp",
        prices: [
          { label: "3100V", priceUSD: 12 },
          { label: "5000V", priceUSD: 27 },
          { label: "13500V", priceUSD: 60 }
        ]
      }
    ],
    6: [
      {
        id: 11,
        image: "/img/products/TERMINOS-pica.webp",
        prices: [
          { label: "Contact for bulk deals", priceUSD: 0 }
        ]
      }
    ]
  };

  // Función para obtener productos con nombres traducidos
  const getProductsData = React.useCallback(() => {
    const productNames: { [key: number]: string[] } = {
      1: [t.fortniteCrew],
      2: [t.cosmeticsGift],
      3: [t.gamePass],
      4: ["Simple Pack"],
      5: [t.vbucks],
      6: [t.discounts]
    };

    const result: { [key: number]: Product[] } = {};
    
    Object.keys(baseProductsData).forEach(pageKey => {
      const pageNum = parseInt(pageKey);
      result[pageNum] = baseProductsData[pageNum].map((product, index) => ({
        ...product,
        name: productNames[pageNum][index] || `Product ${product.id}`
      }));
    });

    return result;
  }, [t]);

  const productsData = React.useMemo(() => getProductsData(), [getProductsData]);

  // Datos del carrusel
  const carouselImages = [
    "/img/carrousel/banner-pica.webp",
    "/img/carrousel/1.webp",
    "/img/carrousel/2.webp",
    "/img/carrousel/3.webp",
    "/img/carrousel/4.webp"
  ];

  // Comentarios iniciales
  const initialComments: Comment[] = [
    {
      id: 1,
      name: "Carlos M.",
      comment: "¡Servicio increíble! Recibí mis V-Bucks al instante.",
      date: "15/10/2023",
      rating: 5
    }
  ];

  const [comments, setComments] = useState<Comment[]>(initialComments);

  // 🔄 FUNCIÓN PARA CARGAR LA TIENDA
  const fetchFortniteShop = async (forceRefresh = false) => {
    if (shopLoading && !forceRefresh) return;
    
    setShopLoading(true);
    setShopError(null);
    
    try {
      console.log('🔄 Iniciando carga de tienda Fortnite...');
      const response = await fetch('/api/fortnite-shop?' + new URLSearchParams({
        _t: Date.now().toString()
      }));

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Datos recibidos de la API');
        const processedShop = processFortniteApiData(data);
        setFortniteShop({...processedShop, source: 'api'});
        setShopError(null);
      } else {
        throw new Error(`Error HTTP ${response.status}`);
      }
      
    } catch (error) {
      console.error('❌ Error cargando tienda:', error);
      
      const mockShopData = createRealisticMockShopData();
      setFortniteShop({...mockShopData, source: 'mock'});
      
      setShopError(
        currentLanguage === 'es' 
          ? 'Modo demostración: Los datos en tiempo real no están disponibles'
          : 'Demo mode: Real-time data is unavailable'
      );
      
    } finally {
      setShopLoading(false);
    }
  };

  // 🪙 FUNCIÓN PARA TASAS DE CAMBIO
  const fetchExchangeRates = async () => {
    setRateLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setExchangeRates(defaultExchangeRates);
      setApiStatus('success');
      setLastUpdate(new Date().toLocaleString() + ' (Tasas de referencia)');
      
    } catch (error) {
      console.error('Error en tasas de cambio:', error);
      setExchangeRates(defaultExchangeRates);
      setApiStatus('error');
      setLastUpdate('Última actualización: Tasas de referencia');
    } finally {
      setRateLoading(false);
    }
  };

  // Función para convertir precios
  const convertPrice = (priceUSD: number): number => {
    const rate = exchangeRates[currency as keyof typeof exchangeRates] || 1;
    const converted = priceUSD * rate;
    
    if (['ARS', 'CLP', 'COP', 'UYU'].includes(currency)) {
      return Math.round(converted);
    }
    return parseFloat(converted.toFixed(2));
  };

  // Función para formatear precio
  const formatPrice = (priceUSD: number): string => {
    if (priceUSD === 0) return t.contactWhatsApp;
    
    const convertedPrice = convertPrice(priceUSD);
    const currencySymbols: { [key: string]: string } = {
      USD: '$',
      EUR: '€',
      MXN: '$',
      ARS: '$',
      BRL: 'R$',
      CLP: '$',
      COP: '$',
      PEN: 'S/',
      UYU: '$'
    };

    const symbol = currencySymbols[currency] || '$';
    
    if (['ARS', 'CLP', 'COP', 'UYU'].includes(currency)) {
      return `${symbol}${convertedPrice.toLocaleString()}`;
    } else {
      return `${symbol}${convertedPrice.toFixed(2)}`;
    }
  };

  // Efectos
  useEffect(() => {
    const count = localStorage.getItem('visitCount');
    if (count) {
      const newCount = parseInt(count) + 1;
      localStorage.setItem('visitCount', newCount.toString());
      setVisitCount(newCount);
    } else {
      localStorage.setItem('visitCount', '1');
      setVisitCount(1);
    }

    fetchExchangeRates();
    fetchFortniteShop();

    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => {
      clearInterval(carouselInterval);
    };
  }, []);

  // Cargar idioma preferido
  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
      setCurrentLanguage(preferredLanguage);
    } else {
      setCurrentLanguage('es');
      localStorage.setItem('preferredLanguage', 'es');
    }
  }, []);

  // Funciones de navegación
  const showSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    if (sectionId !== 'products' && sectionId !== 'fortnite-shop') {
      setProductsWindow(false);
      setActiveProductPage(null);
      setSelectedProduct(null);
    }
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdown(!languageDropdown);
  };

  const changeLanguage = (lang: string) => {
    setLanguageDropdown(false);
    setCurrentLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const toggleProductsWindow = () => {
    setProductsWindow(!productsWindow);
    if (productsWindow) {
      setActiveProductPage(null);
      setSelectedProduct(null);
    }
  };

  const showProductPage = (pageNumber: number) => {
    setActiveProductPage(pageNumber);
    setProductsWindow(false);
    setSelectedProduct(null);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const contactWhatsApp = (productName: string) => {
    const phoneNumber = "1234567890";
    const message = `¡Hola! Estoy interesado en: ${productName}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleStarClick = (value: number) => {
    setSelectedRating(value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const comment = formData.get('comment') as string;

    if (selectedRating === 0) {
      alert(currentLanguage === 'es' ? 'Por favor selecciona una calificación' : 'Please select a rating');
      return;
    }

    const newComment: Comment = {
      id: comments.length + 1,
      name,
      comment,
      date: new Date().toLocaleDateString(),
      rating: selectedRating
    };

    setComments([newComment, ...comments]);
    e.currentTarget.reset();
    setSelectedRating(0);
    alert(currentLanguage === 'es' ? '¡Gracias por tu reseña!' : 'Thank you for your review!');
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  // Toggle menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const languageSelector = document.querySelector('.language-selector');
      if (languageSelector && !languageSelector.contains(event.target as Node)) {
        setLanguageDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Filtrar items por rareza
  const filteredItems = fortniteShop?.allItems?.filter(item => 
    selectedRarity === 'all' || 
    item.rarity.value.toLowerCase() === selectedRarity.toLowerCase()
  ) || [];

  // Obtener rarezas únicas para el filtro
  const uniqueRarities = Array.from(
    new Set(fortniteShop?.allItems?.map(item => item.rarity.value.toLowerCase()) || [])
  );

  return (
    <div className="app">
      {/* Selector de idiomas */}
      <div className="language-selector">
        <button className="language-toggle" onClick={toggleLanguageDropdown}>🌐</button>
        <div className={`language-dropdown ${languageDropdown ? 'active' : ''}`}>
          <button className="language-option" onClick={() => changeLanguage('en')}>English</button>
          <button className="language-option" onClick={() => changeLanguage('es')}>Español</button>
        </div>
      </div>

      {/* Botón de WhatsApp flotante */}
      <div className="whatsapp-float">
        <button className="whatsapp-btn" onClick={() => contactWhatsApp('Consulta General')}>
          <span>{t.whatsappMessage}</span>
        </button>
      </div>

      {/* Header */}
      <header className="header">
        <img 
          src="/img/header/header.webp" 
          alt="Pavos Fran Header" 
          className="header-image"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </header>

      {/* Navegación */}
      <nav className="nav">
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a onClick={() => showSection('home')}>{t.home}</a>
          <a onClick={() => showSection('products')}>{t.products}</a>
          <a onClick={() => showSection('fortnite-shop')}>🛒 {t.fortniteShop}</a>
          <a onClick={() => showSection('payments')}>{t.payments}</a>
          <a onClick={() => showSection('contact')}>{t.contact}</a>
        </div>
      </nav>

      {/* Selector de moneda */}
      <div className="currency-section">
        <div className="currency-selector">
          <label htmlFor="currency">{t.selectCurrency}</label>
          <select 
            id="currency" 
            value={currency} 
            onChange={handleCurrencyChange}
          >
            <option value="USD">USD - Dólar Americano</option>
            <option value="EUR">EUR - Euro</option>
            <option value="MXN">MXN - Peso Mexicano</option>
            <option value="ARS">ARS - Peso Argentino</option>
            <option value="BRL">BRL - Real Brasileño</option>
            <option value="CLP">CLP - Peso Chileno</option>
            <option value="COP">COP - Peso Colombiano</option>
            <option value="PEN">PEN - Sol Peruano</option>
            <option value="UYU">UYU - Peso Uruguayo</option>
          </select>
        </div>

        <div className="exchange-info">
          <div className="exchange-rate">
            <strong>{t.exchangeRate}:</strong> 
            {rateLoading ? (
              <span className="loading">{t.loadingRates}</span>
            ) : (
              <span className={`rate ${apiStatus}`}>
                1 USD = {formatPrice(1)} {currency}
                {apiStatus === 'error' && (
                  <span className="api-warning"> (Tasas de referencia)</span>
                )}
              </span>
            )}
          </div>
          {lastUpdate && (
            <div className="last-update">
              <small>{lastUpdate}</small>
            </div>
          )}
        </div>
      </div>

      {/* Sección Home */}
      {activeSection === 'home' && (
        <section className="section">
          <div className="carousel">
            {carouselImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Carousel Image ${index + 1}`}
                className={index === currentSlide ? 'active' : ''}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ))}
          </div>
          
          <div className="presentation">
            <h2>{t.welcome}</h2>
            <p>{t.welcomeText}</p>
          </div>

          {/* Sección de comentarios */}
          <div className="comments-section">
            <h2>{t.userReviews}</h2>
            <p>{t.seeReviews}</p>
            
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <input type="text" name="name" placeholder={t.yourName} required />
              <textarea name="comment" placeholder={t.shareExperience} rows={2} required />
              <div className="rating">
                <span>{t.rating}:</span>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`star ${selectedRating >= value ? 'selected' : ''}`}
                    onClick={() => handleStarClick(value)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button type="submit" className="btn">{t.submitReview}</button>
            </form>
            
            <div className="comments-grid">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <h4>{comment.name}</h4>
                  <p>{comment.comment}</p>
                  <small>{comment.date} | {renderStars(comment.rating)}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección Products */}
      {activeSection === 'products' && (
        <section className="section products-section">
          <h2>{t.products}</h2>
          
          <div className="products-expandable">
            <button className="expand-btn" onClick={toggleProductsWindow}>
              {t.browseProducts}
            </button>
            
            {productsWindow && (
              <div className="products-window active">
                <div className="window-header">
                  <h3>{t.selectCategory}</h3>
                  <button className="close-btn" onClick={toggleProductsWindow}>{t.close}</button>
                </div>
                
                <div className="categories-grid">
                  <div className="category-card" onClick={() => showProductPage(1)}>
                    <img src="/img/products/club precios.webp" alt="Fortnite Crew" />
                    <h4>{t.fortniteCrew}</h4>
                    <p>{t.monthlySubs}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(2)}>
                    <img src="/img/products/metodo de regalo-pica.webp" alt="Cosmetics" />
                    <h4>{t.cosmeticsGift}</h4>
                    <p>{t.skinsItems}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(3)}>
                    <img src="/img/products/1 mes game pass-pica.webp" alt="Game Pass" />
                    <h4>{t.gamePass}</h4>
                    <p>{t.xboxSub}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(4)}>
                    <img src="/img/products/exclusive.webp" alt="Exclusive Packs" />
                    <h4>{t.exclusivePacks}</h4>
                    <p>{t.specialBundles}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(5)}>
                    <img src="/img/products/pavos precios-pica.webp" alt="V-Bucks" />
                    <h4>{t.vbucks}</h4>
                    <p>{t.gameCurrency}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(6)}>
                    <img src="/img/products/TERMINOS-pica.webp" alt="Discounts" />
                    <h4>{t.discounts}</h4>
                    <p>{t.bulkDeals}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Páginas de productos */}
          {activeProductPage && productsData[activeProductPage] && (
            <div className="products-grid">
              {productsData[activeProductPage].map((product) => (
                <div key={product.id} className="product" onClick={() => openProductModal(product)}>
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>
                  <div className="product-content">
                    <h3>{product.name}</h3>
                    <div className="multi-price">
                      {product.prices.map((price, index) => (
                        <p key={index} className="price">
                          {price.label}: {formatPrice(price.priceUSD)}
                        </p>
                      ))}
                    </div>
                    <button className="btn" onClick={(e) => {
                      e.stopPropagation();
                      contactWhatsApp(product.name);
                    }}>
                      {t.contactWhatsApp}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECCIÓN TIENDA FORTNITE - CON CARRUSELES */}
      {activeSection === 'fortnite-shop' && (
        <section className="section fortnite-shop-section">
          <div className="shop-header">
            <h2 className="neon-text">🎮 {t.fortniteShop}</h2>
            <div className="shop-controls">
              <button 
                className="btn neon-btn refresh-btn" 
                onClick={() => fetchFortniteShop(true)}
                disabled={shopLoading}
              >
                {shopLoading ? '🔄 Cargando...' : '🔄 ' + t.refreshShop}
              </button>
              {fortniteShop && (
                <span className="last-update-shop">
                  {t.rateUpdate}: {new Date(fortniteShop.lastUpdate).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Información de estado de la API */}
          <div className="api-status">
            <div className="status-indicator">
              <span className={`status-dot ${shopError ? 'error' : fortniteShop?.source === 'api' ? 'success' : 'loading'}`}></span>
              <span className="status-text">
                <strong>{t.apiStatus}:</strong> {
                  shopLoading ? t.connecting : 
                  fortniteShop?.source === 'api' ? t.realTimeData : 
                  t.demoData
                }
              </span>
            </div>
            {fortniteShop && (
              <div className="status-details">
                <small>
                  {t.totalItems}: {fortniteShop.allItems?.length || 0} • 
                  {t.featuredItems}: {fortniteShop.featured.length} • 
                  {t.dailyItems}: {fortniteShop.daily.length}
                  {fortniteShop.source === 'mock' && ' • (Modo demostración)'}
                </small>
              </div>
            )}
          </div>

          {/* Estado de carga */}
          {shopLoading && (
            <div className="loading-shop">
              <div className="loading-spinner"></div>
              <p>{t.loadingShop}</p>
            </div>
          )}

          {/* Tienda cargada - CON CARRUSELES */}
          {fortniteShop && !shopLoading && (
            <div className="fortnite-shop">
              
              {/* Filtros */}
              <div className="shop-filters">
                <div className="filter-group">
                  <label htmlFor="rarity-filter">{t.filterByRarity}:</label>
                  <select 
                    id="rarity-filter"
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="rarity-filter"
                  >
                    <option value="all">{t.allRarities}</option>
                    {uniqueRarities.map(rarity => (
                      <option key={rarity} value={rarity}>
                        {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button 
                  className={`btn ${showAllItems ? 'active' : ''}`}
                  onClick={() => setShowAllItems(!showAllItems)}
                >
                  {showAllItems ? '📋 ' + t.categories : '📜 ' + t.viewAll}
                </button>
              </div>

              {/* Vista con todos los items */}
              {showAllItems ? (
                <div className="all-items-view">
                  <h3 className="neon-text">
                    {t.allItems} ({filteredItems.length})
                    {selectedRarity !== 'all' && ` - ${selectedRarity}`}
                  </h3>
                  
                  {filteredItems.length > 0 ? (
                    <div className="items-grid all-items-grid">
                      {filteredItems.map((item) => (
                        <div 
                          key={item.id} 
                          className="shop-item neon-card"
                          style={{ 
                            borderColor: getRarityColor(item.rarity.value),
                            background: `linear-gradient(135deg, ${getRarityColor(item.rarity.value)}15, #000000)`
                          }}
                        >
                          <div className="item-image-container">
                            <img 
                              src={item.images.icon} 
                              alt={item.name}
                              className="item-image"
                              loading="lazy"
                              onError={(e) => {
                                console.warn(`❌ Error cargando imagen para ${item.name}`);
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb3J0bml0ZSBJdGVtPC90ZXh0Pgo8L3N2Zz4=';
                              }}
                            />
                            <div className="item-glow" style={{ backgroundColor: getRarityColor(item.rarity.value) }}></div>
                          </div>
                          <div className="item-info">
                            <h4 className="item-name">{item.name}</h4>
                            <p className="item-description">{item.description}</p>
                            <div className="item-details">
                              <span 
                                className="item-rarity"
                                style={{ 
                                  color: getRarityColor(item.rarity.value),
                                  textShadow: `0 0 10px ${getRarityColor(item.rarity.value)}`
                                }}
                              >
                                {item.rarity.displayValue}
                              </span>
                              <span className="item-price neon-text">
                                🪙 {item.price} {t.vBucks}
                              </span>
                            </div>
                            <button 
                              className="btn neon-btn item-buy-btn"
                              onClick={() => contactWhatsApp(`Item de Fortnite: ${item.name} - ${item.price} Pavos`)}
                            >
                              {t.contactWhatsApp}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-items">
                      <p>No hay items con esta rareza</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Vista con carruseles por categoría */
                <div className="carousels-view">
                  {/* Carrusel para Items Destacados */}
                  <ItemsCarousel 
                    items={fortniteShop.featured}
                    title={`⭐ ${t.featuredItems}`}
                    itemsPerSlide={4}
                    currentLanguage={currentLanguage}
                  />

                  {/* Carrusel para Items Diarios */}
                  <ItemsCarousel 
                    items={fortniteShop.daily}
                    title={`📅 ${t.dailyItems}`}
                    itemsPerSlide={4}
                    currentLanguage={currentLanguage}
                  />

                  {/* Carrusel para Todos los Items (versión reducida) */}
                  {fortniteShop.allItems && fortniteShop.allItems.length > 0 && (
                    <ItemsCarousel 
                      items={fortniteShop.allItems.slice(0, 20)}
                      title={`🎮 ${t.allItems}`}
                      itemsPerSlide={4}
                      currentLanguage={currentLanguage}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Estado de error */}
          {!fortniteShop && !shopLoading && shopError && (
            <div className="shop-error">
              <p>{t.errorLoadingShop}</p>
              <button className="btn neon-btn" onClick={() => fetchFortniteShop(true)}>
                {t.tryAgain}
              </button>
            </div>
          )}
        </section>
      )}

      {/* Modal de producto */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={closeProductModal}>
          <div className="product-modal neon-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeProductModal}>
              ✕
            </button>
            <div className="modal-content">
              <div className="modal-image-container">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
              </div>
              <div className="modal-info">
                <h3>{selectedProduct.name}</h3>
                <div className="modal-prices">
                  {selectedProduct.prices.map((price, index) => (
                    <p key={index} className="modal-price">
                      {price.label}: <strong>{formatPrice(price.priceUSD)}</strong>
                    </p>
                  ))}
                </div>
                <button className="btn neon-btn modal-contact-btn" onClick={() => contactWhatsApp(selectedProduct.name)}>
                  {t.contactWhatsApp}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secciones Payments y Contact */}
      {activeSection === 'payments' && (
        <section className="section">
          <h2 className="neon-text">{t.paymentMethods}</h2>
          <div className="payments-grid">
            <div className="payment-method neon-card">
              <div>💳</div>
              <h4>{t.creditCard}</h4>
            </div>
            <div className="payment-method neon-card">
              <div>💳</div>
              <h4>{t.debitCard}</h4>
            </div>
            <div className="payment-method neon-card">
              <div>📱</div>
              <h4>{t.mercadoPago}</h4>
            </div>
            <div className="payment-method neon-card">
              <div>📱</div>
              <h4>{t.daviPlata}</h4>
            </div>
            <div className="payment-method neon-card">
              <div>📱</div>
              <h4>{t.nequi}</h4>
            </div>
            <div className="payment-method neon-card">
              <div>📱</div>
              <h4>{t.yape}</h4>
            </div>
            <div className="payment-method neon-card">
              <div>📱</div>
              <h4>{t.pagoMovil}</h4>
            </div>
            <div className="payment-method neon-card">
              <div>💰</div>
              <h4>{t.cashApp}</h4>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contact' && (
        <section className="section">
          <h2 className="neon-text">{t.contactUs}</h2>
          <div className="contact neon-card">
            <p>{t.email}: info@franvbucks.com</p>
            <p>{t.phone}: +1 (555) 123-4567</p>
            <p>{t.address}: 123 Gaming Street, Fortnite City</p>
          </div>
          
          <div className="social-media neon-card">
            <h3>{t.followUs}</h3>
            <a href="https://instagram.com/yourusername" className="neon-link"> Instagram</a>
            <a href="https://facebook.com/yourusername" className="neon-link"> Facebook</a>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="visit-counter">
          <p>{t.visits}: <span className="neon-text">{visitCount}</span></p>
        </div>
        <p>&copy; 2025 Pavos Fran. {t.allRightsReserved}</p>
      </footer>
    </div>
  );
};

export default HomePage;