import axios from "./axios";

const post = {
    namespaced: true,
    state: {
        selectedPost: null
    },
    getters: {
        getSelectedPost: (state) => {
            return state.selectedPost;
        }
    },
    mutations: {
        setSelectedPost: (state, post) => {
            state.selectedPost = post;
        }
    },
    actions: {
        async getSelectedPost({commit}, id) {
            try {
                let token = localStorage.getItem('token');
                if (token == null) {
                    return;
                }
                const res = await axios.get(`post/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.status === 200) {

                    commit('setSelectedPost', res.data.post)
                }
            } catch (error) {
                console.log(error)
            }

        },
        async editSelectedPost({commit, dispatch}, payload) {
            try {
                let token = localStorage.getItem('token');
                if (token == null) {
                    return false;
                }
                const id = payload.postId;
                const res = await axios.put(`post/${id}`,
                    {
                        content: payload.content
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                if (res.status === 200) {
                    return true;
                }
            } catch (error) {
                console.log(error)
                return false;
            }
        }

    }
}

export default post;
