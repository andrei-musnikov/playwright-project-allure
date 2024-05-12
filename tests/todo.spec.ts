import { test, expect } from '@playwright/test'
import User from '../models/User'
import TodoApi from '../apis/TodoApi'
import SignUpPage from '../pages/SignUpPage'
import TodoPage from '../pages/TodoPage'
import NewTodoPage from '../pages/NewTodoPage'


test.describe('Todo Tests', () => {
    let user: User, singUpPage: SignUpPage, todoPage: TodoPage, newTodoPage: NewTodoPage

    test.beforeEach(async ({ page }) => {
        user = new User()
        singUpPage = new SignUpPage(page)
        todoPage = new TodoPage(page)
        newTodoPage = new NewTodoPage(page)
    })

    test('Should be able to add a todo', async ({ request, context }) => {
        const todoText = "Buy Some Milk!"

        await singUpPage.signUpByAPI(request, user, context)
        await newTodoPage.load()
        await newTodoPage.addTodo(todoText)
        const todoItem = await todoPage.getTodoItem()
        expect(todoItem.includes(todoText)).toBeTruthy();
    })

    test('Should be able to delete a todo', async ({ request, context }) => {
        const todoText = "Learn Playwright"

        await singUpPage.signUpByAPI(request, user, context)
        await newTodoPage.addTodoByAPI(request, todoText, user)
        await todoPage.load()
        const todoItem = await todoPage.getTodoItem()
        expect(todoItem.includes(todoText)).toBeTruthy();
        await todoPage.deleteTodo()
        const noTodosMessage = await todoPage.getNoTodosMessage()
        expect(noTodosMessage).toBeTruthy();

    })
})