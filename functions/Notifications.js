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

const NotificationSuccess = (res) => {
    Swal.fire({
        title: "Success",
        text: `Your request has been processed`,
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

    let textErr = typeof (err) == "string" ? err : err?.response?.data?.detail || typeof (err?.response?.data) !== "object" && err?.response?.data || "Sorry were are unable to process your request."

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