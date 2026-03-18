import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { BlogPost } from "@/types";
import ExploreClient from "./ExploreClient";

export const revalidate = 60; // Revalidate every minute

async function getAllBlogs() {
  await connectDB();
  // Fetch all blogs to allow client-side filtering and sorting
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(blogs)) as BlogPost[];
}

export default async function ExplorePage() {
  const allBlogs = await getAllBlogs();

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Background blobs to match styles */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10">
        <ExploreClient initialBlogs={allBlogs} />
      </div>
    </main>
  );
}
