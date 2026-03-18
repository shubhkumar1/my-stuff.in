import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, required: true },
        image: { type: String },
        emailVerified: { type: Date, null: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
