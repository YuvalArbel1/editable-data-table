import React, {useState} from 'react';

/**
 * ColumnFilter Component
 * Allows users to show/hide table columns
 * @param {Object} props - Component props
 * @param {Array} props.columns - All column definitions
 * @param {Array} props.visibleColumns - Currently visible column ids
 * @param {Function} props.onToggleColumn - Callback to toggle column visibility
 */
const ColumnFilter = ({columns, visibleColumns, onToggleColumn}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 border rounded bg-white hover:bg-gray-50"
            >
                Filter Columns {isOpen ? '↑' : '↓'}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    <div className="absolute mt-2 bg-white border rounded shadow z-10">
                        <div className="p-2">
                            {columns.map(column => (
                                <label
                                    key={column.id}
                                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.includes(column.id)}
                                        onChange={() => onToggleColumn(column.id)}
                                        className="mr-2"
                                    />
                                    <span>{column.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Click outside to close */}
                    <div
                        className="fixed inset-0"
                        onClick={() => setIsOpen(false)}
                    />
                </>
            )}
        </div>
    );
};

export default ColumnFilter;