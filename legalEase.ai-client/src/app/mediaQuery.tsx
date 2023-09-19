"use client";
import { useEffect, useState } from "react";

const getIsMobile = () => global.innerWidth <= 768;

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    global.addEventListener("resize", onResize);

    return () => {
      global.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
}
