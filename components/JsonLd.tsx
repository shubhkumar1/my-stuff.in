import { BlogPost, FAQItem } from "@/types";

interface JsonLdProps {
    post: BlogPost;
    url: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

const JsonLd = ({ post, url }: JsonLdProps) => {
    const imageUrl = post.coverImage || `${siteUrl}/OG.jpg`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        headline: post.title,
        description: post.excerpt,
        image: {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1200,
            height: 630,
        },
        author: {
            "@type": post.authorType || "Person",
            name: post.authorName || post.author?.name || "Shubham Kumar",
            ...(post.authorUrl ? { url: post.authorUrl } : {}),
        },
        publisher: {
            "@type": "Organization",
            name: "Mind-stuff Blog",
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo.png`,
            },
        },
        datePublished: post.createdAt,
        dateModified: post.updatedAt || post.createdAt,
    };

    const hasFaqs = Array.isArray(post.faqs) && post.faqs.length > 0;

    const faqJsonLd = hasFaqs
        ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faqs!.map((faq: FAQItem) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                  },
              })),
          }
        : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
        </>
    );
};

export default JsonLd;
