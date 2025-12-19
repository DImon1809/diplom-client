import { serviceApi } from "../serviceApi";

export const calculateApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    calculateXRmiddle: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/xrmiddle",
      }),
    }),
  }),
});

export const { useLazyCalculateXRmiddleQuery } = calculateApi;
