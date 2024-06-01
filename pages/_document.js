import { Html, Head, Main, NextScript } from "next/document";
import { FB_PIXEL_ID } from "../lib/fpixel";


export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/logoNew.svg" />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
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
      <body className="dark dark:bg-[#141414]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
