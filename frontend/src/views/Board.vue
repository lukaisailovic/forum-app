<template>
    <div class="board">
        <Topics :board="board"/>
    </div>
</template>

<script>
// @ is an alias to /src
import Topics from '@/components/Topics.vue'

export default {
    name: 'Home',
    components: {
        Topics
    },
    computed: {
        board(){
            return this.$store.state.selectedBoard;
        }
    },
    async mounted() {
        const boardId = this.$route.params.id;
        this.$store.commit('setSelectedBoardId', boardId)
        await this.$store.dispatch('getSelectedBoard');
    }
}
</script>
