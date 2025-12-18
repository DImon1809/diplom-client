import { serviceApi } from "../serviceApi";

export const userApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        jwtToken: string;
      },
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),
    current: builder.query<string, void>({
      query: () => ({
        url: "/user/current",
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyCurrentQuery } = userApi;
