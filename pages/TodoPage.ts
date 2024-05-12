import { Page } from "@playwright/test"

export default class TodoPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get welcomeMessage() {
        return `[data-testid=welcome]`
    }

    private get deleteIcon() {
        return `[data-testid=delete]`
    }

    private get noTodosMessage() {
        return `[data-testid=no-todos]`
    }

    private get todoItem() {
        return `[data-testid=todo-item]`
    }

    async getWelcomeMessageElement(): Promise<boolean> {
        const welcomeMessageContainer = this.page.locator(this.welcomeMessage)
        await welcomeMessageContainer.waitFor({timeout: 5000});
        return welcomeMessageContainer.isVisible();
    }

    async load(): Promise<void> {
        await this.page.goto('/todo')
    }

    async deleteTodo(): Promise<void> {
        await this.page.click(this.deleteIcon)
    }

    async getNoTodosMessage(): Promise<boolean> {
        const noTodosMessageContainer = this.page.locator(this.noTodosMessage);
        await noTodosMessageContainer.waitFor({timeout: 500});
        return noTodosMessageContainer.isVisible();
    }

    async getTodoItem(): Promise<string> {
        const todoItemText = await this.page.locator(this.todoItem).textContent();
        if (todoItemText === null) {
            throw new Error("No todos message not found");
        }
        return todoItemText;
    }
}