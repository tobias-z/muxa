import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type MenuFile = {
  data: {
    title: string;
  };
  content: string;
  slug: string;
};

let tutorialDir = path.join(process.cwd(), "_content/tutorial");

export function getAllTutorials(): Array<MenuFile> {
  let allTutorials = fs.readdirSync(tutorialDir);
  return allTutorials.map(fileName => {
    let slug = fileName.replace(".md", "");
    let fileContent = fs.readFileSync(
      path.join(tutorialDir, fileName),
      "utf-8"
    );
    let { data, content } = matter(fileContent);
    return {
      data,
      content,
      slug,
    };
  }) as Array<MenuFile>;
}
