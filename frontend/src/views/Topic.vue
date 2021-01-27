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
        }),
        posts() {
            if (this.topic == null) {
                return [];
            }
            return this.topic.posts;
        }
    },
    methods: {
        ...mapActions({
            fetchSelectedTopic: 'topic/fetchSelectedTopic'
        }),
        ...mapMutations({
            setSelectedTopicId: 'topic/setSelectedTopicId'
        })
    },
    async mounted() {
        const topicId = this.$route.params.id;
        this.setSelectedTopicId(topicId);
        await this.fetchSelectedTopic();
    }
}
</script>
