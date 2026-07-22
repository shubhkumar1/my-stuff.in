export interface FAQItem {
    question: string;
    answer: string;
}

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
    updatedAt?: string;
    author?: {
        name: string;
        image: string;
    };
    authorName?: string;
    authorType?: "Person" | "Organization";
    authorUrl?: string;
    likes?: string[];
    commentsCount?: number;
    faqs?: FAQItem[];
}

