/*
  Декоративные элементы в духе «гриль-ресторана»:
  мазок кисти под словом, рваный край бумаги, искры углей.
*/

/** Красный мазок кисти под акцентным словом */
export function BrushWord({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block text-food-primary ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="absolute left-[-3%] -bottom-[0.2em] w-[106%] h-[0.24em] z-0"
      >
        <path
          d="M4 15 C 40 6, 90 4, 150 7 S 250 12, 296 6 L 294 13 C 240 19, 170 15, 110 17 S 30 22, 6 21 Z"
          fill="#e8432e"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

/** Рваный край между секциями. color — цвет секции, в которую «переходим». */
export function TornEdge({
  color,
  flip = false,
  className = '',
}: {
  color: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative w-full leading-[0] pointer-events-none ${className}`}
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block w-full h-[28px] md:h-[46px]"
      >
        <path
          fill={color}
          d="M0 60 L0 34 L28 30 L52 38 L80 26 L118 33 L150 22 L186 31 L214 25 L250 36 L284 20 L318 29 L352 24 L380 35 L420 18 L456 28 L490 23 L520 34 L560 21 L594 30 L626 26 L660 37 L698 19 L730 28 L770 24 L806 35 L840 22 L878 31 L910 26 L946 38 L984 20 L1018 29 L1052 25 L1086 36 L1120 21 L1156 30 L1190 24 L1224 34 L1260 19 L1296 29 L1330 25 L1364 35 L1400 23 L1440 30 L1440 60 Z"
        />
      </svg>
    </div>
  );
}

const EMBERS = [
  { left: 8, size: 4, dur: 9, delay: 0, drift: 30 },
  { left: 16, size: 3, dur: 11, delay: 2.5, drift: -20 },
  { left: 24, size: 5, dur: 8, delay: 4, drift: 40 },
  { left: 33, size: 3, dur: 12, delay: 1, drift: -35 },
  { left: 41, size: 4, dur: 10, delay: 5.5, drift: 25 },
  { left: 52, size: 6, dur: 9.5, delay: 3, drift: -15 },
  { left: 60, size: 3, dur: 13, delay: 0.5, drift: 45 },
  { left: 68, size: 4, dur: 8.5, delay: 6, drift: -30 },
  { left: 75, size: 5, dur: 11, delay: 2, drift: 20 },
  { left: 83, size: 3, dur: 9, delay: 4.5, drift: -40 },
  { left: 90, size: 4, dur: 12, delay: 1.5, drift: 30 },
  { left: 96, size: 3, dur: 10, delay: 7, drift: -20 },
];

/** Искры, поднимающиеся снизу вверх. Только CSS, без JS. */
export function Embers({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: `${e.left}%`,
              width: e.size * 2,
              height: e.size * 2,
              animationDuration: `${e.dur}s`,
              animationDelay: `${e.delay}s`,
              '--drift': `${e.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Веточка зелени — простой силуэт листьев для декора */
export function Leaf({ className = '', color = '#3f7d3a' }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className}>
      <path d="M32 60 C 30 44, 30 30, 34 6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M33 20 C 22 16, 14 8, 12 2 C 22 4, 32 10, 33 20 Z" fill={color} />
      <path d="M33 30 C 44 26, 52 18, 56 10 C 44 12, 36 20, 33 30 Z" fill={color} opacity="0.85" />
      <path d="M32 42 C 20 40, 12 32, 8 24 C 20 26, 30 32, 32 42 Z" fill={color} opacity="0.9" />
    </svg>
  );
}
