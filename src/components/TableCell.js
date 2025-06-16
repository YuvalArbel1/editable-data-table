import React, {useState} from 'react';

/**
 * TableCell Component
 * Renders different input types based on column type
 * Handles inline editing functionality
 * @param {Object} props - Component props
 * @param {any} props.value - Cell value
 * @param {string} props.type - Data type (string, number, boolean, select)
 * @param {Array} props.options - Options for select type
 * @param {Function} props.onUpdate - Callback when value changes
 * @param {string} props.columnId - Column identifier
 */
const TableCell = ({value, type, options, onUpdate, columnId}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    // Start editing when cell is clicked
    const handleClick = () => {
        // Don't allow editing the ID column
        if (columnId === 'id') {
            alert('Cannot edit ID - it must be unique for each row!');
            return;
        }
        setIsEditing(true);
        setEditValue(value);
    };

    // Save the new value
    const handleSave = () => {
        // Convert string to number if needed
        if (type === 'number') {
            onUpdate(Number(editValue));
        } else if (type === 'boolean') {
            onUpdate(editValue === 'true');
        } else {
            onUpdate(editValue);
        }
        setIsEditing(false);
    };

    // Handle Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

// Show edit input
    if (isEditing) {
        let inputElement;

        if (type === 'boolean') {
            inputElement = (
                <select
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="border rounded px-2 py-1"
                    autoFocus
                >
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            );
        } else if (type === 'select') {
            inputElement = (
                <select
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="border rounded px-2 py-1"
                    autoFocus
                >
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        } else {
            inputElement = (
                <input
                    type={type === 'number' ? 'number' : 'text'}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="border rounded px-2 py-1"
                    autoFocus
                />
            );
        }

        return <td className="p-3">{inputElement}</td>;
    }

    // Show value (not editing)
    return (
        <td
            className="p-3 cursor-pointer hover:bg-gray-100"
            onClick={handleClick}
        >
            {type === 'boolean' ? (value ? 'True' : 'False') : value}
        </td>
    );
};

export default TableCell;