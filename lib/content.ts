export const siteConfig = {
  name: "BumpSetCut",
  tagline: "Never Miss a Rally Again",
  description:
    "Automatically detect, extract, and share volleyball rallies from your videos. BumpSetCut uses AI to find the action so you can focus on the game.",
  url: "https://bumpsetcut.com",
  appStoreUrl: "#",
  emails: {
    general: "hello@bumpsetcut.com",
    support: "support@bumpsetcut.com",
    privacy: "privacy@bumpsetcut.com",
  },
  social: {
    instagram: "@bumpsetcut",
    twitter: "@bumpsetcut",
    tiktok: "@bumpsetcut",
  },
};

export const features = [
  {
    icon: "Target" as const,
    title: "Automatic Rally Detection",
    description:
      "Our computer vision AI watches your videos and automatically identifies when the ball is in play. No more scrubbing through hours of footage—BumpSetCut finds every rally for you.",
    details: [
      "CoreML-powered volleyball detection",
      "Tracks ball trajectory with physics validation",
      "Distinguishes between beach and indoor volleyball",
      "Processes videos up to 4K resolution",
    ],
  },
  {
    icon: "Smartphone" as const,
    title: "Swipe Through Your Best Moments",
    description:
      "Review your rallies with a smooth, vertical swipe interface. Like TikTok, but for volleyball highlights. Perfect for quick review sessions after practice or games.",
    details: [
      "Vertical swipe navigation",
      "Landscape and portrait support",
      "Slow-motion playback controls",
      "Frame-by-frame scrubbing",
    ],
  },
  {
    icon: "FolderOpen" as const,
    title: "Organize Your Volleyball Library",
    description:
      "Create custom folders for tournaments, practices, or players. Tag videos by sport type and search your entire library instantly.",
    details: [
      "Custom folder organization",
      "Beach vs indoor auto-detection",
      "Search by filename, date, or tag",
      "Quick filters for processed vs original videos",
    ],
  },
  {
    icon: "Globe" as const,
    title: "Share Highlights with Your Team",
    description:
      "Post your best rallies to the BumpSetCut community. Follow teammates, comment on plays, and build your volleyball highlight reel.",
    details: [
      "Public highlight feed",
      "Follow players and teams",
      "Like and comment on rallies",
      "User profiles with highlight collections",
    ],
  },
  {
    icon: "Download" as const,
    title: "Export to Camera Roll",
    description:
      "Save processed rallies directly to your photo library or share them anywhere. Your highlights, your way.",
    details: [
      "Export individual rallies",
      "Save to Photos app",
      "Share to social media",
      "Optional debug overlay for coaches",
    ],
  },
  {
    icon: "Star" as const,
    title: "Unlock Unlimited Processing",
    description:
      "Go Pro for unlimited video processing, no watermarks, and cellular uploads. Perfect for serious players and coaches.",
    details: [
      "Unlimited video processing",
      "No watermarks on exports",
      "Upload on cellular data",
      "Priority processing queue",
    ],
  },
];

export const howItWorks = [
  {
    step: 1,
    icon: "Video" as const,
    title: "Import Your Video",
    description:
      "Record a match or upload existing footage from your camera roll. BumpSetCut supports videos up to 500MB (free) or unlimited (Pro).",
  },
  {
    step: 2,
    icon: "Bot" as const,
    title: "AI Processes Automatically",
    description:
      "Our computer vision AI scans every frame, tracking the volleyball and detecting when rallies start and end. Physics validation ensures accurate detection.",
  },
  {
    step: 3,
    icon: "Clapperboard" as const,
    title: "Review & Share",
    description:
      "Swipe through extracted rallies in seconds. Export your favorites to camera roll or share directly to the community feed.",
  },
];

