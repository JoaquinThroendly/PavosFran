// app/page.tsx - ACTUALIZADO CON FORTNITEAPI.IO
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
  
  // CAMBIO: Idioma predeterminado ahora es español
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

  // NUEVA FUNCIÓN ACTUALIZADA CON FORTNITEAPI.IO
  const fetchFortniteShop = async () => {
    setShopLoading(true);
    setShopError(null);
    
    try {
      console.log('🔍 Iniciando carga de la tienda Fortnite...');
      
      // TU API KEY DE FORTNITEAPI.IO
      const API_KEY = 'a9966904-5bc4bb17-b9ec8bf6-0d9486df';
      const API_URL = 'https://fortniteapi.io/v2/shop?lang=es';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(API_URL, {
        signal: controller.signal,
        headers: {
          'Authorization': API_KEY,
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📦 Datos recibidos de FortniteAPI.io:', data);
      
      if (data.result) {
        const processedShop = processFortniteApiData(data);
        console.log('✅ Tienda procesada correctamente desde FortniteAPI.io');
        setFortniteShop(processedShop);
      } else {
        throw new Error(data.error || 'Error en la respuesta de la API');
      }
    } catch (error) {
      console.error('❌ Error cargando tienda Fortnite:', error);
      
      let errorMessage = t.errorLoadingShop;
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = currentLanguage === 'es' 
            ? 'Tiempo de espera agotado. La API está tardando demasiado.'
            : 'Request timeout. API is taking too long.';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = currentLanguage === 'es'
            ? 'Error de conexión. Verifica tu internet.'
            : 'Connection error. Check your internet.';
        } else if (error.message.includes('429')) {
          errorMessage = currentLanguage === 'es'
            ? 'Límite de requests excedido. Intenta más tarde.'
            : 'Rate limit exceeded. Try again later.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setShopError(errorMessage);
      
      // Datos de ejemplo como respaldo
      const mockShopData = createMockShopData();
      setFortniteShop(mockShopData);
    } finally {
      setShopLoading(false);
    }
  };

  // NUEVA FUNCIÓN PARA PROCESAR DATOS DE FORTNITEAPI.IO
  const processFortniteApiData = (apiData: any): FortniteShop => {
    const dailyItems: FortniteItem[] = [];
    const featuredItems: FortniteItem[] = [];

    console.log('🔄 Procesando datos de FortniteAPI.io...', apiData);

    // Procesar items destacados (featured)
    if (apiData.shop && Array.isArray(apiData.shop)) {
      apiData.shop.forEach((item: any, index: number) => {
        try {
          if (item && item.name) {
            const shopItem: FortniteItem = {
              id: item.id || `item-${index}`,
              name: item.name || 'Item sin nombre',
              description: item.description || 'Sin descripción disponible',
              price: item.vbucks || item.price || 0,
              rarity: {
                value: item.rarity?.id || 'common',
                displayValue: item.rarity?.name || 'Común',
                backendValue: item.rarity?.id || 'Common'
              },
              images: {
                icon: item.images?.icon || '/img/placeholder.webp',
                featured: item.images?.featured || item.images?.icon
              },
              type: {
                value: item.type?.id || 'outfit',
                displayValue: item.type?.name || 'Skin',
                backendValue: item.type?.id || 'AthenaCharacter'
              }
            };

            // Determinar si es daily o featured basado en propiedades
            if (item.section?.id === 'daily' || item.featured === false) {
              dailyItems.push(shopItem);
            } else {
              featuredItems.push(shopItem);
            }
          }
        } catch (error) {
          console.warn(`Error procesando item ${index}:`, error);
        }
      });
    }

    // Si no hay items, usar secciones específicas
    if (apiData.daily && Array.isArray(apiData.daily)) {
      apiData.daily.forEach((item: any, index: number) => {
        try {
          if (item && item.name) {
            dailyItems.push({
              id: item.id || `daily-${index}`,
              name: item.name || 'Item sin nombre',
              description: item.description || 'Sin descripción disponible',
              price: item.vbucks || item.price || 0,
              rarity: {
                value: item.rarity?.id || 'common',
                displayValue: item.rarity?.name || 'Común',
                backendValue: item.rarity?.id || 'Common'
              },
              images: {
                icon: item.images?.icon || '/img/placeholder.webp'
              },
              type: {
                value: item.type?.id || 'outfit',
                displayValue: item.type?.name || 'Skin',
                backendValue: item.type?.id || 'AthenaCharacter'
              }
            });
          }
        } catch (error) {
          console.warn(`Error procesando item diario ${index}:`, error);
        }
      });
    }

    if (apiData.featured && Array.isArray(apiData.featured)) {
      apiData.featured.forEach((item: any, index: number) => {
        try {
          if (item && item.name) {
            featuredItems.push({
              id: item.id || `featured-${index}`,
              name: item.name || 'Item sin nombre',
              description: item.description || 'Sin descripción disponible',
              price: item.vbucks || item.price || 0,
              rarity: {
                value: item.rarity?.id || 'common',
                displayValue: item.rarity?.name || 'Común',
                backendValue: item.rarity?.id || 'Common'
              },
              images: {
                icon: item.images?.icon || '/img/placeholder.webp',
                featured: item.images?.featured || item.images?.icon
              },
              type: {
                value: item.type?.id || 'outfit',
                displayValue: item.type?.name || 'Skin',
                backendValue: item.type?.id || 'AthenaCharacter'
              }
            });
          }
        } catch (error) {
          console.warn(`Error procesando item destacado ${index}:`, error);
        }
      });
    }

    console.log(`✅ Procesados: ${dailyItems.length} items diarios, ${featuredItems.length} items destacados`);

    return {
      daily: dailyItems.slice(0, 6), // Limitar a 6 items máximo
      featured: featuredItems.slice(0, 8), // Limitar a 8 items máximo
      lastUpdate: new Date().toISOString()
    };
  };

  // FUNCIÓN PARA DATOS DE EJEMPLO
  const createMockShopData = (): FortniteShop => {
    return {
      daily: [
        {
          id: 'mock-daily-1',
          name: 'Cazador Élite',
          description: 'Un cazador experimentado listo para la batalla',
          price: 800,
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
        },
        {
          id: 'mock-daily-2',
          name: 'Alas de Fénix',
          description: 'Mochila cohete con diseño de fénix',
          price: 500,
          rarity: {
            value: 'uncommon',
            displayValue: 'Poco Común',
            backendValue: 'Uncommon'
          },
          images: {
            icon: '/img/placeholder.webp'
          },
          type: {
            value: 'backpack',
            displayValue: 'Mochila',
            backendValue: 'AthenaBackpack'
          }
        }
      ],
      featured: [
        {
          id: 'mock-featured-1',
          name: 'Dragón Legendario',
          description: 'Skin legendaria con efectos de dragón',
          price: 2000,
          rarity: {
            value: 'legendary',
            displayValue: 'Legendario',
            backendValue: 'Legendary'
          },
          images: {
            icon: '/img/placeholder.webp'
          },
          type: {
            value: 'outfit',
            displayValue: 'Skin',
            backendValue: 'AthenaCharacter'
          }
        },
        {
          id: 'mock-featured-2',
          name: 'Paquete Estelar',
          description: 'Bundle especial con items exclusivos',
          price: 2800,
          rarity: {
            value: 'marvel',
            displayValue: 'Marvel',
            backendValue: 'Marvel'
          },
          images: {
            icon: '/img/placeholder.webp'
          },
          type: {
            value: 'bundle',
            displayValue: 'Bundle',
            backendValue: 'AthenaBundle'
          }
        }
      ],
      lastUpdate: new Date().toISOString()
    };
  };

  // FUNCIÓN PARA OBTENER COLOR SEGÚN RAREZA
  const getRarityColor = (rarity: string): string => {
    const rarityColors: { [key: string]: string } = {
      'common': '#b0b0b0',
      'uncommon': '#00aeff',
      'rare': '#9d38bd',
      'epic': '#d42cca',
      'legendary': '#ffaa00',
      'marvel': '#ff4444',
      'dark': '#2e2e2e',
      'dc': '#007acc',
      'lava': '#ff6b00',
      'frozen': '#00ffff',
      'shadow': '#8a2be2',
      'icon': '#32cd32',
      'star wars': '#ffd700'
    };
    
    return rarityColors[rarity.toLowerCase()] || '#b0b0b0';
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

  // Cargar idioma preferido
  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage && translations[preferredLanguage as keyof typeof translations]) {
      setCurrentLanguage(preferredLanguage);
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

      {/* NUEVA SECCIÓN: TIENDA DE FORTNITE */}
      {activeSection === 'fortnite-shop' && (
        <section className="section fortnite-shop-section">
          <div className="shop-header">
            <h2>🎮 {t.fortniteShop}</h2>
            <button 
              className="btn refresh-btn" 
              onClick={fetchFortniteShop}
              disabled={shopLoading}
            >
              {shopLoading ? '🔄' : '🔄'} {t.refreshShop}
            </button>
          </div>

          {shopLoading && (
            <div className="loading-shop">
              <p>{t.loadingShop}</p>
            </div>
          )}

          {shopError && (
            <div className="shop-error">
              <p>❌ {shopError}</p>
              <button className="btn" onClick={fetchFortniteShop}>
                {t.tryAgain}
              </button>
            </div>
          )}

          {fortniteShop && !shopLoading && (
            <div className="fortnite-shop">
              {/* Items Destacados */}
              <div className="shop-category">
                <h3>⭐ {t.featuredItems}</h3>
                <div className="items-grid">
                  {fortniteShop.featured.length > 0 ? (
                    fortniteShop.featured.map((item) => (
                      <div 
                        key={item.id} 
                        className="shop-item"
                        style={{ 
                          borderColor: getRarityColor(item.rarity.value),
                          background: `linear-gradient(135deg, ${getRarityColor(item.rarity.value)}20, transparent)`
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
                        </div>
                        <div className="item-info">
                          <h4 className="item-name">{item.name}</h4>
                          <p className="item-description">{item.description}</p>
                          <div className="item-details">
                            <span 
                              className="item-rarity"
                              style={{ color: getRarityColor(item.rarity.value) }}
                            >
                              {item.rarity.displayValue}
                            </span>
                            <span className="item-price">
                              🪙 {item.price} {t.vBucks}
                            </span>
                          </div>
                          <button 
                            className="btn item-buy-btn"
                            onClick={() => contactWhatsApp(`Item de Fortnite: ${item.name} - ${item.price} Pavos`)}
                          >
                            {t.contactWhatsApp}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-items">
                      <p>{t.noItemsAvailable}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items Diarios */}
              <div className="shop-category">
                <h3>📅 {t.dailyItems}</h3>
                <div className="items-grid">
                  {fortniteShop.daily.length > 0 ? (
                    fortniteShop.daily.map((item) => (
                      <div 
                        key={item.id} 
                        className="shop-item"
                        style={{ 
                          borderColor: getRarityColor(item.rarity.value),
                          background: `linear-gradient(135deg, ${getRarityColor(item.rarity.value)}20, transparent)`
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
                        </div>
                        <div className="item-info">
                          <h4 className="item-name">{item.name}</h4>
                          <p className="item-description">{item.description}</p>
                          <div className="item-details">
                            <span 
                              className="item-rarity"
                              style={{ color: getRarityColor(item.rarity.value) }}
                            >
                              {item.rarity.displayValue}
                            </span>
                            <span className="item-price">
                              🪙 {item.price} {t.vBucks}
                            </span>
                          </div>
                          <button 
                            className="btn item-buy-btn"
                            onClick={() => contactWhatsApp(`Item de Fortnite: ${item.name} - ${item.price} Pavos`)}
                          >
                            {t.contactWhatsApp}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-items">
                      <p>{t.noItemsAvailable}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="shop-footer">
                <p><small>{t.rateUpdate}: {new Date(fortniteShop.lastUpdate).toLocaleString()}</small></p>
                {shopError && (
                  <p><small>⚠️ Mostrando datos de ejemplo debido a error en la API</small></p>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Modal de producto ampliado */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={closeProductModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
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
                <button className="btn modal-contact-btn" onClick={() => contactWhatsApp(selectedProduct.name)}>
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
          <h2>{t.paymentMethods}</h2>
          <div className="payments-grid">
            <div className="payment-method">
              <div>💳</div>
              <h4>{t.creditCard}</h4>
            </div>
            <div className="payment-method">
              <div>💳</div>
              <h4>{t.debitCard}</h4>
            </div>
            <div className="payment-method">
              <div>📱</div>
              <h4>{t.mercadoPago}</h4>
            </div>
            <div className="payment-method">
              <div>📱</div>
              <h4>{t.daviPlata}</h4>
            </div>
            <div className="payment-method">
              <div>📱</div>
              <h4>{t.nequi}</h4>
            </div>
            <div className="payment-method">
              <div>📱</div>
              <h4>{t.yape}</h4>
            </div>
            <div className="payment-method">
              <div>📱</div>
              <h4>{t.pagoMovil}</h4>
            </div>
            <div className="payment-method">
              <div>💰</div>
              <h4>{t.cashApp}</h4>
            </div>
          </div>
        </section>
      )}

      {/* Sección Contact */}
      {activeSection === 'contact' && (
        <section className="section">
          <h2>{t.contactUs}</h2>
          <div className="contact">
            <p>{t.email}: info@franvbucks.com</p>
            <p>{t.phone}: +1 (555) 123-4567</p>
            <p>{t.address}: 123 Gaming Street, Fortnite City</p>
          </div>
          
          <div className="social-media">
            <h3>{t.followUs}</h3>
            <a href="https://instagram.com/yourusername"> Instagram</a>
            <a href="https://facebook.com/yourusername"> Facebook</a>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="visit-counter">
          <p>{t.visits}: <span>{visitCount}</span></p>
        </div>
        <p>&copy; 2025 Pavos Fran. {t.allRightsReserved}</p>
      </footer>
    </div>
  );
};

export default HomePage;