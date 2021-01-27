<template>
    <div class="login">
        <b-row class="justify-content-center mt-5">
            <b-col md="4">
                <h4 class="mb-3">
                    Register
                </h4>
                <hr class="mb-4">
                <b-form @submit.prevent="onSubmit">
                    <b-form-group
                        id="username-input-group"
                        label="Username:"
                        label-for="username-input"

                    >
                        <b-form-input
                            id="username-input"
                            v-model="form.username"
                            type="text"
                            placeholder="Enter username"
                            required
                            min="4"
                            max="20"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        id="password-input-group"
                        label="Password:"
                        label-for="password-input"

                    >
                        <b-form-input
                            id="password-input"
                            v-model="form.password"
                            type="password"
                            placeholder="Enter password"
                            required
                            min="8"
                            max="20"
                        ></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="success" block>Register</b-button>
                </b-form>

            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from '../store/axios';

export default {
    name: 'Register',
    data() {
        return {
            form: {
                username: '',
                password: '',
                loading: false,
            }
        }
    },
    methods: {

        async onSubmit(){
            this.loading = true;
            try {
                const res = await axios.post('user/register',{
                    username: this.form.username,
                    password: this.form.password
                });
                if (res.status === 201) {
                    this.$bvToast.toast('Your account has been registered successfully, you can log in now', {
                        title: 'Registration successful',
                        variant: 'success',
                        solid: true,
                        autoHideDelay: 3000,
                        appendToast: true
                    })

                } else {

                    this.$bvToast.toast(res.data.message, {
                        title: 'Login error',
                        variant: 'danger',
                        solid: true,
                        autoHideDelay: 3000,
                        appendToast: true
                    })
                }
            } catch (error) {
                this.$bvToast.toast(error.response.data.message, {
                    title: 'Login error',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 3000,
                    appendToast: true
                })
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>
