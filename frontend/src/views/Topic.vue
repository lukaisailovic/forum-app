<template>
    <div class="topic" v-if="topic !== null">
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
            topic: 'topic/getSelectedTopic'
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
