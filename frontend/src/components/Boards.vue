<template>
    <div>
        <h1 v-for="board in boards">
            {{board.name}}
        </h1>
    </div>
</template>


<script>
export default {
    name: 'Boards',
    computed: {
        boards(){
            return this.$store.state.boards;
        }
    },
    async mounted(){
        await this.$store.dispatch('getBoards');
    }
}
</script>


