"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ShareButton({ title, slug }: { title: string; slug: string }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out "${title}" on Liberated & Happy!`,
                    url: url,
                });
                return;
            } catch (err) {
                console.log("Error sharing:", err);
            }
        }

        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleShare}
            className="flex items-center gap-2 hover:bg-muted/50 transition-colors"
        >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Copied Link!" : "Share"}
        </Button>
    );
}
