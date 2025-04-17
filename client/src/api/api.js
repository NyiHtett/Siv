import axios from "axios";
import { data } from "react-router-dom";

const apiClient = axios.create({
  baseURL: "http://localhost:5002/api",
  timeout: 1000,
});


apiClient.interceptors.request.use((config) => {
  const userDetails = localStorage.getItem("user");
  if (userDetails) {
    //attach the token
    const token = JSON.parse(userDetails).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
err => {
    return Promise.reject(err);
}
);

//login request function
export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    return {
      error: true,
      exception, //exception from server side
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getChannelSettings = async () => {
  try {
    return await apiClient.get("/settings/channel");
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const updateChannelSettings = async (data) => {
    try {
        return await apiClient.put('/settings/channel', data);
    }
    catch(exception) {
        return {
            error: true,
            exception,
        }
    }
}

export const changePassword = async (data) => {
    try {
        return await apiClient.patch('/settings/password', data)
    }
    catch(exception) {
        return {
            error: true, 
            exception: exception
        }
    }
}

export const getFollowedChannels = async () => {
    try {
        return await apiClient.get('/channels/followed');
    } catch(exception) {
        return {
            error: true,
            exception: exception,
        }
    }
}

//getting all the channels
export const getChannels = async () => {
    try {
        return await apiClient.get('/channels');
    } catch(exception) {
        return {
            error: true,
            exception: exception,
        }
    }
}

/**
 * Getting the details of specific channel for navigation and presenting
 * @param {*} channelId 
 * @returns 
 */
export const getChannelDetails = async (channelId) => {
    try {
        return await apiClient.get(`/channels/${channelId}`)
    } catch(exception) {
        return {
            error: true,
            exception,
        }
    }
}

export const followedChannel = async (channelId) => {
  try {
    return await apiClient.post('/channels/follow', {
      channelId,
    })
  }
  catch(exception) {
    return {
      error: true, 
      exception,
    }
  }
}