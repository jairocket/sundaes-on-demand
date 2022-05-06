import { render, screen } from "@testing-library/react";
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
