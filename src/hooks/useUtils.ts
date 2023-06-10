import { useMemo } from "react";

const useUtils = () => {
  const truncateString = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }

    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;

    const truncationLength = Math.floor((maxLength - ellipsisLength) / 2);
    const truncatedText =
      text.slice(0, truncationLength) +
      ellipsis +
      text.slice(text.length - truncationLength);

    return truncatedText;
  };

  function equals<T>(
    obj1: T,
    obj2: T,
    ignoreProperties: string[] = []
  ): boolean {
    //@ts-ignore
    const keys = Object.keys(obj1) as Array<keyof T>;

    for (const key of keys) {
      if (ignoreProperties.includes(key as string)) {
        continue;
      }

      const value1 = obj1[key];
      const value2 = obj2[key];

      if (typeof value1 === "object" && typeof value2 === "object") {
        if (!equals(value1, value2, ignoreProperties)) {
          return false;
        }
      } else if (value1 !== value2) {
        return false;
      }
    }

    return true;
  }

  function isDecimalOrInteger(num: number): boolean {
    return num % 1 !== 0;
  }

  return {
    truncateString,
    equals,
    isDecimalOrInteger,
  };
};

export default useUtils;
