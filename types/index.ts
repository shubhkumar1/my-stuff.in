export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    mood: "Productive" | "Melancholy" | "Excited" | "Neutral";
    readingTime?: string;
    createdAt: string;
    author?: {
        name: string;
        image: string;
    };
}
