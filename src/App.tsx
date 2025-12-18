import { useEffect } from "react";

import { Navbar } from "./components/Navbar";
import { AuthForm } from "./components/AuthForm";

import { useAppDispatch, useAppSelector } from "./store";
import { setAuthStatus } from "./store/user/userSlice";
import { ProductPage } from "./components/ProductPage";
// import { ProductParamsList } from "./components/ProductParamsList";
// import { ProductPage } from "./components/ProductPage";

export const App = () => {
  const dispatch = useAppDispatch();

  const { isAuthorized } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setAuthStatus(token));
    }
  }, []);

  return (
    <>
      <Navbar />
      {!isAuthorized && <AuthForm />}
      {/* {isAuthorized && <ProductParamsList />} */}
      {isAuthorized && <ProductPage />}
    </>
  );
};
