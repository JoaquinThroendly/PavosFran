// app/api/fortnite-shop/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = 'a9966904-5bc4bb17-b9ec8bf6-0d9486df';
  const API_URL = 'https://fortniteapi.io/v2/shop?lang=es';

  try {
    console.log('🔄 Fetching Fortnite shop from backend...');
    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Fortnite shop data fetched successfully');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error fetching Fortnite shop:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Fortnite shop data' },
      { status: 500 }
    );
  }
}