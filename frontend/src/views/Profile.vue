<template>
    <div v-if="user !== null">

        <b-row class="justify-content-center">
            <b-col md="4" class="text-center">
                <avatar :username="user.username" size="150" style="margin-left:100px"></avatar>
                <h4>{{user.username}}</h4>
                <p>
                    Number of posts: {{user.postCount}}
                </p>
            </b-col>
        </b-row>

    </div>
</template>
<script>
import axios from "../store/axios"
import Avatar from 'vue-avatar'
export default {
    name: 'Profile',
    components: {
        Avatar
    },
    data(){
        return {
            user: null
        }
    },
    methods:{
        async getUser(id){
            try {
                const res = await axios.get(`user/${id}`);
                if (res.status === 200) {
                    this.user = res.data.user;
                    console.log(res.data)
                }
            } catch (error) {
                console.log(error)
                this.$bvToast.toast('Could not get user', {
                    title: 'Error action',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 3000,
                    appendToast: true
                })
            }
        }
    },
    async mounted(){
        const userId = this.$route.params.id;
        await this.getUser(userId);
    }
}
</script>