import debug from "debug";

export const useDebug = (namespace: string) => {
  const d = debug(namespace);

  const fn = (message: string, ...args: any[]) => {
    // Only verbose messages if localStorage debug is set
    if (localStorage?.getItem("debug")?.split(",").includes("verbose")) {
      if (args.length === 1) {
        d(message, JSON.parse(JSON.stringify(args[0])));
      } else if (args.length > 1) {
        d(message, JSON.parse(JSON.stringify(args)));
      } else {
        d(message);
      }
    } else {
      d(message);
    }
  };

  // Preserve .extend on the wrapper
  fn.extend = (subNamespace: string) =>
    useDebug(`${namespace}:${subNamespace}`);

  return fn as typeof fn & { extend: (subNamespace: string) => typeof fn };
};
