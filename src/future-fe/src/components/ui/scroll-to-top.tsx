import react, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactElement;
}

export default function ScrollToTop({ children }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    const canControlScrollRestoration = "scrollRestoration" in window.history;
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
