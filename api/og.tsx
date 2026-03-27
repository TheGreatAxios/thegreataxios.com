import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const logo = searchParams.get('logo') || ''
    const title = searchParams.get('title') || 'thegreataxios'
    const description = searchParams.get('description') || 'The personal blog of TheGreatAxios'
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: '40px',
          }}
        >
          {logo && (
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '12px',
                marginBottom: '24px',
              }}
            />
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#000',
                margin: '0 0 16px 0',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: '#666',
                margin: 0,
                maxWidth: '800px',
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
  }
}
