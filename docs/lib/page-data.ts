import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type MenuFile = {
  data: {
    title: string;
    parent: string;
    link: string;
    order: number;
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

  let unorderedMenuFiles = allFiles.map(fileName => {
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

  let orderedMenufiles = getOrderedMenuFiles(unorderedMenuFiles, [], 1);

  if (!orderedMenufiles) {
    throw new Error("No menu files were found for directory: " + directory);
  }

  return {
    title: orderedMenufiles[0].data.parent,
    files: orderedMenufiles,
  };
}

// Recursively order by given order
function getOrderedMenuFiles(
  unorderedMenus: Array<MenuFile>,
  currentMenus: Array<MenuFile>,
  orderCount: number
): Array<MenuFile> {
  for (let menu of unorderedMenus) {
    if (menu.data.order === orderCount) {
      currentMenus.push(menu);
      break;
    }
  }
  if (orderCount === unorderedMenus.length) {
    return currentMenus;
  }
  return getOrderedMenuFiles(unorderedMenus, currentMenus, ++orderCount);
}
