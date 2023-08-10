import React, { useEffect } from "react";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import { getAxios } from "@/functions/ApiCalls";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  
  useEffect(() => {
    checkAuthorization();
    handleCheckSubscribe()
    checkCompanyPreferences()
  }, [router.pathname])

  const checkAuthorization = () => {
    const token = cookie.load("AccessTokenSBS", { path: "/" });
    const path = "authorized";
    if (router.pathname.includes(path)) {
      if (!token) {
        window.location.href = ("/401");
      }
    }
  };

  const checkCompanyPreferences = async () => {
    const companyPreferences = cookie.load("companyPreferences", { path: "/" });
    if (router.pathname != "/authorized/company-preference" && router.pathname.includes("authorized")) {
      if (!companyPreferences) {
        router.push("/authorized/company-preference");
      }
    }
  }

  const handleCheckSubscribe = async () => {
    const token = cookie.load("AccessTokenSBS", { path: "/" });
    if (token && router.pathname.includes('authorized')) {
      let response = await getAxios(`${process.env.DIGITALOCEAN}/company/company/subscription/`, false, false, () => { })
      console.log({ response })
      if (response.subscribed === false) {
        const currentPath = window.location.pathname;

        // Define the allowed paths
        const allowedPaths = [
          '/authorized/settings',
          '/authorized/settings/checkout',
          '/authorized/support',
        ];

        // Check if the current path is not in the allowed paths
        if (!allowedPaths.includes(currentPath)) {
          // Redirect the user to /authorized/settings
          window.location.href = '/authorized/settings';
        }
      }
    }
  }

  return <>{children}</>;
}
