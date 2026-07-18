export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    coverImageAlt?: string;
    mood: "Tech" | "Finance" | "Health" | "Mindset";
    readingTime?: string;
    createdAt: string;
    author?: {
        name: string;
        image: string;
    };
    likes?: string[];
}
