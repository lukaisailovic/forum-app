import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import auth from "./auth";
import topic from "./topic";
Vue.use(Vuex)


const baseURL = process.env.BACKEND_URL || 'http://localhost:3000/';
if (typeof baseURL !== 'undefined') {
    axios.defaults.baseURL = baseURL;
}
export default new Vuex.Store({
    state: {
        boards: [],
        selectedBoardId: null,
        selectedBoard: null
    },
    getters: {
        getSelectedBoard: state => {
            return state.selectedBoard;
        }
    },
    mutations: {
        setBoards: (state, boards) => {
            state.boards = boards;
        },
        setSelectedBoardId: (state, id) => {
            state.selectedBoardId = id;
        },
        clearSelectedBoard: (state) => {
            state.selectedBoardId = null;
            state.selectedBoard = null;
        },
        setSelectedBoard: (state, board) => {
            state.selectedBoard = board;
        }
    },
    actions: {
        async getBoards({commit}) {
            try {
                const res = await axios.get('board');
                if (res.status === 200) {
                    commit('setBoards', res.data.boards)
                }
            } catch (error) {
                console.log(error)
            }

        },
        async getSelectedBoard({state, commit}) {
            try {
                const id = state.selectedBoardId;
                const res = await axios.get(`board/${id}`);
                if (res.status === 200) {
                    commit('setSelectedBoard', res.data.board)
                }
            } catch (error) {
                console.log(error)
            }

        }
    },
    modules: {
        auth,
        topic
    }
})
