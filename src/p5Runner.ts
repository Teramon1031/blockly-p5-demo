import p5 from "p5";

export function mountP5(container: HTMLElement, userCode: string) {
  container.innerHTML = "";

  const sketch = (p: p5) => {
    try {
      // userCodeは `p.setup = ...; p.draw = ...;` を定義する想定
      // eslint-disable-next-line no-new-func
      const fn = new Function("p", userCode) as (p: p5) => void;
      fn(p);
    } catch (e) {
      console.error(e);
    }
  };

  const instance = new p5(sketch, container);
  return { destroy: () => instance.remove() };
}
