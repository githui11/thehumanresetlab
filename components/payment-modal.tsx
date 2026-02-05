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

    useEffect(() => {
        if (!isOpen) {
            setIsProcessing(false);
        }
    }, [isOpen]);

    const handlePay = async () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        setIsProcessing(true);

        try {
            // Server-Side Initialization to get Checkout Link
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

            const { url } = await res.json();

            if (url) {
                // Redirect user to IntaSend Checkout Linked
                window.location.href = url;
            } else {
                throw new Error("No payment URL returned from server");
            }

        } catch (err: any) {
            console.error("Payment Init Error:", err);
            setIsProcessing(false);
            alert(`Error: ${err.message}`);
        }
    };

    const handleCancel = () => {
        setIsProcessing(false);
        onClose(); // Also close modal on cancel if desired, or just stop processing
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
                        <button
                            onClick={handleCancel}
                            disabled={isProcessing}
                            className="w-1/3 h-12 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-all"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handlePay}
                            disabled={!email || isProcessing}
                            className={`flex-1 h-12 flex items-center justify-center bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all`}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Redirecting...
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
