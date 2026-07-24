import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

export const revalidate = 60; // Revalidate every minute

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}, "slug updatedAt").lean();

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

    // Ensure siteUrl ends with a slash for the root homepage, e.g. https://blog.mind-stuff.in/
    const baseUrl = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;

    const blogEntries = blogs
      .map((blog: any) => {
        const postUrl = `${baseUrl}${blog.slug}`;
        const lastmod = new Date(blog.updatedAt || blog.createdAt).toISOString().split(".")[0] + "Z";

        return `  <url>
    <loc>${escapeXml(postUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      })
      .join("\n");

    const rootLastmod = new Date().toISOString().split(".")[0] + "Z";

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(baseUrl)}</loc>
    <lastmod>${rootLastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${blogEntries}
</urlset>`;

    return new NextResponse(sitemapXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap.xml:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
