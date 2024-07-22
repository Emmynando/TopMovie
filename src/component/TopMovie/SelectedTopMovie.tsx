"use client";
import { FC, FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import capitalizeWords from "@/src/utils/Capitalization";
import styles from "./SelectedTopMovie.module.css";

interface TopMovieProps {
  title: string;
  thumbnail: string;
  genre: string;
  duration: number;
  movieLink: string;
  plot: string;
}

interface SelectedTopMovieProps {
  topMovie: TopMovieProps;
  onCancel: () => void;
  onFinish: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const SelectedTopMovie: FC<SelectedTopMovieProps> = ({
  topMovie,
  onCancel,
  onFinish,
}) => {
  return (
    <section className={styles.container}>
      <Head>
        <link rel="preload" href="SelectedTopMovie.module.css" as="style" />
      </Head>
      <div className={styles.box}>
        <section className={styles["image-container"]}>
          <div className={styles["main-image"]}>
            <Image
              src={topMovie?.thumbnail}
              layout="responsive"
              width={0}
              height={0}
              alt="movie"
            />
          </div>
          <div className={styles.details}>
            <ul>
              <li>{topMovie?.title.toUpperCase()}</li>
              <li>
                {" "}
                <span>Genre: </span>
                {capitalizeWords(topMovie?.genre)}
              </li>
              <li>
                <span>Minutes: </span>
                {topMovie?.duration}
              </li>
              <li>
                <span>Plot: </span>
                {topMovie?.plot}
              </li>
              <li>
                <span>Movie Link: </span>
                {topMovie?.movieLink}
              </li>
            </ul>
          </div>
        </section>
        <div className={styles.buttons}>
          <button onClick={onCancel}>Cancel</button>
          {/* <button onClick={(e) => onFinish(e)}>Finish</button> */}
          <button type="submit">Finish</button>
        </div>
      </div>
    </section>
  );
};

export default SelectedTopMovie;
