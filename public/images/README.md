# Product image/video slots

These are the spots on the marketing site currently filled with **branded placeholders**.
Drop real assets here and wire them into the referenced components when available.

| Slot | Component | Current placeholder | Suggested asset |
|---|---|---|---|
| Hero product visual | `components/sections/Hero.tsx` (`PhoneMockup`) | CSS phone frame w/ blue→teal gradient + play glyph | Real app screenshot or short looping demo (MP4/webm in `public/videos/`) inside the device frame |
| Demo (the "Watch Demo" buttons in Hero & CTA) | `components/sections/Hero.tsx`, `components/sections/CTA.tsx` | Anchor scrolls to `#how-it-works` | Link to a hosted demo video or open a modal player |
| How It Works steps (optional) | `components/sections/HowItWorks.tsx` | Lucide icon tiles | Step screenshots (import → process → review) |

Each placeholder is marked with a `TODO:` comment in its component for quick discovery.
