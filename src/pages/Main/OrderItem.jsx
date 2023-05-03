import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { endpoints, instance } from "../../utils/endpoints";
import "./item.css";

export const OrderItem = ({ order }) => {
  const handleOrderAction = () => {
    const formData = new FormData();
    formData.append("order", order.id);
    instance.post(endpoints.completeOrder, formData);
  };

  return (
    <Grid item>
      <Card
        className={order.state.name === "Created" ? "item-active" : "item"}
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
            onClick={handleOrderAction}
            disabled={order.state.name !== "Created"}
            variant="contained"
            size="small"
          >
            Done
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
