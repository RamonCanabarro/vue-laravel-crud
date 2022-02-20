<template>
    <div>
        <h3 class="text-center">{{ id ? "Alterar tag" : "Criar tag" }}</h3>
        <div class="d-flex justify-content-center row">
            <div class="col-md-6">
                <form @submit.prevent="addProduct">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-floating">
                            <input class="form-control" id="floatingInputGrid" placeholder="NOME" v-model="tag.name">
                            <label for="floatingInputGrid">NOME</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">{{ id ? "Alterar" : "Criar" }}</button>
                </form>
            </div>
        </div>
    </div>
</template>
 
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                tag: {},
                id: 0
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.id = this.$route.params.id
               this.getProduct(this.$route.params.id)
            }
        },
        methods: {
            async addProduct() {
                if(this.$route.params.id) {
                    
                await this.$axios
                        .patch(`api/tags/${this.$route.params.id}`, this.tag)
                        .then((res) => {
                            this.$router.push({ name: 'listarTag' });
                        });
                } else {
                    await this.$axios.get('/sanctum/csrf-cookie').then(async(response) => {
                    await this.$axios
                        .post('http://localhost:8000/api/tags', this.tag)
                        .then(async(response) => (
                            this.$router.push({ name: 'listarTag' })
                        ))
                        .catch(err => console.log(err))
                        .finally(() => this.loading = false)
                    })
                }
            },
            getProduct(id) {
                axios
                    .get(`http://localhost:8000/api/tags/${id}`)
                    .then(async(response) => (
                        this.tag = response.data
                    ))
                    .catch(err => console.log(err))
                    .finally(() => this.loading = false)
            }
        }
    }
</script>