import mongoose, { Schema, model, models } from "mongoose";

const LikeSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    },
    {
        timestamps: true,
    }
);

// Ensure a user can only like a blog once
LikeSchema.index({ user: 1, blog: 1 }, { unique: true });

const Like = models.Like || model("Like", LikeSchema);

export default Like;
