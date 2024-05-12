import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import config from "../playwright.config";

export default class SignUpPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get firstNameInput() {
        return "[data-testid=first-name]"
    }

    private get lastNameInput() {
        return "[data-testid=last-name]"
    }

    private get emailInput() {
        return "[data-testid=email]"
    }

    private get passwordInput() {
        return "[data-testid=password]"
    }

    private get confirmPasswordInput() {
        return "[data-testid=confirm-password]"
    }

    private get submitButton() {
        return "[data-testid=submit]"
    }

    async load() {
        await this.page.goto('/signup')
    }

    async signUp(user: User): Promise<void> {
        await this.page.fill(this.firstNameInput, user.getFirstName())
        await this.page.fill(this.lastNameInput, user.getLastName())
        await this.page.fill(this.emailInput, user.getEmail())
        await this.page.fill(this.passwordInput, user.getPassword())
        await this.page.fill(this.confirmPasswordInput, user.getPassword())
        await this.page.click(this.submitButton)
    }

    async signUpByAPI(request: APIRequestContext, user: User, context: BrowserContext): Promise<void> {
        const response = await new UserApi().signUp(request, user)
        const responseBody = await response.json()
        const accessToken = responseBody.access_token;
        const firstName = responseBody.firstName;
        const userID = responseBody.userID;

        user.setAccessToken(accessToken);
        user.setUserID(userID);

        await context.addCookies([
            {
                name: "access_token",
                value: accessToken,
                url: config.use?.baseURL,
            },
            {
                name: "firstName",
                value: firstName,
                url: config.use?.baseURL,
            },
            {
                name: "userID",
                value: userID,
                url: config.use?.baseURL,
            }
        ])

    }
}