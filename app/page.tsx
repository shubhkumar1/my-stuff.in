import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/types";
import { FaBrain, FaCoins, FaDumbbell, FaRobot, FaArrowRight, FaBookOpen } from "react-icons/fa";
import AnimatedSection from "@/components/AnimatedSection";
import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export const revalidate = 60; // Revalidate every minute

async function getBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(10).lean();
    return JSON.parse(JSON.stringify(blogs)) as BlogPost[];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  const featuredTitle = featuredBlog ? featuredBlog.title : "Clear Your Mind: The Power of 10-Minute Daily Journaling";
  const featuredExcerpt = featuredBlog ? featuredBlog.excerpt : "Why writing down your thoughts for just ten minutes every morning can completely transform your mental focus, calm, and overall productivity throughout the day.";
  const featuredSlug = featuredBlog ? `/blog/${featuredBlog.slug}` : "#explore-blogs";

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Abstract Background Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[50%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pt-24 pb-20 relative z-10">
        
        {/* HERO SECTION */}
        <AnimatedSection className="min-h-[calc(100vh-11rem)] md:min-h-0 flex flex-col items-center justify-center text-center mb-12 max-w-4xl mx-auto">
          <div className="relative mb-8">
            {/* Soft Emerald Green gradient halo blur behind the Brain Emoji badge */}
            <div className="absolute inset-0 -m-8 bg-[#0F6E56]/20 dark:bg-[#5DCAA5]/25 rounded-full blur-[40px] pointer-events-none" />
            <div className="relative inline-block p-1 rounded-full bg-gradient-to-tr from-primary/30 to-primary/10 backdrop-blur-md border border-primary/20">
              <div className="bg-card/90 rounded-full px-5 py-2 text-sm font-semibold text-primary flex items-center gap-2">
                <span>🧠</span> Welcome to Mind-Stuff Blog 🚀
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-black text-foreground mb-8 tracking-tight leading-tight flex flex-wrap justify-center gap-x-4">
            <span>Clear Your Mind.</span>
            <span className="text-primary">Focus Your Life.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed mb-10 text-balance">
            Simple ideas on focus, calm, and getting things done — without the overwhelm.
          </p>
          <Link
            href="/explore"
            className="flex items-center gap-2 px-8 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white dark:bg-[#5DCAA5] dark:hover:bg-[#7ED6B7] dark:text-[#0B132B] font-bold rounded-xl transition-all shadow-lg shadow-[#0F172A]/10 dark:shadow-[#5DCAA5]/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Reading <FaArrowRight />
          </Link>
        </AnimatedSection>

        {/* INTRO SECTION ("Why This Blog?") */}
        <AnimatedSection delay={0.1} className="mb-22 max-w-4xl mx-auto">
          <div className="p-10 md:p-12 relative overflow-hidden text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Why This Blog?
            </h2>
            <p className="text-2xl font-serif italic text-text-secondary mb-6 leading-relaxed">
              Too many thoughts. Too little time. Sound familiar?
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              This is a space for people who want a calmer, clearer mind. No jargon. No boring theory. Just simple, real tips you can use today.
            </p>
          </div>
        </AnimatedSection>

        {/* WHAT YOU'LL FIND HERE ("Made For You") */}
        <AnimatedSection delay={0.2} className="mb-22">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-foreground">
            Made For <span className="text-primary">You</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {[
              {
                title: "Mental Clarity & Self-Improvement",
                desc: (
                  <>
                    Clear your mind, build better habits, feel lighter every day. Powered by real tools like{" "}
                    <a
                      href="https://mind-stuff.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-bold hover:underline inline-flex items-center gap-0.5"
                    >
                      Mind-stuff
                    </a>{" "}
                    — our own AI journaling app built for exactly this.
                  </>
                ),
                icon: <FaBrain className="text-3xl text-text-secondary" />,
              },
              {
                title: "Personal Finance & Investing",
                desc: "Simple money lessons, no confusing jargon. Because less money stress means more mental clarity.",
                icon: <FaCoins className="text-3xl text-text-secondary" />,
              },
              {
                title: "Health & Fitness",
                desc: "Easy tips for body and mind. A healthy body keeps a healthy mind — and that's what this blog is all about.",
                icon: <FaDumbbell className="text-3xl text-text-secondary" />,
              },
              {
                title: "Technology & AI Tools",
                desc: (
                  <>
                    Smart apps and AI tools (including <span className="text-primary font-bold">Mind-stuff</span>) that save your time and quiet your mind.
                  </>
                ),
                icon: <FaRobot className="text-3xl text-text-secondary" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-card border border-border hover:border-primary/20 transition-all duration-300 relative overflow-hidden group shadow-sm flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center mb-6 relative z-10 border border-border">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground relative z-10">{item.title}</h3>
                <div className="text-text-secondary leading-relaxed relative z-10">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-text-secondary italic leading-relaxed">
              "Everything here connects back to one goal: helping you think clearly, live better, and feel in control — with <span className="text-primary font-bold">Mind-stuff</span> as your daily companion for that journey."
            </p>
          </div>
        </AnimatedSection>

        {/* FEATURED POST SECTION ("Start With This") */}
        {/* <AnimatedSection delay={0.2} className="mb-22 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
            <span className="w-4 h-8 bg-primary rounded-sm"></span>
            Start With This
          </h2>

          <div className="bg-card/50 border border-border rounded-3xl overflow-hidden backdrop-blur-xl shadow-lg grid grid-cols-1 lg:grid-cols-2 group hover:border-primary/20 transition-all duration-300">
            {featuredBlog?.coverImage ? (
              <div className="relative h-64 lg:h-auto min-h-[300px] w-full overflow-hidden">
                <Image
                  src={featuredBlog.coverImage}
                  alt={featuredTitle}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="relative h-64 lg:h-auto min-h-[300px] w-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                <FaBookOpen className="text-6xl text-primary/40" />
              </div>
            )}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {featuredBlog && (
                <div className="flex items-center gap-3 mb-4 text-xs text-text-secondary">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary font-semibold rounded-full uppercase tracking-wider">
                    {featuredBlog.mood}
                  </span>
                  <span>{format(new Date(featuredBlog.createdAt), "MMMM d, yyyy")}</span>
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                {featuredTitle}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                {featuredExcerpt}
              </p>
              <Link
                href={featuredSlug}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-hover group-hover:translate-x-1 transition-all"
              >
                Read Now <FaArrowRight />
              </Link>
            </div>
          </div>
        </AnimatedSection> */}

        {/* NEWSLETTER SECTION ("Never Miss a Post") */}
        {/* <AnimatedSection delay={0.2} className="mb-22 max-w-4xl mx-auto text-center">
          <div className="p-10 md:p-14 rounded-3xl bg-[#1C2541] border border-[#2A3454] relative overflow-hidden shadow-xl">
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss a Post
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Get simple tips for a clearer mind, straight to your inbox. No spam. Just value.
            </p>
            <NewsletterForm />
          </div>
        </AnimatedSection> */}

        {/* LATEST POSTS / EXPLORE BLOG SECTION */}
        <div id="explore-blogs" className="scroll-mt-24 mb-32">
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-between mb-10 border-b border-border pb-4">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="w-4 h-8 bg-primary rounded-sm"></span>
                Explore Blogs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <BlogCard key={blog._id} post={blog} index={index} />
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="text-center p-12 bg-card rounded-2xl border border-dashed border-border">
                <p className="text-xl text-text-secondary">No posts yet. My first post is coming soon!</p>
              </div>
            )}
          </AnimatedSection>
        </div>

        {/* FOOTER CTA */}
        <AnimatedSection delay={0.2} className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
            Ready for a Clearer Mind?
          </h2>
          <p className="text-xl text-text-secondary mb-10 leading-relaxed">
            Explore. Learn. Feel lighter.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Blog <FaArrowRight />
          </Link>
        </AnimatedSection>

      </div>
    </main>
  );
}
