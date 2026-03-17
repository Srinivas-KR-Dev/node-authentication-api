import Employee from '../models/Employee.js';
import mongoose from 'mongoose';

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
        if (!req.body?.firstname || !req.body?.lastname) {
            return res.status(400).json({ message: 'First and last names are required' });
        }

        const { firstname, lastname } = req.body;

        const employee = await Employee.create({
            firstname,
            lastname
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
