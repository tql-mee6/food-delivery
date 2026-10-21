'use client';

import { motion } from 'framer-motion';

interface ChefCharacterProps {
  className?: string;
}

export default function ChefCharacter({ className = '' }: ChefCharacterProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-2xl">
        {/* Тень под поваром */}
        <ellipse cx="150" cy="385" rx="80" ry="12" fill="rgba(0,0,0,0.15)" />
        
        {/* Тело - фартук */}
        <path
          d="M80 220 L80 350 Q80 370 100 370 L200 370 Q220 370 220 350 L220 220 Q150 240 80 220 Z"
          fill="#FFFFFF"
          stroke="#E5E7EB"
          strokeWidth="2"
        />
        
        {/* Фартук - детали */}
        <rect x="130" y="280" width="40" height="60" rx="5" fill="#F97316" />
        <rect x="135" y="290" width="30" height="40" rx="3" fill="#FB923C" />
        
        {/* Пуговицы на фартуке */}
        <circle cx="145" cy="260" r="5" fill="#F97316" />
        <circle cx="155" cy="260" r="5" fill="#F97316" />
        
        {/* Карман на фартуке */}
        <rect x="105" y="300" width="35" height="25" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
        
        {/* Ложка в кармане */}
        <rect x="112" y="290" width="4" height="25" rx="2" fill="#C0C0C0" />
        <ellipse cx="114" cy="288" rx="6" ry="4" fill="#C0C0C0" />
        
        {/* Вилка в кармане */}
        <rect x="125" y="288" width="3" height="27" rx="1.5" fill="#C0C0C0" />
        <rect x="123" y="286" width="2" height="6" rx="1" fill="#C0C0C0" />
        <rect x="126" y="286" width="2" height="6" rx="1" fill="#C0C0C0" />
        <rect x="129" y="286" width="2" height="6" rx="1" fill="#C0C0C0" />
        
        {/* Шея */}
        <rect x="130" y="170" width="40" height="30" rx="5" fill="#FCD5B8" />
        
        {/* Голова */}
        <ellipse cx="150" cy="130" rx="55" ry="60" fill="#FCD5B8" />
        
        {/* Уши */}
        <ellipse cx="95" cy="130" rx="12" ry="18" fill="#FCD5B8" />
        <ellipse cx="95" cy="130" rx="6" ry="10" fill="#F5C6A8" />
        <ellipse cx="205" cy="130" rx="12" ry="18" fill="#FCD5B8" />
        <ellipse cx="205" cy="130" rx="6" ry="10" fill="#F5C6A8" />
        
        {/* Волосы */}
        <path
          d="M100 100 Q110 70 150 65 Q190 70 200 100 Q195 85 150 80 Q105 85 100 100 Z"
          fill="#4A3728"
        />
        
        {/* Шеф-шапка */}
        <ellipse cx="150" cy="55" rx="65" ry="25" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="90" y="20" width="120" height="40" fill="#FFFFFF" />
        <ellipse cx="150" cy="20" rx="60" ry="20" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        
        {/* Складки на шапке */}
        <path d="M120 25 Q125 15 130 25" stroke="#E5E7EB" strokeWidth="2" fill="none" />
        <path d="M145 22 Q150 12 155 22" stroke="#E5E7EB" strokeWidth="2" fill="none" />
        <path d="M170 25 Q175 15 180 25" stroke="#E5E7EB" strokeWidth="2" fill="none" />
        
        {/* Брови */}
        <path d="M115 110 Q125 105 135 110" stroke="#4A3728" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M165 110 Q175 105 185 110" stroke="#4A3728" strokeWidth="4" strokeLinecap="round" fill="none" />
        
        {/* Глаза */}
        <ellipse cx="125" cy="125" rx="12" ry="14" fill="#FFFFFF" />
        <ellipse cx="175" cy="125" rx="12" ry="14" fill="#FFFFFF" />
        <circle cx="127" cy="127" r="7" fill="#4A3728" />
        <circle cx="177" cy="127" r="7" fill="#4A3728" />
        <circle cx="129" cy="125" r="3" fill="#FFFFFF" />
        <circle cx="179" cy="125" r="3" fill="#FFFFFF" />
        
        {/* Румянец */}
        <ellipse cx="105" cy="145" rx="12" ry="8" fill="#FFB6C1" opacity="0.5" />
        <ellipse cx="195" cy="145" rx="12" ry="8" fill="#FFB6C1" opacity="0.5" />
        
        {/* Нос */}
        <ellipse cx="150" cy="145" rx="8" ry="10" fill="#F5C6A8" />
        
        {/* Улыбка */}
        <path
          d="M125 160 Q150 185 175 160"
          stroke="#D2691E"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Усы (опционально - раскомментируйте для повара с усами) */}
        {/* <path d="M130 155 Q140 150 150 155 Q160 150 170 155" stroke="#4A3728" strokeWidth="3" fill="none" /> */}
        
        {/* Руки */}
        {/* Левая рука */}
        <path
          d="M80 240 Q50 260 55 300 Q58 320 75 315"
          fill="#FCD5B8"
          stroke="#F5C6A8"
          strokeWidth="2"
        />
        
        {/* Правая рука с подносом */}
        <path
          d="M220 240 Q250 250 260 280 Q265 300 250 310"
          fill="#FCD5B8"
          stroke="#F5C6A8"
          strokeWidth="2"
        />
        
        {/* Поднос в правой руке */}
        <ellipse cx="255" cy="290" rx="35" ry="10" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="2" />
        
        {/* Шашлык на подносе */}
        <g transform="translate(235, 270) rotate(-15)">
          <line x1="10" y1="0" x2="10" y2="35" stroke="#8B4513" strokeWidth="2" />
          <ellipse cx="10" cy="8" rx="6" ry="5" fill="#D2691E" />
          <ellipse cx="10" cy="18" rx="7" ry="5" fill="#CD853F" />
          <ellipse cx="10" cy="28" rx="6" ry="5" fill="#D2691E" />
        </g>
        
        {/* Декоративные элементы вокруг */}
        {/* Звёздочки */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '150px 200px' }}
        >
          <text x="70" y="180" fontSize="16" fill="#F97316" opacity="0.6">✦</text>
          <text x="220" y="200" fontSize="14" fill="#EF4444" opacity="0.5">✦</text>
          <text x="100" y="380" fontSize="12" fill="#F97316" opacity="0.4">✦</text>
          <text x="200" y="380" fontSize="14" fill="#EF4444" opacity="0.5">✦</text>
        </motion.g>
        
        {/* Пар/аромат от шашлыка */}
        <motion.g
          initial={{ opacity: 0.3, y: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path d="M245 260 Q250 250 248 245" stroke="#9CA3AF" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M255 258 Q260 248 258 243" stroke="#9CA3AF" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M262 262 Q267 252 265 247" stroke="#9CA3AF" strokeWidth="2" fill="none" opacity="0.3" />
        </motion.g>
      </svg>
      
      {/* Речь-пузырь */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="absolute -top-2 -right-4 md:-right-8 bg-white rounded-2xl px-3 py-2 shadow-lg border-2 border-food-primary"
      >
        <div className="text-food-primary font-bold text-sm md:text-base whitespace-nowrap">
          Вкусно! 🔥
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
      </motion.div>
    </motion.div>
  );
}