import 'rc-slider/assets/index.css';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import Slider from 'rc-slider';

import { usePlayer } from '../../contexts/PlayerContext';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './styles.module.scss';

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    playNext,
    playPrevious,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    hasNext,
    hasPrevious,
  } = usePlayer();

  useEffect(() => {
    if (!audioRef.current) return;

    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  };

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src='/playing.svg' alt='Tocando agora' />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            alt={episode.title}
            objectFit={'cover'}
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>

          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>

          <span>
            {convertDurationToTimeString(episode?.file?.duration ?? 0)}
          </span>
        </div>

        {episode && (
          <audio
            src={episode.file.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )}

        <div className={styles.buttons}>
          <button
            type='button'
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
            disabled={!episode || episodeList.length === 1}
          >
            <img src='/shuffle.svg' alt='Embaralhar' />
          </button>

          <button
            type='button'
            onClick={playPrevious}
            disabled={!episode || !hasPrevious}
          >
            <img src='/play-previous.svg' alt='Tocar anterior' />
          </button>

          <button
            type='button'
            disabled={!episode}
            className={styles.playButton}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src='/pause.svg' alt='Pausar' />
            ) : (
              <img src='/play.svg' alt='Tocar' />
            )}
          </button>

          <button
            type='button'
            onClick={playNext}
            disabled={!episode || !hasNext}
          >
            <img src='/play-next.svg' alt='Tocar próxima' />
          </button>

          <button
            type='button'
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
            disabled={!episode}
          >
            <img src='/repeat.svg' alt='Repetir' />
          </button>
        </div>
      </footer>
    </div>
  );
};
