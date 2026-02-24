/** @type {import('next').NextConfig} */
const isCloudinary = process.env.NEXT_IMAGE_LOADER === 'cloudinary';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Static export for cPanel upload (/out folder)
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,

  images: isCloudinary
    ? {
        // --- OPTION B: Cloudinary loader (recommended for static export) ---
        // Turn on by setting: NEXT_IMAGE_LOADER=cloudinary in your env when you build
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/<your-cloud-name>/image/upload/',
        // Next will emit responsive URLs with width params (w=...), no Next server needed
        domains: ['dl.airtable.com'], // keep Airtable remote (used if you still have full URLs)
      }
    : {
        // --- OPTION A: No server-side optimization (current cPanel setup) ---
        unoptimized: true,               // required for next/image with static export
        domains: ['dl.airtable.com'],    // keep Airtable images allowed
        // If you also use a remote CDN for some images, add it here:
        // domains: ['dl.airtable.com', 'res.cloudinary.com', 'cdn.example.com'],
      },

  // NOTE: headers() only applies when Next serves the app.
  // For cPanel/Apache you must set caching in .htaccess (see below).
};

module.exports = nextConfig;
