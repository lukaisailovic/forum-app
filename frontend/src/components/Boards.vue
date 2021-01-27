<template>
    <div>
        <b-row class="mb-4">
            <b-col>
                <h4>
                    Boards
                </h4>
            </b-col>
        </b-row>
        <b-row v-for="board in boards" class="mb-3">
            <b-col>
                <b-card class="p-0 m-0">
                    <b-card-body class="p-0 m-0">
                       <b-row>
                           <b-col>
                               <router-link :to="{ name: 'Board', params: { id: board.id }}" class="text-decoration-none text-dark">
                                   <b-card-title>{{board.name}}</b-card-title>
                               </router-link>

                               <b-card-text>
                                   {{ board.description }}
                               </b-card-text>
                           </b-col>
                           <b-col >
                               <b-card-text class="text-right">
                                   Number of topics:
                               </b-card-text>
                               <b-card-text class="text-right">
                                   {{board.topicCount}}
                               </b-card-text>

                           </b-col>
                       </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
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
        this.$store.commit('clearSelectedBoard')

        if (this.boards.length === 0){
            await this.$store.dispatch('getBoards');
        }
    }
}
</script>


