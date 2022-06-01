import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const OrderPhase = createContext();

export function useOrderPhase() {
  const context = useContext(OrderPhase);
  if (!context) {
    throw new Error("useOrderPhase must be used within an OrderPhaseProvider");
  }

  return context;
}
export function OrderPhaseProvider(props) {
  const [orderNumber, setOrderNumber] = useState();
  const [loading, setLoading] = useState(true);
  const [orderPhase, setOrderPhase] = useState("inProgress");
  // inProgress => render OrderEntry
  // review => render OrderSummary
  // complete => render OrderConfirmation
  useEffect(() => {
    axios.post(`http://localhost:3030/order`).then((response) => {
      setOrderNumber(response.data);
      setLoading(false);
    });
  }, []);

  const value = { orderNumber, loading, orderPhase, setOrderPhase };
  return <OrderPhase.Provider value={value} {...props} />;
}
