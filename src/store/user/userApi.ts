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
        url: "/api/login",
        method: "POST",
        body,
      }),
    }),
    current: builder.query<
      {
        id: number;
        email: string;
        parameters: {
          id: number;
          name: string;
          unit: string;
          upperLimit: string;
          lowerLimit: string;
          details: string[];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          xrMiddle: any;
          createdAt: string;
        }[];
      },
      void
    >({
      query: () => ({
        url: "/api/current",
      }),
      providesTags: ["GetParams"],
    }),
  }),
});

export const { useLoginMutation, useCurrentQuery } = userApi;
