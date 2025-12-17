import p5 from "p5";

export function mountP5(container: HTMLElement, userCode: string) {
  container.innerHTML = "";

  let lastError: string | null = null;

  const sketch = (p: p5) => {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("p", userCode) as (p: p5) => void;
      fn(p);
    } catch (e) {
      lastError = e instanceof Error ? e.message : String(e);
      console.error(e);
    }

    // もしsetup/drawが定義されてない事故が起きても、最低限の表示
    if (!("setup" in p) || typeof (p as any).setup !== "function") {
      (p as any).setup = () => {
        p.createCanvas(400, 400);
        p.background(240);
        p.fill(0);
        p.text("No setup() defined", 10, 20);
      };
      (p as any).draw = () => {};
    }
  };

  const instance = new p5(sketch, container);
  return {
    destroy: () => instance.remove(),
    getError: () => lastError,
  };
}
