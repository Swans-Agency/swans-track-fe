import Swal from "sweetalert2";
import { remove } from "react-cookies";
import { NotificationError } from "./Notifications";

const handleError = async (err) => {
  if (typeof window !== "undefined") {
    
    if ((err?.response?.status == 401 || err?.response?.status == 403) && window.location.pathname != "/" && window.location.pathname != "/login" && window.location.pathname != "/signup" && window.location.pathname != "/forgot-password" && window.location.pathname != "/reset-password" && !window.location.pathname.startsWith("/invited-project")) {
      Swal.fire({
        title: "Your session has end...",
        text: "Please login again, don't worry, we kept all of your filters and breakdowns in place.",
        icon: "error",
        allowOutsideClick: false,
        confirmButtonText: "Login",
        confirmButtonColor: "#282828",
        focusConfirm: false,
        customClass: {
          container: "custom-swal-container1",
          popup: "custom-swal-popup1",
        },
      }).then((result) => {
        remove("AccessTokenSBS");
        window.location.href = "/login";
      });
    } else {
      NotificationError(err);
    }
  } else {
    NotificationError(err);
  }
};

export { handleError };
