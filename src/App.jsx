import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSumary from "./pages/summary/OrderSummary";

import { OrderPhaseProvider } from "./contexts/OrderPhase";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  return (
    <Container>
      <OrderPhaseProvider>
        <OrderDetailsProvider>
          {/* Summary page and entry page need provider */}
          <OrderEntry />
          <OrderSumary />
          <OrderConfirmation />
        </OrderDetailsProvider>
        {/* confirmation page does not need provider */}
      </OrderPhaseProvider>
    </Container>
  );
}

export default App;
