import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Human Reset Lab",
  description: "Privacy policy for Human Reset Lab",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-8">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back
        </Link>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">What this site is</h2>
            <p>
              Human Reset Lab is a blog and reading platform. There is no required account to
              read content. Certain features (like saving likes) use your browser&apos;s local
              storage — data that stays on your device and is never sent to any server.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">Data we collect</h2>
            <p>
              This site does not use analytics, advertising pixels, or third-party tracking
              scripts. No cookies are set for tracking purposes.
            </p>
            <p className="mt-3">
              <strong className="text-foreground">Local storage:</strong> When you like a post,
              a flag is saved in your browser&apos;s local storage so the button reflects your
              choice on return visits. This data never leaves your device.
            </p>
            <p className="mt-3">
              <strong className="text-foreground">Contact / comments:</strong> If you submit a
              comment or contact form, the information you provide is used solely to display
              your comment or respond to your message. It is not sold or shared with third
              parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">Third-party services</h2>
            <p>
              The site is hosted on Vercel, which may collect standard server logs (IP address,
              browser, pages visited) for infrastructure purposes. See{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                Vercel&apos;s Privacy Policy
              </a>
              .
            </p>
            <p className="mt-3">
              Fonts are loaded from Google Fonts. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">Your rights</h2>
            <p>
              You can clear your local storage at any time through your browser settings to
              remove any data stored by this site. For any other data requests, contact{" "}
              <a
                href="mailto:githuimaina11@gmail.com"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                githuimaina11@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground">Changes</h2>
            <p>
              If this policy changes materially, the &ldquo;last updated&rdquo; date above will
              be revised.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
