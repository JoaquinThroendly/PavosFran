// app/page.tsx - VERSIÓN COMPLETA CON TODOS LOS PRODUCTOS
'use client';

import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// 🔧 FUNCIÓN PARA IMÁGENES
const getValidImageUrl = (url: string | undefined | null): string => {
  if (!url || url.includes('null') || url === '' || url === 'undefined') {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb3J0bml0ZSBJdGVtPC90ZXh0Pgo8L3N2Zz4=';
  }
  
  if (url.startsWith('http')) {
    return url;
  }
  
  if (url.startsWith('/')) {
    return `https://media.fortniteapi.io${url}`;
  }
  
  return `https://media.fortniteapi.io/images/${url}`;
};

// TEXTOS TRADUCIDOS
const translations = {
  en: {
    home: "Home",
    products: "Products",
    payments: "Payments",
    contact: "Contact",
    welcome: "Welcome to Pavos Fran",
    welcomeText: "We offer the best service so you can get everything you want from the Fortnite Item Shop.",
    fortniteShop: "Fortnite Item Shop",
    loadingShop: "Loading Fortnite Shop...",
    refreshShop: "Refresh Shop",
    totalItems: "Total Items",
    featuredItems: "Featured Items",
    dailyItems: "Daily Items",
    filterByRarity: "Filter by Rarity",
    allRarities: "All Rarities",
    allItems: "All Items",
    viewAll: "View All",
    categories: "Categories",
    apiStatus: "API Status",
    realTimeData: "Real-time data",
    connecting: "Connecting to API...",
    apiError: "API Connection Error",
    errorLoadingShop: "Error loading shop",
    tryAgain: "Try Again",
    vBucks: "V-Bucks",
    price: "Price",
    rarity: "Rarity",
    contactWhatsApp: "Contact WhatsApp",
    selectCurrency: "Select Currency:",
    exchangeRate: "Exchange Rate",
    loadingRates: "Loading exchange rates...",
    menu: "Menu"
  },
  es: {
    home: "Inicio",
    products: "Productos",
    payments: "Pagos",
    contact: "Contacto",
    welcome: "Bienvenido a Pavos Fran",
    welcomeText: "Ofrecemos el mejor servicio para que puedas obtener todo lo que quieras de la Tienda de Fortnite.",
    fortniteShop: "Tienda de Fortnite",
    loadingShop: "Cargando Tienda de Fortnite...",
    refreshShop: "Actualizar Tienda",
    totalItems: "Items Totales",
    featuredItems: "Items Destacados",
    dailyItems: "Items Diarios",
    filterByRarity: "Filtrar por Rareza",
    allRarities: "Todas las Rarezas",
    allItems: "Todos los Items",
    viewAll: "Ver Todos",
    categories: "Categorías",
    apiStatus: "Estado API",
    realTimeData: "Datos en tiempo real",
    connecting: "Conectando a API...",
    apiError: "Error de Conexión API",
    errorLoadingShop: "Error cargando la tienda",
    tryAgain: "Intentar de nuevo",
    vBucks: "Pavos",
    price: "Precio",
    rarity: "Rareza",
    contactWhatsApp: "Contactar por WhatsApp",
    selectCurrency: "Seleccionar Moneda:",
    exchangeRate: "Tipo de Cambio",
    loadingRates: "Cargando tasas de cambio...",
    menu: "Menu"
  }
};

// TIPOS DE DATOS
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
  source: 'api' | 'demo';
}

interface Product {
  id: number;
  name: string;
  image: string;
  prices: Array<{ label: string; priceUSD: number }>;
}

interface Comment {
  id: number;
  name: string;
  comment: string;
  date: string;
  rating: number;
}

// TASAS DE CAMBIO
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

// FUNCIONES AUXILIARES
const getRarityColor = (rarity: string): string => {
  const colors: { [key: string]: string } = {
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
    'star wars': '#f1c40f',
    'gaminglegends': '#d35400'
  };
  
  return colors[rarity.toLowerCase()] || '#888888';
};

