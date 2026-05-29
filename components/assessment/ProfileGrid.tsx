'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COGNITIVE_PROFILES } from '@/lib/assessment-data';
import { CognitiveProfile } from '@/lib/assessment-data';

interface ProfileGridProps {
  selectedProfileId?: string;
  onProfileSelect?: (profileId: string) => void;
  interactive?: boolean;
}

export default function ProfileGrid({ selectedProfileId, onProfileSelect, interactive = false }: ProfileGridProps) {
  // Organize profiles in quadrants
  const quadrants = {
    A: COGNITIVE_PROFILES.filter(p => p.quadrant === 'A'),
    B: COGNITIVE_PROFILES.filter(p => p.quadrant === 'B'),
    C: COGNITIVE_PROFILES.filter(p => p.quadrant === 'C'),
    D: COGNITIVE_PROFILES.filter(p => p.quadrant === 'D'),
  };

  const quadrantLabels = {
    A: { label: 'Analítico', emoji: '🧠' },
    B: { label: 'Organizador', emoji: '📋' },
    C: { label: 'Interpersonal', emoji: '🤝' },
    D: { label: 'Creativo', emoji: '💡' },
  };

  const renderProfileCard = (profile: CognitiveProfile, index: number) => (
    <motion.div
      key={profile.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => interactive && onProfileSelect?.(profile.id)}
      className={`group relative overflow-hidden rounded-lg p-4 cursor-pointer transition-all ${
        interactive ? 'hover:shadow-xl' : ''
      } ${selectedProfileId === profile.id ? 'ring-2 ring-white' : ''}`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-10`} />

      {/* Hover glow effect */}
      {interactive && (
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity" />
      )}

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">
          {profile.title}
        </h3>

        <p className="text-xs text-gray-300 mb-3 line-clamp-2">
          {profile.description}
        </p>

        {/* Characteristics */}
        <div className="flex flex-wrap gap-1">
          {profile.characteristics.slice(0, 2).map((char, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-200">
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Selection indicator */}
      {selectedProfileId === profile.id && (
        <motion.div
          layoutId="selectedProfile"
          className="absolute inset-0 border-2 border-white rounded-lg"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );

  return (
    <div className="w-full space-y-12">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-2">
          Tus 16 Perfiles Cognitivos
        </h1>
        <p className="text-gray-400">
          Cada perfil representa un aspecto único de tu forma de pensar
        </p>
      </div>

      {/* Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {(Object.entries(quadrants) as [keyof typeof quadrants, CognitiveProfile[]][]).map(
          ([quadrant, profiles]) => (
            <motion.div
              key={quadrant}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {/* Quadrant Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700">
                <span className="text-2xl">{quadrantLabels[quadrant as keyof typeof quadrantLabels].emoji}</span>
                <h2 className="text-2xl font-semibold text-white">
                  {quadrantLabels[quadrant as keyof typeof quadrantLabels].label}
                </h2>
              </div>

              {/* Profiles Grid */}
              <div className="grid grid-cols-2 gap-3">
                {profiles.map((profile, idx) => renderProfileCard(profile, idx))}
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
