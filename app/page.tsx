"use client"

import { CTASection } from "@/components/ui/hero-dithering-card";
import { blogPosts } from "@/lib/data";
import { BlogCard } from "@/components/ui/blog-card";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30">

      {/* Hero Section */}
      <CTASection />

      {/* Content Section */}
      <section id="latest-stories" className="relative z-10 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-border pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-2 tracking-tight">Latest Stories</h2>
              <p className="text-muted-foreground">Musings on life, womanhood, and happiness.</p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <BlogCard key={idx} post={post} />
            ))}
          </div>

          <div className="max-w-xl mx-auto text-center space-y-4 pt-10">
            <h3 className="text-xl font-medium">Join the conversation</h3>
            <p className="text-muted-foreground text-sm">Follow @tunza.dada on Instagram to put a smile on a girl out there ❤️</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/40 py-12 text-center text-muted-foreground text-sm">
        <p>© 2022 Liberated & Happy. All rights reserved.</p>
      </footer>
    </div>
  );
}
