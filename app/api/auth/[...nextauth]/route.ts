import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const { email, name, image } = user;
                    await connectDB();
                    let dbUser = await User.findOne({ email });

                    if (!dbUser) {
                        const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
                        dbUser = await User.create({
                            name,
                            email,
                            image,
                            role: isAdmin ? "admin" : "user",
                        });
                    }

                    return true;
                } catch (error) {
                    console.error("NextAuth signIn callback error:", error);
                    return false;
                }
            }
            return true;
        },
        async session({ session, token }) {
            try {
                if (session.user?.email) {
                    await connectDB();
                    const dbUser = await User.findOne({ email: session.user.email });
                    if (dbUser) {
                        session.user.id = dbUser._id.toString();
                        session.user.role = dbUser.role;
                    }
                }
            } catch (error) {
                console.error("Session callback error:", error);
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin", // Redirect to signin on error
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
