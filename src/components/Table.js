import React, {useEffect, useState} from 'react';
import TableCell from './TableCell';
import ColumnFilter from './ColumnFilter';

/**
 * Main Table Component
 * Handles data display, editing, and column filtering
 * Optimized for large datasets with pagination
 * @param {Object} props - Component props
 * @param {Array} props.columns - Column definitions
 * @param {Array} props.initialData - Initial data rows
 */
const Table = ({columns, initialData}) => {
    const [data, setData] = useState(initialData);
    const [visibleColumns, setVisibleColumns] = useState(
        columns.map(col => col.id)
    );

    // Sorting state
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(20);


    // Handle cell value update
    const handleCellUpdate = (rowId, columnId, newValue) => {
        const updatedData = data.map(row => {
            if (row.id === rowId) {
                return {...row, [columnId]: newValue};
            }
            return row;
        });
        setData(updatedData);
    };

    // Toggle column visibility
    const toggleColumn = (columnId) => {
        if (visibleColumns.includes(columnId)) {
            setVisibleColumns(visibleColumns.filter(id => id !== columnId));
        } else {
            setVisibleColumns([...visibleColumns, columnId]);
        }
    };

    // Handle sorting
    const handleSort = (columnId) => {
        let direction = 'asc';
        if (sortColumn === columnId && sortDirection === 'asc') {
            direction = 'desc';
        }

        setSortColumn(columnId);
        setSortDirection(direction);
    };

    // Sort data
    const sortedData = [...data].sort((a, b) => {
        if (!sortColumn) return 0;

        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        // Handle null/undefined/empty
        if (aValue == null || aValue === '') return 1;
        if (bValue == null || bValue === '') return -1;

        // Handle arrays
        if (Array.isArray(aValue)) aValue = aValue.join(', ');
        if (Array.isArray(bValue)) bValue = bValue.join(', ');

        // Handle objects (convert to string)
        if (typeof aValue === 'object') aValue = JSON.stringify(aValue);
        if (typeof bValue === 'object') bValue = JSON.stringify(bValue);

        // Boolean sorting (true first, then false)
        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
            if (sortDirection === 'asc') {
                return aValue === bValue ? 0 : aValue ? -1 : 1;
            } else {
                return aValue === bValue ? 0 : aValue ? 1 : -1;
            }
        }

        // Number sorting (including number strings)
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // String sorting (fallback for everything else)
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();

        if (sortDirection === 'asc') {
            return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
        } else {
            return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
        }
    });

    // Filter and sort columns
    const displayColumns = columns
        .filter(col => visibleColumns.includes(col.id))
        .sort((a, b) => a.ordinalNo - b.ordinalNo);

    // Calculate pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full">
            {/* Column Filter */}
            <div className="mb-4 flex justify-between">
                <ColumnFilter
                    columns={columns}
                    visibleColumns={visibleColumns}
                    onToggleColumn={toggleColumn}
                />
                <div className="text-sm">
                    Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, sortedData.length)} of {sortedData.length} entries
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded">
                <div className="overflow-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            {displayColumns.map(column => (
                                <th
                                    key={column.id}
                                    style={{width: column.width || 'auto'}}
                                    className="p-3 text-left"
                                >
                                    {column.title}
                                    <button
                                        onClick={() => handleSort(column.id)}
                                        className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                        {(() => {
                                            if (sortColumn === column.id) {
                                                if (sortDirection === 'asc') {
                                                    return '↑';
                                                } else {
                                                    return '↓';
                                                }
                                            } else {
                                                return '↕';
                                            }
                                        })()}
                                    </button>
                                </th>
                            ))}
                        </tr>
                        </thead>

                        <tbody>
                        {currentRows.map((row) => (
                            <tr key={row.id} className="border-t hover:bg-gray-50">
                                {displayColumns.map(column => (
                                    <TableCell
                                        key={`${row.id}-${column.id}`}
                                        value={row[column.id]}
                                        type={column.type}
                                        options={column.options}
                                        columnId={column.id}
                                        onUpdate={(newValue) =>
                                            handleCellUpdate(row.id, column.id, newValue)
                                        }
                                    />
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="px-3 py-2">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;