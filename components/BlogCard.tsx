"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlogPost } from "@/types";
import { format } from "date-fns";
import clsx from "clsx";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const moodColors = {
    Productive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    Melancholy: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
    Excited: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    Neutral: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
};

const BlogCard = ({ post, index }: BlogCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
            <Link href={`/blog/${post.slug}`} className="block h-full flex flex-col">
                {post.coverImage && (
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                        <span
                            className={clsx(
                                "text-xs px-2 py-1 rounded-full font-medium",
                                moodColors[post.mood] || moodColors.Neutral
                            )}
                        >
                            {post.mood}
                        </span>
                        <span className="text-xs text-text-secondary">
                            {format(new Date(post.createdAt), "MMM d, yyyy")}
                        </span>
                    </div>
                    <h2 className="text-xl font-serif font-bold mb-2 text-foreground line-clamp-2">
                        {post.title}
                    </h2>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-text-secondary">
                        <span>{post.readingTime || "3 min read"}</span>
                        <span className="font-medium text-primary group-hover:underline">
                            Read more →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default BlogCard;
