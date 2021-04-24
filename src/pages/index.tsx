import { GetStaticProps } from 'next';

export default function Home(props: HomeProps) {
  return (
    <div>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    'http://localhost:3333/episodes?_limit=12&_sort=published_at&_order=des'
  );
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
