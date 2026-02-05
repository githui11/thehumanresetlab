"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Loader2 } from "lucide-react";

// Removed static import to prevent SSR issues
// import IntaSend from "intasend-inlinejs-sdk";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName: string;
    amount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    serviceName,
    amount,
}) => {
    const [email, setEmail] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const intasendRef = useRef<any>(null);

    // Helper to safely load and init the SDK
    const initSdk = async () => {
        if (intasendRef.current) return;

        try {
            // Dynamic import to ensure it only runs on client
            const IntaSendModule = (await import("intasend-inlinejs-sdk")).default;
            // @ts-ignore - Handle potential type mismatch in module resolution
            const IntaSendClass = IntaSendModule.default || IntaSendModule;

            const instance = new IntaSendClass({
                publicAPIKey: process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY || "ISPubKey_live_05b91e8e-ae8c-4bb3-bc50-0626164e58e5",
                live: true,
            });

            instance
                .on("COMPLETE", (results: any) => {
                    console.log("Payment Successful", results);
                    setIsProcessing(false);
                    onClose();
                    alert("Payment Successful! We will contact you shortly.");
                })
                .on("FAILED", (results: any) => {
                    console.log("Payment Failed", results);
                    setIsProcessing(false);
                    alert("Payment Failed. Please try again.");
                })
                .on("IN-PROGRESS", (results: any) => {
                    console.log("Payment in Progress", results);
                });

            intasendRef.current = instance;
        } catch (err) {
            console.error("Failed to load IntaSend SDK", err);
        }
    };

    // Initialize IntaSend Instance immediately when modal opens
    useEffect(() => {
        if (isOpen) {
            initSdk();
        }
    }, [isOpen]);

    const handlePay = async () => {
        if (!email) return;

        setIsProcessing(true);

        // Ensure SDK is ready
        if (!intasendRef.current) {
            await initSdk();
        }

        if (!intasendRef.current) {
            // Fallback retry loop
            let attempts = 0;
            while (!intasendRef.current && attempts < 10) {
                await new Promise(r => setTimeout(r, 200));
                attempts++;
            }
        }

        if (!intasendRef.current) {
            setIsProcessing(false);
            alert("Payment system could not load. Please check your connection.");
            return;
        }

        try {
            intasendRef.current.run({
                amount: amount,
                currency: "KES",
                email: email,
                api_ref: `service-${Date.now()}`,
                comment: `Payment for ${serviceName}`,
            });
        } catch (err) {
            console.error(err);
            setIsProcessing(false);
            alert("An error occurred starting payment.");
        }
    };

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setIsProcessing(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                    <h3 className="text-xl font-medium text-white">Confirm Booking</h3>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="space-y-1">
                        <p className="text-sm text-neutral-400">Service</p>
                        <p className="text-lg font-medium text-white">{serviceName}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-neutral-400">Amount</p>
                        <p className="text-2xl font-bold text-orange-500">KES {amount.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-neutral-300">Email Address (for receipt)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                        />
                    </div>

                    <button
                        onClick={handlePay}
                        disabled={!email || isProcessing}
                        className="w-full h-12 flex items-center justify-center bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={20} />
                                Processing...
                            </>
                        ) : (
                            `Pay KES ${amount.toLocaleString()}`
                        )}
                    </button>

                    <p className="text-xs text-center text-neutral-500">
                        Secured by IntaSend (M-Pesa & Card)
                    </p>
                </div>
            </div>
        </div>
    );
};
