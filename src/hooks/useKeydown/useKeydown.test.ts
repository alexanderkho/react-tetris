import { describe, expect, it, vi } from "vitest";
import { useKeydown } from "./useKeydown";
import { renderHook } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

type HookProps = {
  code: string;
  callback: VoidFunction;
};

function setup(props: Partial<HookProps> = {}) {
  const initialProps: HookProps = {
    code: "ArrowLeft",
    callback: vi.fn(),
    ...props,
  };
  return renderHook(
    ({ code, callback }: HookProps) => useKeydown(code, callback),
    { initialProps },
  );
}

describe("useKeydown", () => {
  it("invokes the callback on keydown", async () => {
    const callback = vi.fn();
    setup({ callback });

    await userEvent.keyboard("[ArrowLeft]");
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("doesn't invoke the callback for non-matching key", async () => {
    const callback = vi.fn();
    setup({ callback });

    await userEvent.keyboard("[Enter]");
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it("cleans up before unmounting", async () => {
    const callback = vi.fn();
    const { unmount } = setup({ callback });

    unmount();
    await userEvent.keyboard("[ArrowLeft]");
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it("updates the code and callback", async () => {
    const callback = vi.fn();
    const { rerender } = setup({ callback });

    await userEvent.keyboard("[ArrowLeft]");
    expect(callback).toHaveBeenCalledTimes(1);

    const callback2 = vi.fn();
    rerender({ callback: callback2, code: "Tab" });

    await userEvent.keyboard("[ArrowLeft][Tab]");
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
