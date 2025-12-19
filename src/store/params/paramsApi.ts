import { serviceApi } from "../serviceApi";

export const paramsApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    createParam: builder.mutation<
      void,
      {
        name: string;
        unit: string;
      }
    >({
      query: (body) => ({
        url: "/api/param/create",
        method: "POST",
        body,
      }),
    }),
    updateParam: builder.mutation<
      void,
      {
        id: 1;
        details: string[];
        upperLimit?: string;
        lowerLimit?: string;
      }
    >({
      query: (body) => ({
        url: "/api/param/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetParams"],
    }),

    getAllDetails: builder.query<any, { id: number }>({
      query: ({ id }) => ({
        url: `/api/all/details/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateParamMutation,
  useUpdateParamMutation,
  useGetAllDetailsQuery,
} = paramsApi;
