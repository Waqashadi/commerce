"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    let handleScroll: () => void;

    const initTimer = setTimeout(() => {
      const elements = Array.from(
        document.querySelectorAll(".blog-content h2, .blog-content h3")
      ).map((el) => {
        const id =
          el.id ||
          el
            .textContent!.toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-");

        el.id = id;

        return {
          id,
          text: el.textContent || "",
          level: el.tagName === "H3" ? 3 : 2,
        };
      });

      setHeadings(elements);

      handleScroll = () => {
        const scrollPosition = window.scrollY + 150;
        let currentId = "";

        elements.forEach((heading) => {
          const el = document.getElementById(heading.id);
          if (el && el.offsetTop <= scrollPosition) {
            currentId = heading.id;
          }
        });

        setActiveId(currentId);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }, 0);

    return () => {
      clearTimeout(initTimer);
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToHeading = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className=" mx-auto h-fit max-w-3xl rounded-xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
        <List className="h-5 w-5 text-primary" /> Table of Contents
      </h3>

      <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto pr-2">
        <ul className="flex flex-col items-start space-y-1 text-sm">
          {headings.map((h) => (
            <li key={h.id} className={`w-full ${h.level === 3 ? "ml-4" : ""}`}>
              <a
                href={`#${h.id}`}
                onClick={(e) => scrollToHeading(e, h.id)}
                className={`flex w-full items-center gap-1 rounded-r border-l-4 px-3 py-1.5 font-medium transition-colors ${
                  activeId === h.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:border-primary/50 hover:bg-accent hover:text-foreground"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}