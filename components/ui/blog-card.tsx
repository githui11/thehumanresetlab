import { BlogPost } from "@/lib/data";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl">
            <article className="group relative flex flex-col justify-between h-full bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-muted/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">

                <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground font-mono">
                        <span>{post.date}</span>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments?.length || 0}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-light text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>

                    {post.quote && (
                        <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground text-sm my-4">
                            {post.quote.substring(0, 100)}...
                        </blockquote>
                    )}

                    <p className="text-muted-foreground leading-relaxed font-light">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 pt-6 mt-auto">
                    <span className="flex items-center gap-2 text-primary transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                        Read Story <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </article>
        </Link>
    );
}
