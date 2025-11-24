// app/api/fortnite-shop/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🚀 API Route: /api/fortnite-shop called');
  
  // Usar variable de entorno en lugar de la key directa
  const API_KEY = process.env.FORTNITE_API_KEY;
  const API_URL = 'https://fortniteapi.io/v2/shop?lang=es';

  // Verificar que la API key esté configurada
  if (!API_KEY) {
    console.error('❌ FORTNITE_API_KEY no está configurada');
    return NextResponse.json(
      { 
        error: 'API key no configurada',
        details: 'Configura FORTNITE_API_KEY en Vercel'
      },
      { status: 500 }
    );
  }

  try {
    console.log('🔄 Making request to FortniteAPI.io...');
    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': API_KEY,
        'Accept': 'application/json',
      },
    });

    console.log(`📡 FortniteAPI.io response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ FortniteAPI.io error:', {
        status: response.status,
        statusText: response.statusText
      });
      
      return NextResponse.json(
        { 
          error: `Fortnite API error: ${response.status}`,
          details: 'Check API key in Vercel'
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('✅ FortniteAPI.io success');

    return NextResponse.json(data);

  } catch (error) {
    console.error('❌ Critical error in API route:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to connect to Fortnite API',
        message: 'Check internet connection and API key'
      },
      { status: 500 }
    );
  }
}