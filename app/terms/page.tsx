import { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Service - BumpSetCut",
  description:
    "Terms of Service for BumpSetCut. Read our terms and conditions for using the app.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-secondary mb-2">
              Terms of Service
            </h1>
            <p className="text-sm text-foreground-muted mb-8">
              Last Updated: February 11, 2025
            </p>
            <p className="text-foreground-muted leading-relaxed mb-8">
              Please read these Terms of Service (&quot;Terms&quot;) carefully
              before using the BumpSetCut mobile application (the
              &quot;App&quot;). These Terms govern your access to and use of the
              App.
            </p>

            {/* Section 1 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-6">
              By accessing or using BumpSetCut, you agree to be bound by these
              Terms and our Privacy Policy. If you do not agree to these Terms,
              do not use the App.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              1.1 Eligibility
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              You must be at least 13 years old to use BumpSetCut. If you are
              under 18, you must have permission from a parent or legal
              guardian. By using the App, you represent that you meet these
              requirements.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              1.2 Changes to Terms
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              We reserve the right to modify these Terms at any time. We will
              notify you of material changes via the App or email. Your
              continued use of the App after changes constitutes acceptance of
              the modified Terms.
            </p>

            {/* Section 2 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              2. Description of Service
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              BumpSetCut is a mobile application that uses machine learning and
              computer vision to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Automatically detect volleyball rallies in recorded videos
              </li>
              <li>Extract and save individual rally highlights</li>
              <li>Provide video organization and library management</li>
              <li>
                Enable social features to share highlights with the community
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              The App is provided &quot;as is&quot; and we make no guarantees
              about rally detection accuracy or service availability.
            </p>

            {/* Section 3 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              3. User Accounts
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              3.1 Account Creation
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>You must create an account using Sign in with Apple</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must provide accurate and complete information</li>
              <li>
                You may not share your account credentials with others
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              3.2 Account Termination
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account if you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Violate these Terms or Community Guidelines</li>
              <li>Engage in fraudulent or illegal activity</li>
              <li>Upload inappropriate or harmful content</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              You may delete your account at any time through Settings.
            </p>

            {/* Section 4 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              4. Subscription Plans
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              4.1 Free Tier
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              The free version of BumpSetCut includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                3 video processing credits per week (resets Monday 00:00)
              </li>
              <li>500MB maximum video file size</li>
              <li>WiFi-only video processing</li>
              <li>Watermarked exported videos</li>
              <li>Access to social features</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              4.2 BumpSetCut Pro ($7.99/month)
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              Pro subscription includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Unlimited video processing</strong> (no weekly limits)
              </li>
              <li>
                <strong>Unlimited file sizes</strong> (process any video length)
              </li>
              <li>
                <strong>Cellular processing</strong> (process videos on mobile
                data)
              </li>
              <li>
                <strong>No watermarks</strong> on exported videos
              </li>
              <li>Priority support (future)</li>
              <li>Advanced settings (future)</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              4.3 Subscription Terms
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Subscriptions are billed monthly through Apple&apos;s in-app
                purchase system
              </li>
              <li>
                Payment is charged to your Apple ID account at purchase
                confirmation
              </li>
              <li>
                Subscriptions automatically renew unless cancelled at least 24
                hours before the end of the current period
              </li>
              <li>
                Your account will be charged for renewal within 24 hours prior
                to the end of the current period
              </li>
              <li>
                You can manage and cancel subscriptions in your Apple ID account
                settings
              </li>
              <li>No refunds for partial months or unused credits</li>
              <li>
                Cancellation takes effect at the end of the current billing
                period
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              4.4 Price Changes
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              We reserve the right to change subscription prices with 30
              days&apos; notice. Price changes will not affect existing
              subscriptions until renewal.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              4.5 Free Trial (If Applicable)
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              If we offer a free trial:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                You must cancel before the trial ends to avoid charges
              </li>
              <li>Only one free trial per user</li>
              <li>We may require valid payment method on file</li>
            </ul>

            {/* Section 5 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              5. Content and Intellectual Property
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              5.1 Your Content
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              You retain ownership of videos and content you upload (&quot;Your
              Content&quot;). By uploading content, you grant us a worldwide,
              non-exclusive, royalty-free license to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Store, process, and display Your Content</li>
              <li>
                Use machine learning to detect rallies in Your Content
              </li>
              <li>
                Enable social features (sharing, comments, likes)
              </li>
              <li>
                Improve rally detection algorithms (anonymized)
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              This license ends when you delete Your Content or your account.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              5.2 Content Restrictions
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              You may not upload content that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Infringes copyright, trademark, or other intellectual property
                rights
              </li>
              <li>
                Contains nudity, sexual content, or graphic violence
              </li>
              <li>
                Promotes hate speech, harassment, or discrimination
              </li>
              <li>Contains spam, malware, or malicious code</li>
              <li>Depicts illegal activities or violates laws</li>
              <li>
                Violates others&apos; privacy or publicity rights
              </li>
              <li>Is misleading, fraudulent, or deceptive</li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              We reserve the right to remove content that violates these
              restrictions without notice.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              5.3 Our Intellectual Property
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              BumpSetCut owns all rights to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                The App&apos;s code, design, and functionality
              </li>
              <li>The BumpSetCut name, logo, and trademarks</li>
              <li>
                Rally detection algorithms and machine learning models
              </li>
              <li>App documentation and user interface</li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              You may not copy, modify, reverse engineer, or create derivative
              works of the App.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              5.4 DMCA Copyright Policy
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              If you believe content infringes your copyright, contact us with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Identification of the copyrighted work</li>
              <li>Identification of the infringing content</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief</li>
              <li>
                A statement under penalty of perjury of accuracy
              </li>
              <li>Your physical or electronic signature</li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              <strong>DMCA Contact:</strong>{" "}
              <a
                href="mailto:dmca@bumpsetcut.com"
                className="text-primary hover:text-primary-dark underline"
              >
                dmca@bumpsetcut.com
              </a>
            </p>

            {/* Section 6 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              6. Community Guidelines
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              To maintain a positive community, users must:
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              6.1 Be Respectful
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Treat other users with respect and courtesy</li>
              <li>No harassment, bullying, or threats</li>
              <li>No hate speech or discrimination</li>
              <li>Respect others&apos; privacy</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              6.2 Create Appropriate Content
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Share volleyball-related content</li>
              <li>Keep content family-friendly (12+ rating)</li>
              <li>No spam or repetitive posts</li>
              <li>No misleading or deceptive content</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              6.3 Follow the Rules
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Comply with these Terms and all applicable laws
              </li>
              <li>
                Report violations through the in-app reporting system
              </li>
              <li>Do not circumvent technical restrictions</li>
              <li>
                Do not create multiple accounts to evade bans
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              Violations may result in content removal, account suspension, or
              permanent ban.
            </p>

            {/* Section 7 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              7. Content Reporting and Moderation
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              7.1 Reporting System
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              You can report content that violates our Terms or Community
              Guidelines:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Use the &quot;Report&quot; button on highlights or comments
              </li>
              <li>
                Select a report type (spam, harassment, inappropriate content,
                etc.)
              </li>
              <li>Provide additional context (optional)</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              7.2 Moderation Actions
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We review reports and may take the following actions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Warning:</strong> First-time minor violations
              </li>
              <li>
                <strong>Content Removal:</strong> Delete violating content
              </li>
              <li>
                <strong>Account Suspension:</strong> Temporary restriction (7-30
                days)
              </li>
              <li>
                <strong>Account Ban:</strong> Permanent removal for severe or
                repeated violations
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              7.3 Appeals
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              If you believe a moderation action was made in error, you may
              appeal by contacting{" "}
              <a
                href="mailto:support@bumpsetcut.com"
                className="text-primary hover:text-primary-dark underline"
              >
                support@bumpsetcut.com
              </a>{" "}
              within 30 days.
            </p>

            {/* Section 8 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              8. User Blocking
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              You may block users to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Prevent them from seeing your content</li>
              <li>Hide their content from your feed</li>
              <li>Stop them from commenting on your posts</li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              Blocking is permanent until you unblock the user.
            </p>

            {/* Section 9 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              9. Prohibited Activities
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              You may not:
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              9.1 Technical Restrictions
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Reverse engineer, decompile, or disassemble the App
              </li>
              <li>
                Circumvent security measures or access restrictions
              </li>
              <li>
                Use automated tools (bots, scrapers) without permission
              </li>
              <li>Interfere with App functionality or servers</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              9.2 Harmful Conduct
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Upload malware, viruses, or malicious code</li>
              <li>
                Attempt to gain unauthorized access to accounts or systems
              </li>
              <li>
                Impersonate others or misrepresent affiliations
              </li>
              <li>Engage in fraudulent activity or scams</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              9.3 Commercial Use
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Use the App for unauthorized commercial purposes
              </li>
              <li>Sell or transfer your account</li>
              <li>Frame or mirror the App without permission</li>
              <li>Use rally detection for competing services</li>
            </ul>

            {/* Section 10 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              10. Third-Party Services
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              10.1 Apple Services
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              The App uses Apple services including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Sign in with Apple for authentication</li>
              <li>In-App Purchases for subscriptions</li>
              <li>App Store for distribution</li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              Apple&apos;s terms and policies apply to these services.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              10.2 External Links
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              The App may contain links to third-party websites or services. We
              are not responsible for their content, privacy practices, or
              availability.
            </p>

            {/* Section 11 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              11. Disclaimers and Limitations
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              11.1 Service Availability
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                The App is provided &quot;as is&quot; without warranties of any
                kind
              </li>
              <li>
                We do not guarantee uninterrupted or error-free service
              </li>
              <li>
                Rally detection accuracy may vary based on video quality
              </li>
              <li>
                We may modify, suspend, or discontinue features at any time
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              11.2 Machine Learning Accuracy
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Rally detection is automated and may produce false
                positives/negatives
              </li>
              <li>
                We do not guarantee that all rallies will be detected
              </li>
              <li>
                Detection accuracy improves over time but is not perfect
              </li>
              <li>
                You are responsible for verifying detected rallies
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              11.3 Data Loss
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                We are not responsible for data loss or corruption
              </li>
              <li>You should maintain backups of important videos</li>
              <li>We recommend exporting highlights regularly</li>
            </ul>

            {/* Section 12 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              12. Limitation of Liability
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4 uppercase font-semibold text-sm">
              To the maximum extent permitted by law:
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              12.1 No Liability
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We are not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Direct, indirect, incidental, or consequential damages
              </li>
              <li>Lost profits, revenue, or data</li>
              <li>Service interruptions or data loss</li>
              <li>Third-party actions or content</li>
              <li>Unauthorized access to your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              12.2 Maximum Liability
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              Our total liability to you shall not exceed the amount you paid
              for BumpSetCut Pro in the 12 months before the claim (or $100 if
              you are a free user).
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              12.3 Exceptions
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              Some jurisdictions do not allow limitation of liability for
              certain damages. In such cases, our liability is limited to the
              maximum extent permitted by law.
            </p>

            {/* Section 13 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              13. Indemnification
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              You agree to indemnify and hold harmless BumpSetCut, its
              affiliates, and their respective officers, directors, employees,
              and agents from any claims, damages, losses, or expenses
              (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Your use of the App</li>
              <li>Your Content</li>
              <li>Violation of these Terms</li>
              <li>Violation of any rights of another user</li>
              <li>Violation of applicable laws</li>
            </ul>

            {/* Section 14 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              14. Dispute Resolution
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              14.1 Governing Law
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              These Terms are governed by applicable law, without regard to
              conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              14.2 Arbitration Agreement
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              Any disputes arising from these Terms or the App shall be resolved
              through binding arbitration, except:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Small claims court actions</li>
              <li>Intellectual property disputes</li>
              <li>Injunctive relief requests</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              14.3 Class Action Waiver
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              You agree to bring claims individually and not as part of a class
              action, consolidated action, or representative action.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              14.4 Jury Trial Waiver
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              You waive the right to a jury trial for any disputes covered by
              the arbitration agreement.
            </p>

            {/* Section 15 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              15. General Provisions
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              15.1 Entire Agreement
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              These Terms and the Privacy Policy constitute the entire agreement
              between you and BumpSetCut.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              15.2 Severability
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              If any provision is found invalid or unenforceable, the remaining
              provisions remain in effect.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              15.3 No Waiver
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              Our failure to enforce any right or provision does not constitute a
              waiver of that right or provision.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              15.4 Assignment
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              You may not assign or transfer these Terms. We may assign our
              rights and obligations without restriction.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              15.5 Force Majeure
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              We are not liable for delays or failures caused by circumstances
              beyond our reasonable control (natural disasters, wars, internet
              outages, etc.).
            </p>

            {/* Section 16 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              16. Contact Information
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              For questions about these Terms, please contact us:
            </p>
            <ul className="list-none space-y-2 text-foreground-muted mb-8">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@bumpsetcut.com"
                  className="text-primary hover:text-primary-dark underline"
                >
                  support@bumpsetcut.com
                </a>
              </li>
              <li>
                <strong>Legal:</strong>{" "}
                <a
                  href="mailto:legal@bumpsetcut.com"
                  className="text-primary hover:text-primary-dark underline"
                >
                  legal@bumpsetcut.com
                </a>
              </li>
            </ul>

            <p className="text-foreground-muted leading-relaxed text-sm border-t border-border pt-6">
              By using BumpSetCut, you agree to these Terms. Thank you for being
              part of our community!
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
