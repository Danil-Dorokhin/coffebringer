import { Grid } from "@mui/material";
import { OrderItem } from "./OrderItem";
import { useEffect, useState } from "react";
import { endpoints, instance } from "../../utils/endpoints";

const types = [1, 2, 3, 4, 5, 6];

const getTodayFormatted = () => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear().toString();
  return `${day}.${month}.${year}`;
};

export const MainPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const getOrderList = () =>
    instance
      .get(endpoints.orders, {
        params: {
          offset: 0,
          limit: 100000000,
          types: types.join(","),
          startDate: getTodayFormatted(),
          endDate: getTodayFormatted(),
        },
      })
      .then((data) => {
        setOrderList(data.data.data.items);
      });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [orderList.length]);

  useEffect(() => {
    getOrderList();
    let interval = setInterval(() => getOrderList(), 10000);
    return () => interval && clearInterval(interval);
  }, []);

  useEffect(() => {
    const filteredCompletedOrders = completedOrders.filter((id) => {
      for (let obj of orderList) {
        if (obj.id === id && obj.state.name !== "Completed") {
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
