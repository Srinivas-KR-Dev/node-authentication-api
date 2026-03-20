import Employee from '../models/Employee.js';

const defaultEmployees = [
    {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@company.com',
        phone: '9876543210',
        department: 'Engineering',
        job: 'Backend Developer'
    },
    {
        firstname: 'Priya',
        lastname: 'Sharma',
        email: 'priya.sharma@company.com',
        phone: '9876501234',
        department: 'Human Resources',
        job: 'HR Executive'
    },
    {
        firstname: 'Arun',
        lastname: 'Kumar',
        email: 'arun.kumar@company.com',
        phone: '9876512340',
        department: 'Sales',
        job: 'Sales Manager'
    }
];

const seedEmployees = async () => {
    const employeeCount = await Employee.countDocuments();

    if (employeeCount === 0) {
        await Employee.insertMany(defaultEmployees);
        console.log('Default employees seeded');
    }
};

export default seedEmployees;
