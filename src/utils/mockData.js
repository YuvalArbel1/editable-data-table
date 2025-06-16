import faker from 'faker';

/**
 * Generate mock data for testing the table component
 * @param {number} rowCount - Number of rows to generate
 * @returns {Object} Object containing columns and data arrays
 */
export const generateMockData = (rowCount = 100) => {
    // Define our columns with all required types
    const columns = [
        {id: 'id', ordinalNo: 0, title: 'ID', type: 'string', width: 80},
        {id: 'name', ordinalNo: 1, title: 'Name', type: 'string', width: 200},
        {id: 'age', ordinalNo: 2, title: 'Age', type: 'number', width: 100},
        {id: 'email', ordinalNo: 3, title: 'Email', type: 'string', width: 250},
        {id: 'active', ordinalNo: 4, title: 'Active', type: 'boolean', width: 100},
        {
            id: 'department',
            ordinalNo: 5,
            title: 'Department',
            type: 'select',
            width: 150,
            options: ['Sales', 'Marketing', 'Engineering', 'HR', 'Finance'] // Added for select type
        },
        {id: 'salary', ordinalNo: 6, title: 'Salary', type: 'number', width: 120},
    ];

    // Generate rows
    const data = Array.from({length: rowCount}, (_, index) => ({
        id: `row-${index}`,
        name: faker.name.findName(),
        age: faker.datatype.number({min: 18, max: 65}),
        email: faker.internet.email(),
        active: faker.datatype.boolean(),
        department: faker.random.arrayElement(['Sales', 'Marketing', 'Engineering', 'HR', 'Finance']),
        salary: faker.datatype.number({min: 30000, max: 150000}),
    }));

    return {columns, data};
};