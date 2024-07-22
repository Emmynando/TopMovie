"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import capitalizeWords from "@/src/utils/Capitalization";
import styles from "@/src/component/TopMovie/FinalPage.module.css";

const TopMovie = {
  id: "",
  title: "",
  thumbnail: "",
  genre: "",
  duration: 0,
  movieLink: "",
  plot: "",
  createdAt: "",
};
interface TopMovieProps {
  id: string;
  title: string;
  thumbnail: string;
  genre: string;
  duration: number;
  movieLink: string;
  plot: string;
  createdAt: string;
}

interface MyTopMovieProps {
  topMovie: TopMovieProps | null;
}

export default function MyTopMovie({ params }: { params: any }) {
  const [movieDeets, setMovieDeets] = useState<TopMovieProps>(TopMovie);
  let movieLink: string;
  useEffect(() => {
    getCreatedMovie();
  }, []);

  async function getCreatedMovie() {
    try {
      const data = await fetch(`/api/created-movie?id=${params.id}`);
      if (!data.ok) {
        throw new Error("Request failed");
      }
      const response = await data.json();
      setMovieDeets(response.movie);
      movieLink = `http://localhost:3000/my-top-movie/${movieDeets.id}`;
    } catch (error) {
      console.log(error);
    }
  }
  const copylink = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/my-top-movie/${movieDeets.id}`
    );
    alert("link copied");
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
          <h1>
            <Link href="/">{capitalizeWords(movieDeets.title)}</Link>
          </h1>
          <Image
            src={movieDeets.thumbnail}
            layout="responsive"
            width={0}
            height={0}
            alt=""
          />
        </div>
        <div className={styles.details}>
          <p>
            <span>Duration: </span>
            {movieDeets.duration} minutes
          </p>
          <p>
            <span>Genre: </span>
            {capitalizeWords(movieDeets.genre)}
          </p>
          <p>
            <span>To watch: </span>
            Click{" "}
            <Link href={movieDeets.movieLink} target="blank">
              here
            </Link>
          </p>
          <p>
            <span>Plot: </span>
            {movieDeets.plot}
          </p>
        </div>
        <p className={styles.download}>
          Copy Link to share pick with others{" "}
          <span>http://localhost:3000/my-top-movie/{movieDeets.id}</span>{" "}
          <button onClick={copylink}>Copy</button>
        </p>
      </div>
    </div>
  );
}
