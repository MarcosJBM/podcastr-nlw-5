type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  file: File;
  durationAsString: string;
};

interface File {
  url: string;
  duration: number;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};
