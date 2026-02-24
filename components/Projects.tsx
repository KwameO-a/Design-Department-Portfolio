'use client';

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl font-bold mb-8 tracking-wide"
          style={{ color: '#8b6b52' }}
        >
          OUR SERVICES
        </h2>
      </div>

      {/* Slight responsive nudge so the vertical rules + rag-left text look optically centered */}
      <div className="mx-auto max-w-6xl md:pl-8 lg:pl-16 xl:pl-28 md:translate-x-1 lg:translate-x-2 xl:translate-x-4">
        {/* Two-column list with vertical bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column */}
          <div className="relative pl-6 md:pl-8 space-y-10">
            {/* vertical rule */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-[3px] bg-[#C9A98F] rounded-full"
            />
            <Service
              title="Architectural Design"
              desc="Concept design, design development and sketch design documentation."
            />
            <Service
              title="Design Management"
              desc="Technical support and training to design firms and developers."
            />
          </div>

          {/* Right column */}
          <div className="relative pl-6 md:pl-8 space-y-10">
            {/* vertical rule */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-[3px] bg-[#C9A98F] rounded-full"
            />
            <Service
              title="Construction Documentation"
              desc="Detailed drawings and specifications for construction."
            />
            <Service
              title="Contract Administration and Site Supervision"
              desc="Oversight during construction to ensure design compliance."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Service({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="text-sm md:text-base font-semibold text-gray-900">
        {title}
      </h3>
      <p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-600 max-w-prose">
        {desc}
      </p>
    </div>
  );
}
