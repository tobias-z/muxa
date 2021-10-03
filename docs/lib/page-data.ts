import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type MenuFile = {
  data: {
    title: string;
    description: string;
    parent: string;
    link: string;
    order: number;
  };
  content: string;
  slug: string;
};

export type MenuDir = {
  title: string;
  directoryName: string;
  files: Array<MenuFile>;
};

const directories = path.join(process.cwd(), "_content");

export function getAllMenus(): Array<MenuDir> {
  const allDirectories = fs.readdirSync(directories);
  const menus: Array<MenuDir> = [];
  for (const directory of allDirectories) {
    menus.push(getDirectory(directory));
  }
  return menus;
}

export function getDirectory(directory: string): MenuDir {
  const foundDirectory = path.join(process.cwd(), `_content/${directory}`);
  const allFiles = fs.readdirSync(foundDirectory);

  const unorderedMenuFiles = allFiles.map(fileName => {
    const slug = fileName.replace(".md", "");
    const fileContent = fs.readFileSync(
      path.join(foundDirectory, fileName),
      "utf-8"
    );
    const { data, content } = matter(fileContent);
    return {
      data: {
        ...data,
        link: `${directory.substr(2, directory.length)}/${slug}`,
      },
      content,
      slug,
    };
  }) as Array<MenuFile>;

  const orderedMenufiles = getOrderedMenuFiles(unorderedMenuFiles, [], 1);

  if (!orderedMenufiles) {
    throw new Error("No menu files were found for directory: " + directory);
  }

  return {
    directoryName: directory,
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
  for (const menu of unorderedMenus) {
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
