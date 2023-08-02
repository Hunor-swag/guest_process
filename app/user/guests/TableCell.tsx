export default function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="text-left text-slate-500 pr-6 pl-3 py-2 text-sm">
      {children}
    </td>
  );
}
