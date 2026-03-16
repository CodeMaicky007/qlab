"use client";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  startDelay?: number;
}

export default function SplitText({ text, className = "", delay = 0.05, startDelay = 0.3 }: SplitTextProps) {
  const words = text.split(" ");

  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: startDelay + i * delay,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}