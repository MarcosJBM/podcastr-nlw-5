import { GetStaticProps } from 'next';

import { api } from '../services/api';

export default function Home(props: HomeProps) {
  return (
    <div>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
