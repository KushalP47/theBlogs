import {Account, Client, ID} from 'appwrite';
import conf from '../conf/conf.js';

export class AuthServices {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount) {
                // call another method
                return this.loginAccount({email, password});
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("AppWrite Error :: Create Account : ", error)
            throw error;
        }
    }

    async loginAccount({ email, password }){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("AppWrite Error :: Login Account : ", error)
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (e) { 
            if (e.code != 401 || e.type != 'general_unauthorized_scope') 
            rethrow;
        } return null;
    }

    async logoutAccount() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("AppWrite Error :: Logout Account : ", error)
            throw error
        }
    }
}

export const authService = new AuthServices();