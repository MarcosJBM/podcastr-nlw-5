import '../styles/global.scss';

import { Header } from '../components/Header';

import styles from '../styles/app.module.scss';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </div>
  );
}
