import { PaneShell } from "../../shared/ui/PaneShell";
import { HeaderBar } from "../../shared/ui/HeaderBar";
import { GeneratedCodeView } from "./GeneratedCodeView";

type Props = {
  wrappedCode: string;
  animate: boolean;
  onAnimateChange: (v: boolean) => void;
};

export function GeneratedCodePane({
  wrappedCode,
  animate,
  onAnimateChange,
}: Props) {
  return (
    <PaneShell
      header={
        <HeaderBar
          title="Generated JS"
          right={
            <>
              <button
                onClick={() => navigator.clipboard.writeText(wrappedCode)}
              >
                Copy
              </button>
              <label
                style={{
                  fontSize: 12,
                  color: "#333",
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={animate}
                  onChange={(e) => onAnimateChange(e.target.checked)}
                />
                Animate (draw)
              </label>
            </>
          }
        />
      }
    >
      <GeneratedCodeView code={wrappedCode} />
    </PaneShell>
  );
}
