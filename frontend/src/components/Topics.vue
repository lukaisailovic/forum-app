<template>
    <div>
        <b-row class="mb-4">
            <b-col>
                <h4>
                    Topics of board: {{board.name}}
                </h4>
                <p class="mt-3" v-if="user !== null">
                    <router-link  class="btn btn-info" :to="{name: 'CreateTopic', params: {id: board.id}}">Create topic</router-link>
                </p>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-table  hover :items="filteredTopics" :fields="fields">
                    <template #cell(title)="data">
                        <router-link :to="{ name: 'Topic', params: { id: data.item.id }}" class="text-decoration-none text-dark">
                            {{ data.item.title}}
                        </router-link>
                    </template>
                    <template #cell(startedBy)="data">
                        <router-link :to="{ name: 'Profile', params: { id: data.item.startedById}}" class=" text-dark">
                            {{ data.item.startedBy}}
                        </router-link>
                    </template>
                    <template #cell(lastPost)="data" >
                        <div v-if="data.item.lastPost !== null">
                            <p>
                                At {{data.item.lastPost.time}}<br>
                                <router-link :to="{ name: 'Profile', params: { id: data.item.lastPost.user.id}}">
                                    By {{data.item.lastPost.user.username}}
                                </router-link>

                            </p>
                        </div>

                    </template>

                </b-table>
            </b-col>
        </b-row>

    </div>
</template>


<script>
import {mapGetters} from "vuex";

export default {
    name: 'Boards',
    props: ['board'],
    data(){
        return {
            fields: [
                {
                    key: 'title',
                    label: 'Subject',
                },
                {
                    key: 'startedBy',
                    label: 'Started by',
                },
                {
                    key: 'repliesCount',
                    label: 'Replies',
                },
                {
                    key: 'lastPost',
                    label: 'Last post',
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            user: "auth/getUser"
        }),
        topics(){
            return this.board.topics;
        },
        filteredTopics(){
            let topics = [];
            for (const topic of this.topics) {
                const post = topic.posts.sort((a, b) => parseFloat(new Date(b.createdAt).getTime()) - parseFloat(new Date(a.createdAt).getTime()))[0];
                let lastPost = null;
                if (post !== null && post !== undefined){
                    lastPost = {
                        time: new Intl.DateTimeFormat('en').format(new Date(post.createdAt)),
                        user: post.user
                    }
                }
                topics.push({
                    id: topic.id,
                    title: topic.title,
                    createdAt: topic.createdAt,
                    startedBy: topic.user.username,
                    startedById: topic.user.id,
                    repliesCount: topic.posts.length,
                    lastPost
                })
            }
            return topics;
        }
    },
    async mounted(){


    }
}
</script>


