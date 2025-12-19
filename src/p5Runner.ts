import p5 from "p5";

// Friendly Errors が eval/new Function 環境で暴れて pixels 例外を出すことがあるので無効化
(p5 as unknown as { disableFriendlyErrors?: boolean }).disableFriendlyErrors =
  true;

type P5Like = p5 & {
  setup?: () => void;
  draw?: () => void;
};

function isFn(x: unknown): x is () => void {
  return typeof x === "function";
}

export function mountP5(container: HTMLElement, userCode: string) {
  container.innerHTML = "";

  let lastError: string | null = null;

  const sketch = (p: p5) => {
    const pp = p as P5Like;

    const setError = (e: unknown) => {
      lastError = e instanceof Error ? e.message : String(e);
      try {
        p.noLoop();
      } catch {
        // ignore
      }
      console.error(e);
    };

    // ユーザーコード評価（setup/draw 定義）
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("p", userCode) as (p: p5) => void;
      fn(p);
    } catch (e) {
      setError(e);
    }

    // フォールバック
    if (!isFn(pp.setup)) {
      pp.setup = () => {
        p.createCanvas(400, 400);
        p.background(240);
        p.fill(0);
        p.text("No setup() defined", 10, 20);
      };
    }
    if (!isFn(pp.draw)) {
      pp.draw = () => {};
    }

    // 実行時例外も拾う
    const originalSetup = pp.setup;
    const originalDraw = pp.draw;

    pp.setup = () => {
      try {
        originalSetup();
      } catch (e) {
        setError(e);
      }
    };

    pp.draw = () => {
      try {
        originalDraw();
      } catch (e) {
        setError(e);
      }
    };
  };

  const instance = new p5(sketch, container);

  return {
    destroy: () => instance.remove(),
    getError: () => lastError,
  };
}
