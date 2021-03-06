import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";
//import { OrderPhaseProvider } from "../contexts/OrderPhase";

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

//re-esport everything

export * from "@testing-library/react";

//override render method

export { renderWithContext as render };
