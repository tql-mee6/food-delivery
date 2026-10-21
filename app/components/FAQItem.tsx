'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export default function FAQItem({ question, answer, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-food-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className={`font-display text-lg md:text-xl transition-colors ${
            isOpen ? 'text-food-primary' : 'group-hover:text-food-primary'
          }`}
        >
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
            isOpen ? 'bg-food-primary border-food-primary rotate-45 text-white' : 'border-food-border'
          }`}
        >
          <Plus className="w-4 h-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12 text-food-muted leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
