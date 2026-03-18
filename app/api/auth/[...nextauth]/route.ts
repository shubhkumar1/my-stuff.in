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
        async signIn({ user, account, profile }) {
            console.log("---- SIGNIN CALLBACK START ----");
            console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

            if (account?.provider === "google") {
                try {
                    const { email, name, image } = user;
                    console.log(`Attempting to sign in user: ${email}`);

                    // Connect to DB
                    console.log("Connecting to MongoDB...");
                    await connectDB();
                    console.log("Connected to MongoDB.");

                    // Check if user exists
                    console.log("Finding user in DB...");
                    let dbUser = await User.findOne({ email });

                    if (!dbUser) {
                        console.log("User not found. Creating new user...");
                        const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

                        dbUser = await User.create({
                            name,
                            email,
                            image,
                            role: isAdmin ? "admin" : "user",
                        });
                        console.log("User created:", dbUser);
                    } else {
                        console.log("User found:", dbUser);
                    }

                    console.log("---- SIGNIN CALLBACK SUCCESS ----");
                    return true;
                } catch (error) {
                    console.error("---- SIGNIN CALLBACK ERROR ----");
                    console.error(error);
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
    debug: true, // Enable NextAuth debug mode
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
