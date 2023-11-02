import HomePageWrapper from "@/components/HomePageWrapper/HomePageWrapper";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Diabetes360 | Where you finally meet Diabetes</title>
        <meta
          name="description"
          content="Get to know Diabetes, its risk factors, how to prevent it and assess your risk with a quick test."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blue_circle.svg" />
      </Head>
      <HomePageWrapper />
    </>
  );
}
