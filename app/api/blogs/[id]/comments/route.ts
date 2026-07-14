import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Comment from "@/models/Comment";
import User from "@/models/User"; // Register User model
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET all comments for a blog
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();

        // Retrieve comments and populate commenter user info
        const comments = await Comment.find({ blog: id })
            .populate("user", "name image email")
            .sort({ createdAt: -1 });

        return NextResponse.json(comments);
    } catch (error) {
        console.error("Fetch comments error:", error);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
}

// POST a new comment
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
        const { content } = await req.json();

        if (!content || content.trim() === "") {
            return NextResponse.json({ error: "Comment content is required" }, { status: 400 });
        }

        await connectDB();

        // Retrieve User object by email to get their _id
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User profile not found in database" }, { status: 404 });
        }

        const newComment = await Comment.create({
            content,
            user: user._id,
            blog: id,
        });

        const populatedComment = await Comment.findById(newComment._id).populate("user", "name image email");

        return NextResponse.json(populatedComment);
    } catch (error) {
        console.error("Post comment error:", error);
        return NextResponse.json(
            { error: "Failed to post comment" },
            { status: 500 }
        );
    }
}

// DELETE a comment
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { commentId } = await req.json();
        if (!commentId) {
            return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return NextResponse.json({ error: "Comment not found" }, { status: 404 });
        }

        const isOwner = comment.user.toString() === user._id.toString();
        const isAdmin = session.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return NextResponse.json({ error: "Unauthorized to delete this comment" }, { status: 401 });
        }

        await Comment.findByIdAndDelete(commentId);

        return NextResponse.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Delete comment error:", error);
        return NextResponse.json(
            { error: "Failed to delete comment" },
            { status: 500 }
        );
    }
}
