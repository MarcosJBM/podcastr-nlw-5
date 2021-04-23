import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <img src='/logo.svg' alt='Podcastr' />

      <p>O melhor para você ouvir, sempre</p>

      <span>Qui, 8 de Abril</span>
    </header>
  );
};
