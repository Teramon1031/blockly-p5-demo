type Props = {
  code: string;
};

export function GeneratedCodeView({ code }: Props) {
  return (
    <pre
      style={{
        margin: 0,
        padding: 10,
        background: "#fafafa",
        height: "100%",
        flex: 1,
        minHeight: 0,
        minWidth: 0, // ★これが超重要（中身より小さくなれる）
        width: "100%", // ★親に合わせる
        overflow: "auto", // ★横も縦も pre 内だけスクロール
        whiteSpace: "pre-wrap",
        // overflowWrap: "anywhere",
        wordBreak: "break-word",
      }}
    >
      <code style={{ display: "block" }}>{code}</code>
    </pre>
  );
}
