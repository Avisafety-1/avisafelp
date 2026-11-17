import { cloneElement, createRef, type ReactElement, type ComponentPropsWithRef } from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { jsx } from "./jsx-runtime";

afterEach(cleanup);

describe("localized control composition", () => {
  it("forwards a slot-injected click handler to the control", () => {
    const onClick = vi.fn();
    const control = jsx("button", { children: "Language" }) as ReactElement<ComponentPropsWithRef<"button">>;
    const { getByRole } = render(cloneElement(control, { onClick }));
    fireEvent.click(getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards a slot-injected ref to the actual control", () => {
    const ref = createRef<HTMLButtonElement>();
    const control = jsx("button", { children: "Language" }) as ReactElement<ComponentPropsWithRef<"button">>;
    const { getByRole } = render(cloneElement(control, { ref }));
    expect(ref.current).toBe(getByRole("button"));
  });
});