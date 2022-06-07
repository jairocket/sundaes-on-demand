import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  const [hasScoops, setHasScoops] = useState(false);

  const selectedScoops = [...orderDetails.scoops.values()].some(
    (count) => count > 0
  );

  useEffect(() => {
    selectedScoops ? setHasScoops(true) : setHasScoops(false);
  }, [selectedScoops]);

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals["grandTotal"]}</h2>
      <Button
        variant="primary"
        type="button"
        disabled={!hasScoops}
        onClick={() => setOrderPhase("review")}
      >
        Order Sundae!
      </Button>
    </div>
  );
}
