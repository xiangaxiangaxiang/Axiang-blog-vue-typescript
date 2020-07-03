import Vue from 'vue'
import Vuex from 'vuex'
import { IArticleState } from './modules/article'

Vue.use(Vuex)

export interface IRootState {
    article: IArticleState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})