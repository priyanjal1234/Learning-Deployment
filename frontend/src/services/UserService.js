import { toast } from "react-toastify";
import api from "../api";

export const registerUser = async function (register) {
  try {
    let registerUserRes = await api.post("/users/register", register, {
      withCredentials: true,
    });
    return registerUserRes;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error("All Fields are required");
    } else if (error.response && error.response.status === 409) {
      toast.error("This Account already exists");
    } else if (error.response && error.response.status === 500) {
      toast.error("Something went wrong");
    }
  }
};

export const loginUser = async function (login) {
  try {
    let loginUserRes = await api.post("/users/login", login, {
        withCredentials: true,
      });
      return loginUserRes;
  } catch (error) {
    if(error.response && error.response.status === 400) {
        toast.error("All Fields are required")
    }
    else if(error.response && error.response.status === 404) {
        toast.error("You are not registered")
    }
    else if(error.response && error.response.status === 401) {
        toast.error("Invalid Password")
    }
    else {
        toast.error("Something went wrong")
    }
  }
};

export const logoutUser = async function () {
  try {
    let logoutUserRes = await api.get("/users/logout", {
      withCredentials: true,
    });
    return logoutUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error Logging Out");
    }
  }
};

export const getLoggedinUser = async function () {
  try {
    let getLoggedinUserRes = await api.get("/users/profile", {
      withCredentials: true,
    });
    return getLoggedinUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error fetching user");
    }
  }
};
