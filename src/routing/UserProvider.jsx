import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl, endpoints, instance } from "../utils/endpoints";

const UserContext = React.createContext({ user: null });

export const UserProvider = ({ children = null }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("authData");
    if (userData) setUser(JSON.parse(userData));
  });

  const logout = () => {
    localStorage.removeItem("authData");
    setUser(null);
  };

  const login = ({ login, password }) => {
    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", password);
    axios
      .post(baseUrl + endpoints.login, formData)
      .then(({ data: { jwt_token, refresh_token } }) => {
        const authData = {
          accessToken: jwt_token,
          refreshToken: refresh_token,
        };
        setUser(authData);
        localStorage.setItem("authData", authData);
      });
  };

  //const updateTokens = (tokens) => {
  //  localStorage.setItem("authData", tokens);
  //  setUser(tokens);
  //};

  //const refresh = () =>
  //  axios
  //    .post(baseUrl + "refreshEndpointThatDoesNotExist", { refreshToken })
  //    .then(({ data }) => data);

  useEffect(() => {
    if (!user) return;

    instance.interceptors.request.use(async (config) => ({
      ...config,
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    }));

    instance.interceptors.response.use(
      (resp) => resp,
      (err) => {
        const requestConfig = err.config;
        const { status } = err.response;
        //if (!requestConfig._retry && status === 401) {
        //  requestConfig._retry = true;
        //  return refresh().then(
        //    ({ accessToken, refreshToken }) => {
        //      const newConfig = { ...requestConfig };
        //      requestConfig.headers.Authorization = "Bearer " + accessToken;
        //      axios(newConfig);
        //      updateTokens({ accessToken, refreshToken });
        //    },
        //    () => logout()
        //  );
        //} else
        if (status === 401) {
          console.log(err, err.response.config.url, err.response.data);
          logout();
        } else {
          console.log(err, err.response.config.url, err.response.data);
          throw new Error(err);
        }
      }
    );
  }, [user]);

  return (
    <UserContext.Provider value={{ user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
