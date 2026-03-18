import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET blog by ID
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}

// DELETE blog
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();
        await Blog.findByIdAndDelete(id);

        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete blog" },
            { status: 500 }
        );
    }
}

// UPDATE blog (PUT)
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { title, slug, excerpt, content, coverImage, mood } = await req.json();

        await connectDB();
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                title,
                slug,
                excerpt,
                content,
                coverImage,
                mood,
                readingTime: `${Math.ceil(content.split(" ").length / 200)} min read`,
            },
            { new: true }
        );

        return NextResponse.json(updatedBlog);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update blog" },
            { status: 500 }
        );
    }
}
