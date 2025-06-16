# Editable Data Table

A generic React table component that supports inline editing, column filtering, and handles different data types.

## Assignment Requirements Met

✓ Renders different data types (string, number, boolean, select)  
✓ Column filtering (show/hide columns)  
✓ Inline cell editing with local state saving  
✓ Optimized for large datasets with pagination  
✓ Generic and reusable with any data shape

## How to Run

1. Clone the repository:
```bash
git clone https://github.com/YuvalArbel1/editable-data-table.git
```

2. Navigate to project folder:
```bash
cd editable-data-table
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- **Edit cells**: Click any cell to edit inline
- **Save changes**: Press Enter or click outside
- **Filter columns**: Use "Filter Columns" button to show/hide columns
- **Sort data**: Click column header arrows
- **Navigate pages**: Use pagination controls at bottom

## Project Structure

```
src/
├── components/
│   ├── Table.js
│   ├── TableCell.js
│   └── ColumnFilter.js
└── utils/
    └── mockData.js
```

## Load Your Own Data

To use your own dataset, modify `src/App.js`:

```javascript
function App() {
    // Replace this with your data
    const columns = [...]; // Your column definitions
    const data = [...];    // Your data rows
    
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Editable Data Table
                </h1>
                <Table columns={columns} initialData={data}/>
            </div>
        </div>
    );
}
```

## Technologies

- React 19.1.0
- Tailwind CSS
- Faker.js (for mock data)