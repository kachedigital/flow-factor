'use client';

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-[85vh] flex items-center bg-[#FAFAFA] overflow-hidden">

            {/* Main Content Container - Flex row on desktop, column on mobile */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-12">

                {/* Left Column: Typography Block */}
                <div className="flex-1 w-full max-w-2xl space-y-8 text-center lg:text-left">
                    <p className="uppercase tracking-widest text-xs font-bold text-[#df00c1]">
                        Digital Consulting Agency
                    </p>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.15]">
                        <span className="text-[#525252]">Architect systems for</span> <br />
                        <span className="bg-gradient-to-r from-[#FF8D55] via-[#df00c1] to-[#7e22ce] bg-clip-text text-transparent inline-block pb-1">
                            Human & AI
                        </span>
                        <br />
                        <span className="text-[#290747]">Collaboration</span>
                    </h1>

                    <p className="text-lg text-[#525252] font-medium leading-relaxed">
                        We empower organizations through ethical AI governance, neuroinclusive design, and seamless strategic change management.
                    </p>

                    <div className="pt-4 flex justify-center lg:justify-start">
                        <button className="bg-[#df00c1] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-[0_8px_25px_rgba(223,0,193,0.35)] hover:-translate-y-1 focus:ring-4 focus:ring-[#df00c1]/50 focus:outline-none">
                            Explore Services →
                        </button>
                    </div>
                </div>

                {/* Right Column: The pbg15 Graphic Asset */}
                <div className="flex-1 w-full flex justify-center lg:justify-end relative">
                    <img
                        src="/pbg15-transparent.png"
                        alt="Abstract digital wave visualization"
                        // Object-contain and max-widths ensure it never swallows the screen or text
                        className="w-full max-w-md lg:max-w-xl object-contain drop-shadow-2xl"
                    />
                </div>

            </div>
        </section>
    );
}
