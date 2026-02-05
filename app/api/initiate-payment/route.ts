import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, email, api_ref, comment } = body;

        const publicKey = process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY || "ISPubKey_live_05b91e8e-ae8c-4bb3-bc50-0626164e58e5";
        const live = true;

        // Construct payload as IntaSend SDK does, but on server
        const payload = {
            public_key: publicKey,
            amount: amount,
            email: email,
            currency: "KES",
            api_ref: api_ref,
            comment: comment,
            // Default / SDK specific fields
            version: "3.0.4", // Matching typical SDK version
            mode: "popup",
            is_mobile: false, // Server doesn't know, but we assume desktop/standard for checkout creation
            is_ios: false,
            host: "https://thehumanresetlab.com",
            callback_url: null
        };

        const requestURL = live
            ? "https://payment.intasend.com/api/v1/checkout/"
            : "https://sandbox.intasend.com/api/v1/checkout/";

        console.log("Initiating IntaSend Checkout:", { requestURL, email, amount });

        const response = await fetch(requestURL, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("IntaSend API Error:", response.status, errorText);
            return NextResponse.json({ error: `Payment Provider Error: ${errorText}` }, { status: response.status });
        }

        const data = await response.json();
        console.log("IntaSend Receipt:", data);

        return NextResponse.json({
            checkout_id: data.id,
            signature: data.signature,
            live: live
        });

    } catch (error: any) {
        console.error("Server Payment Init Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
