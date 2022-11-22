<template>
    <div class="navbar navbar-default">
        <div class="navbar-header">
            <h1>
                <router-link :to="{ name: 'MyMain' }">
                    {{ sitename }}
                </router-link>
            </h1>
        </div>
        <div class="nav navbar-nav navbar-right cart">
            <button
                type="button"
                class="btn btn-default btn-lg"
                @click="showCheckout"
            >
                <span class="glyphicon glyphicon-shopping-cart">
                    {{ cartItemCount }}
                </span>
                Checkout
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyHeader',
    data() {
        return {
            sitename: 'Vue.JS Pet Depot',
        };
    },
    props: ['cartItemCount'],
    methods: {
        showCheckout() {
            this.$router.push({ name: 'MyForm' });
        },
    },
};
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>
