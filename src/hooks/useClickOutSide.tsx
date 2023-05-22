import { useEffect } from "react";

export function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const headerEle = document.getElementById("header");
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        headerEle?.contains(event.target)
      ) {
        return;
      }
      handler(event);
      document.body.style.overflow = "initial";
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
