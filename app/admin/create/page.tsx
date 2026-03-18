"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/TiptapEditor";
import { generateSlug } from "@/lib/utils";
import BlogCard from "@/components/BlogCard"; // For preview

const CreateBlogPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [mood, setMood] = useState("Neutral");
    const [content, setContent] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTitle(val);
        setSlug(generateSlug(val));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    slug,
                    excerpt,
                    content,
                    coverImage,
                    mood,
                }),
            });

            if (res.ok) {
                router.push("/blog/" + slug);
            } else {
                alert("Failed to create blog");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-bold text-foreground">
                    Create New Blog
                </h1>
                <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-4 py-2 bg-background border border-border rounded hover:bg-border transition text-foreground"
                >
                    {showPreview ? "Edit Mode" : "Live Preview"}
                </button>
            </div>

            {showPreview ? (
                <div className="border border-border rounded-xl p-8 bg-card shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Card Preview</h2>
                    <div className="max-w-sm mx-auto mb-10">
                        <BlogCard post={{
                            _id: "preview",
                            title: title || "Title",
                            slug: slug || "slug",
                            excerpt: excerpt || "Excerpt...",
                            content: content,
                            coverImage: coverImage,
                            mood: mood as any,
                            createdAt: new Date().toISOString(),
                        }} index={0} />
                    </div>

                    <h2 className="text-2xl font-bold mb-4 text-foreground">Content Preview</h2>
                    <article className="prose prose-lg dark:prose-invert mx-auto text-foreground">
                        <h1>{title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </article>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-card border border-border p-6 rounded-xl shadow-sm">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-text-secondary">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full p-2 border rounded bg-background border-border text-foreground focus:ring-1 focus:ring-primary outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-text-secondary">Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full p-2 border rounded bg-background border-border text-foreground focus:ring-1 focus:ring-primary outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-text-secondary">Excerpt</label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full p-2 border rounded bg-background border-border text-foreground focus:ring-1 focus:ring-primary outline-none"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-text-secondary">Cover Image URL</label>
                        <input
                            type="url"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            className="w-full p-2 border rounded bg-background border-border text-foreground focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-text-secondary">Mood</label>
                        <select
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className="w-full p-2 border rounded bg-background border-border text-foreground focus:ring-1 focus:ring-primary outline-none"
                        >
                            <option value="Neutral">Neutral</option>
                            <option value="Productive">Productive</option>
                            <option value="Melancholy">Melancholy</option>
                            <option value="Excited">Excited</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-text-secondary">Content</label>
                        <TiptapEditor content={content} onChange={setContent} />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-hover transition font-medium"
                    >
                        {loading ? "Publishing..." : "Publish Blog Post"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateBlogPage;
