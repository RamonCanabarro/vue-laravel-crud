<template>
    <div class="container"> 
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav" v-if="isLoggedIn">
                    <router-link to="/create" class="nav-item nav-link">Criar produtos</router-link>
                    <router-link to="/createTag" class="nav-item nav-link">Criar tags</router-link>
                    <router-link to="/listarTag" class="nav-item nav-link">Listar tags</router-link>
                    <a class="nav-item nav-link" style="cursor: pointer;" @click="logout">Logout</a>

                </div>
                <div class="navbar-nav" v-else>
                    <router-link to="/" class="nav-item nav-link">Home</router-link>
                    <router-link to="/login" class="nav-item nav-link">login</router-link>
                    <router-link to="/register" class="nav-item nav-link">Register</router-link>
                </div>
            </div>
        </nav>
        <router-view> </router-view>
    </div>
</template>
 
<script>
    export default {
    name: "App",
    data() {
        return {
            isLoggedIn: false,
        }
    },
    created() {
        const tokenValid = localStorage.getItem('LARAVEL_SANCTUM')
        if (tokenValid && /^\{(.*?)\}$/.test(tokenValid)) {
            this.isLoggedIn = true
        }
    },
    methods: {
        logout(e) {
            console.log('ss')
            e.preventDefault()
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.$axios.post('/api/logout')
                    .then(async(response) => {
                        if (response.data.success) {
                            await localStorage.removeItem('LARAVEL_SANCTUM')
                            window.location.href = "/"
                        } else {
                            console.log(response)
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            })
        }
    },
}
</script>