// app/api/image-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  // Si es placeholder, devolver una imagen SVG por defecto
  if (imageUrl === 'placeholder') {
    const svg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#333"/>
        <text x="50%" y="50%" font-size="18" fill="#666" text-anchor="middle" dy=".3em">Fortnite Item</text>
      </svg>
    `;
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  if (!imageUrl) {
    return new NextResponse('URL parameter required', { status: 400 });
  }

  try {
    // Decodificar la URL
    const decodedUrl = decodeURIComponent(imageUrl);
    
    // Hacer la petición a la imagen original
    const response = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    // Obtener el buffer de la imagen
    const imageBuffer = await response.arrayBuffer();
    
    // Obtener el content type de la respuesta original
    const contentType = response.headers.get('content-type') || 'image/png';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache de 1 día
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    
    // Devolver imagen de error
    const errorSvg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#333"/>
        <text x="50%" y="50%" font-size="16" fill="#666" text-anchor="middle" dy=".3em">Error Loading Image</text>
      </svg>
    `;
    
    return new NextResponse(errorSvg, {
      status: 500,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300'
      }
    });
  }
}