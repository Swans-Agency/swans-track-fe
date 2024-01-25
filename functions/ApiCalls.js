import cookie from "react-cookies";
import axios from "axios";
import { NotificationLoading, NotificationSuccess } from "./Notifications";
import { handleError } from "./ErrorHandling";

const getAxios = async (url, loading, success, callBack, dontSendToken = false) => {
  try {
    if (loading) {
      NotificationLoading();
    }
    let accessToken = cookie.load("AccessTokenSBS", { path: "/" });
    let invitedEmail = cookie.load("invited-email", { path: "/" });
    let invitedProjectId = cookie.load("invited-project", { path: "/" });
    let params = {
      email: invitedEmail,
      projectId: invitedProjectId
    }
    let auth = dontSendToken ? { params: params } : { headers: { Authorization: `Bearer ${accessToken}` }, params: params };
    let res = await axios.get(url, auth);
    if (callBack) {
      callBack(res?.data);
    }
    if (success) {
      NotificationSuccess(res?.data);
    }
    return res?.data;
  } catch (err) {
    handleError(err)
  }
};

const postAxios = async (url, data, loading, success, callBack = () => { }, fail = true, failMessage = "", dontSendToken = false, successMessage = null) => {
  try {
    if (loading) {
      NotificationLoading();
    }
    let accessToken = cookie.load("AccessTokenSBS", { path: "/" });
    let invitedEmail = cookie.load("invited-email", { path: "/" });
    let invitedProjectId = cookie.load("invited-project", { path: "/" });
    let params = {
      email: invitedEmail,
      projectId: invitedProjectId
    }
    let auth = dontSendToken ? { params: params } : { headers: { Authorization: `Bearer ${accessToken}` }, params: params };
    let res = await axios.post(url, data, auth);
    if (success) {
      if (successMessage) {
        NotificationSuccess(successMessage, true);
      } else {
        NotificationSuccess(res?.data);
      }
    }
    callBack(res?.data);
    return res?.data;
  } catch (err) {

    if (fail) {
      if (failMessage.length > 0) {
        handleError(failMessage)
      } else {
        handleError(err)
      }
    }
  }
};

const putAxios = async (url, data, loading, success, callBack, dontSendToken = false) => {
  try {
    if (loading) {
      NotificationLoading();
    }
    let accessToken = cookie.load("AccessTokenSBS", { path: "/" });
    let invitedEmail = cookie.load("invited-email", { path: "/" });
    let invitedProjectId = cookie.load("invited-project", { path: "/" });
    let params = {
      email: invitedEmail,
      projectId: invitedProjectId
    }
    let auth = dontSendToken ? { params: params } : { headers: { Authorization: `Bearer ${accessToken}` }, params: params };
    let res = await axios.put(url, data, auth);
    if (callBack) {
      callBack(res?.data);
    }
    if (success) {
      NotificationSuccess(res?.data);
    }
    return res?.data;
  } catch (err) {
    handleError(err)
  }
};

const patchAxios = async (url, data, loading, success, callBack, dontSendToken = false) => {
  try {
    if (loading) {
      NotificationLoading();
    }
    let accessToken = cookie.load("AccessTokenSBS", { path: "/" });
    let invitedEmail = cookie.load("invited-email", { path: "/" });
    let invitedProjectId = cookie.load("invited-project", { path: "/" });
    let params = {
      email: invitedEmail,
      projectId: invitedProjectId
    }
    let auth = dontSendToken ? { params: params } : { headers: { Authorization: `Bearer ${accessToken}` }, params: params };
    let res = await axios.patch(url, data, auth);
    if (callBack) {
      callBack(res?.data);
    }
    if (success) {
      NotificationSuccess(res?.data);
    }
    return res?.data;
  } catch (err) {
    handleError(err)
  }
};

const deleteAxios = async (url, loading, success, callBack, dontSendToken = false) => {
  try {
    if (loading) {
      NotificationLoading();
    }
    let accessToken = cookie.load("AccessTokenSBS", { path: "/" });
    let invitedEmail = cookie.load("invited-email", { path: "/" });
    let invitedProjectId = cookie.load("invited-project", { path: "/" });
    let params = {
      email: invitedEmail,
      projectId: invitedProjectId
    }
    let auth = dontSendToken ? { params: params } : { headers: { Authorization: `Bearer ${accessToken}` }, params: params };
    let res = await axios.delete(url, auth);
    if (callBack) {
      callBack(res?.data);
    }
    if (success) {
      NotificationSuccess(res?.data);
    }
    return res?.data;
  } catch (err) {
    handleError(err)
  }
};

const getAxiosServer = async (url, accessToken, success) => {
  let auth = { headers: { Authorization: `Bearer ${accessToken}` } };
  try {
    let res = await axios.get(url, auth);
    if (success) {
      NotificationSuccess(res?.data);
    }
    return res?.data;
  } catch (err) {
    handleError(err)
  }
};

const postAxiosServer = async (url, data, accessToken, success) => {
  let auth = { headers: { Authorization: `Bearer ${accessToken}` } };
  try {
    let res = await axios({
      method: "post",
      url: `${url}`,
      headers: auth.headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      data: data,
    });
    if (success) {
      NotificationSuccess(res?.data);
    }
    return res?.data;
  } catch (err) {
    handleError(err)
  }
};

const postAxiosAllowAny = async (url, data, loading, success) => {
  try {
    if (loading) {
      NotificationLoading();
    }
    let res = await axios.post(url, data);
    if (success) {
      NotificationSuccess(res?.data);
    }
  } catch (err) {
    handleError(err)
  }
}

export {
  getAxios,
  postAxios,
  putAxios,
  patchAxios,
  deleteAxios,
  getAxiosServer,
  postAxiosServer,
  postAxiosAllowAny
};
