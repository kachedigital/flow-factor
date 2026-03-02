'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComplianceSlideIn() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger after 5 seconds
        const timer = setTimeout(() => {
            // Check session storage so we don't annoy returning users
            const hasSeenModal = sessionStorage.getItem('kache_compliance_seen');
            if (!hasSeenModal) {
                setIsVisible(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('kache_compliance_seen', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100, y: 50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-6 right-6 z-[200] w-[90%] max-w-sm bg-white border border-gray-200 shadow-2xl rounded-2xl p-6"
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                >
                    {/* Accessible Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-[#df00c1] focus:outline-none focus:ring-2 focus:ring-[#df00c1] rounded-full p-1 transition-colors"
                        aria-label="Close notification"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex items-start gap-4">
                        {/* Shield Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#FF8D55]/20 to-[#df00c1]/20 rounded-full flex items-center justify-center text-[#df00c1]">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>

                        <div>
                            <h3 id="modal-title" className="text-[#290747] font-bold text-lg leading-tight mb-2">
                                Did you know? New web compliance rules are active for 2026.
                            </h3>
                            <p id="modal-desc" className="text-[#290747] text-sm leading-relaxed mb-4">
                                The DOJ has updated the standards for how small businesses show up online. We’re helping our partners navigate these changes to ensure their digital storefronts stay accessible and compliant.
                            </p>
                            <a
                                href="#compliance"
                                onClick={handleClose}
                                className="inline-block text-sm font-bold text-[#df00c1] hover:text-[#290747] transition-colors focus:outline-none focus:underline"
                            >
                                Check My Compliance Status →
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
