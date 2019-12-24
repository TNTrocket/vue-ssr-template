import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {
            fetchItem({
                commit
            }) {
                // `store.dispatch()` 会返回 Promise，
                // 以便我们能够知道数据在何时更新
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit('setItem', {
                            id: 111,
                            item: 'ffff'
                        })
                        resolve()
                    }, 3000)
                })

            }
        },
        mutations: {
            setItem(state, {
                id,
                item
            }) {
                console.log('id==', id)
                Vue.set(state.items, 'id', id)
                Vue.set(state.items, 'item', item)
                // state.items = {
                //     id,
                //     item
                // }
            }
        }
    })
}