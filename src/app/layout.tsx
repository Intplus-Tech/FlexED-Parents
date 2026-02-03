import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FlexED Systems - Parent Portal",
    template: "%s | FlexED Parent Portal",
  },
  description:
    "Parent portal for FlexED Systems - Track your child's school fees, view payment history, download receipts, and manage educational expenses in one secure platform.",
  keywords: [
    "school fee payment",
    "parent portal",
    "educational finance",
    "fee tracking",
    "receipt download",
    "payment history",
    "school administration",
  ],
  authors: [{ name: "FlexED Systems" }],
  creator: "FlexED Systems",
  publisher: "FlexED Systems",
  metadataBase: new URL("https://parent.flexedsystems.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parent.flexedsystems.com",
    title: "FlexED Systems - Parent Portal",
    description:
      "Parent portal for FlexED Systems - Track your child's school fees, view payment history, download receipts, and manage educational expenses in one secure platform.",
    siteName: "FlexED Parent Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlexED Systems - Parent Portal",
    description:
      "Parent portal for FlexED Systems - Track your child's school fees, view payment history, download receipts, and manage educational expenses in one secure platform.",
    creator: "@flexedsystems",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster
            expand={true}
            richColors
            visibleToasts={3}
            gap={14}
            position="top-right"
          />
        </Providers>
      </body>
    </html>
  );
}
