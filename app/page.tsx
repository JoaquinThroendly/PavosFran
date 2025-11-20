// app/page.tsx - VERSIÓN COMPLETA CORREGIDA CON API FUNCIONAL
'use client';

import React, { useState, useEffect } from 'react';
import './styles.css';

// 🔧 FUNCIÓN MEJORADA PARA URLs DE IMÁGENES - MOVIDA AL PRINCIPIO
const getValidImageUrl = (url: string | undefined): string => {
  if (!url || url.includes('null') || url === '' || url === 'undefined') {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb3J0bml0ZSBJdGVtPC90ZXh0Pgo8L3N2Zz4=';
  }
  
  if (url.startsWith('http')) {
    return url;
  }
  
  if (url.startsWith('/') || url.startsWith('images/')) {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `https://fortniteapi.io${cleanUrl}`;
  }
  
  if (url.includes('fortniteapi.io') || url.includes('cdn2.unrealengine.com')) {
    return url;
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
    connecting: "Connecting to API..."
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
    connecting: "Conectando a API..."
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

// Función auxiliar externa para procesar items - MEJORADA
const processItemsArray = (items: any[]): FortniteItem[] => {
  if (!items || !Array.isArray(items)) {
    console.warn('⚠️ processItemsArray: items no es un array válido', items);
    return [];
  }

  return items.map((item: any, index: number) => {
    if (!item) {
      return createFallbackItem(index);
    }

    try {
      return {
        id: item.id || `item-${index}-${Date.now()}`,
        name: item.name || 'Unknown Item',
        description: item.description || item.introductionText || 'Fortnite Item',
        price: item.finalPrice || item.regularPrice || item.cost || item.price || 0,
        rarity: {
          value: item.rarity?.id || item.rarity?.value || item.rarity?.name?.toLowerCase() || 'common',
          displayValue: item.rarity?.name || item.rarity?.displayValue || item.rarity?.value || 'Common',
          backendValue: item.rarity?.backendValue || item.rarity?.id || 'Common'
        },
        images: {
          icon: getValidImageUrl(item.images?.icon || item.icon || item.images?.smallIcon),
          featured: getValidImageUrl(item.images?.featured || item.images?.largeIcon),
          background: getValidImageUrl(item.images?.background)
        },
        type: {
          value: item.type?.value || item.type?.id || item.itemType || 'outfit',
          displayValue: item.type?.displayValue || item.type?.name || item.itemType || 'Skin',
          backendValue: item.type?.backendValue || item.type?.id || item.itemType || 'AthenaCharacter'
        }
      };
    } catch (error) {
      console.error(`❌ Error en processItemsArray para item ${index}:`, error, item);
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

// Función temporal para debuggear la estructura de la API
const debugApiStructure = (apiData: any) => {
  console.log('🔍 === DEBUG API STRUCTURE ===');
  
  if (!apiData) {
    console.log('❌ API data es null o undefined');
    return;
  }

  console.log('📊 Tipo de dato:', typeof apiData);
  console.log('🔑 Keys principales:', Object.keys(apiData));

  const arrayKeys = Object.keys(apiData).filter(key => 
    Array.isArray(apiData[key]) && apiData[key].length > 0
  );

  console.log('📦 Arrays encontrados:', arrayKeys);

  arrayKeys.forEach(key => {
    const array = apiData[key];
    console.log(`📋 Array "${key}": ${array.length} items`);
    
    if (array.length > 0) {
      const sample = array[0];
      console.log(`📝 Ejemplo del primer item en "${key}":`, {
        id: sample.id,
        name: sample.name,
        type: sample.type,
        section: sample.section,
        rarity: sample.rarity,
        price: sample.finalPrice || sample.regularPrice,
        images: sample.images
      });
    }
  });

  console.log('🔍 === FIN DEBUG ===');
};

// 🔧 FUNCIÓN DE PROCESAMIENTO COMPLETAMENTE CORREGIDA
const processFortniteApiData = (apiData: any): FortniteShop => {
  console.log('🔧 Procesando datos de la API...', apiData);

  const dailyItems: FortniteItem[] = [];
  const featuredItems: FortniteItem[] = [];

  let items: any[] = [];

  // Caso 1: Estructura con data.shop
  if (apiData.data && apiData.data.shop) {
    items = apiData.data.shop;
    console.log('📦 Usando estructura: data.shop');
  }
  // Caso 2: Estructura con shop directo
  else if (apiData.shop) {
    items = apiData.shop;
    console.log('📦 Usando estructura: shop');
  }
  // Caso 3: Estructura con featured y daily separados
  else if (apiData.featured && apiData.daily) {
    console.log('📦 Usando estructura: featured/daily separados');
    return {
      daily: processItemsArray(apiData.daily),
      featured: processItemsArray(apiData.featured),
      lastUpdate: new Date().toISOString(),
      source: 'api'
    };
  }
  // Caso 4: Estructura con currentRotation
  else if (apiData.currentRotation) {
    console.log('📦 Usando estructura: currentRotation');
    if (apiData.currentRotation.featured && apiData.currentRotation.daily) {
      return {
        daily: processItemsArray(apiData.currentRotation.daily),
        featured: processItemsArray(apiData.currentRotation.featured),
        lastUpdate: new Date().toISOString(),
        source: 'api'
      };
    } else {
      items = apiData.currentRotation;
    }
  }
  // Caso 5: Array directo
  else if (Array.isArray(apiData)) {
    items = apiData;
    console.log('📦 Usando estructura: array directo');
  }
  // Caso 6: Buscar cualquier array en el objeto
  else {
    for (const key in apiData) {
      if (Array.isArray(apiData[key]) && apiData[key].length > 0) {
        const firstItem = apiData[key][0];
        if (firstItem && (firstItem.name || firstItem.id)) {
          items = apiData[key];
          console.log(`📦 Usando estructura: ${key}`);
          break;
        }
      }
    }
  }

  console.log(`🎯 Encontrados ${items.length} items para procesar`);

  if (items.length === 0) {
    console.warn('⚠️ No se encontraron items en la respuesta de la API');
    console.log('🔍 Estructura completa de la API:', apiData);
    
    const allKeys = Object.keys(apiData);
    console.log('🔍 Keys disponibles:', allKeys);
    
    for (const key of allKeys) {
      const value = apiData[key];
      if (Array.isArray(value) && value.length > 0) {
        console.log(`🔍 Array encontrado en key "${key}":`, value.length, 'items');
        const sampleItem = value[0];
        console.log(`🔍 Ejemplo de item en "${key}":`, {
          id: sampleItem.id,
          name: sampleItem.name,
          type: sampleItem.type,
          section: sampleItem.section,
          rarity: sampleItem.rarity
        });
      }
    }
  }

  // Procesar todos los items encontrados
  items.forEach((item: any, index: number) => {
    if (!item) return;

    try {
      const processedItem: FortniteItem = {
        id: item.id || `item-${index}-${Date.now()}`,
        name: item.name || 'Unknown Item',
        description: item.description || item.introductionText || 'Fortnite Item',
        price: item.finalPrice || item.regularPrice || item.cost || item.price || 0,
        rarity: {
          value: item.rarity?.id || item.rarity?.value || item.rarity?.name?.toLowerCase() || 'common',
          displayValue: item.rarity?.name || item.rarity?.displayValue || item.rarity?.value || 'Common',
          backendValue: item.rarity?.backendValue || item.rarity?.id || 'Common'
        },
        images: {
          icon: getValidImageUrl(item.images?.icon || item.icon || item.images?.smallIcon),
          featured: getValidImageUrl(item.images?.featured || item.images?.largeIcon),
          background: getValidImageUrl(item.images?.background)
        },
        type: {
          value: item.type?.value || item.type?.id || item.itemType || 'outfit',
          displayValue: item.type?.displayValue || item.type?.name || item.itemType || 'Skin',
          backendValue: item.type?.backendValue || item.type?.id || item.itemType || 'AthenaCharacter'
        }
      };

      // ✅ CLASIFICACIÓN MEJORADA - MÚLTIPLES CRITERIOS
      const isFeatured = 
        item.section?.id === 'featured' ||
        item.sectionId === 'featured' ||
        item.section?.name?.toLowerCase().includes('featured') ||
        item.featured === true ||
        item.bFeatured === true ||
        ['legendary', 'epic', 'marvel', 'icon', 'lava', 'frozen', 'shadow', 'dc', 'dark'].includes(item.rarity?.id?.toLowerCase()) ||
        ['legendary', 'epic', 'marvel', 'icon', 'lava', 'frozen', 'shadow', 'dc', 'dark'].includes(item.rarity?.value?.toLowerCase()) ||
        (['outfit', 'pickaxe', 'glider', 'backpack', 'emote'].includes(item.type?.value) && 
        ['legendary', 'epic'].includes(item.rarity?.value?.toLowerCase()));

      if (isFeatured && featuredItems.length < 12) {
        featuredItems.push(processedItem);
      } else if (dailyItems.length < 12) {
        dailyItems.push(processedItem);
      }

    } catch (error) {
      console.error(`❌ Error procesando item ${index}:`, error, item);
    }
  });

  console.log(`✅ Procesado final: ${featuredItems.length} featured, ${dailyItems.length} daily`);

  if (featuredItems.length === 0 && dailyItems.length === 0 && items.length > 0) {
    console.log('🔍 DEBUG - Primeros 3 items sin procesar:', items.slice(0, 3).map(item => ({
      id: item.id,
      name: item.name,
      type: item.type,
      section: item.section,
      rarity: item.rarity,
      price: item.finalPrice || item.regularPrice
    })));
  }

  return {
    daily: dailyItems,
    featured: featuredItems,
    lastUpdate: new Date().toISOString(),
    source: 'api'
  };
};

// DATOS DE EJEMPLO MÁS REALISTAS
const createRealisticMockShopData = (): FortniteShop => {
  const currentDate = new Date();
  
  const mockItems = [
    {
      id: 'mock-featured-1',
      name: 'Omega Knight',
      description: 'Caballero legendario con armadura cibernética',
      price: 1500,
      rarity: { value: 'legendary', displayValue: 'Legendario', backendValue: 'Legendary' },
      images: { icon: '/img/placeholder.webp' },
      type: { value: 'outfit', displayValue: 'Skin', backendValue: 'AthenaCharacter' }
    },
    {
      id: 'mock-featured-2',
      name: 'Wavebreaker',
      description: 'Skin épica con efectos oceánicos',
      price: 1200,
      rarity: { value: 'epic', displayValue: 'Épico', backendValue: 'Epic' },
      images: { icon: '/img/placeholder.webp' },
      type: { value: 'outfit', displayValue: 'Skin', backendValue: 'AthenaCharacter' }
    },
    {
      id: 'mock-featured-3',
      name: 'Neonimal',
      description: 'Traje animal con luces neon',
      price: 800,
      rarity: { value: 'rare', displayValue: 'Raro', backendValue: 'Rare' },
      images: { icon: '/img/placeholder.webp' },
      type: { value: 'outfit', displayValue: 'Skin', backendValue: 'AthenaCharacter' }
    },
    {
      id: 'mock-daily-1',
      name: 'Rust Lord',
      description: 'Skin clásica de astronauta',
      price: 800,
      rarity: { value: 'rare', displayValue: 'Raro', backendValue: 'Rare' },
      images: { icon: '/img/placeholder.webp' },
      type: { value: 'outfit', displayValue: 'Skin', backendValue: 'AthenaCharacter' }
    },
    {
      id: 'mock-daily-2',
      name: 'Bubble Popper',
      description: 'Emote divertido de burbujas',
      price: 300,
      rarity: { value: 'uncommon', displayValue: 'Poco Común', backendValue: 'Uncommon' },
      images: { icon: '/img/placeholder.webp' },
      type: { value: 'emote', displayValue: 'Baile', backendValue: 'AthenaDance' }
    },
    {
      id: 'mock-daily-3',
      name: 'Laser Axe',
      description: 'Hacha de energía láser',
      price: 500,
      rarity: { value: 'uncommon', displayValue: 'Poco Común', backendValue: 'Uncommon' },
      images: { icon: '/img/placeholder.webp' },
      type: { value: 'pickaxe', displayValue: 'Pico', backendValue: 'AthenaPickaxe' }
    }
  ];

  return {
    daily: mockItems.slice(3),
    featured: mockItems.slice(0, 3),
    lastUpdate: currentDate.toISOString(),
    source: 'mock'
  };
};

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [productsWindow, setProductsWindow] = useState(false);
  const [activeProductPage, setActiveProductPage] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
      },
      {
        id: 4,
        image: "/img/products/3 meses game pass-pica.webp",
        prices: [
          { label: "Price", priceUSD: 32.75 }
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
      },
      {
        id: 6,
        image: "/img/products/exclusive.webp",
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
      4: ["Simple Pack", "Exclusive Pack"],
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
    },
    {
      id: 2,
      name: "Ana L.",
      comment: "Entrega rápida y precios geniales.",
      date: "20/10/2023",
      rating: 4
    }
  ];

  const [comments, setComments] = useState<Comment[]>(initialComments);

  // 🔄 FUNCIÓN MEJORADA - CON MÁS MANEJO DE ERRORES
  const fetchFortniteShop = async (forceRefresh = false) => {
    if (shopLoading && !forceRefresh) return;
    
    setShopLoading(true);
    setShopError(null);
    console.log('🚀 INICIANDO fetchFortniteShop...');
    
    try {
      const response = await fetch('/api/fortnite-shop?' + new URLSearchParams({
        _t: Date.now().toString()
      }), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Respuesta HTTP:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Datos recibidos del backend:', data);
        
        debugApiStructure(data);
        
        const processedShop = processFortniteApiData(data);
        setFortniteShop({...processedShop, source: 'api'});
        setShopError(null);
        
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error('💥 ERROR:', error);
      
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

  // Función para obtener tasas de cambio
  const fetchExchangeRates = async () => {
    setRateLoading(true);
    setApiStatus('loading');
    
    try {
      const response = await fetch('https://api.exchangerate.host/latest?base=USD');
      const data = await response.json();
      
      if (data && data.rates) {
        const updatedRates = {
          USD: 1,
          EUR: data.rates.EUR || defaultExchangeRates.EUR,
          MXN: data.rates.MXN || defaultExchangeRates.MXN,
          ARS: data.rates.ARS || defaultExchangeRates.ARS,
          BRL: data.rates.BRL || defaultExchangeRates.BRL,
          CLP: data.rates.CLP || defaultExchangeRates.CLP,
          COP: data.rates.COP || defaultExchangeRates.COP,
          PEN: data.rates.PEN || defaultExchangeRates.PEN,
          UYU: data.rates.UYU || defaultExchangeRates.UYU,
        };
        setExchangeRates(updatedRates);
        setApiStatus('success');
        setLastUpdate(new Date().toLocaleTimeString());
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setExchangeRates(defaultExchangeRates);
      setApiStatus('error');
      setLastUpdate(new Date().toLocaleDateString() + ' (Default)');
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

  // Debug useEffect para verificar estado de fortniteShop
  useEffect(() => {
    console.log('🔄 Estado fortniteShop actualizado:', fortniteShop);
    if (fortniteShop) {
      console.log('📊 Featured items:', fortniteShop.featured);
      console.log('📊 Daily items:', fortniteShop.daily);
    }
  }, [fortniteShop]);

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
        <img src="/img/header/header.webp" alt="Pavos Fran Header" className="header-image" />
      </header>

      <nav className="nav">
        <a onClick={() => showSection('home')}>{t.home}</a>
        <a onClick={() => showSection('products')}>{t.products}</a>
        <a onClick={() => showSection('fortnite-shop')}>🛒 {t.fortniteShop}</a>
        <a onClick={() => showSection('payments')}>{t.payments}</a>
        <a onClick={() => showSection('contact')}>{t.contact}</a>
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
                {apiStatus === 'error' && <span className="api-warning"> ({t.apiError})</span>}
              </span>
            )}
          </div>
          {lastUpdate && (
            <div className="last-update">
              <small>{t.rateUpdate}: {lastUpdate}</small>
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

      {/* SECCIÓN TIENDA FORTNITE - COMPLETAMENTE CORREGIDA */}
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

          {/* DEBUG INFO TEMPORAL */}
          <div className="debug-info">
            <h4>🔍 DEBUG INFO:</h4>
            <p><strong>Estado carga:</strong> {shopLoading ? '🔄 CARGANDO...' : '✅ LISTO'}</p>
            <p><strong>Error:</strong> {shopError || '❌ No hay error'}</p>
            <p><strong>Datos FortniteShop:</strong> {fortniteShop ? '✅ EXISTE' : '❌ NULL'}</p>
            <p><strong>Items destacados:</strong> {fortniteShop ? fortniteShop.featured.length : 0}</p>
            <p><strong>Items diarios:</strong> {fortniteShop ? fortniteShop.daily.length : 0}</p>
            <p><strong>Fuente:</strong> {fortniteShop?.source || 'N/A'}</p>
            <button 
              onClick={() => fetchFortniteShop(true)}
              className="btn"
              style={{background: '#ffd700', color: 'black', marginTop: '0.5rem'}}
            >
              🔄 Forzar Recarga Manual
            </button>
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
                  {fortniteShop.daily.length} {t.dailyItems} • {fortniteShop.featured.length} {t.featuredItems}
                  {fortniteShop.source === 'mock' && ' • (Modo demostración)'}
                </small>
              </div>
            )}
            {shopError && (
              <div className="status-help">
                <small>
                  {shopError}
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

          {/* Tienda cargada */}
          {fortniteShop && !shopLoading && (fortniteShop.featured.length > 0 || fortniteShop.daily.length > 0) && (
            <div className="fortnite-shop">
              {/* Items Destacados */}
              <div className="shop-category">
                <h3 className="neon-text">⭐ {t.featuredItems} ({fortniteShop.featured.length})</h3>
                {fortniteShop.featured.length > 0 ? (
                  <div className="items-grid">
                    {fortniteShop.featured.map((item) => (
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
                    <p>No hay items destacados disponibles</p>
                  </div>
                )}
              </div>

              {/* Items Diarios */}
              <div className="shop-category">
                <h3 className="neon-text">📅 {t.dailyItems} ({fortniteShop.daily.length})</h3>
                {fortniteShop.daily.length > 0 ? (
                  <div className="items-grid">
                    {fortniteShop.daily.map((item) => (
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
                    <p>No hay items diarios disponibles</p>
                  </div>
                )}
              </div>
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