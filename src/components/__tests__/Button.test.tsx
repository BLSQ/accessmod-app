import Button from "components/Button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button", () => {
  test("renders", () => {
    render(<Button>btn</Button>);
    const btn = screen.getByText("btn");
    expect(btn).toBeInTheDocument();
    expect(btn.classList).toContain("bg-indigo-600"); // primary variant
    expect(btn.classList).toContain("px-3"); // md size
  });

  test("onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>btn</Button>);

    fireEvent.click(screen.getByText("btn"));
    expect(onClick).toHaveBeenCalled();
  });
});
