export default function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 rounded shadow-sm space-y-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      {children}
    </div>
  );
}