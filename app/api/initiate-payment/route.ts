import { NextResponse } from 'next/server';

// Initialize IntaSend
const IntaSend = require('intasend-node');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, email, phone_number, api_ref, comment } = body;

        const publishableKey = process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY;
        const secretKey = process.env.INTASEND_SECRET_KEY;

        if (!secretKey) {
            console.error("Missing INTASEND_SECRET_KEY in environment variables.");
            return NextResponse.json(
                { error: "Server configuration error: Missing Payment Secret Key" },
                { status: 500 }
            );
        }

        const intasend = new IntaSend(
            publishableKey,
            secretKey,
            false // Set to false for Live environment
        );

        const collection = intasend.collection();

        // Use M-Pesa STK Push directly
        const resp = await collection.mpesaStkPush({
            first_name: 'Guest',
            last_name: 'User',
            email: email,
            phone_number: phone_number,
            host: "https://thehumanresetlab.com",
            amount: amount,
            api_ref: api_ref,
        });

        console.log("IntaSend STK Push Response:", resp);

        return NextResponse.json(resp);

    } catch (err: any) {
        console.error("Payment Init Error:", err);
        const errorMessage = err.message || "Payment initiation failed";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
