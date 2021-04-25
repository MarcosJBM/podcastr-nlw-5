interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: File;
  durationAsString: string;
}

interface File {
  url: string;
  duration: number;
}

interface HomepageProps {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

interface PlayerContextData {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}
