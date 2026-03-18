"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { format } from "date-fns";
import { BlogPost } from "@/types";

export default function AdminDashboard() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch("/api/blogs");
            if (res.ok) {
                const data = await res.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;

        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setBlogs(blogs.filter((blog) => blog._id !== id));
            } else {
                alert("Failed to delete blog");
            }
        } catch (error) {
            console.error("Failed to delete blog:", error);
            alert("Error deleting blog");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">Admin Dashboard</h1>
                        <p className="text-text-secondary mt-2">Manage your blog posts and content.</p>
                    </div>
                    <Link
                        href="/admin/create"
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition shadow-lg shadow-primary/20"
                    >
                        <FaPlus /> Create New Blog
                    </Link>
                </div>

                <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-background border-b border-border text-text-secondary text-sm uppercase tracking-wider">
                                    <th className="p-6 font-semibold">Title</th>
                                    <th className="p-6 font-semibold">Mood</th>
                                    <th className="p-6 font-semibold">Date</th>
                                    <th className="p-6 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {blogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-10 text-center text-gray-500 dark:text-gray-400">
                                            No blog posts found. Create your first one!
                                        </td>
                                    </tr>
                                ) : (
                                    blogs.map((blog) => (
                                        <tr key={blog._id} className="hover:bg-background transition-colors group">
                                            <td className="p-6">
                                                <Link href={`/blog/${blog.slug}`} className="font-medium text-foreground hover:text-primary transition">
                                                    {blog.title}
                                                </Link>
                                            </td>
                                            <td className="p-6">
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-background text-text-secondary border border-border">
                                                    {blog.mood}
                                                </span>
                                            </td>
                                            <td className="p-6 text-text-secondary text-sm">
                                                {format(new Date(blog.createdAt), "MMM d, yyyy")}
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/blog/${blog.slug}`}
                                                        target="_blank"
                                                        className="p-2 text-text-secondary hover:text-primary transition"
                                                        title="View"
                                                    >
                                                        <FaEye className="w-5 h-5" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/edit/${blog._id}`}
                                                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                                        title="Edit"
                                                    >
                                                        <FaEdit className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
                                                        title="Delete"
                                                    >
                                                        <FaTrash className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
