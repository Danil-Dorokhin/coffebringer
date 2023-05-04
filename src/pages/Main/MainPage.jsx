import { Grid } from "@mui/material";
import { OrderItem } from "./OrderItem";
import { useEffect, useState } from "react";
import { endpoints, instance } from "../../utils/endpoints";

const types = [1, 2, 3, 4, 5];

export const MainPage = () => {
  const [orderList, setOrderList] = useState([]);

  const getOrderList = () => {
    let searchParams = new URLSearchParams({ offset: 0, limit: 100 });

    types.forEach((type) => {
      searchParams.append("types", type);
    });

    return instance
      .get(endpoints.orders, {
        params: searchParams,
      })
      .then((data) => setOrderList(data.data.data.items));
  };

  useEffect(() => {
    getOrderList();
    let interval = setInterval(() => getOrderList(), 2000);
    return () => interval && clearInterval(interval);
  }, []);

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={8}
      >
        {orderList.map((order) => (
          <OrderItem key={order.id} {...{ order }} />
        ))}
      </Grid>
    </div>
  );
};
