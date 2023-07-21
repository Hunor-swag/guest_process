"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setShowAddGuestModal: (value: boolean) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setShowAddGuestModal,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  function isOneRowSelected() {
    const rows = table.getRowModel().rows;
    const trueRows = rows.filter((row) => row.getIsSelected());
    return trueRows.length === 1;
  }

  function isAnyRowSelected() {
    return table.getRowModel().rows.some((row) => row.getIsSelected());
  }

  return (
    <div className="rounded-md border">
      <div className="w-full bg-slate-50 rounded-md flex justify-end h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
        {isOneRowSelected() && (
          <button className="mx-2 border-slate-300 border-1 rounded-md">
            Edit
          </button>
        )}
        {isAnyRowSelected() && (
          <button className="mx-2 border-slate-300 border-1 rounded-md">
            Delete
          </button>
        )}

        <button
          className="mx-2 border-slate-300 border-1 rounded-md"
          onClick={() => setShowAddGuestModal(true)}
        >
          Add
        </button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
