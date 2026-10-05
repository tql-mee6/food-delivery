'use client';

type Variant = 'line-dot' | 'triple' | 'wave' | 'diamond';
type Props = {
  variant?: Variant;
  className?: string;
};

export default function SectionDivider({
  variant = 'line-dot',
  className = '',
}: Props) {
  return (
    <div className={`flex items-center justify-center py-12 md:py-16 ${className}`}>
      {variant === 'line-dot' && (
        <div className="flex items-center gap-4 w-full max-w-2xl mx-auto px-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-food-border to-food-border" />
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-food-primary/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-food-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-food-primary/40" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-food-border to-food-border" />
        </div>
      )}

      {variant === 'triple' && (
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-px bg-food-primary/40" />
          <div className="w-16 h-px bg-food-primary" />
          <div className="w-24 h-px bg-food-primary/40" />
        </div>
      )}

      {variant === 'wave' && (
        <svg
          width="200"
          height="20"
          viewBox="0 0 200 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-food-primary/50"
        >
          <path
            d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10 T 125 10 T 150 10 T 175 10 T 200 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}

      {variant === 'diamond' && (
        <div className="flex items-center gap-4 w-full max-w-md mx-auto px-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-food-border" />
          <div className="w-2 h-2 bg-food-primary rotate-45" />
          <div className="w-1 h-1 bg-food-primary/40 rotate-45" />
          <div className="w-2 h-2 bg-food-primary rotate-45" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-food-border" />
        </div>
      )}
    </div>
  );
}