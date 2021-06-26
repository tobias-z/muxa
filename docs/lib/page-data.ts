import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type MenuFile = {
  data: {
    title: string;
    parent: string;
    link: string;
  };
  content: string;
  slug: string;
};

export type MenuDir = {
  title: string;
  files: Array<MenuFile>;
};

let directories = path.join(process.cwd(), "_content");

export function getAllMenus(): Array<MenuDir> {
  let allDirectories = fs.readdirSync(directories);
  let menus: Array<MenuDir> = [];
  for (let directory of allDirectories) {
    menus.push(getDirectory(directory));
  }
  return menus;
}

export function getDirectory(directory: string): MenuDir {
  let foundDirectory = path.join(process.cwd(), `_content/${directory}`);
  let allFiles = fs.readdirSync(foundDirectory);

  let menuFiles = allFiles.map(fileName => {
    let slug = fileName.replace(".md", "");
    let fileContent = fs.readFileSync(
      path.join(foundDirectory, fileName),
      "utf-8"
    );
    let { data, content } = matter(fileContent);
    return {
      data: {
        ...data,
        link: `${directory}/${slug}`,
      },
      content,
      slug,
    };
  }) as Array<MenuFile>;

  return {
    title: menuFiles[0].data.parent,
    files: menuFiles,
  };
}
