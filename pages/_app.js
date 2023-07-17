import "@/styles/globals.css";
import AuthWrapper from "@/components/Auth/Auth";
import Layout from "@/components/Layout/Layout";
import { NavCollapseWraper } from "@/context/NavContext";
import { NavShowWraper } from "@/context/ShowNavContext";
import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-EQF1MDFZBL"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '{{ GA_TRACKING_ID }}');
          `,
      }}
    />
  )
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <AuthWrapper>
        <NavShowWraper>
          <NavCollapseWraper>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NavCollapseWraper>
        </NavShowWraper>
      </AuthWrapper>
    </>
  );
}
