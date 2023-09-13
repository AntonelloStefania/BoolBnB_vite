<script>
export default {
    name: 'TypeList',
    data() {
        return {
            store,
            types: []
        }
    },
    created() {
        this.getTypes();
    },
    methods: {
        getTypes() {
            axios.get(`${this.store.baseUrl}/api/types`).then((response) => {
                if (response.data.success) {
                    this.types = response.data.results;
                }
                else {
                    //
                }
            })
        }
    }
}
</script>

<template lang="">
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center text-primary mb-5">Bnp - TYPES</h1>
                </div>
            </div>
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-12 col-md-4" v-for="type in types">
                    {{ type.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="">
    
</style>