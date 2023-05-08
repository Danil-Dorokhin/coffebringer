import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import { instance, endpoints } from "../../utils/endpoints";
import "./item.css";

const getItemClassName = (state) => {
  if (state === "Pending") return "item-active";
  if (state === "Ready for Pickup") return "item-pending";
  return "item";
};

const typographyStyle = { maxWidth: 300, padding: 8 };

const getTimeFormatted = (dateObj) => {
  const dateTime = new Date(
    dateObj.dateTime.replace(/(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1")
  );
  const userTimezoneOffset = dateTime.getTimezoneOffset();
  const userTime = dateTime.getTime() - userTimezoneOffset * 60 * 1000;

  return new Date(userTime).toLocaleString("en-US", {
    timeZone: dateObj.timezone,
    hour12: false,
  });
};

export const OrderItem = ({ order, setOrderCompleted, isCompleted }) => {
  const [error, setError] = useState(false);

  const completeOrder = () => {
    const formData = new FormData();
    formData.append("order", order.id);
    return instance.post(endpoints.completeOrder, formData);
  };

  const readyForPickup = () => {
    const formData = new FormData();
    formData.append("order", order.id);
    formData.append("state", 6); // hardcoded "fulfilled" state
    order.items.forEach((item) => {
      formData.append("items[]", item.item_id); //not sure about [] but their UI have it so i decided - "why not"
    });
    return instance.post(endpoints.updateItemsState, formData);
  };

  const getTimes = () => {
    let times = 0;
    order.items.forEach((item) => {
      times += item.quantity;
    });
    return times;
  };

  const handleSendRobot = () => {
    const formData = new FormData();
    formData.append("times", getTimes());
    instance.post(endpoints.sendRobot + "asd", formData).then(
      (resp) => {
        if (resp.status != 200) setError(true);
      },
      () => setError(true)
    );
  };

  const handleCompleteOrder = () => {
    readyForPickup().then(completeOrder);
    completeOrder();
    setOrderCompleted();
    handleSendRobot();
  };

  return (
    <Grid item>
      <Card
        className={
          isCompleted ? "item-pending" : getItemClassName(order.state.name)
        }
        sx={{ minWidth: 275, borderRadius: 6 }}
      >
        <CardContent>
          {error && (
            <Typography
              style={typographyStyle}
              color="error"
              variant="h6"
              component="div"
            >
              {"Sorry, robot is offline now  :("}
            </Typography>
          )}
          <Typography style={typographyStyle} variant="h5" component="div">
            Order Items:
          </Typography>
          {order.items.map((item) => (
            <Typography
              style={{ marginLeft: 12 }}
            >{`- ${item.quantity} ${item.product.name}`}</Typography>
          ))}
          <Divider />
          <Typography style={typographyStyle} variant="p" component="div">
            {`Note: ${order.note}`}
          </Typography>
          <Divider />
          <Typography style={typographyStyle} variant="p" component="div">
            {`Status: ${order.state.name}`}
          </Typography>
          <Divider />
          <Typography style={typographyStyle} variant="p" component="div">
            {`Time: ${getTimeFormatted(order.createdAt)}`}
          </Typography>
          <Divider />
          <Typography style={typographyStyle} variant="p" component="div">
            {`Client: ${order.mp_api_user.first_name} ${order.mp_api_user.last_name}`}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            disabled={isCompleted}
            onClick={handleCompleteOrder}
            variant="contained"
            size="small"
          >
            Complete Order
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
