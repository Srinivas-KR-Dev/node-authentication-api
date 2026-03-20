import Employee from '../models/Employee.js';
import mongoose from 'mongoose';

const PHONE_REGEX = /^\d{10}$/;

const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().lean();

        res.status(200).json(employees);
    } catch (error) {
        next(error);
    }
};

const createNewEmployee = async (req, res, next) => {
    try {
        if (!req.body?.firstname || !req.body?.lastname || !req.body?.email || !req.body?.phone || !req.body?.department || !req.body?.job) {
            return res.status(400).json({ message: 'Firstname, lastname, email, phone, department, and job are required' });
        }

        const { firstname, lastname, email, phone, department, job } = req.body;

        if (!PHONE_REGEX.test(phone.trim())) {
            return res.status(400).json({ message: 'Phone number must be 10 digits' });
        }

        const duplicate = await Employee.findOne({ email: email.trim().toLowerCase() }).exec();
        if (duplicate) {
            return res.status(409).json({ message: 'Employee email already exists' });
        }

        const employee = await Employee.create({
            firstname,
            lastname,
            email,
            phone,
            department,
            job
        });

        res.status(201).json(employee);

    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: `Employee ID ${id} not found` });
        }

        if (req.body?.firstname) employee.firstname = req.body.firstname;
        if (req.body?.lastname) employee.lastname = req.body.lastname;
        if (req.body?.email) {
            const duplicate = await Employee.findOne({ email: req.body.email.trim().toLowerCase() }).exec();
            if (duplicate && duplicate._id.toString() !== id) {
                return res.status(409).json({ message: 'Employee email already exists' });
            }
            employee.email = req.body.email;
        }
        if (req.body?.phone) {
            if (!PHONE_REGEX.test(req.body.phone.trim())) {
                return res.status(400).json({ message: 'Phone number must be 10 digits' });
            }
            employee.phone = req.body.phone;
        }
        if (req.body?.department) employee.department = req.body.department;
        if (req.body?.job) employee.job = req.body.job;

        const updatedEmployee = await employee.save();

        res.status(200).json(updatedEmployee);

    } catch (error) {
        next(error);
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: `Employee ID ${id} not found` });
        }

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
};

const getEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const employee = await Employee.findById(id).lean();

        if (!employee) {
            return res.status(404).json({ message: `Employee ID ${id} not found` });
        }

        res.status(200).json(employee);
    } catch (error) {
        next(error);
    }
};

export default {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
};
