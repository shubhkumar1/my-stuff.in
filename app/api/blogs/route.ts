import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, slug, excerpt, content, coverImage, mood } = body;

        await connectDB();

        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            return NextResponse.json(
                { error: "Slug already exists" },
                { status: 400 }
            );
        }

        const blog = await Blog.create({
            title,
            slug,
            excerpt,
            content,
            coverImage,
            mood,
            author: session.user.id,
            readingTime: `${Math.ceil(content.split(" ").length / 200)} min read`,
        });

        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create blog" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate("author", "name image");
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}
