import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type TMediaQuery = `${"sm" | "lg"}-${number}`;
// type TMediaQueryDispatcher =

class MediaQuerySingleton {
  private static isInitialized: boolean = false;
  private static queryList: TMediaQuery[] = [];
  private static queryResult: Record<TMediaQuery, boolean> = {};
  private static listenerDelay: boolean = false;
  private static listenerDelayAmount = 100;
  public static dispatchersMap: {
    [id: string]: React.Dispatch<
      React.SetStateAction<Record<TMediaQuery, boolean>>
    >;
  }[];
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

  public get queryList(): TMediaQuery[] {
    return MediaQuerySingleton.queryList;
  }

  public addToDispatchers(
    id: string,
    dispatcher: React.Dispatch<
      React.SetStateAction<Record<TMediaQuery, boolean>>
    >
  ) {
    if (Object.keys(MediaQuerySingleton.dispatchersMap).includes(id)) return;
    MediaQuerySingleton.dispatchersMap.push({ [id]: dispatcher });
  }

  public get queryResult(): Record<TMediaQuery, boolean> {
    return MediaQuerySingleton.queryResult;
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

    for (const obj of MediaQuerySingleton.dispatchersMap) {
      Object.values(obj)[0](MediaQuerySingleton.queryResult);
    }

    setTimeout(() => {
      MediaQuerySingleton.listenerDelay = false;
    }, MediaQuerySingleton.listenerDelayAmount);
  }

  public addQueries(queries: TMediaQuery[]) {
    for (const query of queries) {
      if (!MediaQuerySingleton.queryList.includes(query)) {
        MediaQuerySingleton.queryList.push(query);
      }
    }
    MediaQuerySingleton.resizeListener(true);
  }
}

function mediaQueryFactory() {
  return new MediaQuerySingleton();
}

const mediaQuery = mediaQueryFactory();

const useMediaQuery = <T extends TMediaQuery[]>({
  queries,
}: {
  queries: T;
}): Record<T[number], boolean> => {
  const [result, setResult] = useState<Record<TMediaQuery, boolean>>({});
  const ref = useRef<null | string>(null);
  console.log("also here");

  useEffect(() => {
    if (!ref.current) {
      console.log("not here");

      ref.current = uuidv4();
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    console.log("here");

    mediaQuery.addToDispatchers(ref.current, setResult);
    mediaQuery.addQueries(queries);
  }, [queries, setResult]);

  return result;
};

export default useMediaQuery;
