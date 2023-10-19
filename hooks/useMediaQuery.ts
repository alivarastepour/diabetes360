import { TMediaQuery } from "@/types/TMediaQuery";
import { useEffect, useRef, useState } from "react";

const useMediaQuery = ({ queries }: { queries: TMediaQuery[] }) => {
  const [queriesResult, setQueriesResult] = useState<boolean[]>([]);
  const resizeHandlerGuard = useRef<boolean>(false);

  useEffect(() => {
    if (!window) return;

    const compareQueries = (width: number) => {
      const newQueriesResult: boolean[] = [];
      for (const query of queries) {
        const splitQuery = query.split("-");
        const [comparator, value] = splitQuery;
        const res = comparator === "sm" ? +value > width : +value < width;
        newQueriesResult.push(res);
      }

      setQueriesResult(newQueriesResult);
    };

    const resizeHandler = () => {
      if (resizeHandlerGuard.current) return;
      resizeHandlerGuard.current = true;
      const width = window.innerWidth;
      compareQueries(width);
      setTimeout(() => {
        resizeHandlerGuard.current = false;
      }, 100);
    };

    window.addEventListener("resize", resizeHandler);
    resizeHandler();

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  });
  return queriesResult;
};

export default useMediaQuery;
