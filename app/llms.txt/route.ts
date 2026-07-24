import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

const SITE_TITLE = "Mind-Stuff Blog";
const SITE_DESCRIPTION = "Tired of a noisy mind? Get simple tips on focus, money, health & AI tools. Clear your head, read one post at a time.";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const posts = await Blog.find({}, "title slug excerpt").sort({ createdAt: -1 }).lean();

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

    let markdown = `# ${SITE_TITLE}\n\n`;
    markdown += `> ${SITE_DESCRIPTION}\n\n`;
    
    // Core website layout section
    markdown += `## Categories\n\n`;
    markdown += `- [Home](${baseUrl}/)\n`;
    markdown += `- [Explore Blogs](${baseUrl}/explore)\n\n`;

    // Dynamically generated blog posts section
    markdown += `## Blog Articles\n\n`;
    posts.forEach((post: any) => {
      markdown += `- [${post.title}](${baseUrl}/${post.slug}): ${post.excerpt || ""}\n`;
    });

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Error generating llms.txt:", error);
    return new NextResponse("Error generating llms.txt", { status: 500 });
  }
}
