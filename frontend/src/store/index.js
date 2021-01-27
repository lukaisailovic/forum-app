import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)


const baseURL = process.env.BACKEND_URL || 'http://localhost:3000/';
if (typeof baseURL !== 'undefined')
{
    axios.defaults.baseURL = baseURL;
}
export default new Vuex.Store({
    state: {
        boards: []
    },
    mutations: {
        setBoards: (state, boards) =>{
            state.boards = boards;
        }
    },
    actions: {
        async getBoards({commit}){
            try {
                const res =  await axios.get('board');
                if (res.status === 200){
                    commit('setBoards',res.data.boards)
                }
            } catch (error){
                console.log(error)
            }

        }
    },
    modules: {}
})
