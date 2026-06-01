import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import Script from "next/script";
import { personalInfo, projects, skillCategories } from "@/lib/resume-data";
import "@xterm/xterm/css/xterm.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const metaPixelId = "1553632319675817";
const siteUrl = "https://israeldeveloper.com.br";
const siteName = "Israel Araújo Portfolio";
const title = "Israel Araújo | Full Stack Engineer";
const description =
  "Full Stack Software Engineer in Brazil building production systems with Python, TypeScript, Go, Rust, AI, microservices, and cloud architecture.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Israel Araújo",
  },
  description,
  applicationName: siteName,
  authors: [{ name: personalInfo.fullName, url: siteUrl }],
  creator: personalInfo.fullName,
  publisher: personalInfo.fullName,
  keywords: [
    "Israel Araújo",
    "Israel Araujo",
    "Israel Araújo de Oliveira",
    "software engineer",
    "full stack developer",
    "full stack engineer Brazil",
    "backend engineer",
    "python",
    "typescript",
    "next.js",
    "react",
    "go",
    "rust",
    "AI",
    "LLM",
    "cloud architecture",
    "microservices",
    "open source",
    "remote software engineer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName,
    images: [
      {
        url: "/profile-picture.jpeg",
        alt: "Israel Araújo de Oliveira",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@calop1337",
    images: ["/profile-picture.jpeg"],
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
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: personalInfo.fullName,
        alternateName: personalInfo.name,
        jobTitle: personalInfo.title,
        url: siteUrl,
        image: `${siteUrl}/profile-picture.jpeg`,
        email: `mailto:${personalInfo.email}`,
        telephone: "+5535997421900",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BR",
        },
        sameAs: [
          personalInfo.github,
          personalInfo.linkedin,
          personalInfo.x,
          personalInfo.whatsapp,
        ],
        knowsAbout: skillCategories.flatMap((category) => category.items),
        hasPart: projects.map((project) => ({
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          url: project.github,
          keywords: project.tech.join(", "),
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        description,
        inLanguage: "en",
        about: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
