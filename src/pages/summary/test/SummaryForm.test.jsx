import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";
import { waitForElementToBeRemoved } from "@testing-library/dom";

test("checkbox should be unchecked and button should be disabled by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /Confirm Order/i });
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("button should be unabled when checkbox is checked", async () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const button = screen.getByRole("button", { name: /Confirm order/i });
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();
  await userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  await userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
  expect(nullPopover).not.toBeInTheDocument();
});
