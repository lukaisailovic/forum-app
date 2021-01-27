<template>
    <div>
        <b-row class="mb-4">
            <b-col>
                <h4>
                    Topics of board: {{board.name}}
                </h4>
            </b-col>
        </b-row>

    </div>
</template>


<script>
export default {
    name: 'Boards',
    props: ['board'],
    computed: {
        topics(){
            return [];
        }
    },
    async mounted(){


    }
}
</script>


