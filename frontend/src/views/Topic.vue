<template>
    <div class="topic" v-if="topic !== null">
        <b-row v-if="board !== null">
            <b-col>
                <router-link class="btn btn-outline-secondary mb-3" :to="{name:'Board',params: { id: board.id }}">Back to {{board.name}} board</router-link>
            </b-col>
        </b-row>
        <table class="table">
            <tbody>
            <tr>
                <td colspan="5">
                    <p>
                        <span class="font-weight-bold">
                            Topic: {{ this.topic.title }}
                        </span>
                        <span>
                             Started by:
                            <router-link to="/">
                                   {{ this.topic.user.username }}
                            </router-link>

                        </span>
                    </p>
                </td>
            </tr>
            <tr v-if="topicBelongsToUser">
                <td class="text-right">
                    <a href="#" class="text-danger" @click.prevent="deleteTopic">Delete</a>
                </td>
            </tr>
            <Posts :posts="topic.posts"/>
            </tbody>
        </table>

    </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue'
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
    name: 'Topic',
    components: {
        Posts,

    },
    computed: {
        ...mapGetters({
            topic: 'topic/getSelectedTopic',
            board: 'getSelectedBoard',
            user: "auth/getUser"
        }),
        posts() {
            if (this.topic == null) {
                return [];
            }
            return this.topic.posts;
        },
        topicBelongsToUser(){
            if (this.user == null){
                return false;
            }
            return this.topic.user.id === this.user.id;
        }
    },
    methods: {
        ...mapActions({
            fetchSelectedTopic: 'topic/fetchSelectedTopic',
            removeTopic: 'topic/deleteTopic'
        }),
        ...mapMutations({
            setSelectedTopicId: 'topic/setSelectedTopicId'
        }),
        async deleteTopic(){
            const res = await this.removeTopic(this.topic.id);
            if (res === true){
                if (this.board === null){
                    return await this.$router.push('/');
                }
                return await this.$router.push({ name: 'Board', params: { id: this.board.id } });
            } else {
                this.$bvToast.toast('Could not delete topic', {
                    title: 'Error action',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 3000,
                    appendToast: true
                })
            }
        }
    },
    async mounted() {
        const topicId = this.$route.params.id;
        this.setSelectedTopicId(topicId);
        await this.fetchSelectedTopic();
    }
}
</script>
