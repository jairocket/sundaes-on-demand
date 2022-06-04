import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { waitFor } from "@testing-library/react";

test("order phases for happy path", async () => {
  //render app
  render(<App />);
  //add ice cream scoops and toppings
  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: /Chocolate/i,
  });
  const hotFudgeTopping = await screen.findByRole("checkbox", {
    name: /Hot Fudge/i,
  });
  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "1");
  userEvent.clear(hotFudgeTopping);
  userEvent.click(hotFudgeTopping);
  //find and click button
  const orderEntryButton = screen.getByRole("button", {
    name: /Order Sundae!/i,
  });
  userEvent.click(orderEntryButton);

  //check summary information based on order

  await waitFor(async () => {
    const scoopSubtotal = await screen.findByText("Scoops: $", {
      exact: false,
    });

    expect(scoopSubtotal).toHaveTextContent("2.00");
  });

  const toppingSubtotal = await screen.findByText("Toppings: $", {
    exact: false,
  });
  const total = await screen.findByText(/Total: \$/);

  expect(toppingSubtotal).toHaveTextContent("1.50");
  expect(total).toHaveTextContent("3.50");

  //accept terms and conditions and click button to confirm order

  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: /Confirm Order/i,
  });

  userEvent.hover(termsAndConditionsCheckbox);
  userEvent.click(confirmOrderButton);

  //confirm order number on confirmation page
  // await waitFor(async () => {
  //   const loading = await screen.findByRole("heading", { name: /loading/i });
  //   expect(loading).toBeInTheDocument();
  // });
  // await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  await waitFor(async () => {
    const orderNumber = await screen.findByText("Your order number is", {
      exact: false,
    });
    expect(orderNumber).toHaveTextContent("9876543210");
  });

  //find a way to check order number

  //click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /Create new Order/i,
  });

  userEvent.click(newOrderButton);

  //check that scoops and toppings subtotals have been reset

  const newScoopSubtotal = screen.getByText("Scoops: $", { exact: false });
  const newToppingSubtotal = screen.getByText("Toppings: $", { exact: false });
  const newTotal = screen.getByText(/Total: \$/, { exact: false });

  expect(newScoopSubtotal).toHaveTextContent("0.00");
  expect(newToppingSubtotal).toHaveTextContent("0.00");
  expect(newTotal).toHaveTextContent("0.00");

  //do we nwed to await anything to avoid errors?
});
