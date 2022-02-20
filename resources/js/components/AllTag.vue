<template>
    <div>
        <h2 class="text-center">Lista de tags</h2>
 
        <table class="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>NOME</th>
                <!-- <th>Actions</th> -->
            </tr>
            </thead>
            <tbody>
            <tr v-for="tag in tags" :key="tag.id">
                <td>{{ tag.id }}</td>
                <td>{{ tag.name }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <router-link :to="{name: 'editarTag', params: { id: tag.id }}" class="btn btn-success">Editar</router-link>
                        <button class="btn btn-danger" @click="deleteProduct(tag.id)">Apagar</button>
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
                tags: []
            }
        },
        created() {
            axios
                .get('http://localhost:8000/api/tags/')
                .then(response => {
                    this.tags = response.data;
                });
        },
        methods: {
            async deleteProduct(id) { 
                await axios
                    .delete(`http://localhost:8000/api/tags/${id}`)
                    .then(response => {
                        let i = this.tags.map(data => data.id).indexOf(id);
                        this.tags.splice(i, 1)
                    });
            }
        }
    }
</script>