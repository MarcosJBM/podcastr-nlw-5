type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: File;
};

interface File {
  url: string;
  duration: number;
}

type HomeProps = {
  episodes: Episode[];
};
