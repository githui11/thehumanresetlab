"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Loader2 } from "lucide-react";

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

    // Refs for safe state access
    const intasendRef = useRef<any>(null);
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);

    // Helper to safely load the SDK
    const loadSdk = async () => {
        if (intasendRef.current) return;
        try {
            // Dynamic import
            const IntaSendModule = (await import("intasend-inlinejs-sdk") as any).default;
            // @ts-ignore
            const IntaSendClass = IntaSendModule.default || IntaSendModule;

            // Initialize empty just to permit usage of .continue()
            const instance = new IntaSendClass({
                publicAPIKey: process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY || "ISPubKey_live_05b91e8e-ae8c-4bb3-bc50-0626164e58e5",
                live: true,
            });

            // Bind events
            instance
                .on("COMPLETE", (results: any) => {
                    if (isMountedRef.current) {
                        setIsProcessing(false);
                        onClose();
                        alert("Payment Successful! We will contact you shortly.");
                    }
                })
                .on("FAILED", (results: any) => {
                    if (isMountedRef.current) {
                        setIsProcessing(false);
                        alert("Payment Failed. Please try again.");
                    }
                })
                .on("IN-PROGRESS", (results: any) => {
                    console.log("Payment in Progress", results);
                });

            intasendRef.current = instance;
        } catch (err) {
            console.error("Failed to load IntaSend SDK", err);
        }
    };

    // Pre-load SDK on mount
    useEffect(() => {
        if (isOpen) {
            loadSdk();
        } else {
            setIsProcessing(false);
        }
    }, [isOpen]);

    const handlePay = async () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        setIsProcessing(true);

        // 1. Ensure SDK Class is loaded
        if (!intasendRef.current) {
            await loadSdk();
        }
        if (!intasendRef.current) {
            setIsProcessing(false);
            alert("Could not load payment buttons. Check connection.");
            return;
        }

        try {
            // 2. Server-Side Initialization (Reliable)
            const res = await fetch('/api/initiate-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    email,
                    api_ref: `service-${Date.now()}`,
                    comment: `Payment for ${serviceName}`
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to initiate payment");
            }

            const { checkout_id, signature, live } = await res.json();

            // 3. Handover to SDK for display
            console.log("Opening Payment Modal via SDK continue...");
            intasendRef.current.continue({
                checkoutID: checkout_id,
                signature: signature,
                live: live
            });

        } catch (err: any) {
            console.error("Payment Init Error:", err);
            setIsProcessing(false);
            alert(`Error: ${err.message}`);
        }
    };

    const handleCancel = () => {
        setIsProcessing(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                    <h3 className="text-xl font-medium text-white">Confirm Booking</h3>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors"
                        disabled={isProcessing}
                    >
                        <X size={24} />
                    </button>
                </div>

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
                            disabled={isProcessing}
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
                        />
                    </div>

                    <div className="flex gap-3">
                        {isProcessing && (
                            <button
                                onClick={handleCancel}
                                className="w-1/3 h-12 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                        )}

                        <button
                            onClick={handlePay}
                            disabled={!email || isProcessing}
                            className={`flex-1 h-12 flex items-center justify-center bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all`}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Starting...
                                </>
                            ) : (
                                `Pay KES ${amount.toLocaleString()}`
                            )}
                        </button>
                    </div>

                    <p className="text-xs text-center text-neutral-500">
                        Secured by IntaSend (M-Pesa & Card)
                    </p>
                </div>
            </div>
        </div>
    );
};
