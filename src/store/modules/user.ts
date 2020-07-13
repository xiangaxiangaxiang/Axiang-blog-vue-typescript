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

export interface IArticleState {
    logout: boolean
}

@Module({ dynamic: true, store, name: 'article' })
class User extends VuexModule implements IArticleState {
    public logout = false

    @Mutation
    private TOGGLE_UPLOADIMAGE() {
        this.logout = !this.logout
    }

    @Action
    public toggleUploadImage() {
        this.TOGGLE_UPLOADIMAGE()
    }
}

export const ArticleModule = getModule(User)