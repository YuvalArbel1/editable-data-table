# Editable Data Table

React table component with inline editing, column filtering, sorting, and pagination.

## Features

- Inline cell editing (click to edit)
- Multiple data types (string, number, boolean, select)
- Column show/hide functionality
- Sortable columns
- Pagination support
- Optimized for large datasets

## Installation

```bash
git clone https://github.com/YuvalArbel1/editable-data-table.git
cd editable-data-table
npm install
```

## Usage

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

## How to Use

- **Edit**: Click any cell (except ID)
- **Sort**: Click column headers with arrows
- **Filter**: Use "Filter Columns" dropdown
- **Navigate**: Previous/Next buttons

## Structure

```
src/
├── components/
│   ├── Table.js
│   ├── TableCell.js
│   └── ColumnFilter.js
└── utils/
    └── mockData.js
```

## Tech Stack

- React
- Tailwind CSS
- Faker.js