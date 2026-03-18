"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

interface CommentSectionProps {
    blogId: string;
}

const CommentSection = ({ blogId }: CommentSectionProps) => {
    const { data: session } = useSession();
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            signIn("google");
            return;
        }
        // API call placeholder
        setComments([...comments, { text: newComment, author: session.user?.name, createdAt: new Date() }]);
        setNewComment("");
    };

    return (
        <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-2xl font-bold mb-6 font-serif text-foreground">Comments ({comments.length})</h3>

            {session ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full p-4 border rounded-xl bg-background border-border focus:ring-2 focus:ring-primary outline-none text-foreground"
                        rows={3}
                        required
                    />
                    <button
                        type="submit"
                        className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                    >
                        Post Comment
                    </button>
                </form>
            ) : (
                <div className="bg-card border border-border p-6 rounded-xl text-center mb-8">
                    <p className="mb-4 text-text-secondary">Log in to join the conversation.</p>
                    <button onClick={() => signIn("google")} className="px-6 py-2 bg-background border border-border rounded shadow-sm hover:hover:bg-border text-foreground transition">
                        Sign in with Google
                    </button>
                </div>
            )}

            {/* Comment List Placeholder */}
            <div className="space-y-6">
                {comments.map((comment, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-border flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-sm text-foreground">{comment.author}</h4>
                            <p className="text-text-secondary mt-1">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
