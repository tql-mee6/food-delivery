/*
  Падающий шашлык на первом экране.
  Картинки шампуров — public/images/skewers (нарисованы в SkewerArt.tsx).
  Анимация — чистый CSS (globals.css → .skewer-fall), без JS.
*/

type Fall = {
  left: string;
  width: number;
  dur: number;
  delay: number;
  r0: number;
  r1: number;
  dx: number;
  variant: number;
  opacity?: number;
  /** показывать на телефоне */
  mobile?: boolean;
  /** только на телефоне */
  mobileOnly?: boolean;
  /** чёткая картинка даже в дальнем слое */
  sharp?: boolean;
};

// Дальний слой — размытые, за текстом и тарелкой
const BACK: Fall[] = [
  { left: '5%', width: 100, dur: 13, delay: -3, r0: -30, r1: 25, dx: 40, variant: 1, opacity: 0.7, mobile: true },
  { left: '24%', width: 84, dur: 15, delay: -10, r0: 35, r1: -20, dx: -30, variant: 2, opacity: 0.55 },
  { left: '38%', width: 110, dur: 12, delay: -6.5, r0: 15, r1: 70, dx: 30, variant: 0, opacity: 0.6, mobile: true },
  { left: '72%', width: 96, dur: 14, delay: -1, r0: -45, r1: 5, dx: -20, variant: 1, opacity: 0.6 },
  { left: '90%', width: 88, dur: 16, delay: -12, r0: 60, r1: 10, dx: -40, variant: 2, opacity: 0.5, mobile: true },
  // на телефоне ближнего слоя нет (он бы закрывал текст), поэтому крупный чёткий шампур — сзади
  { left: '82%', width: 130, dur: 10, delay: -4, r0: -15, r1: -55, dx: -40, variant: 0, sharp: true, mobileOnly: true },
];

// Ближний слой — крупные и чёткие, пролетают перед тарелкой
const FRONT: Fall[] = [
  { left: '47%', width: 170, dur: 9, delay: -2, r0: -25, r1: 30, dx: -50, variant: 0 },
  { left: '64%', width: 150, dur: 10.5, delay: -7.5, r0: 40, r1: -10, dx: 40, variant: 2 },
  { left: '84%', width: 190, dur: 11, delay: -4.5, r0: -10, r1: -60, dx: -60, variant: 1 },
  { left: '98%', width: 140, dur: 9.5, delay: -0.5, r0: 30, r1: 75, dx: -70, variant: 0 },
];

export default function FallingSkewers({ layer = 'back' }: { layer?: 'back' | 'front' }) {
  const list = layer === 'back' ? BACK : FRONT;
  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none motion-reduce:hidden ${
        layer === 'front' ? 'z-20' : 'z-0'
      }`}
    >
      {list.map((s, i) => (
        <div
          key={i}
          className={`skewer-fall absolute top-0 ${s.mobileOnly ? 'md:hidden' : s.mobile ? '' : 'hidden md:block'}`}
          style={
            {
              left: s.left,
              width: s.width,
              marginLeft: -s.width / 2,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              opacity: s.opacity,
              '--r0': `${s.r0}deg`,
              '--r1': `${s.r1}deg`,
              '--dx': `${s.dx}px`,
            } as React.CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/skewers/skewer-${s.variant}${layer === 'back' && !s.sharp ? '-blur' : ''}.webp`}
            alt=""
            width={360}
            height={1150}
            decoding="async"
            className="w-full h-auto select-none"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
