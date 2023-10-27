import { Html, Head, Main, NextScript } from "next/document";



export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logoNew.svg" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EQF1MDFZBL"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-EQF1MDFZBL');
              `,
          }}
        ></script>
      </Head>
      <body className="dark:bg-[#141414]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
