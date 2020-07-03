import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IArticleState {
    uploadImage: boolean
}

@Module({ dynamic: true, store, name: 'article' })
class Article extends VuexModule implements IArticleState {
    public uploadImage  = false

    @Mutation
    private TOGGLE_UPLOADIMAGE() {
        this.uploadImage = !this.uploadImage
    }

    @Action
    public toggleUploadImage() {
        this.TOGGLE_UPLOADIMAGE()
    }
}

export const AppModule = getModule(Article)