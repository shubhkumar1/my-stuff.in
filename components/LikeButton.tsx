"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
    blogId: string;
    initialLikes?: number;
    hasLiked?: boolean;
}

const LikeButton = ({ blogId, initialLikes = 0, hasLiked = false }: LikeButtonProps) => {
    const { data: session } = useSession();
    const [liked, setLiked] = useState(hasLiked);
    const [likes, setLikes] = useState(initialLikes);

    useEffect(() => {
        setLiked(hasLiked);
    }, [hasLiked]);

    useEffect(() => {
        setLikes(initialLikes);
    }, [initialLikes]);

    const handleLike = async () => {
        if (!session) {
            signIn("google");
            return;
        }

        const currentLiked = liked;
        const currentLikes = likes;

        // Optimistic update
        setLiked(!currentLiked);
        setLikes((prev) => (currentLiked ? prev - 1 : prev + 1));

        try {
            const res = await fetch(`/api/blogs/${blogId}/like`, {
                method: "POST",
            });
            if (!res.ok) {
                throw new Error("Failed to like");
            }
            const data = await res.json();
            setLikes(data.likesCount);
            setLiked(data.liked);
        } catch (err) {
            console.error(err);
            // Revert
            setLiked(currentLiked);
            setLikes(currentLikes);
        }
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${liked
                    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-200"
                    : "bg-background text-text-secondary border border-border hover:bg-border"
                }`}
        >
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span className="font-medium">{likes} Likes</span>
        </button>
    );
};

export default LikeButton;
