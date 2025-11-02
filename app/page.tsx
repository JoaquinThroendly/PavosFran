// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import './styles.css';

// Textos traducidos para todos los idiomas
const translations = {
  en: {
    // Navegación
    home: "Home",
    products: "Products",
    payments: "Payments",
    contact: "Contact",
    
    // Home Section
    welcome: "Welcome to Fran V-Bucks",
    welcomeText: "We offer the best service so you can get everything you want from the Fortnite Item Shop. V-Bucks, Skins, Cosmetics, Battle Pass, Promotional Packs, and discounts on bulk purchases. Follow us on social media and ask us anything. Battle Royale!",
    userReviews: "User Reviews",
    seeReviews: "See what our customers say. Leave your review below!",
    yourName: "Your name",
    shareExperience: "Share your experience...",
    rating: "Rating",
    submitReview: "Submit Review",
    
    // Products Section
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
    
    // Payments Section
    paymentMethods: "Payment Methods",
    creditCard: "Credit Card",
    debitCard: "Debit Card",
    mercadoPago: "Mercado Pago",
    daviPlata: "DaviPlata",
    nequi: "Nequi",
    yape: "Yape",
    pagoMovil: "Pago Móvil",
    cashApp: "Cash App",
    
    // Contact Section
    contactUs: "Contact Us",
    email: "📧 Email",
    phone: "📞 Phone",
    address: "📍 Address",
    followUs: "Follow Us",
    
    // General
    selectCurrency: "Select Currency:",
    visits: "Visits",
    whatsappMessage: "💬 Hi dude! Need help?",
    allRightsReserved: "All rights reserved."
  },
  es: {
    // Navegación
    home: "Inicio",
    products: "Productos",
    payments: "Pagos",
    contact: "Contacto",
    
    // Home Section
    welcome: "Bienvenido a Fran V-Bucks",
    welcomeText: "Ofrecemos el mejor servicio para que puedas obtener todo lo que quieras de la Tienda de Fortnite. V-Bucks, Skins, Cosméticos, Pase de Batalla, Paquetes Promocionales y descuentos en compras al por mayor. Síguenos en redes sociales y pregúntanos lo que quieras. ¡Battle Royale!",
    userReviews: "Opiniones de Usuarios",
    seeReviews: "Mira lo que dicen nuestros clientes. ¡Deja tu reseña abajo!",
    yourName: "Tu nombre",
    shareExperience: "Comparte tu experiencia...",
    rating: "Calificación",
    submitReview: "Enviar Reseña",
    
    // Products Section
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
    
    // Payments Section
    paymentMethods: "Métodos de Pago",
    creditCard: "Tarjeta de Crédito",
    debitCard: "Tarjeta de Débito",
    mercadoPago: "Mercado Pago",
    daviPlata: "DaviPlata",
    nequi: "Nequi",
    yape: "Yape",
    pagoMovil: "Pago Móvil",
    cashApp: "Cash App",
    
    // Contact Section
    contactUs: "Contáctanos",
    email: "📧 Correo",
    phone: "📞 Teléfono",
    address: "📍 Dirección",
    followUs: "Síguenos",
    
    // General
    selectCurrency: "Seleccionar Moneda:",
    visits: "Visitas",
    whatsappMessage: "💬 ¡Hola! ¿Necesitas ayuda?",
    allRightsReserved: "Todos los derechos reservados."
  },
  fr: {
    // Navegación
    home: "Accueil",
    products: "Produits",
    payments: "Paiements",
    contact: "Contact",
    
    // Home Section
    welcome: "Bienvenue chez Fran V-Bucks",
    welcomeText: "Nous offrons le meilleur service pour que vous puissiez obtenir tout ce que vous voulez de la boutique Fortnite. V-Bucks, Skins, Cosmétiques, Passe de Combat, Packs Promotionnels et remises sur les achats en gros. Suivez-nous sur les réseaux sociaux et demandez-nous n'importe quoi. Battle Royale!",
    userReviews: "Avis des Utilisateurs",
    seeReviews: "Voir ce que disent nos clients. Laissez votre avis ci-dessous!",
    yourName: "Votre nom",
    shareExperience: "Partagez votre expérience...",
    rating: "Note",
    submitReview: "Soumettre l'Avis",
    
    // Products Section
    browseProducts: "🎮 Parcourir Tous les Produits 🎮",
    selectCategory: "Sélectionner une Catégorie",
    close: "Fermer",
    fortniteCrew: "Fortnite Crew",
    monthlySubs: "Abonnements Mensuels",
    cosmeticsGift: "Cadeau Cosmétique",
    skinsItems: "Skins et Articles",
    gamePass: "Game Pass",
    xboxSub: "Abonnement Xbox",
    exclusivePacks: "Packs Exclusifs",
    specialBundles: "Lots Spéciaux",
    vbucks: "V-Bucks",
    gameCurrency: "Monnaie du Jeu",
    discounts: "Remises",
    bulkDeals: "Offres en Gros",
    contactWhatsApp: "Contacter WhatsApp",
    
    // Payments Section
    paymentMethods: "Méthodes de Paiement",
    creditCard: "Carte de Crédit",
    debitCard: "Carte de Débit",
    mercadoPago: "Mercado Pago",
    daviPlata: "DaviPlata",
    nequi: "Nequi",
    yape: "Yape",
    pagoMovil: "Pago Móvil",
    cashApp: "Cash App",
    
    // Contact Section
    contactUs: "Contactez-Nous",
    email: "📧 E-mail",
    phone: "📞 Téléphone",
    address: "📍 Adresse",
    followUs: "Suivez-Nous",
    
    // General
    selectCurrency: "Sélectionner la Devise:",
    visits: "Visites",
    whatsappMessage: "💬 Salut! Besoin d'aide?",
    allRightsReserved: "Tous droits réservés."
  },
  de: {
    // Navegación
    home: "Startseite",
    products: "Produkte",
    payments: "Zahlungen",
    contact: "Kontakt",
    
    // Home Section
    welcome: "Willkommen bei Fran V-Bucks",
    welcomeText: "Wir bieten den besten Service, damit Sie alles bekommen, was Sie aus dem Fortnite Item Shop wollen. V-Bucks, Skins, Kosmetik, Battle Pass, Werbepakete und Rabatte auf Mengenkäufe. Folgen Sie uns in den sozialen Medien und fragen Sie uns alles. Battle Royale!",
    userReviews: "Benutzerbewertungen",
    seeReviews: "Sehen Sie, was unsere Kunden sagen. Hinterlassen Sie unten Ihre Bewertung!",
    yourName: "Ihr Name",
    shareExperience: "Teilen Sie Ihre Erfahrung...",
    rating: "Bewertung",
    submitReview: "Bewertung Abschicken",
    
    // Products Section
    browseProducts: "🎮 Alle Produkte Durchsuchen 🎮",
    selectCategory: "Kategorie Auswählen",
    close: "Schließen",
    fortniteCrew: "Fortnite Crew",
    monthlySubs: "Monatliche Abos",
    cosmeticsGift: "Kosmetik Geschenk",
    skinsItems: "Skins & Artikel",
    gamePass: "Game Pass",
    xboxSub: "Xbox Abo",
    exclusivePacks: "Exklusive Pakete",
    specialBundles: "Spezielle Bundles",
    vbucks: "V-Bucks",
    gameCurrency: "Spielwährung",
    discounts: "Rabatte",
    bulkDeals: "Mengenangebote",
    contactWhatsApp: "WhatsApp Kontaktieren",
    
    // Payments Section
    paymentMethods: "Zahlungsmethoden",
    creditCard: "Kreditkarte",
    debitCard: "Debitkarte",
    mercadoPago: "Mercado Pago",
    daviPlata: "DaviPlata",
    nequi: "Nequi",
    yape: "Yape",
    pagoMovil: "Pago Móvil",
    cashApp: "Cash App",
    
    // Contact Section
    contactUs: "Kontaktieren Sie Uns",
    email: "📧 E-Mail",
    phone: "📞 Telefon",
    address: "📍 Adresse",
    followUs: "Folgen Sie Uns",
    
    // General
    selectCurrency: "Währung Auswählen:",
    visits: "Besuche",
    whatsappMessage: "💬 Hallo! Brauchen Sie Hilfe?",
    allRightsReserved: "Alle Rechte vorbehalten."
  },
  it: {
    // Navegación
    home: "Home",
    products: "Prodotti",
    payments: "Pagamenti",
    contact: "Contatto",
    
    // Home Section
    welcome: "Benvenuto in Fran V-Bucks",
    welcomeText: "Offriamo il miglior servizio per ottenere tutto ciò che desideri dal Negozio di Fortnite. V-Bucks, Skin, Cosmetici, Battle Pass, Pacchetti Promozionali e sconti sugli acquisti all'ingrosso. Seguici sui social media e chiedici qualsiasi cosa. Battle Royale!",
    userReviews: "Recensioni degli Utenti",
    seeReviews: "Guarda cosa dicono i nostri clienti. Lascia la tua recensione qui sotto!",
    yourName: "Il tuo nome",
    shareExperience: "Condividi la tua esperienza...",
    rating: "Valutazione",
    submitReview: "Invia Recensione",
    
    // Products Section
    browseProducts: "🎮 Sfoglia Tutti i Prodotti 🎮",
    selectCategory: "Seleziona una Categoria",
    close: "Chiudi",
    fortniteCrew: "Fortnite Crew",
    monthlySubs: "Abbonamenti Mensili",
    cosmeticsGift: "Regalo Cosmetici",
    skinsItems: "Skin e Articoli",
    gamePass: "Game Pass",
    xboxSub: "Abbonamento Xbox",
    exclusivePacks: "Pacchetti Esclusivi",
    specialBundles: "Bundle Speciali",
    vbucks: "V-Bucks",
    gameCurrency: "Valuta di Gioco",
    discounts: "Sconti",
    bulkDeals: "Offte all'Ingrosso",
    contactWhatsApp: "Contatta WhatsApp",
    
    // Payments Section
    paymentMethods: "Metodi di Pagamento",
    creditCard: "Carta di Credito",
    debitCard: "Carta di Debito",
    mercadoPago: "Mercado Pago",
    daviPlata: "DaviPlata",
    nequi: "Nequi",
    yape: "Yape",
    pagoMovil: "Pago Móvil",
    cashApp: "Cash App",
    
    // Contact Section
    contactUs: "Contattaci",
    email: "📧 Email",
    phone: "📞 Telefono",
    address: "📍 Indirizzo",
    followUs: "Seguici",
    
    // General
    selectCurrency: "Seleziona Valuta:",
    visits: "Visite",
    whatsappMessage: "💬 Ciao! Hai bisogno di aiuto?",
    allRightsReserved: "Tutti i diritti riservati."
  },
  pt: {
    // Navegación
    home: "Início",
    products: "Produtos",
    payments: "Pagamentos",
    contact: "Contato",
    
    // Home Section
    welcome: "Bem-vindo à Fran V-Bucks",
    welcomeText: "Oferecemos o melhor serviço para que você possa obter tudo o que quiser da Loja de Itens do Fortnite. V-Bucks, Skins, Cosméticos, Passe de Batalha, Pacotes Promocionais e descontos em compras em quantidade. Siga-nos nas redes sociais e pergunte-nos qualquer coisa. Battle Royale!",
    userReviews: "Avaliações de Usuários",
    seeReviews: "Veja o que nossos clientes dizem. Deixe sua avaliação abaixo!",
    yourName: "Seu nome",
    shareExperience: "Compartilhe sua experiência...",
    rating: "Avaliação",
    submitReview: "Enviar Avaliação",
    
    // Products Section
    browseProducts: "🎮 Navegar Todos os Produtos 🎮",
    selectCategory: "Selecionar Categoria",
    close: "Fechar",
    fortniteCrew: "Fortnite Crew",
    monthlySubs: "Assinaturas Mensais",
    cosmeticsGift: "Presente de Cosméticos",
    skinsItems: "Skins e Itens",
    gamePass: "Game Pass",
    xboxSub: "Assinatura Xbox",
    exclusivePacks: "Pacotes Exclusivos",
    specialBundles: "Pacotes Especiais",
    vbucks: "V-Bucks",
    gameCurrency: "Moeda do Jogo",
    discounts: "Descontos",
    bulkDeals: "Ofertas em Quantidade",
    contactWhatsApp: "Contatar WhatsApp",
    
    // Payments Section
    paymentMethods: "Métodos de Pagamento",
    creditCard: "Cartão de Crédito",
    debitCard: "Cartão de Débito",
    mercadoPago: "Mercado Pago",
    daviPlata: "DaviPlata",
    nequi: "Nequi",
    yape: "Yape",
    pagoMovil: "Pago Móvil",
    cashApp: "Cash App",
    
    // Contact Section
    contactUs: "Contate-Nos",
    email: "📧 E-mail",
    phone: "📞 Telefone",
    address: "📍 Endereço",
    followUs: "Siga-Nos",
    
    // General
    selectCurrency: "Selecionar Moeda:",
    visits: "Visitas",
    whatsappMessage: "💬 Oi! Precisa de ajuda?",
    allRightsReserved: "Todos os direitos reservados."
  }
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
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = translations[currentLanguage as keyof typeof translations];

  // Datos de ejemplo para productos
  const productsData = {
    1: [
      {
        id: 1,
        name: t.fortniteCrew,
        image: "/img/products/fortnite-crew-1920x1080-26707a60b0b6.jpg",
        prices: [
          { label: "3 Months", price: 15 },
          { label: "4 Months", price: 18 },
          { label: "5 Months", price: 20 },
          { label: "6 Months", price: 23 }
        ]
      }
    ],
    2: [
      {
        id: 2,
        name: t.cosmeticsGift,
        image: "/img/products/Fortnite_blog_gifting-coming-to-battle-royale_BR06_News_Featured_Gifting-1920x1080-57a0e0e15467c65cac208679c6b5b558a8e6b626.jpg",
        prices: [
          { label: "From 100 V-Bucks", price: 0.70 }
        ]
      }
    ],
    3: [
      {
        id: 3,
        name: t.gamePass,
        image: "/img/products/9b4542b3-5163-4d00-8e41-6d3a5bcf3073.jpg",
        prices: [
          { label: "Price", price: 16.50 }
        ]
      }
    ],
    4: [
      {
        id: 4,
        name: "Simple Pack",
        image: "/img/products/simple-pack.jpg",
        prices: [
          { label: "Price", price: 22 }
        ]
      },
      {
        id: 5,
        name: "Exclusive Pack",
        image: "/img/products/exclusive-pack.jpg",
        prices: [
          { label: "Price", price: 22 }
        ]
      },
      {
        id: 6,
        name: "Pro Pack",
        image: "/img/products/pro-pack.jpg",
        prices: [
          { label: "Price", price: 33 }
        ]
      },
      {
        id: 7,
        name: "Super Pack",
        image: "/img/products/super-pack.jpg",
        prices: [
          { label: "Price", price: 50 }
        ]
      },
      {
        id: 8,
        name: "Mega Pack",
        image: "/img/products/mega-pack.jpg",
        prices: [
          { label: "Price", price: 80 }
        ]
      }
    ],
    5: [
      {
        id: 9,
        name: t.vbucks,
        image: "/img/products/fortnite-vbucks-1200x1200-1200x1200-8050abc986bf.png",
        prices: [
          { label: "3100V", price: 12 },
          { label: "5000V", price: 27 },
          { label: "13500V", price: 60 }
        ]
      }
    ],
    6: [
      {
        id: 10,
        name: t.discounts,
        image: "/img/products/discounts.jpg",
        prices: [
          { label: "Contact for bulk deals", price: 0 }
        ]
      }
    ]
  };

  // Datos del carrusel
  const carouselImages = [
    "/img/carrousel/wp11667091.png",
    "/img/carrousel/wp13492202.png",
    "/img/carrousel/wp14234288.png",
    "/img/carrousel/2020-11-02-image-23.webp"
  ];

  // Datos de comentarios iniciales
  const initialComments = [
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

  const [comments, setComments] = useState(initialComments);

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

    // Carrusel automático
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Cargar idioma preferido al iniciar
  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage && translations[preferredLanguage as keyof typeof translations]) {
      setCurrentLanguage(preferredLanguage);
    }
  }, []);

  // Funciones
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

    const newComment = {
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
          <button className="language-option" onClick={() => changeLanguage('fr')}>Français</button>
          <button className="language-option" onClick={() => changeLanguage('de')}>Deutsch</button>
          <button className="language-option" onClick={() => changeLanguage('it')}>Italiano</button>
          <button className="language-option" onClick={() => changeLanguage('pt')}>Português</button>
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
        <h1>Fran V-Bucks</h1>
      </header>

      <nav className="nav">
        <a onClick={() => showSection('home')}>{t.home}</a>
        <a onClick={() => showSection('products')}>{t.products}</a>
        <a onClick={() => showSection('payments')}>{t.payments}</a>
        <a onClick={() => showSection('contact')}>{t.contact}</a>
      </nav>

      {/* Selector de moneda */}
      <div className="currency-selector">
        <label htmlFor="currency">{t.selectCurrency}</label>
        <select 
          id="currency" 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
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
                    <img src="/img/products/fortnite-crew-1920x1080-26707a60b0b6.jpg" alt="Fortnite Crew" />
                    <h4>{t.fortniteCrew}</h4>
                    <p>{t.monthlySubs}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(2)}>
                    <img src="/img/products/Fortnite_blog_gifting-coming-to-battle-royale_BR06_News_Featured_Gifting-1920x1080-57a0e0e15467c65cac208679c6b5b558a8e6b626.jpg" alt="Cosmetics" />
                    <h4>{t.cosmeticsGift}</h4>
                    <p>{t.skinsItems}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(3)}>
                    <img src="/img/products/9b4542b3-5163-4d00-8e41-6d3a5bcf3073.jpg" alt="Game Pass" />
                    <h4>{t.gamePass}</h4>
                    <p>{t.xboxSub}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(4)}>
                    <img src="/img/products/sello-exclusivo-17012788.webp" alt="Exclusive Packs" />
                    <h4>{t.exclusivePacks}</h4>
                    <p>{t.specialBundles}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(5)}>
                    <img src="/img/products/fortnite-vbucks-1200x1200-1200x1200-8050abc986bf.png" alt="V-Bucks" />
                    <h4>{t.vbucks}</h4>
                    <p>{t.gameCurrency}</p>
                  </div>
                  <div className="category-card" onClick={() => showProductPage(6)}>
                    <img src="/img/products/discounts-grunge-stamp-in-english-language.jpg" alt="Discounts" />
                    <h4>{t.discounts}</h4>
                    <p>{t.bulkDeals}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Páginas de productos */}
          {activeProductPage && productsData[activeProductPage as keyof typeof productsData] && (
            <div className="products-grid">
              {productsData[activeProductPage as keyof typeof productsData].map((product) => (
                <div key={product.id} className="product">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-content">
                    <h3>{product.name}</h3>
                    <div className="multi-price">
                      {product.prices.map((price, index) => (
                        <p key={index} className="price" data-price={price.price}>
                          {price.label}: ${price.price}
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
            <a href="https://instagram.com/yourusername">📷 Instagram</a>
            <a href="https://facebook.com/yourusername">👥 Facebook</a>
            <a href="https://twitter.com/yourusername">🐦 Twitter</a>
            <a href="https://tiktok.com/yourusername">🎵 TikTok</a>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="visit-counter">
          <p>{t.visits}: <span>{visitCount}</span></p>
        </div>
        <p>&copy; 2025 Fran V-Bucks. {t.allRightsReserved}</p>
      </footer>
    </div>
  );
};

export default HomePage;