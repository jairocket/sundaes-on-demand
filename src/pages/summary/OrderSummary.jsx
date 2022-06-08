import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const selectedScoops = [...orderDetails.scoops.keys()];
  const selectedToppings = [...orderDetails.toppings.keys()];

  const format = (item, total) => `${item} ${total}`;

  return (
    <>
      <h2 id="scoops">Scoops: {orderDetails.totals.scoops}</h2>

      <ul aria-label="scoops">
        {selectedScoops.map((item) => (
          <li key={selectedScoops.indexOf(item)}>
            {format(orderDetails.scoops.get(item), item)}
          </li>
        ))}
      </ul>

      {orderDetails.toppings.size > 0 && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul>
            {selectedToppings.map((item) => (
              <li key={selectedToppings.indexOf(item)}>{item}</li>
            ))}
          </ul>
        </>
      )}

      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
}
