// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllMenus, MenuDir } from "../../lib/page-data";

export default (req: NextApiRequest, res: NextApiResponse<Array<MenuDir>>) => {
  let menus = getAllMenus();
  res.status(200).json(menus);
};
