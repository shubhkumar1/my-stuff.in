import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

export const revalidate = 60; // Revalidate every minute

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ updatedAt: -1 }).limit(100).lean();

    const escapeXml = (unsafe: string) => {
      if (!unsafe) return "";
      return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case "<": return "&lt;";
          case ">": return "&gt;";
          case "&": return "&amp;";
          case "'": return "&apos;";
          case '"': return "&quot;";
          default: return c;
        }
      });
    };

    const itemsXml = blogs
      .map((blog: any) => {
        const postUrl = `${siteUrl}/${blog.slug}`;
        const pubDate = new Date(blog.createdAt || blog.updatedAt).toUTCString();
        const updatedDate = new Date(blog.updatedAt || blog.createdAt).toISOString();

        return `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${pubDate}</pubDate>
      <atom:updated>${updatedDate}</atom:updated>
      <description>${escapeXml(blog.excerpt || "")}</description>
    </item>`;
      })
      .join("");

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mind-Stuff Blog</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Tired of a noisy mind? Get simple tips on focus, money, health &amp; AI tools. Clear your head, read one post at a time.</description>
    <language>en-us</language>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(siteUrl)}/sitemap.rss" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap.rss:", error);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}
