import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [{ resetItemCount }] = useOrderDetails();

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        setError(true);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading</div>;
  } else if (error) {
    return <AlertBanner />;
  } else {
    return (
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
}
