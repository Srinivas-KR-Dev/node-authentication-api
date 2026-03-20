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
    },
    {
        firstname: 'Aisha',
        lastname: 'Khan',
        email: 'aisha.khan@company.com',
        phone: '9876512341',
        department: 'Marketing',
        job: 'Marketing Executive'
    },
    {
        firstname: 'Rahul',
        lastname: 'Verma',
        email: 'rahul.verma@company.com',
        phone: '9876512342',
        department: 'Finance',
        job: 'Accountant'
    },
    {
        firstname: 'Sneha',
        lastname: 'Reddy',
        email: 'sneha.reddy@company.com',
        phone: '9876512343',
        department: 'Engineering',
        job: 'Frontend Developer'
    },
    {
        firstname: 'Vikram',
        lastname: 'Patel',
        email: 'vikram.patel@company.com',
        phone: '9876512344',
        department: 'Operations',
        job: 'Operations Executive'
    },
    {
        firstname: 'Neha',
        lastname: 'Gupta',
        email: 'neha.gupta@company.com',
        phone: '9876512345',
        department: 'Support',
        job: 'Support Engineer'
    },
    {
        firstname: 'Kiran',
        lastname: 'Rao',
        email: 'kiran.rao@company.com',
        phone: '9876512346',
        department: 'Engineering',
        job: 'QA Engineer'
    },
    {
        firstname: 'Pooja',
        lastname: 'Nair',
        email: 'pooja.nair@company.com',
        phone: '9876512347',
        department: 'Design',
        job: 'UI Designer'
    },
    {
        firstname: 'Manoj',
        lastname: 'Singh',
        email: 'manoj.singh@company.com',
        phone: '9876512348',
        department: 'Sales',
        job: 'Business Development Executive'
    },
    {
        firstname: 'Divya',
        lastname: 'Iyer',
        email: 'divya.iyer@company.com',
        phone: '9876512349',
        department: 'Human Resources',
        job: 'Recruiter'
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
