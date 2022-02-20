<template>
    <div>
        <h3 class="text-center">{{ id ? "Alterar produto" : "Criar produto" }}</h3>
        <div class="d-flex justify-content-center row">
            <div class="col-md-6">
                <form @submit.prevent="addProduct" autocomplete="off">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-floating">
                            <input class="form-control" id="floatingInputGrid" placeholder="NOME" v-model="product.name">
                            <label for="floatingInputGrid">NOME</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <select multiple class="form-select form-select-lg mb-3" v-model="product.tags" aria-label=".form-select-lg example">
                                <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
                            </select>
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
                product: {},
                id: 0,
                tags: []
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.id = this.$route.params.id
               this.getProduct(this.$route.params.id)
            }
            this.getTags()
        },
        methods: {
            async addProduct() {
                if(this.$route.params.id) {
                    await axios
                    .patch(`http://localhost:8000/api/products/${this.$route.params.id}`, this.product)
                    .then((res) => {
                        this.$router.push({ name: 'home' });
                    });
                } else {
                    await axios
                        .post('http://localhost:8000/api/products', this.product)
                        .then(response => (
                            this.$router.push({ name: 'home' })
                        ))
                        .catch(err => console.log(err))
                        .finally(() => this.loading = false)
                }
            },
            async getTags(){
                await axios
                .get('http://localhost:8000/api/tags/')
                .then(response => {
                    this.tags = response.data;
                });
            },
            async getProduct(id) {
                await axios
                    .get(`http://localhost:8000/api/products/${id}`)
                    .then(response => {
                        this.product = response.data;
                    })
                    .catch(err => console.log(err))
                    .finally(() => this.loading = false)
            }
        }
    }
</script>