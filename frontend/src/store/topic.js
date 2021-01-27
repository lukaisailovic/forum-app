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
        async createTopic({state, commit},payload){
            try {
                let token = localStorage.getItem('token');
                if (token == null) {
                    return false;
                }
                const res = await axios.post(`topic/${payload.boardId}`,
                    {
                        title: payload.title,
                        content: payload.content
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                if (res.status === 200 || res.status === 201) {
                    return res;
                }
            } catch (error) {
                console.log(error)
                return false;
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
        },
        async deleteTopic({state, commit}, topicId){
            commit('setSelectedTopicId',null);
            commit('setSelectedTopic',null);
            try {
                const token = localStorage.getItem('token');
                if (token == null){
                    return false;
                }
                const res = await axios.delete(`topic/${topicId}`,{
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
        },
        async reply({state, commit, dispatch},payload ){
            try {
                const token = localStorage.getItem('token');
                if (token == null){
                    return false;
                }
                const res = await axios.post(`post/${payload.topicId}`,{
                    content: payload.content
                },{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.status === 200 || res.status === 201) {
                    dispatch('fetchSelectedTopic')
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