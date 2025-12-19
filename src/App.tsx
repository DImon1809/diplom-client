import { useEffect } from "react";

import { Navbar } from "./components/Navbar";
import { AuthForm } from "./components/AuthForm";

import { useAppDispatch, useAppSelector } from "./store";
import { setAuthStatus } from "./store/user/userSlice";
import { ProductPage } from "./components/ProductPage";
import { CardsPage } from "./components/CardsPage";
import { Route, Routes } from "react-router-dom";

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

      {isAuthorized ? (
        <>
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/cards/:productId" element={<CardsPage />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<AuthForm />} />
          </Routes>
        </>
      )}
    </>
  );
};
