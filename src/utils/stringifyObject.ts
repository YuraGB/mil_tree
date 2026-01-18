import stringifyObject from "stringify-object";

export const stringifyObjectUtil = (obj: Record<string, unknown>) => {
  return stringifyObject(obj, {
    indent: "  ",
    singleQuotes: false,
    inlineCharacterLimit: 80,
    transform: (obj, prop, originalResult) => {
      if (prop === "password" || prop === "secret") {
        return "***";
      }
      return originalResult;
    },
  });
};

export default stringifyObjectUtil;
