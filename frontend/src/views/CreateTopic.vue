<template>
    <div>
        <b-row v-if="user">
            <b-col>
                <b-card>
                    <b-card-body class="p-0">
                        <h6>
                            Crate topic
                        </h6>
                        <b-form-input v-model="title" placeholder="Topic title" class="mt-4"></b-form-input>
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
                            <b-button type="submit" variant="success" class="mt-3">Create</b-button>

                        </b-form>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'CreateTopic',
    components: {
    },
    data(){
        return {
            title: '',
            content: ''
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUser',
        }),


    },
    methods: {
        ...mapActions({
            createTopic: 'topic/createTopic',

        }),
        async onSubmit(){
            const boardId = this.$route.params.id;
            const res = await this.createTopic({
                boardId,
                title: this.title,
                content: this.content
            });
            if (res !== false){
                this.$bvToast.toast('Topic created successfully', {
                    title: 'Success action',
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 3000,
                    appendToast: true
                });
                return await this.$router.push({name: 'Topic',params:{id: res.data.topic.id}})
            } else {
                this.$bvToast.toast('Could not create topic', {
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

    }
}
</script>
