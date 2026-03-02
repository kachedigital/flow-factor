'use client';

import { useState } from 'react';

export default function LeadCaptureSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // UX Logic: Block free tiers to ensure B2B lead quality
    const blockedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'outlook.com', 'icloud.com'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error state as soon as the user starts typing to fix their mistake
        if (error) setError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Extract the domain from the email input
        const emailDomain = formData.email.split('@')[1]?.toLowerCase();

        if (!emailDomain || blockedDomains.includes(emailDomain)) {
            setError('Please provide a valid corporate email address. Free domains are not accepted.');
            return;
        }

        // Pass validation, proceed to API submission
        setIsSubmitting(true);

        // Simulate API call for Senior Dev to wire up later
        setTimeout(() => {
            console.log('Lead Captured:', formData);
            setIsSubmitting(false);
            alert('Success state UI goes here.');
        }, 1500);
    };

    return (
        <section className="w-full py-24 bg-[#FAFAFA] relative z-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">

                {/* Left Column: High-Impact Copy */}
                <div className="flex-1 w-full space-y-6 text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#290747] tracking-tight leading-tight">
                        Ready to Future-Proof Your Organization?
                    </h2>
                    <p className="text-lg text-[#290747] font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Partner with Kache Digital to navigate AI integration, achieve global digital compliance, and scale your systems securely.
                    </p>
                    <div className="hidden lg:block pt-8">
                        <div className="w-24 h-1 bg-gradient-to-r from-[#FF8D55] via-[#df00c1] to-[#7e22ce] rounded-full" />
                    </div>
                </div>

                {/* Right Column: The Lead Capture Form */}
                <div className="flex-1 w-full max-w-lg">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 flex flex-col gap-6"
                        noValidate
                    >
                        {/* Name Field */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-bold text-[#290747] tracking-wide">
                                Full Name <span className="text-[#df00c1]">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 text-[#290747] transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#df00c1] focus:border-transparent"
                                placeholder="Jane Doe"
                            />
                        </div>

                        {/* Corporate Email Field with Custom Validation */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-bold text-[#290747] tracking-wide">
                                Corporate Email <span className="text-[#df00c1]">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                // Toggle red border if error exists
                                className={`w-full bg-[#FAFAFA] border ${error ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-[#290747] transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-[#df00c1]'} focus:border-transparent`}
                                placeholder="jane@yourcompany.com"
                                aria-invalid={error ? "true" : "false"}
                            />
                            {/* Accessible Error Announcement */}
                            <div aria-live="polite">
                                {error && (
                                    <p className="text-red-500 text-sm font-semibold mt-1">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Organization Field */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="company" className="text-sm font-bold text-[#290747] tracking-wide">
                                Organization <span className="text-[#df00c1]">*</span>
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 text-[#290747] transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#df00c1] focus:border-transparent"
                                placeholder="Company Name"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 w-full bg-[#290747] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-[#df00c1] hover:shadow-[0_4px_20px_rgba(223,0,193,0.3)] hover:-translate-y-1 focus:ring-4 focus:ring-[#df00c1]/50 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Processing...' : 'Request Consultation'}
                        </button>

                        <p className="text-center text-xs text-[#290747]/60 mt-2">
                            By submitting this form, you agree to our privacy policy.
                        </p>
                    </form>
                </div>

            </div>
        </section>
    );
}
