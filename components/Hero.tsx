import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Background Image (no blur, no scale) */}
      <Image
        src="/images/Hero.png"       // keep your original; Next will serve AVIF/WebP if enabled
        alt="Hero background"
        fill                          // makes the image cover the section
        priority                      // only do this on your top hero/LCP image
        sizes="100vw"                 // tell the browser the image will occupy full viewport width
        quality={90}                  // good default; tweak if needed
        className="object-cover object-center select-none pointer-events-none"
        // Optional: show an instant placeholder
        // placeholder="blur"
        // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."  // tiny 1x1
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Example title block (uncomment and edit as needed) */}
        {/* <div className="inline-block border-2 border-white p-8 mb-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-2">
            ARCHITECTURE
          </h1>
          <p className="text-lg md:text-xl tracking-widest">
            AND DESIGN PORTFOLIO
          </p>
        </div>
        <div className="text-2xl md:text-3xl font-light tracking-widest">
          MMXXV
        </div> */}
      </div>
    </section>
  );
}
