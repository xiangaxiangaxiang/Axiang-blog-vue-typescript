/*
 * @Author: your name
 * @Date: 2020-07-13 21:49:41
 * @LastEditTime: 2020-07-13 21:51:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\store\modules\user.ts
 */
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IUserState {
    showLoginRegisterForm: boolean
    showLoginRegisterType: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public showLoginRegisterForm = false
    public showLoginRegisterType = ''
    public reload = Date.now()

    @Mutation
    private TOGGLE_DIALOG(type:string) {
        this.showLoginRegisterForm = !this.showLoginRegisterForm
        this.showLoginRegisterType = type
    }

    @Mutation
    private SHOW_DIALOG() {
        this.showLoginRegisterForm = true
        this.showLoginRegisterType = 'login'
    }

    @Mutation
    private RELOADPAGE() {
        this.showLoginRegisterForm = false
        this.reload = Date.now()
    }

    @Action
    public toggleDialog(type='') {
        this.TOGGLE_DIALOG(type)
    }

    @Action
    public showDialog() {
        this.SHOW_DIALOG()
    }

    @Action
    public reloadPage() {
        this.RELOADPAGE()
    }
}

export const UserModule = getModule(User)
