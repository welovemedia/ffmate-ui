import { debug } from "debug";

export const useDebug = (namespace: string) => {
  const d = debug(namespace);
  const fn = (message: string, ...args: any[]) => {
    if (localStorage?.getItem("debug")?.split(",").includes("verbose")) {
      if (args && Array.isArray(args) && args.length > 0) {
        if (args.length === 1) {
          d(message, JSON.parse(JSON.stringify(args[0])));
        } else {
          d(message, JSON.parse(JSON.stringify(args)));
        }
      } else {
        d(message);
      }
    } else {
      d(message);
    }
  };
  return fn;
};
