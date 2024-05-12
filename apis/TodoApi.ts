import { APIRequestContext } from "@playwright/test";
import User from '../models/User';

export default class Todo {
    async addTodo(request: APIRequestContext, todoText: string, user: User) {
        return await request.post('/api/v1/tasks', {
            data: {
                isCompleted: false,
                item: todoText,
            },
            headers: {
                Authorization: `Bearer ${user.getAccessToken()}`
            }
        })
    }
}