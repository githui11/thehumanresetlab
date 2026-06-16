import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { BlogCard } from "@/components/ui/blog-card";

export const metadata = {
  title: "Field Notes | Human Reset Lab",
  description: "Current research and observations from the Human Reset Lab.",
};

export default function FieldNotesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="font-mono text-xs text-muted-foreground hidden sm:block">Human Reset Lab</span>
        </div>
      </nav>

      <section className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-2 mb-12 border-b border-border pb-8">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Field Notes</h1>
            <p className="text-muted-foreground">Current Research and Observations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <BlogCard key={idx} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
