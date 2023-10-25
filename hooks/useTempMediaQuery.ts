import { TMediaQuery } from "@/types/TMediaQuery";
import { useEffect, useMemo } from "react";

class MediaQuerySingleton {
  private static isInitialized: boolean = false;
  private static queryList: TMediaQuery[] = [];
  private static queryResult: Record<TMediaQuery, boolean> = {};
  private static listenerDelay: boolean = false;
  private static listenerDelayAmount = 100;

  constructor(listenerDelayAmount?: number) {
    if (MediaQuerySingleton.isInitialized) {
      throw Error("reinitializing a singleton class");
    }
    if (typeof window === "object") {
      MediaQuerySingleton.queryList = [];
      MediaQuerySingleton.isInitialized = true;

      if (listenerDelayAmount) {
        MediaQuerySingleton.listenerDelayAmount = listenerDelayAmount;
      }

      window.addEventListener(
        "resize",
        MediaQuerySingleton.eventListenerCallback
      );
    }
  }

  private static eventListenerCallback() {
    MediaQuerySingleton.resizeListener(false);
  }

  private static resizeListener(passDelay?: boolean) {
    if (MediaQuerySingleton.listenerDelay && !passDelay) {
      return;
    }

    MediaQuerySingleton.listenerDelay = true;
    MediaQuerySingleton.queryResult = {};
    const width = window.innerWidth;

    for (const query of MediaQuerySingleton.queryList) {
      const splitQuery = query.split("-");
      const comparator = splitQuery[0];
      const value = splitQuery[1];
      const res = comparator === "sm" ? width < +value : +value < width;
      MediaQuerySingleton.queryResult[query] = res;
    }
    setTimeout(() => {
      MediaQuerySingleton.listenerDelay = false;
    }, MediaQuerySingleton.listenerDelayAmount);
  }

  public get queryList(): TMediaQuery[] {
    return MediaQuerySingleton.queryList;
  }

  public addQueries(queries: TMediaQuery[]) {
    for (const query of queries) {
      if (!MediaQuerySingleton.queryList.includes(query)) {
        MediaQuerySingleton.queryList.push(query);
      }
    }
    MediaQuerySingleton.resizeListener(true);
  }

  public get queryResult(): Record<TMediaQuery, boolean> {
    return MediaQuerySingleton.queryResult;
  }
}

function mediaQueryFactory() {
  return new MediaQuerySingleton();
}
const mediaQuery = mediaQueryFactory();

export const useTempMediaQuery = ({ queries }: { queries: TMediaQuery[] }) => {
  useEffect(() => {
    mediaQuery.addQueries(queries);
  }, []);

  useEffect(() => {
    console.log("changed");
  }, [mediaQuery.queryResult]);

  return useMemo(() => mediaQuery.queryResult, [mediaQuery.queryResult]);
};
