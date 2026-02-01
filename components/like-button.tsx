"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LikeButton({ slug }: { slug: string }) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const isLiked = localStorage.getItem(`liked-${slug}`);
        if (isLiked) setLiked(true);
        setCount(Math.floor(Math.random() * 50) + 10);
    }, [slug]);

    const handleLike = () => {
        if (liked) {
            localStorage.removeItem(`liked-${slug}`);
            setCount(c => c - 1);
        } else {
            localStorage.setItem(`liked-${slug}`, "true");
            setCount(c => c + 1);
        }
        setLiked(!liked);
    };

    return (
        <Button
            variant="ghost"
            onClick={handleLike}
            className={cn(
                "flex items-center gap-2 hover:bg-muted/50 transition-colors pl-0 hover:pl-2",
                liked && "text-primary"
            )}
        >
            <Heart className={cn("w-4 h-4", liked && "fill-current")} />
            {liked ? "Liked" : "Like"} <span className="text-xs text-muted-foreground">({count})</span>
        </Button>
    );
}
