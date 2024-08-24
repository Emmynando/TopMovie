import Link from "next/link";
// import backgroundImage from "../../../public/videos/main.mp4";
import styles from "./SelectCategory.module.css";
export default function SelectCategory() {
  return (
    <div className={styles.container}>
      <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
        <source src="/videos/main.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.box}>
        <section className={styles.text}>
          <h1>Share Exciting Movies, Share Love🥰😍🤩</h1>
          <h3>
            because we love those we love, we share movies we find exciting with
            them
          </h3>
        </section>

        <section className={styles.buttons}>
          <button>
            <Link href="top-movie">My Top Movie Of The Week</Link>
          </button>
          <button>
            <Link href="top-three-movies">My Top Three Movies Of The Week</Link>
          </button>
        </section>
      </div>
    </div>
  );
}

// cm02yopmj0000cgn4jvlcqe4v
