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
            enum: ["Tech", "Finance", "Health", "Mindset"],
            default: "Tech",
        },
        readingTime: { type: String }, // e.g. "3 min read"
        author: { type: Schema.Types.ObjectId, ref: "User" },
        likes: { type: [String], default: [] },
    },
    { timestamps: true }
);

// Virtual for comment count could be added here if needed

if (mongoose.models.Blog) {
    delete mongoose.models.Blog;
}
const Blog = model("Blog", BlogSchema);

export default Blog;
