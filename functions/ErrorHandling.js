import Swal from "sweetalert2";
import { remove } from "react-cookies";
import { NotificationError } from "./Notifications";

const handleError = async (err) => {
  if (typeof window !== "undefined") {
    console.log({err});
    if (err?.response?.status == 401 && window.location.pathname != "/" && window.location.pathname != "/login") {
      Swal.fire({
        title: "Your session has end...",
        text: "Please login again, don't worry, we kept all of your filters and breakdowns in place.",
        icon: "error",
        allowOutsideClick: false,
        confirmButtonText: "Login",
        confirmButtonColor: "#2C333A",
        focusConfirm: false,
        customClass: {
          container: "custom-swal-container",
          popup: "custom-swal-popup",
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
