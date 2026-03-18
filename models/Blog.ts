import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true }, // Store as HTML string or JSON
        coverImage: { type: String },
        mood: {
            type: String,
            enum: ["Productive", "Melancholy", "Excited", "Neutral"],
            default: "Neutral",
        },
        readingTime: { type: String }, // e.g. "3 min read"
        author: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

// Virtual for comment count could be added here if needed

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
