import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { instance, endpoints } from "../../utils/endpoints";
import "./item.css";

const getItemClassName = (state) => {
  if (state === "Pending") return "item-active";
  if (state === "Ready for Pickup") return "item-pending";
  return "item";
};

export const OrderItem = ({ order, setOrderCompleted, isCompleted }) => {
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

  const handleCompleteOrder = () => {
    readyForPickup().then(completeOrder);
    completeOrder();
    setOrderCompleted();
  };

  return (
    <Grid item>
      <Card
        className={
          isCompleted ? "item-pending" : getItemClassName(order.state.name)
        }
        sx={{ minWidth: 275 }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography style={{ maxWidth: 300 }} variant="p" component="div">
              {`${order.mp_api_user.first_name} ${order.mp_api_user.last_name}`}
            </Typography>
          </div>

          <Typography
            style={{ maxWidth: 300, marginTop: 12 }}
            variant="h5"
            component="div"
          >
            {`Note: ${order.note}`}
          </Typography>

          <Typography
            style={{ maxWidth: 300, marginTop: 12 }}
            q
            variant="h6"
            component="div"
          >
            {`Status: ${order.state.name}`}
          </Typography>
        </CardContent>
        <CardActions>
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
