import { useRef, useEffect } from "react";

export default function useIsMounted(): { current: boolean } {
  const is_mounted = useRef<boolean>(false);

  useEffect(function () {
    is_mounted.current = true;

    return function () {
      is_mounted.current = false;
    };
  }, []);

  return is_mounted;
}
