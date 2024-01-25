import { notification } from "antd";
import Swal from "sweetalert2";


const NotificationLoading = () => {
    Swal.fire({
        title: "Loading",
        text: `Please wait while we process your request`,
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 3000,
        customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
        },
    })
}

const NotificationPermission = () => {
    Swal.fire({
        title: "No Permission",
        text: `You don\'t have the permission to perform this action.`,
        icon: "error",
        allowOutsideClick: true,
        showConfirmButton: false,
        timer: 3000,
        customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
        },
    })
}

const NotificationSuccess = (res, custom=false) => {
    Swal.fire({
        title: "Success",
        text: `${!custom ? "Your request has been processed" : res} `,
        icon: "success",
        allowOutsideClick: true,
        showConfirmButton: false,
        timer: 3000,
        customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
        },
    })
}

const NotificationError = (err) => {
    let textErr;

    if (typeof (err) == "string") {
        textErr = err
    } else if (err?.response?.data?.detail) {
        textErr = err?.response?.data?.detail
    } else if (typeof (err?.response?.data) !== "object" && err?.response?.data) {
        textErr = err?.response?.data
    } else {
        textErr = "Sorry were are unable to process your request."
    }
    // textErr = "lll"
    Swal.fire({
        title: "Error",
        text: `${textErr}`,
        icon: "error",
        allowOutsideClick: true,
        showConfirmButton: false,
        timer: 3000,
        customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
        },
    })

}


export { NotificationLoading, NotificationPermission, NotificationSuccess, NotificationError }