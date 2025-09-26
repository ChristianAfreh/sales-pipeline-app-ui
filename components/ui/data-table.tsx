"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X, Filter } from "lucide-react";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "../TablePagination";
import { useEffect, useState } from "react";
import { DataTableViewOptions } from "../TableColumnVisibility";
import { Button } from "./button";
import { Badge } from "./badge";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    searchPlaceholder?: string
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debouncedValue;
}

// Custom global filter function
const customGlobalFilterFn = (row: any, columnId: string, value: string) => {
    const searchValue = value.toLowerCase();

    // Get all cell values for the row
    const rowValues = Object.values(row.original).map(val =>
        String(val || '').toLowerCase()
    );

    // Check if any cell contains the search value
    return rowValues.some(cellValue =>
        cellValue.includes(searchValue)
    );
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchPlaceholder = "Search ...",
}: DataTableProps<TData, TValue>) {

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    // Debounce the global filter to improve performance
    const debouncedGlobalFilter = useDebounce(globalFilter, 300);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: customGlobalFilterFn,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            globalFilter: debouncedGlobalFilter,
            columnVisibility,
            rowSelection,
        },
    })

    const isFiltered = globalFilter.length > 0 || columnFilters.length > 0;

    return (
        <div className="overflow-hidden rounded-md border py-2 px-4 shadow-lg">
            {/* Search and Filter Header */}
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-2">
                    {/* Global Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={globalFilter ?? ""}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="pl-10 pr-10 w-[300px]"
                        />
                        {globalFilter && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-transparent"
                                onClick={() => setGlobalFilter("")}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </div>

                    {/* Filter Status */}
                    {isFiltered && (
                        <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                                <Filter className="h-3 w-3 mr-1" />
                                {table.getFilteredRowModel().rows.length} results
                            </Badge>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setGlobalFilter("")
                                    setColumnFilters([])
                                }}
                                className="h-8 px-2 lg:px-3 text-xs"
                            >
                                Clear filters
                                <X className="ml-2 h-3 w-3" />
                            </Button>
                        </div>
                    )}
                </div>

                {/* Results Summary */}
                <div className="text-sm text-muted-foreground">
                    {isFiltered ? (
                        <>
                            Showing {table.getFilteredRowModel().rows.length} of{" "}
                            {table.getCoreRowModel().rows.length} entries
                        </>
                    ) : (
                        <>{table.getCoreRowModel().rows.length} total entries</>
                    )}
                </div>
            </div>

            {/* Active Filters Display */}
            {globalFilter && (
                <div className="flex items-center space-x-2 pb-4">
                    <span className="text-sm text-muted-foreground">Active search:</span>
                    <Badge variant="outline" className="text-xs">
                        "{globalFilter}"
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => setGlobalFilter("")}
                        >
                            <X className="h-2 w-2" />
                        </Button>
                    </Badge>
                </div>
            )}
            <Table>
                <TableHeader className=" font-bold text-[var(--table-header-text-color)]">
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
                                )
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
            <DataTablePagination table={table} />
            <div className="m-4">
                <DataTableViewOptions table={table} />
            </div>
        </div>

    );
}