<template>
    <div class="home">
        <Boards />
    </div>
</template>

<script>
// @ is an alias to /src
import Boards from '@/components/Boards.vue'

export default {
    name: 'Home',
    components: {
        Boards
    },
    async mounted() {

    }
}
</script>
