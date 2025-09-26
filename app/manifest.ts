import type { MetadataRoute } from 'next';
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Axis Sales Pipeline',
    short_name: 'AxisPipeline',
    description: 'Sales pipeline management application',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/appstore.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
      {
        src: '/icons/playstore.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/screenshot1.png',
        sizes: '403x756',
        type: 'image/png',
      },
      {
        src: '/screenshots/screenshot2.png',
        sizes: '380x755',
        type: 'image/png',
      },
      {
        src: '/screenshots/screenshot3.png',
        sizes: '370x763',
        type: 'image/png',
      }
    ],
  }
}