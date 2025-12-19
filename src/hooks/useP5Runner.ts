import { useCallback, useRef, useState } from "react";
import { mountP5 } from "../p5Runner";

type Running = {
  destroy: () => void;
  getError: () => string | null;
};

export function useP5Runner() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const runningRef = useRef<Running | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback((userCode: string) => {
    const host = hostRef.current;
    if (!host) return;
    runningRef.current?.destroy();
    runningRef.current = mountP5(host, userCode);
    setError(runningRef.current.getError());
  }, []);

  const stop = useCallback(() => {
    runningRef.current?.destroy();
    runningRef.current = null;
    setError(null);
    if (hostRef.current) hostRef.current.innerHTML = "";
  }, []);

  const reset = useCallback(
    (userCode: string) => {
      stop();
      run(userCode);
    },
    [run, stop]
  );

  return { hostRef, error, run, stop, reset };
}
