import { useState } from "react";

import type { MouseEvent } from "react";

import styles from "./style.module.scss";
import { useLoginMutation } from "../../store/user/userApi";

export const AuthForm = () => {
  const [login, { isLoading }] = useLoginMutation();

  const [params, setParams] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (params?.email && params?.password) {
      login({ email: params.email, password: params.password });
    }
  };

  return (
    <form className={styles.auth__form}>
      <h3 className={styles.title}>Авторизация</h3>

      <div className={styles.inputs}>
        <div className={styles.input__wrapper}>
          <input
            type="text"
            id="email"
            className={styles.input}
            placeholder=""
            value={params?.email}
            onChange={(event) =>
              setParams((param) => ({ ...param, email: event.target.value }))
            }
          />
          <label htmlFor="email" className={styles.label}>
            Почта
          </label>
        </div>

        <div className={styles.input__wrapper}>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder=""
            value={params?.password}
            onChange={(event) =>
              setParams((param) => ({ ...param, password: event.target.value }))
            }
          />
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>
        </div>
      </div>

      <button
        className={`${styles.send__button} ${isLoading ? styles.loading : ""}`}
        onClick={handleClick}
      >
        {isLoading ? <span className={styles.spinner}></span> : "Отправить"}
      </button>
    </form>
  );
};
