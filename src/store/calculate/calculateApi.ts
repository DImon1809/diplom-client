import { serviceApi } from "../serviceApi";

export const calculateApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    calculateXRmiddle: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/xrmiddle",
      }),
    }),
    calculateXScard: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/xscard",
      }),
    }),
    calculateMRcard: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/mrcard",
      }),
    }),
    calculateIMRcard: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/imrcard",
      }),
    }),
    calculateCusumcard: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/cusum",
      }),
    }),
    calculatePcard: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/pcard",
      }),
    }),
    calculateNPcard: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/npcard",
      }),
    }),
    calculateUcard: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/ucard",
      }),
    }),
    calculateCcard: builder.query<any, void>({
      query: () => ({
        url: "/api/calculate/ccard",
      }),
    }),
  }),
});

export const {
  useLazyCalculateXRmiddleQuery,
  useLazyCalculateXScardQuery,
  useLazyCalculateMRcardQuery,
  useLazyCalculateIMRcardQuery,
  useLazyCalculateCusumcardQuery,
  useLazyCalculatePcardQuery,
  useLazyCalculateNPcardQuery,
  useLazyCalculateUcardQuery,
  useLazyCalculateCcardQuery,
} = calculateApi;
