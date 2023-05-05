import { Grid } from "@mui/material";
import { OrderItem } from "./OrderItem";
import { useEffect, useState } from "react";
import { endpoints, instance } from "../../utils/endpoints";

const types = [1, 2, 3, 4, 5];

export const MainPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const getOrderList = () =>
    instance
      .get(endpoints.orders, {
        params: {
          offset: 0,
          limit: 100,
          types: types.join(","),
        },
      })
      .then((data) => {
        setOrderList(data.data.data.items);
      });

  useEffect(() => {
    getOrderList();
    let interval = setInterval(() => getOrderList(), 15000);
    return () => interval && clearInterval(interval);
  }, []);

  useEffect(() => {
    const filteredCompletedOrders = completedOrders.filter((id) => {
      for (let obj of orderList) {
        if (obj.id === id) {
          return true;
        }
      }
      return false;
    });
    if (filteredCompletedOrders.length !== completedOrders.length)
      setCompletedOrders(filteredCompletedOrders);
  }, [completedOrders, orderList]);

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
          <OrderItem
            key={order.id}
            {...{ order }}
            isCompleted={completedOrders.includes(order.id)}
            setOrderCompleted={() =>
              setCompletedOrders([...completedOrders, order.id])
            }
          />
        ))}
      </Grid>
    </div>
  );
};
