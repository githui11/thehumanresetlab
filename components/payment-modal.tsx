"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";

// Declare IntaSend on window
declare global {
    interface Window {
        IntaSend: any;
    }
}

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
    const [sdkLoaded, setSdkLoaded] = useState(false);

    // Reset state when modal opens and check for SDK
    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setIsProcessing(false);

            // Check if SDK is already loaded
            if (window.IntaSend) {
                setSdkLoaded(true);
            } else {
                // If not, poll for it
                const checkSdk = setInterval(() => {
                    if (window.IntaSend) {
                        setSdkLoaded(true);
                        clearInterval(checkSdk);
                    }
                }, 500);

                // Cleanup
                return () => clearInterval(checkSdk);
            }
        }
    }, [isOpen]);

    const handlePay = () => {
        if (!email || !window.IntaSend) return;

        setIsProcessing(true);

        try {
            // Initialize IntaSend
            const intasend = new window.IntaSend({
                // Production Key
                publicAPIKey: process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY || "ISPubKey_live_05b91e8e-ae8c-4bb3-bc50-0626164e58e5",
                live: true,
            });

            intasend
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

            intasend.run({
                amount: amount,
                currency: "KES",
                email: email,
                api_ref: `service-${Date.now()}`, // Unique reference
                comment: `Payment for ${serviceName}`,
            });
        } catch (err) {
            console.error(err);
            setIsProcessing(false);
            alert("An error occurred initializing payment.");
        }
    };

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
                        disabled={!email || isProcessing || !sdkLoaded}
                        className="w-full h-12 flex items-center justify-center bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={20} />
                                Processing...
                            </>
                        ) : !sdkLoaded ? (
                            "Loading Secure Payment..."
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
