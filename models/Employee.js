import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    job: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model('Employee', employeeSchema);
