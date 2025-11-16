// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import './styles.css';

// Textos traducidos
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
    apiError: "Using default rates"
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
    apiError: "Usando tasas predeterminadas"
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

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [productsWindow, setProductsWindow] = useState(false);
  const [activeProductPage, setActiveProductPage] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [exchangeRates, setExchangeRates] = useState(defaultExchangeRates);
  const [rateLoading, setRateLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const t = translations[currentLanguage as keyof typeof translations];

  // Datos base de productos CORREGIDOS (rutas de imágenes)
  const baseProductsData: { [key: number]: Omit<Product, 'name'>[] } = {
    1: [
      {
        id: 1,
        image: "/img/products/club precios.png",
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
        image: "/img/products/metodo de regalo-pica.png",
        prices: [
          { label: "From 100 V-Bucks", priceUSD: 0.70 }
        ]
      }
    ],
    3: [
      {
        id: 3,
        image: "/img/products/1 mes game pass-pica.png",
        prices: [
          { label: "Price", priceUSD: 16.50 }
        ]
      },
      {
        id: 4,
        image: "/img/products/3 meses game pass-pica.png",
        prices: [
          { label: "Price", priceUSD: 32.75 }
        ]
      }
    ],
    4: [
      {
        id: 5,
        image: "/img/products/economy.png",
        prices: [
          { label: "Price", priceUSD: 22 }
        ]
      },
      {
        id: 6,
        image: "/img/products/exclusive.png",
        prices: [
          { label: "Price", priceUSD: 22 }
        ]
      },
      {
        id: 7,
        image: "/img/products/pro.png",
        prices: [
          { label: "Price", priceUSD: 33 }
        ]
      },
      {
        id: 8,
        image: "/img/products/super.png",
        prices: [
          { label: "Price", priceUSD: 50 }
        ]
      },
      {
        id: 9,
        image: "/img/products/mega.png",
        prices: [
          { label: "Price", priceUSD: 80 }
        ]
      }
    ],
    5: [
      {
        id: 10,
        image: "/img/products/pavos precios-pica.png",
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
        image: "/img/products/TERMINOS-pica.png",
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

  // Datos del carrusel
  const carouselImages = [
    "/img/carrousel/banner-pica.png",
    "/img/carrousel/1.png",
    "/img/carrousel/2.png",
    "/img/carrousel/3.png",
    "/img/carrousel/4.png"

  ];

  // Comentarios iniciales
  const initialComments: Comment[] = [
    {
      id: 1,
      name: "Carlos M.",
      comment: "Amazing service! Got my V-Bucks instantly.",
      date: "15/10/2023",
      rating: 5
    },
    {
      id: 2,
      name: "Ana L.",
      comment: "Fast delivery and great prices.",
      date: "20/10/2023",
      rating: 4
    },
    {
      id: 3,
      name: "Jorge P.",
      comment: "Real deal! Everything as promised.",
      date: "25/10/2023",
      rating: 5
    }
  ];

  const [comments, setComments] = useState<Comment[]>(initialComments);

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

    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(carouselInterval);
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
    if (sectionId !== 'products') {
      setProductsWindow(false);
      setActiveProductPage(null);
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
    }
  };

  const showProductPage = (pageNumber: number) => {
    setActiveProductPage(pageNumber);
    setProductsWindow(false);
  };

  const contactWhatsApp = (productName: string) => {
    const phoneNumber = "1234567890";
    const message = `Hello! I'm interested in: ${productName}`;
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
      alert('Please select a rating');
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
    alert('Thank you for your review!');
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
        <button className="whatsapp-btn" onClick={() => contactWhatsApp('General Inquiry')}>
          <span>{t.whatsappMessage}</span>
        </button>
      </div>

      <header className="header">
        <img src="/img/logo/logo.png" alt="Store Logo" />
        <h1>Pavos Fran</h1>
      </header>

      <nav className="nav">
        <a onClick={() => showSection('home')}>{t.home}</a>
        <a onClick={() => showSection('products')}>{t.products}</a>
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
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="MXN">MXN - Mexican Peso</option>
            <option value="ARS">ARS - Argentine Peso</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="CLP">CLP - Chilean Peso</option>
            <option value="COP">COP - Colombian Peso</option>
            <option value="PEN">PEN - Peruvian Sol</option>
            <option value="UYU">UYU - Uruguayan Peso</option>
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
                    <img src="/img/products/club precios.png" alt="Fortnite Crew" />
                    <h4>{t.fortniteCrew}</h4>
                    <p>{t.monthlySubs}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(2)}>
                    <img src="/img/products/metodo de regalo-pica.png" alt="Cosmetics" />
                    <h4>{t.cosmeticsGift}</h4>
                    <p>{t.skinsItems}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(3)}>
                    <img src="img/products/1 mes game pass-pica.png" alt="Game Pass" />
                    <h4>{t.gamePass}</h4>
                    <p>{t.xboxSub}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(4)}>
                    <img src="/img/products/exclusive.png" alt="Exclusive Packs" />
                    <h4>{t.exclusivePacks}</h4>
                    <p>{t.specialBundles}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(5)}>
                    <img src="img/products/pavos precios-pica.png" alt="V-Bucks" />
                    <h4>{t.vbucks}</h4>
                    <p>{t.gameCurrency}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(6)}>
                    <img src="img/products/TERMINOS-pica.png" alt="Discounts" />
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
                <div key={product.id} className="product">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
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
                    <button className="btn" onClick={() => contactWhatsApp(product.name)}>
                      {t.contactWhatsApp}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
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