import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

export interface IntroTitleProps {
  text: string;
  /** Speed of typing animation in milliseconds per character. Default: 100 */
  typingSpeed?: number;
  /** Duration of cursor blink animation in seconds. Default: 0.8 */
  cursorBlinkSpeed?: number;
  /** Custom className for the text. Default: "" */
  className?: string;
  /** Height of the cursor in pixels. Default: 2 */
  cursorHeight?: number;
  /** Color of the cursor. Default: "currentColor" */
  cursorColor?: string;
  /** Font weight for the text. Default: 300 */
  fontWeight?: 300 | 400 | 500;
  /** Font size in pixels. Default: 16 */
  fontSize?: number;
}

type AnimationProps = {
  text: string;
  typingSpeed: number;
  cursorBlinkSpeed: number;
  cursorHeight: number;
  cursorColor: string;
  fontSize: number;
};

export function IntroTitle({
  text,
  typingSpeed = 100,
  cursorBlinkSpeed = 0.8,
  className = "",
  cursorHeight = 2,
  cursorColor = "currentColor",
  fontWeight = 300,
  fontSize = 16,
}: IntroTitleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [key, setKey] = useState(0);
  const [currentProps, setCurrentProps] = useState<AnimationProps>({
    text,
    typingSpeed,
    cursorBlinkSpeed,
    cursorHeight,
    cursorColor,
    fontSize,
  });
  const pendingAnimationRef = useRef<AnimationProps | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const debouncedReset = useCallback((newProps: AnimationProps) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    pendingAnimationRef.current = newProps;

    timeoutRef.current = setTimeout(() => {
      if (pendingAnimationRef.current) {
        setDisplayedText("");
        setIsComplete(false);
        setCurrentProps(pendingAnimationRef.current);
        setKey((prev) => prev + 1);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const newProps = {
      text,
      typingSpeed,
      cursorBlinkSpeed,
      cursorHeight,
      cursorColor,
      fontSize,
    };
    const cleanup = debouncedReset(newProps);
    return cleanup;
  }, [
    text,
    typingSpeed,
    cursorBlinkSpeed,
    cursorHeight,
    cursorColor,
    fontSize,
    debouncedReset,
  ]);

  useEffect(() => {
    if (displayedText.length < currentProps.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentProps.text.slice(0, displayedText.length + 1));
      }, currentProps.typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      pendingAnimationRef.current = null;
    }
  }, [currentProps, displayedText]);

  const getCursorPosition = () => {
    if (!textRef.current || !displayedText) return { right: 0, top: 0 };

    try {
      const range = document.createRange();
      const textNode = Array.from(textRef.current.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      if (!textNode) return { right: 0, top: 0 };

      const textLength = Math.min(
        displayedText.length,
        textNode.textContent?.length || 0
      );
      range.setStart(textNode, textLength);
      range.setEnd(textNode, textLength);

      const rect = range.getBoundingClientRect();
      const containerRect = textRef.current.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(textRef.current);
      const fontSize = parseInt(computedStyle.fontSize);
      const lineHeight = parseInt(computedStyle.lineHeight) || fontSize * 1.2;

      if (isComplete) {
        // When complete, position cursor below and after the last character
        const lastCharWidth = fontSize * 0.5; // Approximate width of a character
        return {
          right: containerRect.right - rect.right - lastCharWidth, // One character gap
          top: rect.bottom - containerRect.top + lineHeight * 0.1, // Keep original position below text
        };
      }

      // During typing, position cursor at the current typing position
      return {
        right: containerRect.right - rect.right,
        top: rect.bottom - containerRect.top + lineHeight * 0.1,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      return { right: 0, top: 0 };
    }
  };

  const cursorPosition = getCursorPosition();

  const getCursorWidth = () => {
    // Calculate cursor width as a proportion of font size
    return fontSize * 0.5;
  };

  return (
    <div className="inline-flex flex-col relative" key={key}>
      <motion.span
        ref={textRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`title-jp font-[${fontWeight}] ${className} whitespace-pre-wrap leading-normal`}
        style={{ fontSize: `${currentProps.fontSize}px` }}
      >
        {displayedText}
      </motion.span>
      <AnimatePresence>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            repeat: Infinity,
            duration: currentProps.cursorBlinkSpeed,
            ease: "easeInOut",
          }}
          className="inline-block bg-current absolute"
          style={{
            width: `${getCursorWidth()}px`,
            height: `${currentProps.cursorHeight}px`,
            backgroundColor: currentProps.cursorColor,
            right: `${cursorPosition.right}px`,
            top: `${cursorPosition.top}px`,
            transform: isComplete ? "none" : "translateX(2px)",
          }}
        />
      </AnimatePresence>
    </div>
  );
}
