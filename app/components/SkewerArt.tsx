/*
  Исходник картинок шашлыка (public/images/skewers/*.webp).
  Шампур нарисован в SVG: куски мяса вырезаны из фото шашлыка, сверху — объём,
  корочка и блеск сока; лук, перец, металлический шампур.
  На сайте используются готовые картинки — так анимация не тормозит.
  Чтобы перерисовать: отрендерить <SkewerDefs /> + <Skewer variant={0..2} /> на прозрачном фоне
  и сохранить скриншоты в public/images/skewers.
*/

type Piece = 'meat' | 'onion' | 'pepper';

// Три формы кусков, чтобы мясо не выглядело одинаковым
const BLOBS = [
  'M-29,-12 C-26,-24 -10,-27 4,-25 C16,-28 28,-20 30,-8 C33,4 28,16 20,22 C8,28 -6,25 -16,26 C-27,24 -33,12 -31,1 C-31,-4 -31,-8 -29,-12Z',
  'M-27,-17 C-18,-27 0,-24 12,-27 C24,-26 31,-14 29,-2 C31,9 26,21 14,25 C2,29 -12,27 -22,22 C-31,15 -32,2 -30,-6 C-30,-10 -29,-14 -27,-17Z',
  'M-24,-22 C-12,-28 6,-23 18,-26 C29,-22 33,-10 30,2 C32,14 22,25 10,26 C-2,30 -18,26 -26,18 C-33,9 -31,-4 -30,-10 C-29,-15 -27,-19 -24,-22Z',
];

// Где на фото шашлыка лежат отдельные куски (центр в пикселях исходника 626×626)
const MEAT_SPOTS = [
  [165, 330], [255, 325], [130, 440], [355, 385], [220, 410], [235, 495],
];
const MEAT_SCALE = 0.55;

// Общие градиенты и фильтры — объявлены один раз на странице
export function SkewerDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        {/* Мясо: сочная середина → поджаристые края */}
        <radialGradient id="sk-meat" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#b5562c" />
          <stop offset="35%" stopColor="#8e3a1a" />
          <stop offset="70%" stopColor="#5a200c" />
          <stop offset="100%" stopColor="#2a0c04" />
        </radialGradient>
        {/* Карамельная корочка по краям */}
        <radialGradient id="sk-crust" cx="50%" cy="50%" r="55%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="85%" stopColor="#c86a2a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#1a0602" stopOpacity="0.9" />
        </radialGradient>
        <linearGradient id="sk-pepper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9391f" />
          <stop offset="50%" stopColor="#a3170b" />
          <stop offset="100%" stopColor="#4a0703" />
        </linearGradient>
        <linearGradient id="sk-onion" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf2f4" />
          <stop offset="100%" stopColor="#d7b3c4" />
        </linearGradient>
        <linearGradient id="sk-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5d5a58" />
          <stop offset="40%" stopColor="#e9e6e1" />
          <stop offset="60%" stopColor="#a8a39d" />
          <stop offset="100%" stopColor="#3f3c3a" />
        </linearGradient>

        {/* Неровные края + зернистая фактура мяса */}
        <filter id="sk-texture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="7" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="8" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0.08  0 0 0 0 0.02  0 0 0 0 0.01  2.4 0 0 0 -1.15"
            result="specks"
          />
          <feComposite in="specks" in2="shape" operator="atop" />
        </filter>
        <filter id="sk-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <filter id="sk-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.65" />
        </filter>

        {/* Текстуры настоящего мяса и лука из фотографии шашлыка */}
        {MEAT_SPOTS.map(([cx, cy], i) => (
          <pattern key={i} id={`sk-photo-${i}`} patternUnits="userSpaceOnUse" x="-40" y="-40" width="80" height="80">
            <image
              href="/images/dishes/shashlik.jpg"
              x={-cx * MEAT_SCALE + 40}
              y={-cy * MEAT_SCALE + 40}
              width={626 * MEAT_SCALE}
              height={626 * MEAT_SCALE}
              preserveAspectRatio="none"
            />
          </pattern>
        ))}
        <pattern id="sk-onion-photo" patternUnits="userSpaceOnUse" x="-40" y="-20" width="80" height="40">
          <image href="/images/dishes/shashlik.jpg" x={-360 * 0.6 + 40} y={-215 * 0.6 + 20} width={626 * 0.6} height={626 * 0.6} preserveAspectRatio="none" />
        </pattern>
        {/* Объём: светлее сверху-слева, тень по краям */}
        <radialGradient id="sk-volume" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffb070" stopOpacity="0.28" />
          <stop offset="45%" stopColor="#000" stopOpacity="0" />
          <stop offset="85%" stopColor="#120401" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0a0200" stopOpacity="0.85" />
        </radialGradient>
        <filter id="sk-rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {BLOBS.map((d, i) => (
          <clipPath key={i} id={`sk-clip-${i}`}>
            <path d={d} />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}

