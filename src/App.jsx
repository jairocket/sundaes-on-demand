import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSumary from "./pages/summary/OrderSummary";

// import { OrderPhaseProvider } from "./contexts/OrderPhase";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { useState } from "react";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  if (orderPhase === "inProgress") {
    return (
      <Container>
        <OrderDetailsProvider>
          {/* Summary page and entry page need provider */}
          <OrderEntry setOrderPhase={setOrderPhase} />
        </OrderDetailsProvider>
        {/* confirmation page does not need provider */}
      </Container>
    );
  } else if (orderPhase === "review") {
    return (
      <Container>
        <OrderDetailsProvider>
          {/* Summary page and entry page need provider */}
          <OrderSumary setOrderPhase={setOrderPhase} />
        </OrderDetailsProvider>
        {/* confirmation page does not need provider */}
      </Container>
    );
  } else if (orderPhase === "complete") {
    return (
      <Container>
        <OrderDetailsProvider>
          {/* Summary page and entry page need provider */}
          <OrderConfirmation setOrderPhase={setOrderPhase} />
        </OrderDetailsProvider>
        {/* confirmation page does not need provider */}
      </Container>
    );
  }
}

export default App;
