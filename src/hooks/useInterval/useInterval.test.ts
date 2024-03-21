import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { renderHook } from "@testing-library/react";
import { useInterval } from "./useInterval";

type HookProps = {
  cb: VoidFunction;
  delay: number | null;
};

function setup(props: Partial<HookProps> = {}) {
  const initialProps: HookProps = {
    cb: vi.fn(),
    delay: 1000,
    ...props,
  };

  return renderHook(({ cb, delay }: HookProps) => useInterval(cb, delay), {
    initialProps,
  });
}

describe("useInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("invokes the callback", () => {
    const cb = vi.fn();
    setup({ cb, delay: 100 });

    vi.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalledTimes(2);
  });

  it("cleans up before unmounting", () => {
    const cb = vi.fn();
    const { unmount } = setup({ cb, delay: 200 });

    vi.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(1);

    unmount();

    vi.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("changes the initial arguments", () => {
    const cb = vi.fn();
    const { rerender } = setup({ cb, delay: 300 });

    vi.advanceTimersByTime(300);
    expect(cb).toHaveBeenCalledTimes(1);

    const cb2 = vi.fn();
    rerender({ cb: cb2, delay: 400 });
    vi.advanceTimersByTime(300);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(1);
  });

  it("pauses and unpauses the interval", () => {
    const cb = vi.fn();
    const { rerender } = setup({ cb, delay: 300 });

    vi.advanceTimersByTime(300);
    expect(cb).toHaveBeenCalledTimes(1);

    rerender({ cb, delay: null });

    vi.advanceTimersByTime(600);
    expect(cb).toHaveBeenCalledTimes(1);

    rerender({ cb, delay: 100 });

    vi.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});
