import "@/styles/globals.css";
import AuthWrapper from "@/components/Auth/Auth";
import Layout from "@/components/Layout/Layout";
import { NavCollapseWraper } from "@/context/NavContext";
import { NavShowWraper } from "@/context/ShowNavContext";
import { ConfigProvider, theme } from "antd";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {

  // useEffect(() => {
  //   const html = document.querySelector("html");
  //   html.classList.add("dark");
  // }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      <AuthWrapper>
        <NavShowWraper>
          <NavCollapseWraper>
            <Layout>
              {/* <div id="toggle-theme" className="absolute top-0 left-0 w-0 h-0 bg-transparent"></div> */}
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm
                }}
              >
              <Component {...pageProps} />
              </ConfigProvider>
            </Layout>
          </NavCollapseWraper>
        </NavShowWraper>
      </AuthWrapper>
    </>
  );
}
