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
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setIsProcessing(false);
            setPaymentStatus('idle');
            setMessage("");
            setEmail("");
            setPhoneNumber("");
        }
    }, [isOpen]);

    const handlePay = async () => {
        if (!email || !phoneNumber) {
            alert("Please enter both email address and phone number.");
            return;
        }

        setIsProcessing(true);
        setPaymentStatus('processing');
        setMessage("Initiating request...");

        try {
            // Server-Side Initialization to get Checkout Link
            const res = await fetch('/api/initiate-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    email,
                    phone_number: phoneNumber,
                    api_ref: `service-${Date.now()}`,
                    comment: `Payment for ${serviceName}`
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to initiate payment");
            }

            const data = await res.json();

            setPaymentStatus('success');
            setMessage("Request sent! Please check your phone to complete payment.");
            setIsProcessing(false);

        } catch (err: any) {
            console.error("Payment Init Error:", err);
            setIsProcessing(false);
            setPaymentStatus('error');
            setMessage(`Error: ${err.message}`);
        }
    };

    const handleCancel = () => {
        setIsProcessing(false);
        onClose();
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
                    {paymentStatus === 'success' ? (
                        <div className="text-center space-y-4 py-8">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-3xl">📱</span>
                            </div>
                            <h4 className="text-xl font-medium text-white">Check Your Phone</h4>
                            <p className="text-neutral-400 max-w-xs mx-auto">
                                An M-Pesa payment request has been sent to <strong>{phoneNumber}</strong>.
                            </p>
                            <p className="text-sm text-neutral-500">
                                Once you complete the payment, you will receive a confirmation email.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-4 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-1">
                                <p className="text-sm text-neutral-400">Service</p>
                                <p className="text-lg font-medium text-white">{serviceName}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-neutral-400">Amount</p>
                                <p className="text-2xl font-bold text-orange-500">KES {amount.toLocaleString()}</p>
                            </div>

                            <div className="space-y-4">
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
                                <div className="space-y-2">
                                    <label className="text-sm text-neutral-300">M-Pesa Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="e.g 254712345678"
                                        disabled={isProcessing}
                                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            {message && paymentStatus === 'error' && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
                                    {message}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={handleCancel}
                                    disabled={isProcessing}
                                    className="w-1/3 h-12 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-all"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handlePay}
                                    disabled={!email || !phoneNumber || isProcessing}
                                    className={`flex-1 h-12 flex items-center justify-center bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all`}
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
                            </div>

                            <p className="text-xs text-center text-neutral-500">
                                Secured by IntaSend (M-Pesa)
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
