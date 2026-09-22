"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function GoogleTag() {
  const pathname = usePathname();
  const trackingId = process.env.NEXT_PUBLIC_GTAG_ID;

  if (!trackingId) {
    return null;
  }

  // Exclude Admin and Admin's relative pages
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      {/* Google tag (gtag.js) - Deferred to lazyOnload for mobile LCP performance */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  );
}
