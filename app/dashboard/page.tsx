import { BlogPostCard } from "@/components/general/BlogPostCard";
import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { prisma } from "../utils/db";

// Define the type for your blog post data
type BlogPost = {
    id: string;
    title: string;
    content: string;
    // Add other properties your BlogPostCard expects
    createdAt?: Date;
    updatedAt?: Date;
    authorId?: string;
    // Include any other fields your card might need
};

async function getData(userId: string): Promise<BlogPost[]> {
    const data = await prisma.blogPost.findMany({
        where: {
            authorId: userId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return data;
}

export default async function CreateBlogRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return <div>Please sign in to view your blog posts</div>;
    }
    
    const data = await getData(user.id);
    
    if (!data || data.length === 0) {
        return (
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium">Your Blog Articles</h2>
                    <Link className={buttonVariants()} href={"/dashboard/create"}>Create Post</Link>
                </div>
                <p>No blog posts found. Create your first post!</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Your Blog Articles</h2>
                <Link className={buttonVariants()} href={"/dashboard/create"}>Create Post</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item: BlogPost) => (
                    <BlogPostCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
}