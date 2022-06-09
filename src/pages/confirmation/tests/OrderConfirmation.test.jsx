import { server } from "../../../mocks/server";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import { rest } from "msw";

test("it should show an error on order confirmation page if axios return an error", async () => {
  server.resetHandlers(
    rest.post(`http://localhost:3030/order`),
    (req, res, ctx) => {
      res(ctx.status(500));
    }
  );
  render(<OrderConfirmation setOrderPhase={jest.mock()} />);
  const alert = await screen.findByText(
    "An unexpected error ocurred. Please try again later."
  );
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.logTestingPlaygroundURL();
  expect(alert).toBeInTheDocument();
});
