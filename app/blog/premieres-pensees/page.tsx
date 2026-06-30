import fs from "fs";
import path from "path";
import BlogPost from "./BlogPost";

export default function PremieresPensees() {
    const filePath = path.join(process.cwd(), "app/blog/premieres-pensees/content.md");
    const content = fs.readFileSync(filePath, "utf-8");

    return <BlogPost content={content} />;
}
