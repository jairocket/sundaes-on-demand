import { Button } from "react-bootstrap";

export default function OrderConfirmation() {
  return (
    <>
      <h1>Thank you!</h1>
      <h2>Your order number is 9876543210</h2>
      <p>as per out terms and conditions, nothing will happen now</p>

      <Button variant="primary" type="button">
        Create new Order
      </Button>
    </>
  );
}
