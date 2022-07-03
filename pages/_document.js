import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta property="og:type" content="gym" />

        <meta property="og:title" content="shape up gym" />

        <meta
          property="og:description"
          content="shape up gym sector 55 ,sector 56 , gurgaon"
        />

        <meta property="og:site_name" content="shape up gym gurgaon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
