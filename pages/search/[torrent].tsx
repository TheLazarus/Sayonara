import { GetServerSideProps, NextPage } from "next";
import { ISearchPageProps } from "./types";

const Home: NextPage<ISearchPageProps> = ({ torrent }) => {
  return (
    <main>
      <h1>Hello {torrent}</h1>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { torrent } = context.query;

  const results = await fetch(`http://localhost:3000/api/torrent/${torrent}`);

  return {
    props: {
      torrent,
      results: JSON.parse(JSON.stringify(results)),
    },
  };
};

export default Home;
