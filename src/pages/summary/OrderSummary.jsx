import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderSumary() {
  const [orderDetails] = useOrderDetails();
  return (
    <>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>

      {/*map*/}
      <ul>{orderDetails.optionCounts}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      {/*map*/}
      <ul>{orderDetails.optionCounts}</ul>
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm />
    </>
  );
}
