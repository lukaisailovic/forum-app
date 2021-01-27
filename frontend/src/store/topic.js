import axios from "./axios";


const topic = {
    namespaced: true,
    state: {
        selectedTopicId: null,
        selectedTopic: null
    },
    getters: {
        getSelectedTopic: state => {
            return state.selectedTopic;
        }
    },
    mutations: {
        setSelectedTopicId: (state, id) => {
            state.selectedTopicId = id;
        },
        setSelectedTopic: (state, topic) => {
            state.selectedTopic = topic;
        }
    },
    actions: {
        async fetchSelectedTopic({state, commit}){
            try {
                const id = state.selectedTopicId;
                const res = await axios.get(`topic/${id}`);
                if (res.status === 200) {
                    commit('setSelectedTopic', res.data.topic)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deletePost({state, commit, dispatch}, postId){
            try {
                const token = localStorage.getItem('token');
                if (token == null){
                    return false;
                }
                const res = await axios.delete(`post/${postId}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.status === 200) {
                    await dispatch('fetchSelectedTopic')
                    return true;
                }
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }
};

export default topic;