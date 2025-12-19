type Props = {
  title: string;
  right?: React.ReactNode;
};

export function HeaderBar({ title, right }: Props) {
  return (
    <>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        {right}
      </div>
    </>
  );
}
