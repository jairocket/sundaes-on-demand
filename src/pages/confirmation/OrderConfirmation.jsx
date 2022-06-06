import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState();
  const [loading, setLoading] = useState(true);
  const [{ resetItemCount }] = useOrderDetails();

  useEffect(() => {
    axios.post(`http://localhost:3030/order`).then((response) => {
      setOrderNumber(response.data.orderNumber);
    });

    setLoading(false);
  }, []);
  return loading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <p>as per out terms and conditions, nothing will happen now</p>

      <Button
        variant="primary"
        type="button"
        onClick={() => {
          resetItemCount();

          setOrderPhase("inProgress");
        }}
      >
        Create new Order
      </Button>
    </>
  );
}
