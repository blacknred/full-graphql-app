import { useRef, useState, useEffect, useCallback } from "react";

const config: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: [0, 1],
};

/** Is an element in the viewport hook  */

function useOnViewport(
  handler?: (v: boolean, n: HTMLElement) => any,
  options: IntersectionObserverInit = config
) {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const [node, setNode] = useState<HTMLElement>();
  const savedHandler = useRef<any>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!("IntersectionObserver" in window) || !node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (savedHandler.current) {
        savedHandler.current(entry.isIntersecting, node);
      } else {
        setIntersecting(entry.isIntersecting);
      }
    }, options);

    // Start observing the target node for configured mutations
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, options]);

  const ref = useCallback(
    (node: HTMLDivElement) => {
      setNode(node);
    },
    [setNode]
  );

  return [ref, isIntersecting];
}

export default useOnViewport;
