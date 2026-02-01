"use client"

import { CTASection } from "@/components/ui/hero-dithering-card";
import { blogPosts } from "@/lib/data";
import { BlogCard } from "@/components/ui/blog-card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30">

      {/* Hero Section */}
      <CTASection />

      {/* Mission Section */}
      <section className="relative z-10 py-20 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white/90">
            The Mission: Why we are here
          </h2>

          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>
              We are born into a world of "inherited" ideas. We are given masks to wear, scripts to follow, and roles to play before we even know who we are. Eventually, the friction becomes too much to ignore.
            </p>
            <p>
              <span className="text-white">The Human Reset Lab is a sanctuary for the unlearning.</span>
            </p>
            <p>
              I don't believe in "fixing" people; I believe in deconstructing the noise that covers the truth. By testing the wisdom of the giants—Sartre, Zizek, Lacan, and Aristotle—against the grit of our real-world mess, we find the courage to reclaim our own subjectivity.
            </p>
          </div>

          <blockquote className="border-l-2 border-orange-500/50 pl-6 py-2 italic text-neutral-300">
            "It is the mark of an educated mind to entertain a thought without accepting it." — Aristotle
          </blockquote>
        </div>
      </section>

      {/* Field Notes Section */}
      <section id="field-notes" className="relative z-10 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-border pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-2 tracking-tight">Latest Field Notes</h2>
              <p className="text-muted-foreground">Current Research and Observations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <BlogCard key={idx} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Workbench Section */}
      <section className="relative z-10 py-20 px-4 md:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">The Workbench: Work with the Lab</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              I am not a guru. I am a researcher. If you are currently navigating a "Reset" and need a thinking partner to help you deconstruct the noise, let's talk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logic Check */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 space-y-4">
              <h3 className="text-xl font-medium text-white">The Logic Check</h3>
              <p className="text-sm text-orange-500/80">30 Minutes</p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                A focused dive into a single existential knot or human friction.
              </p>
            </div>

            {/* Deep Reset */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 space-y-4">
              <h3 className="text-xl font-medium text-white">The Deep Reset</h3>
              <p className="text-sm text-orange-500/80">60 Minutes</p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                A collaborative deconstruction of the masks you are currently wearing to find the path forward.
              </p>
            </div>

            {/* Intellectual Partnership */}
            <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 space-y-4">
              <h3 className="text-xl font-medium text-white">Intellectual Partnership</h3>
              <p className="text-sm text-orange-500/80">Bespoke</p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Bespoke writing and thought-leadership for those who want to find the "Human Essence" in their brand or project.
              </p>
            </div>
          </div>

          <div className="text-center">
            <a href="#" className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-12 text-base font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-200 hover:scale-105 active:scale-95 hover:ring-4 hover:ring-white/20">
              <span>Enter the Lab / Book a Session</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/40 py-12 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Human Reset Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
