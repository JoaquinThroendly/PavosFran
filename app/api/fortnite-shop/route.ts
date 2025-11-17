// app/api/fortnite-shop/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🚀 API Route: /api/fortnite-shop called');
  
  const API_KEY = 'a9966904-5bc4bb17-b9ec8bf6-0d9486df';
  const API_URL = 'https://fortniteapi.io/v2/shop?lang=es';

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
        statusText: response.statusText,
        error: errorText
      });
      
      return NextResponse.json(
        { 
          error: `Fortnite API error: ${response.status} ${response.statusText}`,
          details: 'Check API key and permissions'
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    console.log('✅ FortniteAPI.io success:', {
      result: data.result,
      itemsCount: data.shop?.length || 0
    });

    return NextResponse.json(data);

  } catch (error) {
    console.error('❌ Critical error in API route:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to connect to Fortnite API',
        message: error instanceof Error ? error.message : 'Unknown error',
        suggestion: 'Check internet connection and API key'
      },
      { status: 500 }
    );
  }
}