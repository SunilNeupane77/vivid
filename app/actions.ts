"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";

export async function handleSubission(formData:FormData){
const { getUser } = getKindeServerSession();
const user = await getUser();
const title = formData.get("title");
const content = formData.get("content");
const url = formData.get("url");
const data = await prisma.blogPost.create({
    data: {
        title: title as string,
        content: content as string,
        imageUrl: url as string,
        authorId: user.id,
        authorImage: user.picture as string,
        authorName: user.given_name as string,
    }
});
 return redirect("/dashboard")
}
