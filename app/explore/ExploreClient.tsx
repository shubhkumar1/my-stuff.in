"use client";

import { useState, useMemo } from "react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/types";
import AnimatedSection from "@/components/AnimatedSection";

export default function ExploreClient({ initialBlogs }: { initialBlogs: BlogPost[] }) {
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [selectedMood, setSelectedMood] = useState<"All" | "Productive" | "Melancholy" | "Excited" | "Neutral">("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAndSortedBlogs = useMemo(() => {
        let result = [...initialBlogs];

        // Filter by mood
        if (selectedMood !== "All") {
            result = result.filter(blog => blog.mood === selectedMood);
        }

        // Search by title or excerpt
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                blog =>
                    blog.title.toLowerCase().includes(query) ||
                    blog.excerpt.toLowerCase().includes(query)
            );
        }

        // Sort by date
        result.sort((a, b) => {
             const dateA = new Date(a.createdAt).getTime();
             const dateB = new Date(b.createdAt).getTime();
             
             if (sortOrder === "newest") {
                 return dateB - dateA;
             } else {
                 return dateA - dateB;
             }
        });

        return result;
    }, [initialBlogs, sortOrder, selectedMood, searchQuery]);

    const moods = ["All", "Productive", "Melancholy", "Excited", "Neutral"];

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pt-24 pb-20">
            <AnimatedSection className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
                    Explore <span className="text-primary">Blogs</span>
                </h1>
                <p className="text-xl text-text-secondary leading-relaxed max-w-3xl">
                    Discover thoughts, tutorials, and experiences categorised by how they felt when written.
                </p>
            </AnimatedSection>

            {/* Filters and Controls */}
            <AnimatedSection delay={0.1} className="mb-12 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-card/50 p-6 rounded-2xl border border-border backdrop-blur-sm">
                 <div className="w-full lg:w-1/3">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="w-full bg-background border border-border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                     {/* Mood Filter */}
                     <div className="flex flex-wrap gap-2">
                         {moods.map((mood) => (
                             <button
                                 key={mood}
                                 onClick={() => setSelectedMood(mood as any)}
                                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                     selectedMood === mood
                                         ? "bg-primary text-white shadow-md shadow-primary/20"
                                         : "bg-background border border-border text-text-secondary hover:border-primary/50 hover:text-primary"
                                 }`}
                             >
                                 {mood}
                             </button>
                         ))}
                     </div>

                     {/* Sort Order */}
                     <select
                         value={sortOrder}
                         onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                         className="bg-background border border-border text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none min-w-[140px] cursor-pointer"
                     >
                         <option value="newest">Newest First</option>
                         <option value="oldest">Oldest First</option>
                     </select>
                 </div>
            </AnimatedSection>

            {/* Results */}
            <AnimatedSection delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedBlogs.map((blog, index) => (
                        <BlogCard key={blog._id} post={blog} index={index} />
                    ))}
                </div>

                {filteredAndSortedBlogs.length === 0 && (
                    <div className="text-center p-16 bg-card/30 rounded-3xl border border-dashed border-border mt-8">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">No blogs found</h3>
                        <p className="text-text-secondary">Try adjusting your filters or search query.</p>
                        <button 
                            onClick={() => {
                                setSelectedMood("All");
                                setSearchQuery("");
                            }}
                            className="mt-6 px-6 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all font-medium border border-primary/20"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </AnimatedSection>
        </div>
    );
}
