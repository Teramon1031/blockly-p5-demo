export type P5Code = {
  setupBody: string;
  drawBody: string;
  helpers: string;
};

type Opts = {
  canvasW: number;
  canvasH: number;
  animate: boolean;
};

export function buildP5UserCode(code: P5Code, opts: Opts): string {
  const helpers = code.helpers ?? "";

  if (!opts.animate) {
    return `${helpers} p.setup = () => {
  p.createCanvas(${opts.canvasW}, ${opts.canvasH});
${code.setupBody}
${code.drawBody}
  p.noLoop();
};

p.draw = () => {};
`;
  }

  return `${helpers}p.setup = () => {
  p.createCanvas(${opts.canvasW}, ${opts.canvasH});
${code.setupBody}
};

p.draw = () => {
${code.drawBody}
};
`;
}
