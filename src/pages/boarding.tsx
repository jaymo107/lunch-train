import { NextPage } from "next";
import Head from "next/head";

const Boarding: NextPage = () => {
    return (
        <>
        <Head>
            <title>Lunch Train</title>
            <meta name="description" content="Let's go for lunch." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4 space-y-4">
        <h1 className="text-xl">You have boarded</h1>
    </main>
    </>
    );
}