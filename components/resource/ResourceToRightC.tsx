"use client";
import { RiMenu4Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ResourceToRightC() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string>("");

  console.log("hdddd", headings);

  // Collect headings
  useEffect(() => {
    const timeout = setTimeout(() => {
      const foundHeadings = document.querySelectorAll(".prose h2");

      console.log("All h2 found:", foundHeadings);

      const elements = Array.from(foundHeadings).map((el) => {
        const id =
          el.id ||
          el
            .textContent!.toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-");

        el.id = id;

        console.log("Generated ID:", id);
        console.log("Heading text:", el.textContent);

        return {
          id,
          text: el.textContent || "",
          level: 2,
        };
      });

      console.log("Final elements array:", elements);

      setHeadings(elements);
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className=" max-w-3xl  mx-auto bg-card/30  sticky top-24 h-fit p-5 rounded-xl border   backdrop-blur shadow-lg">
      <h3 className="text-lg flex items-center gap-2 font-bold mb-4 ">
        <RiMenu4Fill /> Table of Contents
      </h3>

      <ScrollArea className="h-[400px] pr-2">
        <ul className="space-y-2 flex flex-col items-start text-sm">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
              <a
                href={`#${h.id}`}
                className={`flex  items-center font-semibold bc border-l-4 border-transparent gap-1 px-2 py-1 rounded transition-colors ${
                  activeId === h.id
                    ? "bg-primary/10 !border-primary text-primary  "
                    : "text-black hover:border-primary hover:bg-primary/10 "
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}