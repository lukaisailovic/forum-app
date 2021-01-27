<template>
    <div class="post">

        <tr>
            <td class="text-center">
                <avatar :username="post.user.username" class="ml-3 my-2"></avatar>
                {{ post.user.username }}
            </td>
            <td style="width: 100%">
                <p class="p-4" >
                    {{ post.content }}
                </p>
                <p class="text-right" v-if="postBelongsToUser">
                    <span class="btn btn-warning" @click.prevent="goToUpdate(post.id)">
                        Edit
                    </span>
                    <span class="btn btn-danger ml-2" @click="deletePost(post.id)">
                        Delete
                    </span>
                </p>
            </td>
        </tr>

    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'Post',
    components: {
        Avatar
    },
    props: ['post'],
    computed: {
        ...mapGetters({
            user: "auth/getUser"
        }),
        postBelongsToUser(){
            if (this.user == null){
                return false;
            }
            return this.post.user.id === this.user.id;
        }
    },
    methods: {
        ...mapActions({
            deleteFromDatabase: 'topic/deletePost'
        }),
        async deletePost(id){
            const res = await this.deleteFromDatabase(id);
            if (res){
                this.$bvToast.toast('Post deleted successfully', {
                    title: 'Success action',
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 3000,
                    appendToast: true
                })
            } else {
                this.$bvToast.toast('Could not delete post', {
                    title: 'Error action',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 3000,
                    appendToast: true
                })
            }
        },
        async goToUpdate(id){

            await this.$router.push({ name: 'UpdatePost', params: { id: id } })
        }
    }

}
</script>
