"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import SelectedTopMovie from "./SelectedTopMovie";
import Head from "next/head";
import styles from "./TopMovie.module.css";

interface TopMovie {
  title: string;
  thumbnail: string;
  genre: string;
  duration: number;
  movieLink: string;
  plot: string;
}

export default function TopMovieComp() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [topMovie, setTopMovie] = useState<TopMovie>({
    title: "",
    thumbnail: "",
    genre: "",
    movieLink: "",
    duration: 0,
    plot: "",
  });

  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    // Check if the cookie exists and hasn't expired
    const cookieExists = document.cookie
      .split("; ")
      .find((row) => row.startsWith("topMovieSubmitted="));

    if (cookieExists) {
      setFormDisabled(true);
    } else {
      setFormDisabled(false);
    }
  }, []);

  function setWeeklyCookie(name: string, value: string) {
    const currentDate = new Date();
    // Get the current day of the week (0-6, where 0 is Sunday)
    const currentDay = currentDate.getDay();
    // Calculate days until the start of the next week
    const daysUntilNextWeek = 7 - currentDay;
    // Calculate expiration date
    const expirationDate = new Date(
      currentDate.getTime() + daysUntilNextWeek * 24 * 60 * 60 * 1000
    );

    // Set the cookie with the calculated expiration date
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  // function to close modal
  function closeModal() {
    setShowModal(false);
  }

  function handleTopMovieChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    e.preventDefault();
    const { id, value } = e.target;
    // Parse the duration input value to a number
    const newValue = id === "duration" ? parseInt(value, 10) : value;
    setTopMovie((prevState) => ({ ...prevState, [id]: newValue }));
  }

  const handleImageUpload = (result: any) => {
    // Extract the URL of the uploaded image
    const uploadedImageUrl = result.info.secure_url;
    // setImageUrl(uploadedImageUrl);
    setTopMovie((prevState) => ({ ...prevState, thumbnail: uploadedImageUrl }));
    console.log(topMovie.thumbnail);
  };

  function previewMovieList(e: any) {
    e.preventDefault();
    // destructuring all movie items
    const { title, thumbnail, genre, movieLink, duration, plot } = topMovie;

    const allMovieITems = [title, thumbnail, genre, movieLink, duration, plot];

    // all items are inputed
    if (allMovieITems && duration > 0 && genre !== "none") {
      setShowModal(true);
    }
  }

  async function submitMovieList(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // destructuring all movie items
    const { title, thumbnail, genre, movieLink, duration, plot } = topMovie;
    const allMovieITems = [title, thumbnail, genre, movieLink, duration, plot];

    if (allMovieITems && duration > 0 && genre !== "none") {
      setShowModal(false);
      try {
        const response = await fetch("/api/top-movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(topMovie),
        });

        if (!response.ok) {
          throw new Error("Error saving movie");
        }
        // Set a cookie to expire at the start of the next week
        setWeeklyCookie("topMovieSubmitted", "true");

        const data = await response.json();
        const { id } = data;
        console.log(data);

        setTopMovie({
          title: "",
          thumbnail: "",
          genre: "",
          movieLink: "",
          duration: 0,
          plot: "",
        });
        alert("Movie saved successfully!");
        router.push(`my-top-movie/${id}`);
      } catch (error) {
        console.error("Error saving movie:", error);
      }
    }
  }

  function clearMovieList() {
    setTopMovie({
      title: "",
      thumbnail: "",
      genre: "",
      movieLink: "",
      duration: 0,
      plot: "",
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="preload" href="TopMovie.module.css" as="style" />
      </Head>
      <div className={styles.box}>
        <h1>Top Movie for the Week</h1>
        <h4>
          {!formDisabled
            ? "You can only create one category per week"
            : "You have created a movie for the week"}
        </h4>
        <form onSubmit={submitMovieList}>
          <label htmlFor="title">Movie Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={topMovie.title}
            onChange={handleTopMovieChange}
            placeholder="title"
            disabled={formDisabled}
            required
          />
          <label htmlFor="thumbnail">Movie Thumbnail</label>
          <CldUploadWidget
            uploadPreset="unsignedFavMov"
            onSuccess={(result) => handleImageUpload(result)}
          >
            {({ open }) => {
              return (
                <button
                  onClick={() => open()}
                  className={styles["thumbnail__button"]}
                >
                  Upload Thumbnail
                </button>
              );
            }}
          </CldUploadWidget>

          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={topMovie.genre}
            onChange={handleTopMovieChange}
            disabled={formDisabled}
          >
            <option value="">None</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
            <option value="comedy">Comedy</option>
            <option value="tragedy">Tragedy</option>
            <option value="others">Others</option>
          </select>
          <label htmlFor="duration">Duration (in minutes)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            min="0"
            value={topMovie.duration}
            onChange={handleTopMovieChange}
            disabled={formDisabled}
            placeholder="duration"
            required
          />
          <label htmlFor="movieLink">Movie Link</label>
          <input
            type="url"
            id="movieLink"
            name="movieLink"
            value={topMovie.movieLink}
            placeholder="movie link"
            onChange={handleTopMovieChange}
            disabled={formDisabled}
            required
          />
          <label htmlFor="plot">Movie Plot</label>
          <textarea
            id="plot"
            name="plot"
            value={topMovie.plot}
            placeholder="plot"
            onChange={(e) =>
              setTopMovie((prevState) => ({
                ...prevState,
                plot: e.target.value,
              }))
            }
            disabled={formDisabled}
          />
          <div className={styles.buttons}>
            <button onClick={clearMovieList}>Clear</button>
            <button onClick={previewMovieList} disabled={formDisabled}>
              Continue
            </button>
          </div>
          {/* preview part */}
          <>
            {showModal && (
              <SelectedTopMovie
                topMovie={topMovie}
                onCancel={closeModal}
                onFinish={submitMovieList}
              />
            )}
          </>
        </form>
      </div>
    </div>
  );
}
