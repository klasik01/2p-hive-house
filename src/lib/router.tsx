import { useEffect, useState } from "react";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

export const appPaths = ["/", "/ubytovani", "/rybareni", "/vylety", "/vcelin-glamping", "/rezervace"] as const;
export type AppPath = (typeof appPaths)[number];

type LocationState = {
  pathname: string;
  hash: string;
};

function normalizePath(pathname: string): string {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return normalized || "/";
}

function readLocation(): LocationState {
  if (typeof window === "undefined") return { pathname: "/", hash: "" };
  return {
    pathname: normalizePath(window.location.pathname),
    hash: window.location.hash,
  };
}

export function navigateTo(href: string, options?: { replace?: boolean }) {
  if (typeof window === "undefined") return;

  const url = new URL(href, window.location.origin);

  if (url.origin !== window.location.origin) {
    window.location.href = url.toString();
    return;
  }

  const nextPath = normalizePath(url.pathname);
  const nextHref = `${nextPath}${url.hash}`;
  const currentHref = `${normalizePath(window.location.pathname)}${window.location.hash}`;

  if (nextHref === currentHref) {
    if (url.hash) {
      const target = document.getElementById(url.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  if (options?.replace) {
    window.history.replaceState({}, "", nextHref);
  } else {
    window.history.pushState({}, "", nextHref);
  }

  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<LocationState>(() => readLocation());

  useEffect(() => {
    const sync = () => setLocation(readLocation());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  return location;
}

type RouteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children: ReactNode;
};

export function RouteLink({ to, onClick, children, ...rest }: RouteLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      rest.target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
