import { useAudioPlayer, useAudioPlayerStatus, type AudioPlayer, type AudioStatus } from 'expo-audio';
import React, { createContext, useContext, useMemo } from 'react';

type AudioPlayerContextValue = {
  player: AudioPlayer;
  status: AudioStatus;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const source = useMemo(() => require('../assets/audio/completedua.mp3'), []);
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  return (
    <AudioPlayerContext.Provider value={{ player, status }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAppAudio(): AudioPlayerContextValue {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error('useAppAudio must be used within an AudioPlayerProvider');
  }
  return ctx;
}
