'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Team() {
  return (
    <section id="team" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 lg:px-16">
        {/* MEET OUR TEAM */}
        <h2
          className="text-center font-bold tracking-wide mb-12 md:mb-16"
          style={{ color: '#8b6b52', fontSize: 'clamp(28px, 4.2vw, 48px)' }}
        >
          MEET OUR TEAM
        </h2>

        {/* Top profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20 md:mb-24 justify-items-center">
          <div className="w-full max-w-md flex flex-col items-center text-center">
            <div className="w-full bg-white flex items-center justify-center h-[420px] sm:h-[480px] md:h-[560px] rounded-sm relative">
              <Image
                src="/images/victor.png"
                alt="Victor Owusu-Sekyere"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain"
                loading="lazy"
              />
            </div>

            <h3 className="font-bold text-lg mt-6">
              Victor Owusu-Sekyere, <span className="font-semibold">AGIA</span>
            </h3>
            <p className="text-[#8b6b52] text-sm font-medium">
              Managing Partner | <span className="font-semibold">Creative Director</span>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Chartered Architect: Ghana Institute of Architects | M. Arch. | B. Arch.
            </p>

            <EmailLink email="vic@designdepartment.work" className="mt-1" />
          </div>

          <div className="w-full max-w-md flex flex-col items-center text-center">
            <div className="w-full bg-white flex items-center justify-center h-[420px] sm:h-[480px] md:h-[560px] rounded-sm relative">
              <Image
                src="/images/kofi.jpeg"
                alt="Kofi Dako"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain"
                loading="lazy"
              />
            </div>

            <h3 className="font-bold text-lg mt-6">
              Kofi Dako, <span className="font-semibold">PMP®</span>
            </h3>
            <p className="text-[#8b6b52] text-sm font-medium">
              Managing Partner | <span className="font-semibold">Strategic Lead</span>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              PMP® Certified Project Management Professional | B. Arch.
            </p>

            <EmailLink email="kofi@designdepartment.work" className="mt-1" />
          </div>
        </div>

        {/* DEPARTMENT HEADS */}
        <h3
          className="text-center font-semibold mb-6"
          style={{ color: '#8b6b52', fontSize: 'clamp(20px, 2.4vw, 28px)' }}
        >
          Department Heads
        </h3>

        {/* shifted right on md+ (padding + translate) */}
        <div className="mx-auto max-w-6xl md:pl-12 lg:pl-24 xl:pl-40 md:translate-x-2 lg:translate-x-4 xl:translate-x-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* 1 */}
            <div className="flex items-start gap-3">
              <Image src="/images/architect.png" alt="Design Studio" width={40} height={40} className="shrink-0" loading="lazy" />
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight">Vincent Hammond</p>
                <p className="text-[#8b6b52] text-sm leading-tight">Design Studio</p>
                <p className="text-sm text-gray-600 leading-tight">Architect</p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-start gap-3">
              <Image src="/images/chip.png" alt="Information Technology" width={40} height={40} className="shrink-0" loading="lazy" />
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight">Eugene Osei-Adjapong</p>
                <p className="text-[#8b6b52] text-sm leading-tight">Information Technology</p>
                <p className="text-sm text-gray-600 leading-tight">Chief Technology Officer</p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex items-start gap-3">
              <Image src="/images/cost.jpg" alt="Cost Management" width={40} height={40} className="shrink-0" loading="lazy" />
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight">Philip Opare</p>
                <p className="text-[#8b6b52] text-sm leading-tight">Cost Management & Procurement Dept.</p>
                <p className="text-sm text-gray-600 leading-tight">
                  Quantity Surveyor | Cost Consultant | PMP
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex items-start gap-3">
              <Image src="/images/book.png" alt="Civil & Structural" width={40} height={40} className="shrink-0" loading="lazy" />
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight">Daniel Sam</p>
                <p className="text-[#8b6b52] text-sm leading-tight">Civil & Structural Engineering Dept.</p>
                <p className="text-sm text-gray-600 leading-tight">Structural Engineer</p>
              </div>
            </div>

            {/* 5 */}
            <div className="flex items-start gap-3">
              <Image src="/images/electrical.png" alt="Electrical Engineering" width={40} height={40} className="shrink-0" loading="lazy" />
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight">Alexander Nartey</p>
                <p className="text-[#8b6b52] text-sm leading-tight">
                  Electrical Engineering & Automation Dept.
                </p>
                <p className="text-sm text-gray-600 leading-tight">Electrical Engineer</p>
              </div>
            </div>

            {/* 6 */}
            <div className="flex items-start gap-3">
              <Image src="/images/gears.png" alt="Mechanical Engineering" width={40} height={40} className="shrink-0" loading="lazy" />
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight">Richmond Akoliga</p>
                <p className="text-[#8b6b52] text-sm leading-tight">Mechanical Engineering Dept.</p>
                <p className="text-sm text-gray-600 leading-tight">Mechanical Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>{/* container */}
    </section>
  );
}

/* Email link with copy */
function EmailLink({ email, className = '' }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <a href={`mailto:${email}`} className="text-gray-600 text-sm hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${email} to clipboard`}
        className="text-xs px-2 py-1 rounded border border-[#8b6b52]/30 text-[#8b6b52] hover:bg-[#8b6b52]/10 transition"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
