import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <main>
      <h1>Hello {router.query.torrent}</h1>
    </main>
  );
};

export default Home;
