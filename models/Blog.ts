import mongoose, { Schema, model, models } from "mongoose";

const FAQSchema = new Schema(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
    },
    { _id: false }
);

const BlogSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true }, // Store as HTML string or JSON
        coverImage: { type: String },
        coverImageAlt: { type: String },
        mood: {
            type: String,
            enum: ["Tech", "Finance", "Health", "Mindset"],
            default: "Tech",
        },
        readingTime: { type: String }, // e.g. "3 min read"
        author: { type: Schema.Types.ObjectId, ref: "User" },
        authorName: { type: String, default: "Shubham Kumar" },
        authorType: { type: String, enum: ["Person", "Organization"], default: "Person" },
        authorUrl: { type: String, default: "" },
        likes: { type: [String], default: [] },
        faqs: { type: [FAQSchema], default: [] },
    },
    { timestamps: true }
);

// Virtual for comment count could be added here if needed

if (mongoose.models.Blog) {
    delete mongoose.models.Blog;
}
const Blog = model("Blog", BlogSchema);

export default Blog;
