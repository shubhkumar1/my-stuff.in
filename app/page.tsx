import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/types";
import { FaLaptopCode, FaBrain, FaHammer, FaBullhorn, FaArrowRight } from "react-icons/fa";
import AnimatedSection from "@/components/AnimatedSection";

export const revalidate = 60; // Revalidate every minute

async function getBlogs() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(10).lean();
  return JSON.parse(JSON.stringify(blogs)) as BlogPost[];
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Abstract Animated Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[50%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pt-24 pb-20 relative z-10">
        {/* HERO SECTION */}
        <AnimatedSection className="flex flex-col items-center text-center mb-32 max-w-4xl mx-auto">
          <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-primary/50 to-accent/50 mb-8 backdrop-blur-md">
            <div className="bg-card/80 rounded-full px-4 py-1.5 text-sm font-medium text-primary">
              Welcome to My-Stuff.in 🚀
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-black text-foreground mb-8 tracking-tight leading-tight flex flex-wrap justify-center gap-x-4">
            <span>A digital</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">notebook</span>
            <span>for my journey.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed mb-10 text-balance">
            My-Stuff.in is a simple space on the internet where I share my journey as an Indian UG student — the things I learn, build, explore, and sometimes mess up while figuring out life, tech, and studies.
          </p>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl text-balance">
            If you are also a student trying to learn new skills, discover useful tools, or stay updated with tech, then you’re at the right place. Think of this blog as a digital notebook where I document everything useful that can help other students too.
          </p>
        </AnimatedSection>

        {/* WHAT YOU'LL FIND GRID */}
        <AnimatedSection delay={0.2} className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-foreground">
            What You’ll Find <span className="text-primary">Here</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                title: "Student Tech & Tools",
                desc: "I regularly share useful tools, software, AI tools, and productivity apps that can help students work smarter. From free resources to hidden gems, you’ll discover tools that can make your study life easier.",
                icon: <FaLaptopCode className="text-3xl text-primary" />,
                gradient: "from-primary/10 to-transparent",
              },
              {
                title: "My Learning Journey",
                desc: "This blog is also about my personal learning journey as a UG student in India. I’ll share experiences, mistakes, lessons, and things I discover while exploring technology, blogging, and building projects.",
                icon: <FaBrain className="text-3xl text-accent" />,
                gradient: "from-accent/10 to-transparent",
              },
              {
                title: "Projects & Things I Build",
                desc: "Sometimes I build small tools, experiments, or web projects. Whenever I create something useful, I’ll share it here with details on how it works and how students can use it.",
                icon: <FaHammer className="text-3xl text-primary-hover" />,
                gradient: "from-primary-hover/10 to-transparent",
              },
              {
                title: "Latest Updates & Experiments",
                desc: "Expect posts about new trends, tech updates, student resources, and experiments I try while learning new things. Basically, if I find something interesting or useful, it will land here.",
                icon: <FaBullhorn className="text-3xl text-accent" />,
                gradient: "from-accent/10 to-transparent",
              }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden group`}>
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${item.gradient} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center shadow-sm mb-6 relative z-10 border border-border">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground relative z-10">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* WHY THIS BLOG EXISTS & WHO IS IT FOR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <AnimatedSection delay={0.2} className="p-10 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
              Why This Blog Exists <span className="text-2xl">✨</span>
            </h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              Many students want to learn new things but don’t know where to start. I created My-Stuff.in to share real experiences instead of just theory.
            </p>
            <p className="text-lg font-medium text-foreground mb-4">Here you will find:</p>
            <ul className="space-y-3">
              {['Practical insights', 'Honest experiences', 'Useful tools for students', 'Resources for learning new skills'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-secondary">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-text-secondary italic">
              Everything is shared from a student perspective so it stays simple and relatable.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="p-10 rounded-3xl bg-card/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-border backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
              Who Is This For? <span className="text-2xl">🎯</span>
            </h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              This website is especially helpful if you find yourself in one of these groups:
            </p>
            <div className="space-y-4">
              {[
                'UG students in India',
                'Students interested in technology & software tools',
                'Beginners exploring blogging, coding, and productivity tools',
                'Anyone who loves learning new things'
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-background border border-border flex items-start gap-4">
                  <FaArrowRight className="text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              If you are curious and love exploring new stuff, you’ll feel at home here.
            </p>
          </AnimatedSection>
        </div>

        {/* CALL TO ACTION */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-32">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
            Let’s Learn & Build Together
          </h2>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            My-Stuff.in is not just a blog — it’s a growing collection of ideas, experiments, and student resources. If you enjoy discovering new tools, learning practical skills, and seeing how a student builds things step by step, then stay around.
          </p>
          <p className="text-2xl font-serif italic text-primary mb-10">
            "Because sometimes the best learning happens when we simply share our stuff."
          </p>
        </AnimatedSection>
        
        {/* LATEST THOUGHTS BLOG GRID */}
        <div id="explore-blogs" className="scroll-mt-24">
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-between mb-10 border-b border-border pb-4">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="w-4 h-8 bg-gradient-to-b from-primary to-accent rounded-sm"></span>
                Latest Posts
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
      </div>
    </main>
  );
}
