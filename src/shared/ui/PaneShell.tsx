type Props = {
  header: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export function PaneShell({ header, children, style }: Props) {
  return (
    <div
      style={{
        minWidth: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <div
        style={{
          padding: 10,
          display: "flex",
          gap: 8,
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        {header}
      </div>
      <div
        style={{
          minHeight: 0,
          minWidth: 0,
          flex: 1,
          backgroundColor: "#fAfAfA",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
