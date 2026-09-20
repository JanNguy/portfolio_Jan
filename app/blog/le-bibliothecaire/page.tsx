import fs from "fs";
import path from "path";
import BlogPost from "./BlogPost";

export default function LeBibliothecaire() {
    const filePath = path.join(process.cwd(), "app/blog/le-bibliothecaire/content.md");
    const content = fs.readFileSync(filePath, "utf-8");

    return <BlogPost content={content} />;
}
