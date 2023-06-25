import { notification } from "antd";


const NotificationLoading = () => {
    notification.info({
        message: "Loading",
        description: "Please wait while we process your request",
        key: "api",
    })
}

const NotificationPermission = () => {
    notification.info({
        message: "No Permission",
        description: "You don\'t have the permission to perform this action.",
        key: "api",
    })
}

const NotificationSuccess = (res) => {
    if (res?.description) {
        notification.success({
            message: "Success",
            description: res?.description,
            key: "api",
        })
    } else {
        notification.success({
            message: "Success",
            description: "Your request has been processed",
            key: "api",
        })
    }
}

const NotificationError = (err) => {
    if (err?.detail) {
        notification.error({
            message: "Error",
            description: err?.detail,
        });
    } else {
        notification.error({
            message: "Error",
            description: "Sorry we are unable to process your request at this time, something went wrong",
        });
    }
}


export { NotificationLoading, NotificationPermission, NotificationSuccess, NotificationError }