import React from 'react';//simple
import { createContext, useContext, ReactNode, useState } from 'react';

type soundContextType = {
  state: boolean;
  toggle: () => void;
};

const soundContextDefaultValues: soundContextType = {
  state: false,
  toggle: () => { }
};

const SoundContext = createContext<soundContextType>(soundContextDefaultValues);

export function useSoundContext() {
  return useContext(SoundContext);
}

type Props = {
  children: ReactNode;
};

export function SoundProvider({ children }: Props) {
  const [state, setState] = useState<boolean>(true);
  const toggle = () => {
    setState(!state);
  };

  const value = {
    state,
    toggle
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}