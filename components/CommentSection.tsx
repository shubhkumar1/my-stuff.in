"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { FaTrash } from "react-icons/fa";

interface CommentSectionProps {
    blogId: string;
}

const CommentSection = ({ blogId }: CommentSectionProps) => {
    const { data: session } = useSession();
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/blogs/${blogId}/comments`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        };

        if (blogId) {
            fetchComments();
        }
    }, [blogId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            signIn("google");
            return;
        }

        try {
            const res = await fetch(`/api/blogs/${blogId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newComment }),
            });

            if (res.ok) {
                const postedComment = await res.json();
                setComments((prev) => [postedComment, ...prev]);
                setNewComment("");
            } else {
                alert("Failed to post comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("Error posting comment");
        }
    };

    const handleDelete = async (commentId: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        try {
            const res = await fetch(`/api/blogs/${blogId}/comments`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ commentId }),
            });

            if (res.ok) {
                setComments((prev) => prev.filter((c) => c._id !== commentId));
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("Error deleting comment");
        }
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
                    <button onClick={() => signIn("google")} className="px-6 py-2 bg-background border border-border rounded shadow-sm hover:bg-border text-foreground transition">
                        Sign in with Google
                    </button>
                </div>
            )}

            {/* Comment List */}
            {loading ? (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : comments.length === 0 ? (
                <p className="text-text-secondary text-center py-4">No comments yet. Be the first to comment!</p>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment._id} className="flex gap-4 items-start group relative py-3 px-3 -mx-3 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                            {comment.user?.image ? (
                                <img
                                    src={comment.user.image}
                                    className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                                    alt={comment.user.name || "User"}
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-border flex-shrink-0 flex items-center justify-center text-text-secondary font-bold">
                                    {comment.user?.name ? comment.user.name[0].toUpperCase() : "?"}
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-sm text-foreground">{comment.user?.name || "Anonymous"}</h4>
                                    <span className="text-xs text-text-secondary">
                                        {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <p className="text-text-secondary mt-1 whitespace-pre-wrap">{comment.content}</p>
                            </div>
                            {session?.user?.email && (session.user.email === comment.user?.email || session.user.role === "admin") && (
                                <button
                                    onClick={() => handleDelete(comment._id)}
                                    className="opacity-0 group-hover:opacity-100 absolute right-3 top-3 p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all rounded hover:bg-red-50 dark:hover:bg-red-950/30"
                                    title="Delete Comment"
                                >
                                    <FaTrash size={14} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentSection;
