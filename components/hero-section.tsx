'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
    const ref = useRef(null);

    // Set up the scroll listener for the parallax effect
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Translate the background on the Y-axis at 50% the speed of the user's scroll
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section
            ref={ref}
            className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-white"
        >
            {/* 1. Parallax Ribbon Background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0 w-full h-[120%] opacity-15 pointer-events-none"
            >
                <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: "url('/wideribbon_rainbow.jpg')" }}
                />
            </motion.div>

            {/* 2. Foreground Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">

                {/* Left: Typography & CTAs */}
                <div className="flex-1 space-y-6">
                    <p className="uppercase tracking-widest text-xs font-bold text-[#df00c1]">
                        Digital Consulting Agency
                    </p>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#525252] leading-tight">
                        Architect systems for <br />
                        <span className="text-[#df00c1]">Human & AI</span> <br />
                        Collaboration
                    </h1>

                    <p className="text-lg text-[#525252] max-w-xl font-medium leading-relaxed">
                        We empower organizations through ethical AI governance, neuroinclusive design, and seamless strategic change management.
                    </p>

                    {/* Accessible High-Contrast Button */}
                    <div className="pt-4 flex justify-center lg:justify-start">
                        <button className="bg-[#df00c1] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-[0_4px_20px_rgba(223,0,193,0.4)] hover:-translate-y-1 focus:ring-4 focus:ring-[#df00c1]/50 focus:outline-none">
                            Explore Services →
                        </button>
                    </div>
                </div>

                {/* Right: Abstract Brand Visual (Replaces the Slideshow) */}
                <div className="flex-1 w-full flex justify-center lg:justify-end">
                    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border border-[#df00c1]/20 shadow-2xl bg-white/50 backdrop-blur-xl flex items-center justify-center">
                        <img
                            src="/cir_bright.jpg"
                            alt="Abstract representation of digital systems"
                            className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
