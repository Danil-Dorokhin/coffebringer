import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { instance } from "../../utils/endpoints";
import "./item.css";

const getItemClassName = (state) => {
  if (state === "Pending") return "item-active";
  if (state === "Ready for Pickup") return "item-pending";
  return "item";
};

export const OrderItem = ({ order }) => {
  const handleCompleteOrder = () => {
    //const formData = new FormData();
    //formData.append("order", order.id);
    //instance.post(endpoints.completeOrder, formData);
    //updateItems();
  };

  const handleReadyForPickup = () => {
    const formData = new FormData();
    formData.append("order", order.id);
    formData.append("state", 6); // hardcoded "fulfilled" state
    order.items.forEach((item) => {
      formData.append("items[]", item.item_id); //not sure about [] but their UI have it so i decided - "why not"
    });
    return instance.post("/marketplace/orders/updateItemsState", formData);
  };

  return (
    <Grid item>
      <Card
        className={getItemClassName(order.state.name)}
        sx={{ minWidth: 275 }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" component="div">
              User:
            </Typography>
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
        </CardContent>
        <CardActions>
          <Button
            onClick={handleReadyForPickup}
            disabled={order.state.name !== "Pending"}
            variant="contained"
            size="small"
          >
            Ready for pickup
          </Button>
          <Button
            onClick={handleCompleteOrder}
            disabled={order.state.name !== "Ready for Pickup"}
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