const extractPrice = (item: any): number => {
  if (!item) return 0;
  
  if (item.finalPrice !== undefined) return item.finalPrice;
  if (item.regularPrice !== undefined) return item.regularPrice;
  if (item.price) {
    if (typeof item.price === 'object') {
      return item.price.finalPrice || item.price.regularPrice || 0;
    }
    return item.price;
  }
  return 0;
};

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
      const itemName = item.name || item.displayName || `Item ${item.id || index}`;
      const itemDescription = item.description || item.displayDescription || 'Fortnite Item';
      const itemImages = item.images || item.itemImages || {};
      
      let mainImage = itemImages.icon || itemImages.featured || itemImages.smallIcon || '';

      return {
        id: item.id || `item-${index}-${Date.now()}`,
        name: itemName,
        description: itemDescription.substring(0, 100),
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

// FUNCIÓN PRINCIPAL PARA PROCESAR TODOS LOS ITEMS
const processFortniteApiData = (apiData: any): FortniteShop => {
  console.log('🔧 Procesando datos de la API...');
  
  let allItems: any[] = [];

  // ESTRATEGIA 1: API de FortniteAPI.io v2
  if (apiData.data) {
    // Recoger items del shop principal
    if (apiData.data.shop && Array.isArray(apiData.data.shop)) {
      apiData.data.shop.forEach((entry: any) => {
        if (entry.items && Array.isArray(entry.items)) {
          // Items están dentro de entry.items
          allItems.push(...entry.items);
        } else if (entry.item) {
          // Item único
          allItems.push(entry.item);
        } else {
          // La entrada misma es un item
          allItems.push(entry);
        }
      });
    }

    // Recoger items de featured
    if (apiData.data.featured && Array.isArray(apiData.data.featured)) {
      apiData.data.featured.forEach((entry: any) => {
        if (entry.items && Array.isArray(entry.items)) {
          allItems.push(...entry.items);
        } else if (entry.item) {
          allItems.push(entry.item);
        } else {
          allItems.push(entry);
        }
      });
    }

    // Recoger items de daily
    if (apiData.data.daily && Array.isArray(apiData.data.daily)) {
      apiData.data.daily.forEach((entry: any) => {
        if (entry.items && Array.isArray(entry.items)) {
          allItems.push(...entry.items);
        } else if (entry.item) {
          allItems.push(entry.item);
        } else {
          allItems.push(entry);
        }
      });
    }
  }
  
  // ESTRATEGIA 2: Si no hay items aún, buscar en root
  if (allItems.length === 0) {
    if (apiData.shop && Array.isArray(apiData.shop)) {
      allItems = apiData.shop;
    } else if (Array.isArray(apiData)) {
      allItems = apiData;
    }
  }

  console.log(`🎯 Total de items encontrados: ${allItems.length}`);

  // Procesar todos los items
  const processedItems = processItemsArray(allItems);

  // Eliminar duplicados
  const uniqueItemsMap = new Map();
  processedItems.forEach(item => {
    if (!uniqueItemsMap.has(item.id)) {
      uniqueItemsMap.set(item.id, item);
    }
  });

  const uniqueItems = Array.from(uniqueItemsMap.values());

  // Separar en featured y daily (más flexible)
  const featuredItems = uniqueItems.filter(item => 
    item.price > 1000 || 
    ['legendary', 'epic', 'marvel', 'icon', 'dark', 'star wars', 'gaminglegends', 'dc']
      .includes(item.rarity.value.toLowerCase())
  );

  const dailyItems = uniqueItems.filter(item => 
    !featuredItems.some(featured => featured.id === item.id)
  );

  console.log(`✅ Procesado: ${uniqueItems.length} total, ${featuredItems.length} featured, ${dailyItems.length} daily`);

  return {
    allItems: uniqueItems,
    daily: dailyItems,
    featured: featuredItems,
    lastUpdate: apiData.lastUpdate || new Date().toISOString(),
    source: apiData.result === true ? 'api' : 'demo'
  };
};

// COMPONENTE CARRUSEL
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
              aria-label={`Diapositiva ${index + 1}`}
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
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [currency, setCurrency] = useState('USD');
  const [visitCount, setVisitCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState(defaultExchangeRates);
  const [rateLoading, setRateLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading');
  
  // ESTADOS PARA LA TIENDA FORTNITE
  const [fortniteShop, setFortniteShop] = useState<FortniteShop | null>(null);
  const [shopLoading, setShopLoading] = useState(false);
  const [shopError, setShopError] = useState<string | null>(null);
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0);

  const t = translations[currentLanguage as keyof typeof translations];

  // Datos del carrusel de imágenes
  const carouselImages = [
    "/img/carrousel/banner-pica.webp",
    "/img/carrousel/1.webp",
    "/img/carrousel/2.webp",
    "/img/carrousel/3.webp",
    "/img/carrousel/4.webp"
  ];

  // Comentarios iniciales
  const [comments] = useState<Comment[]>([
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
      comment: "Muy confiable, todo funcionó perfecto.",
      date: "20/10/2023",
      rating: 5
    }
  ]);

  // FUNCIÓN PARA CARGAR LA TIENDA COMPLETA
  const fetchFortniteShop = async (forceRefresh = false) => {
    if (shopLoading && !forceRefresh) return;
    
    setShopLoading(true);
    setShopError(null);
    
    try {
      console.log('🔄 Cargando tienda COMPLETA de Fortnite...');
      
      const timestamp = forceRefresh ? `?t=${Date.now()}` : '';
      const response = await fetch(`/api/fortnite-shop${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Estado de respuesta:', response.status);
      
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Datos recibidos de la API');
      
      const processedShop = processFortniteApiData(data);
      setFortniteShop(processedShop);
      setShopError(null);
      
    } catch (error: any) {
      console.error('❌ Error cargando tienda:', error);
      
      setShopError(
        currentLanguage === 'es' 
          ? `Error: ${error.message || 'No se pudo conectar a la API'}`
          : `Error: ${error.message || 'Could not connect to API'}`
      );
      
      // Generar datos de demostración
      const demoItems = Array.from({ length: 40 }, (_, i) => ({
        id: `demo-${i}-${Date.now()}`,
        name: `Item de Demostración ${i + 1}`,
        description: `Este es un item de demostración número ${i + 1}`,
        price: [500, 800, 1200, 1500, 2000][Math.floor(Math.random() * 5)],
        rarity: {
          value: ['common', 'uncommon', 'rare', 'epic', 'legendary'][Math.floor(Math.random() * 5)],
          displayValue: ['Común', 'Poco Común', 'Raro', 'Épico', 'Legendario'][Math.floor(Math.random() * 5)],
          backendValue: 'Common'
        },
        images: {
          icon: `https://picsum.photos/150/150?random=${i}&t=${Date.now()}`,
          featured: `https://picsum.photos/400/200?random=${i + 100}`
        },
        type: {
          value: 'outfit',
          displayValue: 'Skin',
          backendValue: 'AthenaCharacter'
        }
      }));

      setFortniteShop({
        allItems: demoItems,
        daily: demoItems.slice(0, 15),
        featured: demoItems.slice(15, 30),
        lastUpdate: new Date().toISOString(),
        source: 'demo'
      });
      
    } finally {
      setShopLoading(false);
    }
  };

  // FUNCIÓN PARA TASAS DE CAMBIO
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

    // Cargar tasas de cambio
    fetchExchangeRates();
    
    // Cargar tienda de Fortnite
    fetchFortniteShop();

    // Carrusel automático
    const carouselInterval = setInterval(() => {
      setCurrentCarouselSlide((prev) => (prev + 1) % carouselImages.length);
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
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdown(!languageDropdown);
  };

  const changeLanguage = (lang: string) => {
    setLanguageDropdown(false);
    setCurrentLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const contactWhatsApp = (message: string) => {
    const phoneNumber = "1234567890";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  // Filtrar items por rareza
  const filteredItems = fortniteShop?.allItems?.filter(item => 
    selectedRarity === 'all' || 
    item.rarity.value.toLowerCase() === selectedRarity.toLowerCase()
  ) || [];

  // Obtener rarezas únicas para el filtro
  const uniqueRarities = Array.from(
    new Set(fortniteShop?.allItems?.map(item => item.rarity.value.toLowerCase()) || [])
  ).sort();

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
        <button 
          className="whatsapp-btn" 
          onClick={() => contactWhatsApp('¡Hola! Necesito información sobre los productos de Fortnite')}
        >
          <span>💬 ¡Hola! ¿Necesitas ayuda?</span>
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
          ☰ {t.menu}
        </button>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a onClick={() => showSection('home')} className={activeSection === 'home' ? 'active' : ''}>
            {t.home}
          </a>
          <a onClick={() => showSection('products')} className={activeSection === 'products' ? 'active' : ''}>
            {t.products}
          </a>
          <a onClick={() => showSection('fortnite-shop')} className={activeSection === 'fortnite-shop' ? 'active' : ''}>
            🛒 {t.fortniteShop}
          </a>
          <a onClick={() => showSection('payments')} className={activeSection === 'payments' ? 'active' : ''}>
            {t.payments}
          </a>
          <a onClick={() => showSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>
            {t.contact}
          </a>
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
                className={index === currentCarouselSlide ? 'active' : ''}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ))}
          </div>
          
          <div className="presentation">
            <h2 className="neon-text">{t.welcome}</h2>
            <p>{t.welcomeText}</p>
          </div>

          {/* Sección de comentarios */}
          <div className="comments-section">
            <h2>Opiniones de Usuarios</h2>
            <p>Mira lo que dicen nuestros clientes.</p>
            
            <div className="comments-grid">
              {comments.map((comment) => (
                <div key={comment.id} className="comment neon-card">
                  <h4>{comment.name}</h4>
                  <p>{comment.comment}</p>
                  <small>{comment.date} | {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección Products */}
      {activeSection === 'products' && (
        <section className="section products-section">
          <h2 className="neon-text">{t.products}</h2>
          <p>Esta sección está en desarrollo. Pronto podrás ver todos nuestros productos aquí.</p>
        </section>
      )}

      {/* SECCIÓN TIENDA FORTNITE - COMPLETA */}
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
                <div className="shop-stats">
                  <span className="stats-item">
                    📊 {t.totalItems}: <strong>{fortniteShop.allItems?.length || 0}</strong>
                  </span>
                  <span className="stats-item">
                    ⭐ {t.featuredItems}: <strong>{fortniteShop.featured?.length || 0}</strong>
                  </span>
                  <span className="stats-item">
                    📅 {t.dailyItems}: <strong>{fortniteShop.daily?.length || 0}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Estado de la API */}
          <div className="api-status">
            <div className="status-indicator">
              <span className={`status-dot ${
                shopLoading ? 'loading' : 
                shopError ? 'error' : 
                'success'
              }`}></span>
              <span className="status-text">
                <strong>{t.apiStatus}:</strong> {
                  shopLoading ? t.connecting : 
                  shopError ? t.apiError : 
                  t.realTimeData
                } {fortniteShop?.source === 'demo' && '(Demo)'}
              </span>
            </div>
          </div>

          {/* Estado de carga */}
          {shopLoading && (
            <div className="loading-shop">
              <div className="loading-spinner"></div>
              <p>{t.loadingShop}</p>
            </div>
          )}

          {/* Tienda cargada */}
          {fortniteShop && !shopLoading && (
            <div className="fortnite-shop">
              {/* FILTROS */}
              <div className="shop-filters">
                <div className="filter-group">
                  <label htmlFor="rarity-filter">{t.filterByRarity}:</label>
                  <select 
                    id="rarity-filter"
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="rarity-filter"
                  >
                    <option value="all">{t.allRarities} ({fortniteShop.allItems.length})</option>
                    {uniqueRarities.map(rarity => {
                      const count = fortniteShop.allItems.filter(
                        item => item.rarity.value.toLowerCase() === rarity
                      ).length;
                      return (
                        <option key={rarity} value={rarity}>
                          {rarity.charAt(0).toUpperCase() + rarity.slice(1)} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <button 
                  className={`btn view-toggle-btn ${showAllItems ? 'active' : ''}`}
                  onClick={() => setShowAllItems(!showAllItems)}
                >
                  {showAllItems ? '📋 ' + t.categories : '📜 ' + t.viewAll}
                </button>
              </div>

              {/* VISTA CON TODOS LOS ITEMS */}
              {showAllItems ? (
                <div className="all-items-view">
                  <h3 className="neon-text">
                    {selectedRarity === 'all' 
                      ? `🎮 ${t.allItems} (${filteredItems.length})` 
                      : `${selectedRarity.charAt(0).toUpperCase() + selectedRarity.slice(1)} Items (${filteredItems.length})`
                    }
                  </h3>
                  
                  {filteredItems.length > 0 ? (
                    <>
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
                      
                      {filteredItems.length > 50 && (
                        <div className="load-more">
                          <button className="btn neon-btn">
                            Mostrar más items ({filteredItems.length - 50} restantes)
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="no-items">
                      <p>No hay items con esta rareza</p>
                    </div>
                  )}
                </div>
              ) : (
                /* VISTA POR CATEGORÍAS CON CARRUSELES */
                <div className="carousels-view">
                  {/* Carrusel para Items Destacados */}
                  {fortniteShop.featured.length > 0 && (
                    <ItemsCarousel 
                      items={fortniteShop.featured}
                      title={`⭐ ${t.featuredItems}`}
                      itemsPerSlide={4}
                      currentLanguage={currentLanguage}
                    />
                  )}

                  {/* Carrusel para Items Diarios */}
                  {fortniteShop.daily.length > 0 && (
                    <ItemsCarousel 
                      items={fortniteShop.daily}
                      title={`📅 ${t.dailyItems}`}
                      itemsPerSlide={4}
                      currentLanguage={currentLanguage}
                    />
                  )}

                  {/* Carrusel para Todos los Items */}
                  {fortniteShop.allItems.length > 0 && (
                    <ItemsCarousel 
                      items={fortniteShop.allItems.slice(0, 32)}
                      title={`🎮 ${t.allItems}`}
                      itemsPerSlide={4}
                      currentLanguage={currentLanguage}
                    />
                  )}
                </div>
              )}

              {/* ESTADÍSTICAS */}
              <div className="shop-statistics">
                <div className="stat-card">
                  <h4>📊 Distribución por Rareza</h4>
                  {Object.entries(
                    fortniteShop.allItems.reduce((acc, item) => {
                      const rarity = item.rarity.displayValue;
                      acc[rarity] = (acc[rarity] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([rarity, count]) => (
                    <div key={rarity} className="stat-row">
                      <span className="stat-label">{rarity}:</span>
                      <span className="stat-value">{count} items</span>
                    </div>
                  ))}
                </div>
                
                <div className="stat-card">
                  <h4>💰 Rango de Precios</h4>
                  {fortniteShop.allItems.length > 0 && (
                    <>
                      <div className="stat-row">
                        <span className="stat-label">Mínimo:</span>
                        <span className="stat-value">
                          {Math.min(...fortniteShop.allItems.map(i => i.price))} {t.vBucks}
                        </span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Máximo:</span>
                        <span className="stat-value">
                          {Math.max(...fortniteShop.allItems.map(i => i.price))} {t.vBucks}
                        </span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Promedio:</span>
                        <span className="stat-value">
                          {Math.round(fortniteShop.allItems.reduce((a, b) => a + b.price, 0) / fortniteShop.allItems.length)} {t.vBucks}
                        </span>
                      </div>
                    </>
                  )}
                </div>
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

      {/* Sección Payments */}
      {activeSection === 'payments' && (
        <section className="section">
          <h2 className="neon-text">Métodos de Pago</h2>
          <div className="payments-grid">
            <div className="payment-method neon-card">
              <div>💳</div>
              <h4>Tarjeta de Crédito</h4>
            </div>
            <div className="payment-method neon-card">
              <div>💳</div>
              <h4>Tarjeta de Débito</h4>
            </div>
            <div className="payment-method neon-card">
              <div>📱</div>
              <h4>Mercado Pago</h4>
            </div>
            <div className="payment-method neon-card">
              <div>📱</div>
              <h4>PayPal</h4>
            </div>
          </div>
        </section>
      )}

      {/* Sección Contact */}
      {activeSection === 'contact' && (
        <section className="section">
          <h2 className="neon-text">Contáctanos</h2>
          <div className="contact neon-card">
            <p>📧 Email: info@pavosfran.com</p>
            <p>📞 Teléfono: +1 (555) 123-4567</p>
            <p>📍 Dirección: 123 Gaming Street, Fortnite City</p>
          </div>
          
          <div className="social-media neon-card">
            <h3>Síguenos</h3>
            <a href="https://instagram.com/pavosfran" className="neon-link"> Instagram</a>
            <a href="https://facebook.com/pavosfran" className="neon-link"> Facebook</a>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="visit-counter">
          <p>Visitas: <span className="neon-text">{visitCount}</span></p>
        </div>
        <p>&copy; 2025 Pavos Fran. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;