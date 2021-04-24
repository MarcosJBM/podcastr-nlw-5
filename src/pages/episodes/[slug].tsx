import { GetStaticPaths, GetStaticProps } from 'next';

import { useRouter } from 'next/router';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { api } from '../../services/api';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

interface Episodes {
  episode: Episode;
}

export default function Episode({ episode }: Episodes) {
  return <h1>{episode.title}</h1>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const { data } = await api.get<Episode>(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    published_at: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 Hours
  };
};
