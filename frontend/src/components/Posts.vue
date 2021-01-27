<template>
    <div class="posts">
        <tr v-for="post in posts">
            <td class="text-center">
                <avatar :username="post.user.username" class="ml-3 my-2"></avatar>
                {{ post.user.username }}
            </td>
            <td>
                <p class="p-4">
                    {{ post.content }}
                </p>
            </td>
        </tr>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    name: 'Posts',
    components: {
        Avatar
    },
    props: ['posts'],
    async mounted() {

    }
}
</script>