export const pricing = {
  free: {
    name: "Free",
    price: "$0",
    period: "",
    tagline: "Perfect for casual players",
    features: [
      "3 videos per week",
      "Videos up to 500MB",
      "WiFi-only uploads",
      "AI rally detection",
      "TikTok-style viewer",
      "Export with watermark",
      "Community sharing",
      "Custom folders",
    ],
    cta: "Download Free",
    highlighted: false,
  },
  pro: {
    name: "Pro",
    price: "$7.99",
    period: "/month",
    tagline: "For serious players & coaches",
    features: [
      "Unlimited videos",
      "No file size limits",
      "Cellular uploads",
      "No watermarks",
      "AI rally detection",
      "TikTok-style viewer",
      "Export to camera roll",
      "Community sharing",
      "Custom folders",
      "Priority processing",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
};

export const testimonials = [
  {
    quote:
      "BumpSetCut saved me hours of video review. I can now focus on analyzing plays instead of searching for them.",
    name: "Sarah M.",
    role: "Beach Volleyball Coach",
    rating: 5,
  },
  {
    quote:
      "The AI detection is surprisingly accurate. It catches rallies I would have missed scrolling through manually.",
    name: "Jake T.",
    role: "Club Player",
    rating: 5,
  },
  {
    quote:
      "Love the TikTok-style interface. Makes reviewing game footage actually fun instead of a chore.",
    name: "Emily R.",
    role: "College Athlete",
    rating: 5,
  },
];

export const faqItems = [
  {
    question: "What is BumpSetCut?",
    answer:
      "BumpSetCut is an iOS app that uses AI to automatically detect and extract volleyball rallies from your game videos. Instead of watching hours of footage, our computer vision technology finds the action for you.",
    category: "General",
  },
  {
    question: "How accurate is the rally detection?",
    answer:
      "Our CoreML model is trained specifically on volleyball footage and uses physics validation to ensure accurate rally boundaries. Detection accuracy is typically 90%+ for well-lit outdoor and indoor courts.",
    category: "General",
  },
  {
    question: "What video formats are supported?",
    answer:
      "BumpSetCut supports all standard iOS video formats (MOV, MP4, HEVC). Videos can be imported from your camera roll or recorded directly in the app (coming soon).",
    category: "General",
  },
  {
    question: "Does it work for both beach and indoor volleyball?",
    answer:
      "Yes! BumpSetCut automatically detects whether you're playing beach or indoor volleyball and adjusts detection accordingly.",
    category: "General",
  },
  {
    question: "Can I use it for practice footage?",
    answer:
      "Absolutely. BumpSetCut works on any volleyball video—matches, practices, drills, or scrimmages. The AI detects ball movement, not game context.",
    category: "General",
  },
  {
    question: "What devices are supported?",
    answer:
      "BumpSetCut requires iOS 17.0 or later. It works on iPhone 12 and newer models. iPad support coming soon.",
    category: "Technical",
  },
  {
    question: "Does it work offline?",
    answer:
      "Yes! Video processing happens entirely on your device using CoreML. No internet connection required for rally detection. Internet is only needed for uploading videos and accessing the community feed.",
    category: "Technical",
  },
  {
    question: "How long does processing take?",
    answer:
      "Processing time depends on video length and device. Typically, a 30-minute video processes in 5-10 minutes on an iPhone 14 or newer. Pro users get priority processing.",
    category: "Technical",
  },
  {
    question: "Where are my videos stored?",
    answer:
      "All videos are stored locally on your device. Processed rallies can be exported to your camera roll. If you share highlights to the community, they're hosted securely on Supabase cloud storage.",
    category: "Technical",
  },
  {
    question: "Does it drain my battery?",
    answer:
      "Video processing is CPU-intensive and will use battery. We recommend processing videos while charging. Once processed, viewing rallies uses minimal battery.",
    category: "Technical",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! The free plan includes 3 video processing credits per week with no time limit. Try it as long as you want.",
    category: "Account & Billing",
  },
  {
    question: "What happens if I cancel my Pro subscription?",
    answer:
      "You keep all processed videos on your device. You'll revert to the free plan limits (3 videos/week, watermarks). Your community highlights remain public.",
    category: "Account & Billing",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Subscriptions are managed through the App Store. You can cancel anytime within 24 hours of purchase for a full refund. Contact Apple Support for refund requests.",
    category: "Account & Billing",
  },
  {
    question: "Is there a team or coach discount?",
    answer:
      "Not yet, but we're working on team plans. Contact us at support@bumpsetcut.com if you're interested in bulk licensing.",
    category: "Account & Billing",
  },
  {
    question: "Who can see my videos?",
    answer:
      "Videos you process stay private on your device unless you choose to share highlights to the community feed. You control what gets shared.",
    category: "Privacy & Content",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes. Go to Settings → Account → Delete Account. This removes all your data from our servers. Locally stored videos remain on your device until you delete the app.",
    category: "Privacy & Content",
  },
  {
    question: "Do you sell my data?",
    answer:
      "Never. We don't sell, rent, or share your personal information with third parties. See our Privacy Policy for full details.",
    category: "Privacy & Content",
  },
  {
    question: "Why isn't my video processing?",
    answer:
      "Common issues: Video too large (free users have a 500MB limit), low storage (processing requires 2x the original video size in free space), unsupported format (use MOV or MP4), weekly limit reached (free users can process 3 videos per week).",
    category: "Troubleshooting",
  },
  {
    question: "The AI missed some rallies. Why?",
    answer:
      "Rally detection works best with: clear view of the court, good lighting (avoid heavy shadows), ball visible in frame, and minimal camera movement. Try recording from a higher angle or with better lighting.",
    category: "Troubleshooting",
  },
  {
    question: "App crashes during processing. Help!",
    answer:
      "Try these steps: Restart the app, ensure you have 5GB+ free storage, close other apps to free up RAM, update to the latest iOS version. If issues persist, contact support@bumpsetcut.com.",
    category: "Troubleshooting",
  },
];

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Download", href: "#" },
  ],
  resources: [
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Community Guidelines", href: "/community-guidelines" },
  ],
  support: [
    { label: "Contact Us", href: "mailto:support@bumpsetcut.com" },
    {
      label: "Report a Bug",
      href: "mailto:support@bumpsetcut.com?subject=Bug Report",
    },
    {
      label: "Feature Requests",
      href: "mailto:hello@bumpsetcut.com?subject=Feature Request",
    },
  ],
};
