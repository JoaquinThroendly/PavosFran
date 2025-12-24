// app/api/fortnite-shop/route.ts
import { NextResponse } from 'next/server';

// API Key de FortniteAPI.io - Obtén una gratis en: https://fortniteapi.io/
const FORTNITE_API_KEY = process.env.FORTNITE_API_KEY || '';

export async function GET() {
  try {
    console.log('🔄 Solicitando tienda de Fortnite...');
    
    // Si no hay API Key, usar datos de demostración
    if (!FORTNITE_API_KEY) {
      console.warn('⚠️ Sin API Key - Usando datos demo');
      return NextResponse.json(generateDemoData());
    }
    
    // Hacer petición a la API real
    const response = await fetch('https://fortniteapi.io/v2/shop?lang=es', {
      method: 'GET',
      headers: {
        'Authorization': FORTNITE_API_KEY,
      },
      next: { revalidate: 3600 } // Cache por 1 hora
    });
    
    if (!response.ok) {
      console.error(`❌ Error API: ${response.status}`);
      return NextResponse.json(generateDemoData());
    }
    
    const data = await response.json();
    console.log(`✅ API responded with ${data.data?.shop?.length || 0} items`);
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('🔥 Error fetching shop:', error);
    return NextResponse.json(generateDemoData());
  }
}

// Datos de demostración cuando no hay API Key
function generateDemoData() {
  const items = [];
  
  // Generar 40 items de ejemplo
  for (let i = 1; i <= 40; i++) {
    const rarities = [
      { value: 'common', display: 'Común', color: '#888888' },
      { value: 'uncommon', display: 'Poco Común', color: '#00a8ff' },
      { value: 'rare', display: 'Raro', color: '#9b59b6' },
      { value: 'epic', display: 'Épico', color: '#e74c3c' },
      { value: 'legendary', display: 'Legendario', color: '#f39c12' }
    ];
    
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const price = [500, 800, 1200, 1500, 2000][Math.floor(Math.random() * 5)];
    
    items.push({
      id: `demo-item-${i}`,
      name: `Skin de Prueba ${i}`,
      description: `Esta es una skin de demostración número ${i}`,
      price: price,
      rarity: {
        value: rarity.value,
        displayValue: rarity.display,
        backendValue: rarity.value.toUpperCase()
      },
      images: {
        icon: `https://picsum.photos/150/150?random=${i}`,
        featured: `https://picsum.photos/400/200?random=${i + 100}`
      },
      type: {
        value: 'outfit',
        displayValue: 'Skin',
        backendValue: 'AthenaCharacter'
      }
    });
  }
  
  return {
    result: true,
    lastUpdate: new Date().toISOString(),
    data: {
      shop: items.slice(0, 30),
      featured: items.slice(0, 10),
      daily: items.slice(10, 20)
    }
  };
}