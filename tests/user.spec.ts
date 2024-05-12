import { test, expect } from '@playwright/test'
import User from '../models/User'
import SignUpPage from '../pages/SignUpPage'
import TodoPage from '../pages/TodoPage'

// test method can be imported from '@playwright/test' package
test.describe('Auth Tests', () => {
    let todoPage: TodoPage, user: User, singUpPage: SignUpPage

    test.beforeEach(async ({ page }) => {
        user = new User()
        singUpPage = new SignUpPage(page)
        todoPage = new TodoPage(page)
    })

    test('Should be able to register to our application', async () => { // page is a fixture from Playwright. Everything in playwright is asyncronous
        const user = new User()
        await singUpPage.load()
        await singUpPage.signUp(user)
        const welcomeMessage = await todoPage.getWelcomeMessageElement()
        await expect(welcomeMessage).toBeTruthy()
    })
}) 
