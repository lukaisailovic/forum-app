<template>
    <div>

        <b-row v-if="user">
            <b-col>
                <b-card>
                    <b-card-body class="p-0">
                        <h6>
                            Edit post
                        </h6>
                        <b-form @submit.prevent="onSubmit">
                            <b-form-textarea
                                id="textarea"
                                v-model="content"
                                placeholder="Enter something..."
                                rows="6"
                                max-rows="6"
                                max="150"
                                min="10"
                                required
                                class="mt-4"
                            ></b-form-textarea>
                            <b-button type="submit" variant="warning" class="mt-3">Edit</b-button>

                        </b-form>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>

import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
    name: 'UpdatePost',
    components: {
    },
    data(){
        return {
            content: ''
        }
    },
    computed: {
        ...mapGetters({
            post: 'post/getSelectedPost',
            user: 'auth/getUser',
            topic: 'topic/getSelectedTopic',
        }),

        postBelongsToUser(){
            if (this.user == null){
                return false;
            }
            return this.post.user.id === this.user.id;
        },
    },
    methods: {
        ...mapActions({
            getSelectedPost: 'post/getSelectedPost',

            editSelectedPost: 'post/editSelectedPost',

        }),
        async onSubmit(){
            const res = await this.editSelectedPost({
                postId: this.post.id,
                content: this.content
            });
            if (res === true){
                this.$bvToast.toast('Post edited successfully', {
                    title: 'Success action',
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 3000,
                    appendToast: true
                });
                return await this.$router.push({name: 'Topic',params:{id: this.topic.id}})
            } else {
                this.$bvToast.toast('Could not edit post', {
                    title: 'Error action',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 3000,
                    appendToast: true
                })
            }
            this.content = '';
        }
    },
    async mounted() {
        const postId = this.$route.params.id;
        await this.getSelectedPost(postId);
        this.content = this.post.content;
    }
}
</script>
