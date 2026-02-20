import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Dashboard | BumpSetCut",
  description: "Beta test plan tracking dashboard",
};

export default function TestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#0d1117",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
