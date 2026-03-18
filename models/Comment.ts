import mongoose, { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
    {
        content: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    },
    { timestamps: true }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
