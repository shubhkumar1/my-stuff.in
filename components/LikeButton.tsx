"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
    blogId: string;
    initialLikes?: number; // In a real app, pass this
}

const LikeButton = ({ blogId, initialLikes = 0 }: LikeButtonProps) => {
    const { data: session } = useSession();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);

    const handleLike = async () => {
        if (!session) {
            signIn("google");
            return;
        }

        // Optimistic update
        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));

        // Call API (implementation needed)
        try {
            // await fetch('/api/likes', { ... })
        } catch (err) {
            // Revert
            setLiked(!liked);
            setLikes((prev) => (liked ? prev + 1 : prev - 1));
        }
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${liked
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
                    : "bg-background text-text-secondary border border-border hover:bg-border"
                }`}
        >
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span className="font-medium">{likes} Likes</span>
        </button>
    );
};

export default LikeButton;
