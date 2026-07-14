import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const userEmail = session.user.email;

        await connectDB();
        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        const likes = blog.likes || [];
        const hasLiked = likes.includes(userEmail);

        let updatedBlog;
        if (hasLiked) {
            updatedBlog = await Blog.findByIdAndUpdate(
                id,
                { $pull: { likes: userEmail } },
                { new: true }
            );
        } else {
            updatedBlog = await Blog.findByIdAndUpdate(
                id,
                { $addToSet: { likes: userEmail } },
                { new: true }
            );
        }

        return NextResponse.json({
            likesCount: updatedBlog?.likes?.length || 0,
            liked: !hasLiked
        });
    } catch (error) {
        console.error("Like API error:", error);
        return NextResponse.json(
            { error: "Failed to toggle like" },
            { status: 500 }
        );
    }
}
