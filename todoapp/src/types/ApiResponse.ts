import {Todo} from '../model/Todo';

export interface ApiResponse {
    success: boolean;
    message: string;
    todolists?: Array<Todo>;
}
