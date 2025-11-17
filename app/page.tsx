// app/page.tsx - ACTUALIZADO CON COLORES BLANCO/NEGRO Y NEON BLANCO
'use client';

import React, { useState, useEffect } from 'react';
import './styles.css';

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
    // NUEVAS TRADUCCIONES PARA LA TIENDA FORTNITE
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
    tryAgain: "Try Again"
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
    // NUEVAS TRADUCCIONES PARA LA TIENDA FORTNITE
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
    tryAgain: "Intentar de nuevo"
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

// NUEVA INTERFACE PARA ITEMS DE FORTNITE
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
}

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [productsWindow, setProductsWindow] = useState(false);
  const [activeProductPage, setActiveProductPage] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // CORREGIDO: Idioma predeterminado ahora es español
  const [currentLanguage, setCurrentLanguage] = useState('es');
  
  const [exchangeRates, setExchangeRates] = useState(defaultExchangeRates);
  const [rateLoading, setRateLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // NUEVOS ESTADOS PARA LA TIENDA FORTNITE
  const [fortniteShop, setFortniteShop] = useState<FortniteShop | null>(null);
  const [shopLoading, setShopLoading] = useState(false);
  const [shopError, setShopError] = useState<string | null>(null);

  const t = translations[currentLanguage as keyof typeof translations];

  // Datos base de productos ACTUALIZADOS a WebP
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
      },
      {
        id: 7,
        image: "/img/products/pro.webp",
        prices: [
          { label: "Price", priceUSD: 33 }
        ]
      },
      {
        id: 8,
        image: "/img/products/super.webp",
        prices: [
          { label: "Price", priceUSD: 50 }
        ]
      },
      {
        id: 9,
        image: "/img/products/mega.webp",
        prices: [
          { label: "Price", priceUSD: 80 }
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
      4: ["Simple Pack", "Exclusive Pack", "Pro Pack", "Super Pack", "Mega Pack"],
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

  // Usar useMemo con dependencias correctas
  const productsData = React.useMemo(() => getProductsData(), [getProductsData]);

  // Datos del carrusel ACTUALIZADOS a WebP
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
    },
    {
      id: 3,
      name: "Jorge P.",
      comment: "¡Totalmente confiable! Todo como se prometió.",
      date: "25/10/2023",
      rating: 5
    }
  ];

  const [comments, setComments] = useState<Comment[]>(initialComments);

  // FUNCIÓN MEJORADA PARA CARGAR LA TIENDA FORTNITE
  const fetchFortniteShop = async () => {
    setShopLoading(true);
    setShopError(null);
    
    try {
      console.log('🔍 Iniciando carga de la tienda Fortnite...');
      
      // TU API KEY DE FORTNITEAPI.IO
      const API_KEY = 'a9966904-5bc4bb17-b9ec8bf6-0d9486df';
      const API_URL = 'https://fortniteapi.io/v2/shop?lang=es';
      
      console.log('📡 Conectando a FortniteAPI.io...');
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': API_KEY,
          'Accept': 'application/json',
        }
      });
      
      console.log('📊 Respuesta HTTP:', response.status, response.statusText);
      
      if (response.status === 401) {
        throw new Error('API Key inválida o expirada. Verifica tu clave de FortniteAPI.io');
      }
      
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📦 Datos COMPLETOS recibidos de FortniteAPI.io:', data);
      
      if (data.result) {
        console.log('✅ API respondió correctamente, procesando datos...');
        const processedShop = processFortniteApiData(data);
        console.log('🎮 Tienda procesada:', processedShop);
        setFortniteShop(processedShop);
      } else {
        console.log('❌ API respondió con error:', data.error);
        throw new Error(data.error || 'Error en la respuesta de la API');
      }
      
    } catch (error) {
      console.error('❌ Error cargando tienda Fortnite:', error);
      
      let errorMessage = t.errorLoadingShop;
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = currentLanguage === 'es' 
            ? 'Error de conexión. Verifica tu internet.'
            : 'Connection error. Check your internet.';
        } else if (error.message.includes('401') || error.message.includes('API Key')) {
          errorMessage = currentLanguage === 'es'
            ? 'Error de autenticación. La API Key puede ser inválida o haber expirado.'
            : 'Authentication error. API Key may be invalid or expired.';
        } else if (error.message.includes('429')) {
          errorMessage = currentLanguage === 'es'
            ? 'Límite de requests excedido. Intenta en unos minutos.'
            : 'Rate limit exceeded. Try again in a few minutes.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setShopError(errorMessage);
      
      // Cargar datos de ejemplo como respaldo
      console.log('🔄 Cargando datos de ejemplo...');
      const mockShopData = createDetailedMockShopData();
      setFortniteShop(mockShopData);
      
    } finally {
      setShopLoading(false);
    }
  };

  // FUNCIÓN MEJORADA CON MÁS FLEXIBILIDAD
  const processFortniteApiData = (apiData: any): FortniteShop => {
    const dailyItems: FortniteItem[] = [];
    const featuredItems: FortniteItem[] = [];

    console.log('🔄 Procesando datos de FortniteAPI.io...', apiData);

    // Estrategia 1: Buscar en la estructura principal
    if (apiData.shop && Array.isArray(apiData.shop)) {
      console.log('📋 Procesando array shop principal con', apiData.shop.length, 'items');
      apiData.shop.forEach((item: any, index: number) => {
        try {
          if (item && item.name) {
            const shopItem: FortniteItem = {
              id: item.id || `item-${index}`,
              name: item.name,
              description: item.description || 'Descripción no disponible',
              price: item.price || item.finalPrice || item.vbucks || 0,
              rarity: {
                value: item.rarity?.id || item.rarity?.value || 'common',
                displayValue: item.rarity?.name || item.rarity?.displayValue || 'Común',
                backendValue: item.rarity?.backendValue || item.rarity?.id || 'Common'
              },
              images: {
                icon: item.images?.icon || item.images?.featured || item.imageUrl || '/img/placeholder.webp',
                featured: item.images?.featured || item.images?.icon
              },
              type: {
                value: item.type?.value || item.type?.id || 'outfit',
                displayValue: item.type?.displayValue || item.type?.name || 'Skin',
                backendValue: item.type?.backendValue || item.type?.id || 'AthenaCharacter'
              }
            };

            // Determinar categoría
            if (item.section?.id === 'daily' || item.featured === false || index < 6) {
              dailyItems.push(shopItem);
              console.log('📅 Item diario agregado:', item.name);
            } else {
              featuredItems.push(shopItem);
              console.log('⭐ Item destacado agregado:', item.name);
            }
          }
        } catch (error) {
          console.warn('❌ Error procesando item:', error, item);
        }
      });
    }

    // Estrategia 2: Buscar en secciones específicas
    if (apiData.daily && Array.isArray(apiData.daily)) {
      console.log('📅 Procesando sección daily con', apiData.daily.length, 'items');
      apiData.daily.forEach((item: any, index: number) => {
        try {
          if (item && item.name) {
            dailyItems.push({
              id: item.id || `daily-${index}`,
              name: item.name,
              description: item.description || 'Item diario',
              price: item.price || item.finalPrice || 0,
              rarity: {
                value: item.rarity?.id || 'common',
                displayValue: item.rarity?.name || 'Común',
                backendValue: item.rarity?.id || 'Common'
              },
              images: {
                icon: item.images?.icon || '/img/placeholder.webp'
              },
              type: {
                value: item.type?.value || 'outfit',
                displayValue: item.type?.displayValue || 'Skin',
                backendValue: item.type?.backendValue || 'AthenaCharacter'
              }
            });
          }
        } catch (error) {
          console.warn('❌ Error procesando item diario:', error);
        }
      });
    }

    if (apiData.featured && Array.isArray(apiData.featured)) {
      console.log('⭐ Procesando sección featured con', apiData.featured.length, 'items');
      apiData.featured.forEach((item: any, index: number) => {
        try {
          if (item && item.name) {
            featuredItems.push({
              id: item.id || `featured-${index}`,
              name: item.name,
              description: item.description || 'Item destacado',
              price: item.price || item.finalPrice || 0,
              rarity: {
                value: item.rarity?.id || 'epic',
                displayValue: item.rarity?.name || 'Épico',
                backendValue: item.rarity?.id || 'Epic'
              },
              images: {
                icon: item.images?.icon || '/img/placeholder.webp',
                featured: item.images?.featured || item.images?.icon
              },
              type: {
                value: item.type?.value || 'outfit',
                displayValue: item.type?.displayValue || 'Skin',
                backendValue: item.type?.backendValue || 'AthenaCharacter'
              }
            });
          }
        } catch (error) {
          console.warn('❌ Error procesando item destacado:', error);
        }
      });
    }

    // Estrategia 3: Si no hay datos, crear algunos de ejemplo basados en la respuesta
    if (dailyItems.length === 0 && featuredItems.length === 0) {
      console.log('⚠️ No se encontraron items, creando datos de ejemplo basados en la respuesta API');
      
      // Crear items básicos basados en la estructura de la API
      if (apiData.shop && Array.isArray(apiData.shop) && apiData.shop.length > 0) {
        apiData.shop.slice(0, 4).forEach((item: any, index: number) => {
          if (item && item.name) {
            dailyItems.push({
              id: item.id || `fallback-daily-${index}`,
              name: item.name || `Item Diario ${index + 1}`,
              description: 'Item disponible en la tienda',
              price: 500 + (index * 200),
              rarity: {
                value: 'rare',
                displayValue: 'Raro',
                backendValue: 'Rare'
              },
              images: {
                icon: '/img/placeholder.webp'
              },
              type: {
                value: 'outfit',
                displayValue: 'Skin',
                backendValue: 'AthenaCharacter'
              }
            });
          }
        });
      }

      if (apiData.shop && Array.isArray(apiData.shop) && apiData.shop.length > 4) {
        apiData.shop.slice(4, 8).forEach((item: any, index: number) => {
          if (item && item.name) {
            featuredItems.push({
              id: item.id || `fallback-featured-${index}`,
              name: item.name || `Item Destacado ${index + 1}`,
              description: 'Item especial destacado',
              price: 1000 + (index * 300),
              rarity: {
                value: 'epic',
                displayValue: 'Épico',
                backendValue: 'Epic'
              },
              images: {
                icon: '/img/placeholder.webp'
              },
              type: {
                value: 'outfit',
                displayValue: 'Skin',
                backendValue: 'AthenaCharacter'
              }
            });
          }
        });
      }
    }

    console.log(`✅ Procesamiento completado: ${dailyItems.length} diarios, ${featuredItems.length} destacados`);

    // Asegurarse de que siempre haya algunos items
    if (dailyItems.length === 0) {
      console.log('🔄 Agregando items diarios de respaldo');
      dailyItems.push(...createDailyFallbackItems());
    }

    if (featuredItems.length === 0) {
      console.log('🔄 Agregando items destacados de respaldo');
      featuredItems.push(...createFeaturedFallbackItems());
    }

    return {
      daily: dailyItems.slice(0, 6),
      featured: featuredItems.slice(0, 8),
      lastUpdate: new Date().toISOString()
    };
  };

  // FUNCIONES DE RESPALDO
  const createDailyFallbackItems = (): FortniteItem[] => {
    return [
      {
        id: 'fallback-daily-1',
        name: 'Cazador Estelar',
        description: 'Skin de cazador con temática espacial',
        price: 800,
        rarity: { value: 'rare', displayValue: 'Raro', backendValue: 'Rare' },
        images: { icon: '/img/placeholder.webp' },
        type: { value: 'outfit', displayValue: 'Skin', backendValue: 'AthenaCharacter' }
      },
      {
        id: 'fallback-daily-2',
        name: 'Hacha de Combate',
        description: 'Pico de combate básico',
        price: 500,
        rarity: { value: 'uncommon', displayValue: 'Poco Común', backendValue: 'Uncommon' },
        images: { icon: '/img/placeholder.webp' },
        type: { value: 'pickaxe', displayValue: 'Pico', backendValue: 'AthenaPickaxe' }
      },
      {
        id: 'fallback-daily-3',
        name: 'Mochila Táctica',
        description: 'Mochila para equipamiento',
        price: 300,
        rarity: { value: 'common', displayValue: 'Común', backendValue: 'Common' },
        images: { icon: '/img/placeholder.webp' },
        type: { value: 'backpack', displayValue: 'Mochila', backendValue: 'AthenaBackpack' }
      }
    ];
  };

  const createFeaturedFallbackItems = (): FortniteItem[] => {
    return [
      {
        id: 'fallback-featured-1',
        name: 'Dragón Legendario',
        description: 'Skin legendaria con efectos de dragón',
        price: 2000,
        rarity: { value: 'legendary', displayValue: 'Legendario', backendValue: 'Legendary' },
        images: { icon: '/img/placeholder.webp' },
        type: { value: 'outfit', displayValue: 'Skin', backendValue: 'AthenaCharacter' }
      },
      {
        id: 'fallback-featured-2',
        name: 'Alas de Fénix',
        description: 'Ala delta con efectos de fuego',
        price: 1200,
        rarity: { value: 'epic', displayValue: 'Épico', backendValue: 'Epic' },
        images: { icon: '/img/placeholder.webp' },
        type: { value: 'glider', displayValue: 'Ala Delta', backendValue: 'AthenaGlider' }
      },
      {
        id: 'fallback-featured-3',
        name: 'Emote Estelar',
        description: 'Baile con efectos especiales',
        price: 800,
        rarity: { value: 'rare', displayValue: 'Raro', backendValue: 'Rare' },
        images: { icon: '/img/placeholder.webp' },
        type: { value: 'emote', displayValue: 'Emote', backendValue: 'AthenaDance' }
      }
    ];
  };

  // FUNCIÓN MEJORADA PARA DATOS DE EJEMPLO
  const createDetailedMockShopData = (): FortniteShop => {
    return {
      daily: createDailyFallbackItems(),
      featured: createFeaturedFallbackItems(),
      lastUpdate: new Date().toISOString()
    };
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

  // Función simplificada para obtener tasas de cambio
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
    
    // Redondear según la moneda
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
    // Contador de visitas
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
    fetchFortniteShop(); // Cargar tienda Fortnite al inicio

    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => {
      clearInterval(carouselInterval);
    };
  }, []);

  // CORREGIDO: Cargar idioma preferido - Español por defecto
  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
      setCurrentLanguage(preferredLanguage);
    } else {
      setCurrentLanguage('es');
      localStorage.setItem('preferredLanguage', 'es');
    }
  }, []);

  // Funciones que faltaban
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

  // Cerrar dropdown al hacer click fuera
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

      {/* Header actualizado - imagen a todo ancho */}
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

      {/* Selector de moneda y información de tasas */}
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

      {/* SECCIÓN TIENDA FORTNITE - ACTUALIZADA */}
      {activeSection === 'fortnite-shop' && (
        <section className="section fortnite-shop-section">
          <div className="shop-header">
            <h2 className="neon-text">🎮 {t.fortniteShop}</h2>
            <div className="shop-controls">
              <button 
                className="btn neon-btn refresh-btn" 
                onClick={fetchFortniteShop}
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
              <span className={`status-dot ${shopError ? 'error' : fortniteShop ? 'success' : 'loading'}`}></span>
              <span className="status-text">
                {shopLoading ? '🔄 Cargando...' : 
                 shopError ? '⚠️ Usando datos de ejemplo' : 
                 fortniteShop ? `✅ ${fortniteShop.daily.length + fortniteShop.featured.length} items cargados` :
                 '⏳ Esperando datos...'}
              </span>
            </div>
            {fortniteShop && (
              <div className="status-details">
                <small>
                  {fortniteShop.daily.length} items diarios • {fortniteShop.featured.length} items destacados
                </small>
              </div>
            )}
            {shopError && (
              <div className="status-help">
                <small>
                  {currentLanguage === 'es' 
                    ? 'La API no está disponible. Mostrando datos de demostración.'
                    : 'API unavailable. Showing demo data.'}
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

          {/* Estado de error */}
          {shopError && !shopLoading && (
            <div className="shop-error">
              <p>❌ {shopError}</p>
              <button className="btn neon-btn" onClick={fetchFortniteShop}>
                {t.tryAgain}
              </button>
            </div>
          )}

          {/* Tienda cargada correctamente */}
          {fortniteShop && !shopLoading && !shopError && (
            <div className="fortnite-shop">
              {/* Items Destacados */}
              <div className="shop-category">
                <h3 className="neon-text">⭐ {t.featuredItems}</h3>
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
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/img/placeholder.webp';
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
                    <p>{t.noItemsAvailable}</p>
                  </div>
                )}
              </div>

              {/* Items Diarios */}
              <div className="shop-category">
                <h3 className="neon-text">📅 {t.dailyItems}</h3>
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
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/img/placeholder.webp';
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
                    <p>{t.noItemsAvailable}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Modal de producto ampliado - CORREGIDO PARA MÓVIL */}
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

      {/* Sección Payments */}
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

      {/* Sección Contact */}
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