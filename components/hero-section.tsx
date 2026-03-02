'use client';

import { motion } from 'framer-motion';

export default function RefinedHero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center bg-[#FAFAFA] overflow-hidden">

            {/* THE 3D ASSET: Anchor & Scale Fix
        SENIOR: This MUST be the transparent PNG, not the raw JPG!
      */}
            <motion.div
                animate={{
                    y: ["-3%", "3%", "-3%"], // Slow breathing float
                }}
                transition={{
                    duration: 15, // Slow, buttery smooth
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                // Positioned absolutely on the right to anchor, not overwhelm.
                className="absolute right-[-15%] md:right-[-10%] top-[10%] z-0 w-[140%] md:w-[75vw] pointer-events-none drop-shadow-3xl"
            >
                <img
                    src="/3d-ribbon-transparent.png" // Asset Image 36
                    alt="Abstract 3D digital agency asset"
                    // Set to high opacity on desktop, subtle watermark on mobile
                    className="w-full h-auto object-contain opacity-20 md:opacity-100"
                />
            </motion.div>

            {/* FOREGROUND CONTENT: The Editorial Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col justify-center">

                {/* Typographic Blocks in a Frosted Shield for WCAG compliance */}
                <div className="max-w-3xl space-y-8 text-center md:text-left mx-auto md:mx-0 bg-[#FAFAFA]/40 md:bg-transparent backdrop-blur-3xl md:backdrop-blur-none p-6 md:p-0 rounded-3xl">

                    <p className="uppercase tracking-widest text-xs font-bold text-[#df00c1]">
                        Digital Consulting Agency
                    </p>

                    {/* THE BREAKDOWN (Micro-Flex implementation) */}
                    <div className="flex flex-col space-y-3 font-extrabold tracking-tighter leading-tight">
                        <h1 className="text-4xl md:text-6xl text-[#161616]">
                            The web is changing. We make sure your business stays ahead of it.
                        </h1>
                    </div>

                    <p className="text-lg text-[#161616] max-w-xl font-medium leading-relaxed">
                        From mandatory accessibility laws to the AI shift, we handle the technical side so you can just run your company.
                    </p>

                    <div className="pt-4 flex justify-center md:justify-start">
                        <a href="#services" className="inline-block bg-[#df00c1] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-[0_8px_25px_rgba(223,0,193,0.35)] hover:-translate-y-1 focus:ring-4 focus:ring-[#df00c1]/50 focus:outline-none">
                            See How We Can Help ↓
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
