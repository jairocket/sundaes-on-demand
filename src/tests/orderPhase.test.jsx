import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { waitForElementToBeRemoved } from "@testing-library/react";

test("order phases for happy path", async () => {
  //render app
  render(<App />);
  //add ice cream scoops and toppings
  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: /Chocolate/i,
  });
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: /Vanilla/i,
  });
  const hotFudgeTopping = await screen.findByRole("checkbox", {
    name: /Hot Fudge/i,
  });
  const cherryTopping = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });

  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "2");
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, "1");
  userEvent.clear(hotFudgeTopping);
  userEvent.click(hotFudgeTopping);
  userEvent.clear(cherryTopping);
  userEvent.click(cherryTopping);
  //find and click button
  const orderEntryButton = screen.getByRole("button", {
    name: /Order Sundae!/i,
  });
  userEvent.click(orderEntryButton);

  //check summary information based on order

  const chocolateCounts = await screen.findByText(/2 Chocolate/i);
  expect(chocolateCounts).toBeInTheDocument();

  const vanillaCounts = await screen.findByText(/1 Vanilla/i);
  expect(vanillaCounts).toBeInTheDocument();

  // const scoopCounts = screen.getByRole("list", { name: /scoops/i });
  // expect(scoopCounts).toMatchSnapshot();

  const scoopSubtotal = await screen.findByText("Scoops: $", {
    exact: false,
  });

  expect(scoopSubtotal).toHaveTextContent("6.00");

  const toppingSubtotal = await screen.findByText("Toppings: $", {
    exact: false,
  });
  const total = await screen.findByText(/Total: \$/);

  expect(toppingSubtotal).toHaveTextContent("3.00");
  expect(total).toHaveTextContent("9.00");

  //accept terms and conditions and click button to confirm order

  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: /Confirm Order/i,
  });

  userEvent.click(termsAndConditionsCheckbox);
  userEvent.click(confirmOrderButton);

  //confirm order number on confirmation page

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  await waitForElementToBeRemoved(screen.queryByText(/loading/i));

  const orderNumber = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumber).toHaveTextContent("9876543210");

  //click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /Create new Order/i,
  });

  userEvent.click(newOrderButton);

  //check that scoops and toppings subtotals have been reset

  const newScoopSubtotal = await screen.findByText("Scoops total: $", {
    exact: false,
  });
  expect(newScoopSubtotal).toHaveTextContent("0.00");

  const newToppingSubtotal = await screen.findByText("Toppings total: $", {
    exact: false,
  });

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.logTestingPlaygroundURL();

  expect(newToppingSubtotal).toHaveTextContent("0.00");

  const newTotal = screen.getByText(/Grand Total: \$/i, { exact: false });

  expect(newTotal).toHaveTextContent("0.00");

  //do we need to await anything to avoid errors?
});

test("OrderSummary should show topping's summary only if a topping option is chosen", async () => {
  render(<App />);

  const mintChipScoop = await screen.findByRole("spinbutton", {
    name: /mint chip/i,
  });

  const OrderSundaeButton = screen.getByRole("button", {
    name: /order sundae!/i,
  });

  userEvent.type(mintChipScoop, "3");
  userEvent.click(OrderSundaeButton);

  const scoopSubtotal = await screen.findByText("Scoops: $", {
    exact: false,
  });

  const toppingSubtotal = screen.queryByText("Toppings: $", {
    exact: false,
  });

  expect(scoopSubtotal).toHaveTextContent("6.00");
  expect(toppingSubtotal).not.toBeInTheDocument();
});
