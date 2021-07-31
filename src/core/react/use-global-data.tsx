import GlobalData from "../cache/global-data";
import { useRouterCache } from "./router";

export default function useGlobalData<T = any>() {
  let cache = useRouterCache();
  return cache.globalData as GlobalData<T>;
}
