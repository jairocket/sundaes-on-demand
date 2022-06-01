import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Button } from "react-bootstrap";
import { useOrderPhase } from "../../contexts/OrderPhase";

export default function OrderEntry() {
  const [orderDetails] = useOrderDetails();
  // const [orderPhase] = useOrderPhase();
  // console.log(orderPhase);
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals["grandTotal"]}</h2>
      <Button variant="primary" type="button">
        Order Sundae!
      </Button>
    </div>
  );
}
