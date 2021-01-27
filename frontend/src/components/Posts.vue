<template>
    <div class="posts">
        <Post v-for="post in posts" :post="post"/>
    </div>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
    name: 'Posts',
    components: {
        Post
    },
    props: ['posts'],
    async mounted() {

    }
}
</script>
