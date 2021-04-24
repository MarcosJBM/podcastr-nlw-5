import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import { PlayerProvider } from '../contexts/PlayerContext';

import styles from '../styles/app.module.scss';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  );
}
