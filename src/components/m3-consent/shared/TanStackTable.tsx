    import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
    } from "@tanstack/react-table";

    interface TanStackTableProps<T> {
    data: T[];
    columns: ColumnDef<T, unknown>[];
    }

    function TanStackTable<T>({
    data,
    columns,
    }: TanStackTableProps<T>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
        pagination: {
            pageSize: 5,
        },
        },
    });

    return (
        <div className="space-y-4">

        {/* Horizontal Scroll */}
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200">

            <table className="min-w-[950px] w-full border-collapse">

            <thead className="bg-slate-100">

                {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>

                    {headerGroup.headers.map((header) => (
                    <th
                        key={header.id}
                        className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-slate-700"
                    >
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </th>
                    ))}

                </tr>
                ))}

            </thead>

            <tbody>

                {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                    <tr
                    key={row.id}
                    className="border-t border-slate-200 hover:bg-slate-50"
                    >
                    {row.getVisibleCells().map((cell) => (
                        <td
                        key={cell.id}
                        className="whitespace-nowrap px-4 py-3 text-sm text-slate-700"
                        >
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </td>
                    ))}
                    </tr>
                ))
                ) : (
                <tr>

                    <td
                    colSpan={columns.length}
                    className="py-10 text-center text-slate-500"
                    >
                    No Records Found
                    </td>

                </tr>
                )}

            </tbody>

            </table>

        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-slate-500">
            Page{" "}
            <strong>
                {table.getState().pagination.pageIndex + 1}
            </strong>{" "}
            of{" "}
            <strong>
                {table.getPageCount()}
            </strong>
            </p>

            <div className="flex gap-2">

            <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
            >
                Previous
            </button>

            <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
            >
                Next
            </button>

            </div>

        </div>

        </div>
    );
    }

    export default TanStackTable;