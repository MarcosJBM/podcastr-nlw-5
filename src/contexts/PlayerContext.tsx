import React, { createContext, useState } from 'react';

export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerProvider: React.FC = ({ children }) => {
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  };

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
      {children}
    </PlayerContext.Provider>
  );
};
