<template>
    <div>
        <h2 class="text-center">Visão do produto</h2>
 
        <table class="table">
            <thead>
            <tr>
                <th>{{product.name}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="tag in product.tags" :key="tag.id">
                <td>{{ tag.name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
 
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                product: {}
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.id = this.$route.params.id
               this.getProduct(this.$route.params.id)
            }
        },
        methods: {
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