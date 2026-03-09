import { SearchX } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import {
  flexRender,
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import type { Paginacion } from "@/features/tablero/types/paginacion";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

export interface MobileCardConfig {
  header: { left: string; right: string };
  body: Array<{ label: string; columnId: string }>;
  footer?: string;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginas?: Paginacion;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
  mobileCardConfig?: MobileCardConfig | null;
  columnVisibility?: VisibilityState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginas,
  onPageChange,
  emptyMessage = "No se encontraron resultados",
  mobileCardConfig = null,
  columnVisibility = {},
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [visibility, setVisibility] =
    useState<VisibilityState>(columnVisibility);

  useEffect(() => {
    setVisibility(columnVisibility);
  }, [columnVisibility]);

  const currentPage = paginas?.actual || 1;
  const totalPages = paginas?.max || 1;
  const pageSize = 10;

  const sortedData = useMemo(() => {
    if (!sorting.length) return data;

    const { id, desc } = sorting[0];
    const sorted = [...data].sort((a, b) => {
      const aValue = a[id as keyof TData];
      const bValue = b[id as keyof TData];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) return desc ? 1 : -1;
      if (aValue > bValue) return desc ? -1 : 1;
      return 0;
    });

    return sorted;
  }, [data, sorting]);

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
      columnVisibility: visibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setVisibility,
    pageCount: totalPages,
  });

  const generatePaginationItems = () => {
    const items: (number | string)[] = [];

    items.push(1);

    if (currentPage > 3) {
      items.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 3);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        items.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      items.push("...");
    }

    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  };

  const renderMobileCard = (
    row: ReturnType<typeof table.getRowModel>["rows"][0],
    index: number,
  ) => {
    const cells = row.getVisibleCells();
    const getCellValue = (columnId: string) => {
      const cell = cells.find((c) => c.column.id === columnId);
      return cell
        ? flexRender(cell.column.columnDef.cell, cell.getContext())
        : null;
    };

    if (!mobileCardConfig) return null;

    return (
      <div
        key={`${row.id}-mobile-${index}`}
        className="bg-white rounded-lg shadow-md hover:shadow-md transition-all duration-200 overflow-hidden"
      >
        <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center gap-2">
          <div className="font-semibold text-blue-900 text-sm sm:text-base truncate flex-1 min-w-0 text-left">
            {getCellValue(mobileCardConfig.header.left)}
          </div>
          <div className="text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded whitespace-nowrap">
            {getCellValue(mobileCardConfig.header.right)}
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {mobileCardConfig.body.map((item) => (
            <div key={item.columnId}>
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                {item.label}
              </span>
              <div
                className={`text-xs sm:text-sm text-gray-700 leading-relaxed text-left [&>div]:justify-start! [&>div]:text-left! [&>div]:whitespace-normal! [&>div]:overflow-visible! [&>div]:text-clip! ${
                  item.columnId === "texto"
                    ? "p-0 m-0 [&>div]:p-0! [&>div]:m-0! [&>div]:py-0!"
                    : ""
                }`}
              >
                {getCellValue(item.columnId)}
              </div>
            </div>
          ))}
        </div>

        {mobileCardConfig.footer && (
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50/50 flex justify-end">
            <div className="scale-90 sm:scale-100 origin-right">
              {getCellValue(mobileCardConfig.footer)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto lg:overflow-visible">
        <Table className="hidden md:table w-full border-separate border-spacing-0">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-slate-900 font-bold bg-slate-50/80 px-4 py-4 text-xs uppercase tracking-wider text-left border-y border-slate-200"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "flex items-center justify-start cursor-pointer hover:bg-slate-200/50 px-2 py-1 -ml-2 rounded transition-colors select-none w-fit"
                            : "flex items-center justify-start"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {{
                              asc: "↑",
                              desc: "↓",
                            }[header.column.getIsSorted() as string] ?? "↕"}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={`${row.id}-${index}`}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    index % 2 === 0
                      ? "bg-slate-50/50 hover:bg-slate-100/80 transition-colors"
                      : "bg-white hover:bg-slate-50 transition-colors"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={`${cell.id}-${index}`}
                      className="text-slate-600 px-4 py-3 text-sm align-middle border-b border-slate-100"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3 py-8">
                    <SearchX
                      className="w-16 h-16 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-gray-700">
                        {emptyMessage}
                      </p>
                      <p className="text-sm text-gray-500">
                        Intenta ajustar los filtros de búsqueda
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {mobileCardConfig && (
          <div className="md:hidden space-y-3 sm:space-y-4 px-1 sm:px-0">
            {table
              .getRowModel()
              .rows.map((row, index) => renderMobileCard(row, index))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-4 sm:py-6">
        <button
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <span className="text-sm sm:text-lg">&lt;</span>
        </button>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {generatePaginationItems().map((item, index) => (
            <div key={index}>
              {item === "..." ? (
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => onPageChange && onPageChange(item as number)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                    item === currentPage
                      ? "bg-blue-900 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <span className="text-sm sm:text-lg">&gt;</span>
        </button>
      </div>
    </div>
  );
}
