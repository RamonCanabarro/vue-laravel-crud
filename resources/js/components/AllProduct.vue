<template>
    <div>
        <h2 class="text-center">Lista de produtos</h2>
 
        <table class="table">
            <thead>
            <tr>
                <th>NOME</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <router-link :to="{name: 'edit', params: { id: product.id }}" class="btn btn-success">Editar</router-link>
                        <button class="btn btn-danger" @click="deleteProduct(product.id)">Apagar</button>
                        <router-link :to="{name: 'dataProduct', params: { id: product.id }}" class="btn btn-primary">Visualizar</router-link>
                    </div>
                </td>
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
                products: [],
                product: {}
            }
        },
        created() {
            axios
                .get('http://localhost:8000/api/products/')
                .then(response => {
                    this.products = response.data;
                });
        },
        methods: {
            async deleteProduct(id) { 
                await axios
                    .delete(`http://localhost:8000/api/products/${id}`)
                    .then(response => {
                        let i = this.products.map(data => data.id).indexOf(id);
                        this.products.splice(i, 1)
                    });
            }
        }
    }
</script>