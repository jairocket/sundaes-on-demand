import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("display image each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(3);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Chocolate scoop",
    "Vanilla scoop",
    "Mint chip scoop",
  ]);
});

test("display image of each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot Fudge topping",
  ]);
});

describe("invalid scoop values", () => {
  it("scoop subtotal should not update when a negative values are typed", async () => {
    render(<Options optionType={"scoops"} />);

    const mintChipScoopInput = await screen.findByRole("spinbutton", {
      name: /mint chip/i,
    });
    const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });

    userEvent.clear(mintChipScoopInput);
    userEvent.type(mintChipScoopInput, "-1");
    expect(scoopSubtotal).toHaveTextContent("0.00");
  });

  // it("scoop subtotal should not update when a value greater than ten is typed", async () => {
  //   render(<Options optionType={"scoops"} />);

  //   const mintChipScoopInput = await screen.findByRole("spinbutton", {
  //     name: /mint chip/i,
  //   });
  //   const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });

  //   userEvent.clear(mintChipScoopInput);
  //   userEvent.type(mintChipScoopInput, "37");
  //   expect(scoopSubtotal).toHaveTextContent("0.00");
  // });

  // it("scoop subtotal should not update when a float number is typed", async () => {
  //   render(<Options optionType={"scoops"} />);

  //   const mintChipScoopInput = await screen.findByRole("spinbutton", {
  //     name: /mint chip/i,
  //   });
  //   const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });

  //   userEvent.clear(mintChipScoopInput);
  //   userEvent.type(mintChipScoopInput, "2.5");
  //   expect(scoopSubtotal).toHaveTextContent("0.00");
  // });
});