function Meat({ y, shape, rot, tex, dx }: { y: number; shape: number; rot: number; tex: number; dx: number }) {
  const d = BLOBS[shape];
  return (
    <g transform={`translate(${60 + dx} ${y}) rotate(${rot})`}>
      <g filter="url(#sk-rough)">
        {/* настоящая текстура жареного мяса */}
        <path d={d} fill={`url(#sk-photo-${tex})`} />
        <path d={d} fill="url(#sk-volume)" />
        {/* тонкая тёмная корочка по контуру */}
        <path d={d} fill="none" stroke="#1a0602" strokeWidth="2.2" opacity="0.6" />
      </g>
      {/* блеск сока и жира */}
      <ellipse cx="-9" cy="-12" rx="10" ry="3.4" fill="#fff" opacity="0.22" transform="rotate(-14)" filter="url(#sk-soft)" />
      <path d="M-20,-15 C-10,-22 6,-23 17,-17" stroke="#ffbe7a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.35" filter="url(#sk-soft)" />
      <circle cx="-14" cy="-9" r="1.5" fill="#fff" opacity="0.9" />
      <circle cx="9" cy="2" r="1.1" fill="#fff" opacity="0.75" />
      <circle cx="-2" cy="13" r="0.9" fill="#fff" opacity="0.6" />
      <circle cx="18" cy="-6" r="0.8" fill="#fff" opacity="0.6" />
    </g>
  );
}

function Onion({ y, dx }: { y: number; dx: number }) {
  return (
    <g transform={`translate(${60 + dx} ${y})`}>
      <ellipse rx="28" ry="8.5" fill="url(#sk-onion-photo)" />
      <ellipse rx="28" ry="8.5" fill="url(#sk-onion)" opacity="0.35" />
      <ellipse rx="21" ry="5.6" fill="none" stroke="#c995ad" strokeWidth="1" opacity="0.7" />
      <path d="M-21,-4 C-8,-8 8,-8 21,-4" stroke="#fff" strokeWidth="1.4" fill="none" opacity="0.85" />
      <path d="M-28,1 C-20,8 20,8 28,1" stroke="#6e3416" strokeWidth="1.6" fill="none" opacity="0.7" />
    </g>
  );
}

function Pepper({ y, rot }: { y: number; rot: number }) {
  const d = 'M-20,-12 C-10,-17 12,-17 21,-10 C24,-2 23,8 19,13 C8,17 -10,17 -19,12 C-23,5 -23,-5 -20,-12Z';
  return (
    <g transform={`translate(60 ${y}) rotate(${rot})`}>
      <g filter="url(#sk-rough)">
        <path d={d} fill="url(#sk-pepper)" />
        {/* подпалины с гриля */}
        <ellipse cx="9" cy="5" rx="9" ry="5" fill="#1d0402" opacity="0.55" filter="url(#sk-soft)" />
        <ellipse cx="-13" cy="8" rx="6" ry="3" fill="#1d0402" opacity="0.45" filter="url(#sk-soft)" />
        <path d={d} fill="url(#sk-volume)" opacity="0.8" />
      </g>
      <ellipse cx="-6" cy="-8" rx="8" ry="2.2" fill="#fff" opacity="0.4" filter="url(#sk-soft)" />
      <circle cx="-10" cy="-8" r="1.3" fill="#fff" opacity="0.85" />
    </g>
  );
}

const LAYOUTS: Piece[][] = [
  ['meat', 'onion', 'meat', 'pepper', 'meat', 'onion', 'meat'],
  ['meat', 'pepper', 'meat', 'meat', 'onion', 'meat', 'pepper'],
  ['onion', 'meat', 'meat', 'pepper', 'meat', 'onion', 'meat'],
];

/** Один шампур. variant — порядок кусков */
export function Skewer({ variant = 0, className = '' }: { variant?: number; className?: string }) {
  const pieces = LAYOUTS[variant % LAYOUTS.length];
  const heights = pieces.map((p) => (p === 'meat' ? 50 : p === 'pepper' ? 34 : 17));
  // куски плотно прижаты друг к другу (перекрытие 5px)
  const tops = heights.map((_, i) => 52 + heights.slice(0, i).reduce((a, h) => a + h - 5, 0));
  const y = tops[tops.length - 1] + heights[heights.length - 1] - 5;
  const nodes = pieces.map((p, i) => {
    const cy = tops[i] + heights[i] / 2;
    const dx = ((i * 7 + variant * 5) % 9) - 4; // лёгкий разнобой влево-вправо
    if (p === 'meat')
      return (
        <Meat
          key={i}
          y={cy}
          dx={dx}
          shape={(i + variant) % 3}
          rot={((i * 37 + variant * 23) % 40) - 20}
          tex={(i * 2 + variant) % MEAT_SPOTS.length}
        />
      );
    if (p === 'pepper') return <Pepper key={i} y={cy} rot={((i * 29) % 30) - 15} />;
    return <Onion key={i} y={cy} dx={dx} />;
  });
  const end = y + 18;

  return (
    <svg viewBox={`0 0 120 ${end + 40}`} className={className} aria-hidden>
      <g filter="url(#sk-shadow)">
        {/* Кольцо и шампур */}
        <circle cx="60" cy="18" r="11" fill="none" stroke="url(#sk-metal)" strokeWidth="3.5" />
        <path d="M60 29 L60 34" stroke="url(#sk-metal)" strokeWidth="3.5" />
        <path d="M55 34 Q60 40 65 34 Q60 46 55 40" fill="none" stroke="url(#sk-metal)" strokeWidth="2.5" />
        <rect x="58" y="38" width="4" height={end - 38} fill="url(#sk-metal)" />
        <path d={`M58 ${end} L60 ${end + 22} L62 ${end} Z`} fill="url(#sk-metal)" />
        {nodes}
      </g>
    </svg>
  );
}

