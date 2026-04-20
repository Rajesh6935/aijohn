import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TextCycler.css';

/**
 * TextCycler — animated word/phrase cycling like redblox.io
 * Props:
 *   prefix: string — static text before the cycling word
 *   items: [{ text, color }] — words to cycle through
 *   interval: ms — how long each word shows (default 2400)
 *   className: string
 */
export default function TextCycler({ prefix = '', items = [], interval = 2400, className = '' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [items.length, interval]);

  const current = items[index] || {};

  return (
    <span className={`text-cycler ${className}`}>
      {prefix && <span className="text-cycler__prefix">{prefix} </span>}
      <span className="text-cycler__word-wrap" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="text-cycler__word"
            style={{ color: current.color || 'inherit' }}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            exit={{   opacity: 0, y: -14, filter: 'blur(4px)' }}
            transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
          >
            {current.text}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
