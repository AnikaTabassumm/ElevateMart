import apiSlice from "./apiSlice";
import { ORDER_URL } from "./constantURL";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["MyOrder", "AllOrders"],
    }),
    updatePaymentStatus: builder.mutation({
      query: ({ orderID, paymentData }) => ({
        url: `${ORDER_URL}/${orderID}/payment`,
        method: "PATCH",
        body: paymentData,
      }),
      invalidatesTags: ["MyOrder", "AllOrders"],
    }),
    updateDeliveryStatus: builder.mutation({
      query: ({ orderID, deliveryStatus }) => ({
        url: `${ORDER_URL}/${orderID}/deliver`,
        method: "PATCH",
        body: { deliveryStatus },
      }),
      invalidatesTags: ["MyOrder", "AllOrders"],
    }),
    fetchOrderById: builder.query({
      query: (orderID) => ({
        url: `${ORDER_URL}/${orderID}`,
        method: "GET",
      }),
    }),
    fetchAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
        method: "GET",
      }),
    }),
    fetchMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myOrders`,
        method: "GET",
      }),
      providesTags: ["MyOrder"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdatePaymentStatusMutation,
  useFetchAllOrdersQuery,
  useFetchMyOrdersQuery,
  useFetchOrderByIdQuery,
  useUpdateDeliveryStatusMutation,
} = orderApiSlice;
