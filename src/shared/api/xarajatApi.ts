import { api } from './baseApi'

export const xarajatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getXarajatlar: builder.query({
      query: (params) => ({
        url: '/xarajat',
        params,
      }),
      providesTags: ['Xarajat'],
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { page, ...argsWithoutPage } = queryArgs as any
        return `${endpointName}-${JSON.stringify(argsWithoutPage)}`
      },
      merge: (currentCache, newItems, { arg }) => {
        if ((arg as any).page > 1) {
          currentCache.data.push(...newItems.data)
          currentCache.meta = newItems.meta
        } else {
          return newItems
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.search !== previousArg?.search ||
          currentArg?.kategoriya !== previousArg?.kategoriya
        )
      },
    }),
    getXarajatStats: builder.query({
      query: () => '/xarajat/stats',
      providesTags: ['Xarajat'],
      transformResponse: (response: any) => response.data,
    }),
    getXarajatChart: builder.query({
      query: (period) => `/xarajat/chart?period=${period}`,
      providesTags: ['Xarajat'],
      transformResponse: (response: any) => {
        if (Array.isArray(response.data)) {
          return response.data.map((item: any) => ({
            ...item,
            summa: parseFloat(item.summa) || 0,
          }))
        }
        return response.data
      },
    }),
    getTopCategories: builder.query({
      query: () => '/xarajat/kategoriyalar',
      providesTags: ['Xarajat'],
      transformResponse: (response: any) => {
        if (Array.isArray(response.data)) {
          return response.data.map((item: any) => ({
            ...item,
            summa: parseFloat(item.summa) || 0,
          }))
        }
        return response.data
      },
    }),
    createXarajat: builder.mutation({
      query: (data) => ({
        url: '/xarajat',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Xarajat'],
    }),
    updateXarajat: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/xarajat/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Xarajat'],
    }),
    deleteXarajat: builder.mutation({
      query: (id) => ({
        url: `/xarajat/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Xarajat'],
    }),
  }),
})

export const {
  useGetXarajatlarQuery,
  useGetXarajatStatsQuery,
  useGetXarajatChartQuery,
  useGetTopCategoriesQuery,
  useCreateXarajatMutation,
  useUpdateXarajatMutation,
  useDeleteXarajatMutation,
} = xarajatApi
