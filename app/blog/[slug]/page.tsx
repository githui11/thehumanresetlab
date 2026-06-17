import { blogPosts } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import nextDynamic from 'next/dynamic';

const LikeButton = nextDynamic(() => import("@/components/like-button").then(mod => mod.LikeButton));
const ShareButton = nextDynamic(() => import("@/components/share-button").then(mod => mod.ShareButton));
const CommentSection = nextDynamic(() => import("@/components/comment-section").then(mod => mod.CommentSection));

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const postIndex = blogPosts.findIndex((p) => p.slug === slug);
    const post = blogPosts[postIndex];

    if (!post) {
        notFound();
    }

    const previousPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
    const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

    return (
        <article className="min-h-screen bg-background text-foreground selection:bg-primary/30 pb-20">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        href="/field-notes"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/70 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Field Notes
                    </Link>
                    <span className="font-mono text-xs text-muted-foreground hidden sm:block">Human Reset Lab</span>
                </div>
            </nav>

            {/* Header */}
            <header className="pt-32 pb-12 px-4 max-w-4xl mx-auto text-center space-y-6">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    {post.observationNumber && (
                        <>
                            <span className="text-orange-500">Observation #{post.observationNumber}</span>
                            <span>•</span>
                        </>
                    )}
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {post.comments?.length || 0} Comments</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                            #{tag}
                        </span>
                    ))}
                </div>
            </header>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 space-y-8 leading-relaxed text-lg font-light text-muted-foreground" data-cms-content="essay">
                {post.quote && (
                    <div className="relative my-12 p-8 bg-card/50 rounded-2xl border border-border">
                        <div className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">“</div>
                        <p className="italic text-xl text-foreground/90 relative z-10 font-serif">
                            {post.quote}
                        </p>
                    </div>
                )}

                {post.content.map((paragraph, index) => (
                    <p key={index} className={index === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-primary" : ""}>
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* Footer / Actions */}
            <div className="max-w-3xl mx-auto mt-20 px-6 pt-10 border-t border-border">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <LikeButton slug={post.slug} />
                    <div className="flex gap-4">
                        <ShareButton title={post.title} slug={post.slug} />
                    </div>
                </div>

                {/* Comments Section */}
                <CommentSection initialComments={post.comments} />
            </div>

            {/* Prev / Next Observation Navigation */}
            <div className="max-w-3xl mx-auto mt-12 px-6 pt-10 border-t border-border space-y-8">
                {(previousPost || nextPost) && (
                    <div className={`grid gap-4 ${previousPost && nextPost ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                        {previousPost && (
                            <Link
                                href={`/blog/${previousPost.slug}`}
                                className="group flex items-center gap-3 rounded-2xl border border-border bg-card/30 p-5 hover:bg-card/60 hover:border-primary/40 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4 text-primary shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Previous</p>
                                    <p className="text-foreground group-hover:text-primary transition-colors font-medium truncate">{previousPost.title}</p>
                                </div>
                            </Link>
                        )}

                        {nextPost && (
                            <Link
                                href={`/blog/${nextPost.slug}`}
                                className="group flex items-center gap-3 rounded-2xl border border-border bg-card/30 p-5 hover:bg-card/60 hover:border-primary/40 transition-all sm:flex-row-reverse sm:text-right"
                            >
                                <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Next</p>
                                    <p className="text-foreground group-hover:text-primary transition-colors font-medium truncate">{nextPost.title}</p>
                                </div>
                            </Link>
                        )}
                    </div>
                )}

                <div className="text-center">
                    <Link
                        href="/field-notes"
                        className="text-sm text-primary hover:text-primary/70 transition-colors"
                    >
                        View all Field Notes
                    </Link>
                </div>
            </div>
        </article >
    );
}
