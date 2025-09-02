import * as React from "react"

export function Table({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-x-auto rounded-2xl border"><table className="w-full text-sm">{children}</table></div>
}
export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-secondary/60 text-left">{children}</thead>
}
export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y">{children}</tbody>
}
export function TR({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-secondary/40">{children}</tr>
}
export function TH({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-semibold">{children}</th>
}
export function TD({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3">{children}</td>
}
