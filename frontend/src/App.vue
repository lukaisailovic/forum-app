<template>
    <div id="app">
<!--        <div id="nav">-->
<!--            <router-link to="/">Home</router-link> |-->
<!--            <router-link to="/about">About</router-link>-->
<!--        </div>-->
        <b-container fluid class="p-0">
            <Navbar/>
        </b-container>
        <b-container class="mt-4">
            <router-view/>
        </b-container>

    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'App',
    components: {
        Navbar
    },

}
</script>