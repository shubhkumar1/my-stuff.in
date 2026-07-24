"use client";

import { usePathname } from "next/navigation";

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
      {/* Google tag (gtag.js) */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${trackingId}');
          `,
        }}
      />
    </>
  );
}
