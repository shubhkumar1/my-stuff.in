import { BlogPost } from "@/types";

interface JsonLdProps {
    post: BlogPost;
    url: string;
}

const JsonLd = ({ post, url }: JsonLdProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage,
        author: {
            "@type": "Person",
            name: post.author?.name || "Shubham Kumar",
        },
        publisher: {
            "@type": "Organization",
            name: "Shubham's Blog",
            logo: {
                "@type": "ImageObject",
                url: "https://yourdomain.com/logo.png", // Placeholder
            },
        },
        datePublished: post.createdAt,
        dateModified: post.createdAt,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default JsonLd;
