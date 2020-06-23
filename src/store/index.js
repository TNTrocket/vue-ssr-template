import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            // items: {},
            // itemsa: {}
        },
        actions: {
            fetchItem({
                commit
            }) {
                // `store.dispatch()` 会返回 Promise，
                // 以便我们能够知道数据在何时更新
                return new Promise((resolve, reject) => {
                    console.log('setItem====')
                    setTimeout(() => {
                        commit('setItem', {
                            id: 111,
                            item: 'ffff'
                        })
                        resolve()
                    }, 100)
                })

            },
            fetchaaa({
                commit
            }) {
                // `store.dispatch()` 会返回 Promise，
                // 以便我们能够知道数据在何时更新
                return new Promise((resolve, reject) => {
                    console.log('setfetchaaa====')
                    setTimeout(() => {
                        commit('setfetchaaa', {
                            ida: 1234,
                            itema: 'ffff'
                        })
                        resolve()
                    }, 100)
                })

            }
        },
        mutations: {
            setItem(state, {
                id,
                item
            }) {
                console.log('id==', id)
                state.items = {}
                Vue.set(state.items, 'id', id)
                Vue.set(state.items, 'item', item)
            },
            setfetchaaa(state, {
                ida,
                itema
            }) {
                console.log('ida==', ida)
                state.itemsa = {}
                Vue.set(state.itemsa, 'ida', ida)
                Vue.set(state.itemsa, 'itema', itema)
            }
        }
    })
}