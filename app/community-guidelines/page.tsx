import { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Community Guidelines - BumpSetCut",
  description:
    "Community Guidelines for BumpSetCut. Learn about our expectations for community behavior and content.",
};

export default function CommunityGuidelinesPage() {
  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-secondary mb-2">
              Community Guidelines
            </h1>
            <p className="text-sm text-foreground-muted mb-8">
              Last Updated: February 11, 2025
            </p>
            <p className="text-foreground-muted leading-relaxed mb-8">
              BumpSetCut is a community built around the love of volleyball. Our
              guidelines exist to ensure everyone has a positive, safe, and
              enjoyable experience. By using BumpSetCut, you agree to follow
              these guidelines.
            </p>

            {/* Be Respectful */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              Be Respectful
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              Treat every member of the BumpSetCut community with respect and
              courtesy. We are all here because we love volleyball, and our
              community thrives when everyone feels welcome.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Be kind and constructive in your comments and interactions
              </li>
              <li>
                Do not harass, bully, threaten, or intimidate other users
              </li>
              <li>
                Do not use hate speech, slurs, or discriminatory language based
                on race, ethnicity, gender, sexual orientation, religion,
                disability, or any other protected characteristic
              </li>
              <li>
                Respect others&apos; opinions, skill levels, and playing styles
              </li>
              <li>
                Do not post personal information about others without their
                consent
              </li>
              <li>
                Avoid excessive arguing or creating hostile environments in
                comment sections
              </li>
            </ul>

            {/* Create Appropriate Content */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              Create Appropriate Content
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              BumpSetCut is designed for sharing volleyball highlights. Keep your
              content relevant, family-friendly, and appropriate for our
              community (rated 12+).
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Share volleyball-related content: matches, practices, drills,
                and highlights
              </li>
              <li>
                Do not post nudity, sexual content, or graphic violence
              </li>
              <li>
                Do not upload content promoting illegal activities or dangerous
                behavior
              </li>
              <li>
                Do not share misleading or deceptive content
              </li>
              <li>
                Do not post spam, repetitive content, or unsolicited
                advertisements
              </li>
              <li>
                Ensure you have the right to share any content you post,
                including footage of other players
              </li>
              <li>
                Respect copyright and intellectual property rights
              </li>
            </ul>

            {/* Follow the Rules */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              Follow the Rules
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              Help us maintain a fair and honest community by following all
              applicable rules and laws.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Comply with our{" "}
                <a href="/terms" className="text-primary hover:text-primary-dark underline">
                  Terms of Service
                </a>{" "}
                and all applicable laws
              </li>
              <li>
                Do not attempt to circumvent app restrictions, security
                measures, or rate limits
              </li>
              <li>
                Do not create multiple accounts to evade bans or restrictions
              </li>
              <li>
                Do not impersonate other users, teams, or organizations
              </li>
              <li>
                Do not use automated tools, bots, or scrapers without
                authorization
              </li>
              <li>
                Do not exploit bugs or vulnerabilities; report them to{" "}
                <a
                  href="mailto:support@bumpsetcut.com"
                  className="text-primary hover:text-primary-dark underline"
                >
                  support@bumpsetcut.com
                </a>
              </li>
            </ul>

            {/* Reporting System */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              Reporting System
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              If you see content or behavior that violates these guidelines,
              please report it. Your reports help us keep the community safe.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Use the <strong>Report</strong> button on any highlight, comment, or
                user profile
              </li>
              <li>
                Select the appropriate report category (spam, harassment,
                inappropriate content, copyright violation, etc.)
              </li>
              <li>
                Provide additional context to help our moderation team
                understand the issue
              </li>
              <li>
                All reports are reviewed confidentially; the reported user will
                not know who submitted the report
              </li>
              <li>
                Do not abuse the reporting system by filing false or malicious
                reports
              </li>
            </ul>

            {/* Moderation Actions */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              Moderation Actions
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              When a violation is identified, our moderation team may take the
              following actions depending on the severity and frequency of the
              violation:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Warning:</strong> A notice for first-time or minor
                violations. You will be informed of the specific guideline that
                was violated.
              </li>
              <li>
                <strong>Content Removal:</strong> Violating content will be
                removed from the community feed. You will be notified when
                content is removed.
              </li>
              <li>
                <strong>Temporary Suspension:</strong> Your account may be
                temporarily restricted for 7 to 30 days for repeated or
                moderate violations. During suspension, you can still access your
                local videos but cannot post, comment, or interact with the
                community.
              </li>
              <li>
                <strong>Permanent Ban:</strong> Severe violations or repeated
                offenses after suspensions may result in permanent account
                removal from the community.
              </li>
            </ul>

            {/* Appeals */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              Appeals
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We understand that mistakes can happen. If you believe a
              moderation action was taken in error, you have the right to
              appeal.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Contact{" "}
                <a
                  href="mailto:support@bumpsetcut.com"
                  className="text-primary hover:text-primary-dark underline"
                >
                  support@bumpsetcut.com
                </a>{" "}
                with &quot;Appeal&quot; in the subject line
              </li>
              <li>
                Include your username, a description of the action taken, and
                your reason for appealing
              </li>
              <li>
                Appeals must be submitted within 30 days of the moderation
                action
              </li>
              <li>
                Our team will review your appeal and respond within 7 business
                days
              </li>
              <li>
                Appeal decisions are final
              </li>
            </ul>

            {/* Closing */}
            <div className="border-t border-border pt-6 mt-10">
              <p className="text-foreground-muted leading-relaxed mb-4">
                These guidelines help make BumpSetCut a welcoming space for
                volleyball players and fans of all levels. We appreciate your
                cooperation in building a positive community.
              </p>
              <p className="text-foreground-muted leading-relaxed">
                If you have questions about these guidelines, contact us at{" "}
                <a
                  href="mailto:support@bumpsetcut.com"
                  className="text-primary hover:text-primary-dark underline"
                >
                  support@bumpsetcut.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
