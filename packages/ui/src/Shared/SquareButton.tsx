import { motion } from "framer-motion";
import React from "react";

export interface SquareButtonProps {
  /**
   * The content of the button
   */
  children: React.ReactNode;
  /**
   * The onClick handler
   */
  onClick?: () => void;
  /**
   * The className of the button
   */
  className?: string;
  /**
   * The variant of the button
   * @default "primary"
   */
  variant?: "primary" | "secondary";
}

export const SquareButton = ({
  children,
  onClick,
  className = "",
  variant = "primary",
}: SquareButtonProps) => {
  return (
    <motion.button
      className={`relative p-4 group cursor-pointer bg-white ${className}`}
      onClick={onClick}
      whileHover="hover"
      whileTap="active"
      variants={{
        hover: {
          translateY: -2,
          transition: { duration: 0.15, ease: "easeOut" },
        },
        active: {
          scale: 0.95,
          transition: { duration: 0.1, ease: "easeOut" },
        },
      }}
    >
      {/* Border lines */}
      <motion.span
        className="absolute left-0 top-0 w-0 h-[2px] bg-current"
        variants={{
          hover: {
            width: "100%",
            transition: { duration: 0.15, ease: "easeOut" },
          },
        }}
      />
      <motion.span
        className="absolute right-0 top-0 w-[2px] h-0 bg-current"
        variants={{
          hover: {
            height: "100%",
            transition: { duration: 0.15, ease: "easeOut" },
          },
        }}
      />
      <motion.span
        className="absolute right-0 bottom-0 w-0 h-[2px] bg-current"
        variants={{
          hover: {
            width: "100%",
            transition: { duration: 0.15, ease: "easeOut" },
          },
        }}
      />
      <motion.span
        className="absolute left-0 bottom-0 w-[2px] h-0 bg-current"
        variants={{
          hover: {
            height: "100%",
            transition: { duration: 0.15, ease: "easeOut" },
          },
        }}
      />

      {/* Button text */}
      <motion.span
        className="relative z-10 transition-all duration-150 handwriting text-lg flex items-center justify-center"
        variants={{
          hover: {
            color: "white",
          },
          active: {
            scale: 0.98,
          },
        }}
      >
        {children}
        {variant === "primary" && (
          <motion.span
            className="absolute left-1/2 bottom-[-4px] h-[2px] bg-current origin-center rounded-full"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent, currentColor 20%, currentColor 80%, transparent)",
              transform: "rotate(-1deg)",
              clipPath: "inset(-10px -10px)", // Prevent curve from being clipped
            }}
            initial={{
              width: "120%",
              x: "-50%",
              scaleY: 1.2,
              pathLength: 1,
              pathOffset: 0,
            }}
            animate={{
              y: [-0.5, 0.5, -0.5],
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              },
            }}
            variants={{
              hover: {
                width: "0%",
                x: "0%",
                transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
              },
              active: {
                opacity: 0,
                transition: { duration: 0.1 },
              },
            }}
          />
        )}
      </motion.span>

      {/* Black box element */}
      <motion.div
        className="absolute -z-10 w-full h-full top-0 left-0 opacity-0"
        variants={{
          hover: {
            opacity: 1,
            translateX: 4,
            translateY: 4,
            transition: { duration: 0.15, ease: "easeOut" },
          },
          active: {
            opacity: 1,
            translateX: 2,
            translateY: 2,
            transition: { duration: 0.1, ease: "easeOut" },
          },
        }}
      >
        <div className="w-full h-full bg-black" />
      </motion.div>
    </motion.button>
  );
};
