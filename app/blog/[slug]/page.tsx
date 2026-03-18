import { notFound } from "next/navigation";
import Image from "next/image";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import "@/models/User"; // Ensure User model is registered
import ReadingProgress from "@/components/ReadingProgress";
import JsonLd from "@/components/JsonLd";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import { format } from "date-fns";
import { BlogPost } from "@/types";
import { Metadata } from "next";

interface BlogPageProps {
    params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
    await connectDB();
    const blog = await Blog.findOne({ slug }).populate("author", "name image").lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog)) as BlogPost;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);
    if (!blog) return {};

    return {
        title: blog.title,
        description: blog.excerpt,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            images: blog.coverImage ? [blog.coverImage] : [],
            type: "article",
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    const moodColors = {
        Productive: "from-green-500 to-green-600",
        Melancholy: "from-indigo-500 to-indigo-600",
        Excited: "from-orange-500 to-orange-600",
        Neutral: "from-gray-500 to-gray-600",
    };

    const accentColor = moodColors[blog.mood] || moodColors.Neutral;

    return (
        <>
            <ReadingProgress />
            <JsonLd post={blog} url={`https://yourdomain.com/blog/${blog.slug}`} />

            <article className="min-h-screen pb-20 bg-background">
                {/* Header */}
                <div className={`w-full h-[60vh] relative flex items-center justify-center text-center px-6 bg-gradient-to-br ${accentColor} text-white overflow-hidden`}>
                    {blog.coverImage && (
                        <Image src={blog.coverImage} fill alt={blog.title} className="object-cover mix-blend-overlay opacity-50 z-0" />
                    )}
                    <div className="absolute inset-0 bg-black/30 z-[1]" />
                    <div className="relative z-10 max-w-4xl">
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/30">
                            {blog.mood} Mood
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-white/90">
                            <span>{format(new Date(blog.createdAt), "MMMM d, yyyy")}</span>
                            <span>•</span>
                            <span>{blog.readingTime || "3 min read"}</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-6 -mt-20 relative z-20">
                    <div className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border">
                        <div
                            className="ProseMirror prose prose-lg dark:prose-invert max-w-none font-serif prose-headings:font-bold prose-headings:text-foreground prose-p:text-text-secondary prose-a:text-primary"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                            <LikeButton blogId={blog._id} />
                            <div className="flex gap-2">
                                {/* Share buttons placeholder */}
                            </div>
                        </div>

                        <CommentSection blogId={blog._id} />
                    </div>
                </div>
            </article>
        </>
    );
}
