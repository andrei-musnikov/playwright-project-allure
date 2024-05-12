import { APIRequestContext, Page } from "@playwright/test";
import TodoApi from "../apis/TodoApi";
import User from "../models/User";

export default class NewTodoPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get newTodoInput() {
        return `[data-testid=new-todo]`
    }

    private get submitTodoButton() {
        return `[data-testid=submit-newTask]`
    }

    async load() {
        await this.page.goto('/todo/new')
    }

    async addTodo(task: string): Promise<void> {
        await this.page.fill(this.newTodoInput, task)
        await this.page.click(this.submitTodoButton)
    }

    async addTodoByAPI(request: APIRequestContext, todoText:string, user: User): Promise<void> {
        await new TodoApi().addTodo(request, todoText, user)
    }
}