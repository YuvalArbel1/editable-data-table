import React from 'react';
import Table from './components/Table';
import {generateMockData} from './utils/mockData';

function App() {
    // Generate mock data
    const {columns, data} = generateMockData(100);

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

export default App;