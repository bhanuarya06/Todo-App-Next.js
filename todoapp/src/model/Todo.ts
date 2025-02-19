import mongoose, {Schema, Document} from 'mongoose';

export interface Todo extends Document {
    id: string;
    title: string;
    description: string;
    status: string;
    dueDate: Date;
}

const TodoSchema: Schema<Todo> = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    dueDate: {type: Date, required: true}       
})

export default (mongoose.models.Todo as mongoose.Model<Todo>) || mongoose.model<Todo>("Todo",TodoSchema);
