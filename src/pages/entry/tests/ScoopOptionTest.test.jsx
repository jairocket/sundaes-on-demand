import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOptions from "../ScoopOptions";

test("scoop option input should turn red if an invalid value is typed", async () => {
  render(<ScoopOptions updateItemCount={jest.fn()} name={"Chocolate"} />);

  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "11");

  expect(chocolateScoop).toHaveClass("is-invalid");

  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "2.5");

  expect(chocolateScoop).toHaveClass("is-invalid");

  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "-1");

  expect(chocolateScoop).toHaveClass("is-invalid");

  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "2");

  expect(chocolateScoop).not.toHaveClass("is-invalid");
});
