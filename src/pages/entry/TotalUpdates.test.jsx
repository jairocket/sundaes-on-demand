import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../entry/Options";
import OrderEntry from "./OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);
  //make sure total starts out $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });

  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  expect(scoopSubtotal).toHaveTextContent("0.00");
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");
  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when topping option is ticked", async () => {
  render(<Options optionType="toppings" />);
  //make sure total starts out $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  //Turn Cherries topping checkbox on and check the subtotal
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");
  userEvent.clear(cherriesInput);
  userEvent.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  //Turn M&Ms topping on and check the subtotal
  const mmsInput = await screen.findByRole("checkbox", { name: "M&Ms" });
  userEvent.clear(mmsInput);
  userEvent.click(mmsInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
  //Turn Cherry topping off and check the subtotal
  userEvent.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const mintChipScoopInput = await screen.findByRole("spinbutton", {
      name: /Mint chip/i,
    });
    const hotFudgeToppingInput = await screen.findByRole("checkbox", {
      name: /Hot Fudge/i,
    });
    const grandTotal = await screen.findByRole("heading", {
      name: /Grand Total: \$/i,
    });

    expect(grandTotal).toHaveTextContent("0.00");

    userEvent.clear(mintChipScoopInput);
    userEvent.type(mintChipScoopInput, "1");

    userEvent.clear(hotFudgeToppingInput);
    userEvent.click(hotFudgeToppingInput);

    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const cherriesToppingInput = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });
    const chocolateScoopInput = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });
    const grandTotal = await screen.findByRole("heading", {
      name: /Grand Total: \$/i,
    });

    userEvent.clear(cherriesToppingInput);
    userEvent.click(cherriesToppingInput);

    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, "3");

    expect(grandTotal).toHaveTextContent("7.50");
  });
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const vanillaScoopInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    const mmsToppingInput = await screen.findByRole("checkbox", {
      name: /M&Ms/i,
    });
    const grandTotal = await screen.findByRole("heading", {
      name: /Grand Total: \$/i,
    });

    userEvent.clear(vanillaScoopInput);
    userEvent.type(vanillaScoopInput, "2");

    userEvent.clear(mmsToppingInput);
    userEvent.click(mmsToppingInput);

    expect(grandTotal).toHaveTextContent("5.50");

    userEvent.clear(vanillaScoopInput);
    userEvent.type(vanillaScoopInput, "1");
    userEvent.click(mmsToppingInput);

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
