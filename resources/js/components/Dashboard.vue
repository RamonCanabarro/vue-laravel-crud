<template>
    <div>
        Bem vindo {{ user.name }}
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            user: {},
            token_key: 'LARAVEL_SANCTUM'
        }
    },
    created() {
        const tokenValid = localStorage.getItem('LARAVEL_SANCTUM')
        if (tokenValid && /^\{(.*?)\}$/.test(tokenValid)) {
            const token = JSON.parse(tokenValid)

            this.user = token.user
        }
    },
    beforeRouteEnter(to, from, next) {
        const tokenValid = localStorage.getItem('LARAVEL_SANCTUM')

        if (!tokenValid && !/^\{(.*?)\}$/.test(tokenValid)) {
            window.location.href = "/"
        }
        next();
    }
}
</script>