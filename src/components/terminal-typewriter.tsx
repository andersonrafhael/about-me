"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  className?: string;
  speed?: number;
};

export function TerminalTypewriter({ lines, className = "", speed = 38 }: Props) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] ?? "") + line[currentChar];
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines, speed]);

  return (
    <div className={`font-mono text-sm ${className}`} aria-label={lines.join(" ")}>
      {lines.map((line, i) => {
        const isActive = i === currentLine;
        const isDone = i < currentLine || done;
        const text = displayed[i] ?? "";

        return (
          <div key={i} className="flex items-start gap-2 leading-6">
            <span className={`select-none ${isDone || isActive ? "text-mint" : "text-surface-high"}`}>
              $
            </span>
            <span className={isDone || isActive ? "text-foreground/80" : "text-muted/40"}>
              {text}
              {isActive && !done && (
                <span className="inline-block w-[2px] h-[1em] bg-mint ml-[1px] animate-pulse align-middle" />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
