import { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await connectDB();
    const blogs = await Blog.find({}, "slug updatedAt").lean();

    const blogEntries: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
        url: `https://yourdomain.com/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [
        {
            url: "https://yourdomain.com",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        ...blogEntries,
    ];
}
