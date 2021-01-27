import axios from "axios";

const baseURL = process.env.BACKEND_URL || 'http://localhost:3000/';
if (typeof baseURL !== 'undefined')
{
    axios.defaults.baseURL = baseURL;
}


const auth = {
    namespaced: true,
    state: {
        loading: false,
        user: null
    },
    getters: {
        isLoggedIn: state => {
            return state.loading === false && state.user !== null;
        },
        getUser: state => {
            return state.user
        },
        isLoading: state => {
            return state.loading === true;
        }
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user;
        },
        setLoading: (state, value) => {
            state.loading = value;
        }
    },
    actions: {
        async fetchUser({commit}){
            commit('setLoading',true)
            let token = localStorage.getItem('token');
            if (token == null){
                return;
            }
            try {
                const res =  await axios.get('user',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.status === 200){
                    commit('setUser',res.data.user)
                }
            } catch (error){
                console.log(error)
            } finally {
                commit('setLoading',false)
            }
        },
        async logOut({commit}){
            commit('setUser',null);
            localStorage.removeItem('token');
        }
    },

}
export default auth;