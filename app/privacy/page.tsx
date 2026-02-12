import { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - BumpSetCut",
  description:
    "Privacy Policy for BumpSetCut. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-secondary mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-foreground-muted mb-8">
              Last Updated: February 11, 2025
            </p>
            <p className="text-foreground-muted leading-relaxed mb-6">
              BumpSetCut (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you use our mobile application (the &quot;App&quot;).
            </p>
            <p className="text-foreground-muted leading-relaxed mb-8">
              Please read this Privacy Policy carefully. If you do not agree
              with the terms of this Privacy Policy, please do not access the
              App.
            </p>

            {/* Section 1 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              1.1 Personal Information You Provide
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              When you use BumpSetCut, you may provide us with the following
              information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Account Information:</strong> Email address, username,
                display name, and profile picture (via Apple Sign-In)
              </li>
              <li>
                <strong>User-Generated Content:</strong> Videos you upload,
                rally highlights you share, comments, captions, and other
                content you create
              </li>
              <li>
                <strong>Profile Information:</strong> Bio, profile
                customization, and preferences
              </li>
              <li>
                <strong>Communication Data:</strong> Messages sent through the
                app, support requests, and feedback
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              1.2 Automatically Collected Information
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              When you use the App, we automatically collect certain
              information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Device Information:</strong> Device type, operating
                system version, unique device identifiers
              </li>
              <li>
                <strong>Usage Data:</strong> App features used, rally processing
                statistics, viewing patterns, session duration
              </li>
              <li>
                <strong>Video Metadata:</strong> Duration, file size, volleyball
                type (beach/indoor), rally statistics
              </li>
              <li>
                <strong>Analytics Data:</strong> Crash reports, performance
                metrics, feature usage statistics
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              1.3 Information From Third Parties
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Apple Sign-In:</strong> We receive your Apple ID
                authentication token, email (if you choose to share it), and
                name from Apple
              </li>
              <li>
                <strong>Supabase Backend:</strong> Our backend service provider
                processes and stores your data securely
              </li>
            </ul>

            {/* Section 2 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              2.1 Core Functionality
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Process videos to detect and extract volleyball rallies using
                machine learning
              </li>
              <li>Store and organize your video library</li>
              <li>
                Enable social features (sharing highlights, comments, likes,
                follows)
              </li>
              <li>
                Provide personalized feeds based on your follows and preferences
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              2.2 Account Management
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Create and manage your account via Apple Sign-In</li>
              <li>
                Authenticate your identity and prevent unauthorized access
              </li>
              <li>
                Manage your subscription status (Free or Pro tier)
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              2.3 Service Improvement
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Analyze usage patterns to improve rally detection accuracy
              </li>
              <li>Identify and fix bugs and performance issues</li>
              <li>Develop new features based on user behavior</li>
              <li>Optimize video processing algorithms</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              2.4 Communication
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Send important service updates and announcements</li>
              <li>Respond to support requests and feedback</li>
              <li>
                Notify you of subscription changes or renewals (Pro tier)
              </li>
              <li>
                Inform you of social interactions (likes, comments, follows)
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              2.5 Safety and Moderation
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                Review content reports and enforce community guidelines
              </li>
              <li>Investigate violations of Terms of Service</li>
              <li>
                Prevent spam, harassment, and inappropriate content
              </li>
              <li>Maintain a safe community environment</li>
            </ul>

            {/* Section 3 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              3. How We Share Your Information
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We do not sell your personal information. We share your information
              only in the following circumstances:
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              3.1 Public Information
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              The following information is visible to other users:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Your username and display name</li>
              <li>Profile picture and bio</li>
              <li>Public rally highlights you share</li>
              <li>Comments and likes on public content</li>
              <li>Follower/following relationships</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              3.2 Service Providers
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We share information with trusted third-party service providers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Supabase (Backend Infrastructure):</strong> Stores user
                data, videos, and social content in secure PostgreSQL databases
                with Row Level Security
              </li>
              <li>
                <strong>Apple (Authentication):</strong> Handles Sign in with
                Apple authentication
              </li>
              <li>
                <strong>Cloud Storage:</strong> Stores video files and rally
                highlights
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              All service providers are contractually required to protect your
              data and use it only for the purposes we specify.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              3.3 Legal Requirements
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We may disclose your information if required by law or in response
              to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Valid legal processes (subpoenas, court orders)</li>
              <li>Government requests or investigations</li>
              <li>Protection of our rights, property, or safety</li>
              <li>Prevention of fraud or illegal activity</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              3.4 Business Transfers
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              If BumpSetCut is involved in a merger, acquisition, or sale of
              assets, your information may be transferred to the new entity.
            </p>

            {/* Section 4 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              4. Data Retention
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We retain your information for as long as necessary to provide our
              services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Active Accounts:</strong> Data retained while your
                account is active
              </li>
              <li>
                <strong>Deleted Accounts:</strong> Personal data deleted within
                30 days of account deletion
              </li>
              <li>
                <strong>Legal Obligations:</strong> Some data may be retained
                longer if required by law
              </li>
              <li>
                <strong>Aggregated Data:</strong> Anonymized usage statistics may
                be retained indefinitely
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              You can request account deletion at any time through Settings
              &rarr; Account &rarr; Delete Account.
            </p>

            {/* Section 5 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              5. Data Security
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We implement industry-standard security measures to protect your
              information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Encryption:</strong> Data encrypted in transit (TLS/SSL)
                and at rest
              </li>
              <li>
                <strong>Authentication:</strong> Secure authentication via Apple
                Sign-In
              </li>
              <li>
                <strong>Access Controls:</strong> Row Level Security (RLS)
                policies in database
              </li>
              <li>
                <strong>Regular Audits:</strong> Periodic security reviews and
                updates
              </li>
              <li>
                <strong>Secure Storage:</strong> Videos stored with
                access-controlled cloud storage
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              However, no method of transmission over the internet is 100%
              secure. We cannot guarantee absolute security.
            </p>

            {/* Section 6 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              6. Your Privacy Rights
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              6.1 Access and Portability
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Request a copy of your personal data</li>
              <li>Export your videos and content</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              6.2 Correction and Deletion
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Update your profile information</li>
              <li>Delete your account and associated data</li>
              <li>Remove specific content you&apos;ve posted</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              6.3 Control and Opt-Out
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Block users to control who sees your content</li>
              <li>Make your profile private</li>
              <li>Opt out of analytics (via iOS Settings)</li>
              <li>Control notification preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              6.4 Data Minimization
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>We only collect data necessary for core functionality</li>
              <li>
                You can use the app without sharing optional information
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:privacy@bumpsetcut.com"
                className="text-primary hover:text-primary-dark underline"
              >
                privacy@bumpsetcut.com
              </a>{" "}
              or use in-app settings.
            </p>

            {/* Section 7 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              7. Children&apos;s Privacy
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              BumpSetCut is not intended for users under 13 years of age. We do
              not knowingly collect personal information from children under 13.
              If we learn we have collected information from a child under 13, we
              will delete it immediately.
            </p>
            <p className="text-foreground-muted leading-relaxed mb-6">
              The App is rated 12+ due to social features and user-generated
              content.
            </p>

            {/* Section 8 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              8. California Privacy Rights (CCPA)
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              If you are a California resident, you have additional rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Right to Know:</strong> What personal information we
                collect and how we use it
              </li>
              <li>
                <strong>Right to Delete:</strong> Request deletion of your
                personal information
              </li>
              <li>
                <strong>Right to Opt-Out:</strong> We do not sell personal
                information
              </li>
              <li>
                <strong>Non-Discrimination:</strong> We will not discriminate
                against you for exercising your rights
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              To exercise these rights, email{" "}
              <a
                href="mailto:privacy@bumpsetcut.com"
                className="text-primary hover:text-primary-dark underline"
              >
                privacy@bumpsetcut.com
              </a>{" "}
              with &quot;CCPA Request&quot; in the subject line.
            </p>

            {/* Section 9 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              9. European Privacy Rights (GDPR)
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              If you are in the European Economic Area (EEA), you have
              additional rights under GDPR:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Legal Basis:</strong> We process data based on consent,
                contract performance, and legitimate interests
              </li>
              <li>
                <strong>Data Portability:</strong> Export your data in a
                machine-readable format
              </li>
              <li>
                <strong>Right to Object:</strong> Object to processing based on
                legitimate interests
              </li>
              <li>
                <strong>Supervisory Authority:</strong> File a complaint with
                your local data protection authority
              </li>
            </ul>

            {/* Section 10 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              BumpSetCut is based in the United States. Your information may be
              transferred to and processed in countries outside your country of
              residence. These countries may have different data protection laws.
            </p>
            <p className="text-foreground-muted leading-relaxed mb-6">
              We use standard contractual clauses and other safeguards to
              protect international data transfers.
            </p>

            {/* Section 11 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              11. Third-Party Services
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              The App may contain links to third-party services (e.g., Apple App
              Store, social sharing). We are not responsible for the privacy
              practices of these services. Please review their privacy policies.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              11.1 Apple Sign-In
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              We use Apple Sign-In for authentication. Apple&apos;s privacy
              policy applies to their services.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">
              11.2 Supabase
            </h3>
            <p className="text-foreground-muted leading-relaxed mb-6">
              We use Supabase for backend infrastructure. Supabase&apos;s
              privacy policy applies to their services.
            </p>

            {/* Section 12 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              12. Content Moderation and Safety
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              To maintain a safe community, we:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Review content reports submitted by users</li>
              <li>
                Use automated detection for spam and inappropriate content
              </li>
              <li>May access reported content to investigate violations</li>
              <li>Retain moderation records for policy enforcement</li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              Reported content and moderation actions are reviewed by our team
              and are subject to this Privacy Policy.
            </p>

            {/* Section 13 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              13. Subscription and Payment Data
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              For BumpSetCut Pro subscribers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>
                <strong>Payment Processing:</strong> Handled entirely by Apple
                via in-app purchases
              </li>
              <li>
                <strong>Subscription Status:</strong> We receive subscription
                status from Apple (active/expired)
              </li>
              <li>
                <strong>No Payment Details:</strong> We do not collect or store
                credit card information
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              Apple&apos;s privacy policy governs payment processing.
            </p>

            {/* Section 14 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              14. Changes to This Privacy Policy
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of material changes by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-muted mb-6">
              <li>Posting the new Privacy Policy in the App</li>
              <li>Updating the &quot;Last Updated&quot; date</li>
              <li>
                Sending an in-app notification (for significant changes)
              </li>
            </ul>
            <p className="text-foreground-muted leading-relaxed mb-6">
              Your continued use of the App after changes constitutes acceptance
              of the updated Privacy Policy.
            </p>

            {/* Section 15 */}
            <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
              15. Contact Us
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our privacy
              practices, please contact us:
            </p>
            <ul className="list-none space-y-2 text-foreground-muted mb-8">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@bumpsetcut.com"
                  className="text-primary hover:text-primary-dark underline"
                >
                  privacy@bumpsetcut.com
                </a>
              </li>
              <li>
                <strong>Support:</strong> In-app Settings &rarr; Help &amp;
                Support
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
