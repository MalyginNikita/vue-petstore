<template>
    <div>
        <MyHeader :cartItemCount="cartItemCount"></MyHeader>
        <main>
            <div v-for="product in products" :key="product.id">
                <div class="row">
                    <div class="col-md-5 col-md-offset-0">
                        <figure>
                            <img class="product" v-bind:src="product.image" />
                        </figure>
                    </div>
                    <div class="col-md-6 col-md-offset-0 description">
                        <h1>
                            {{ product.title }}
                        </h1>
                        <p v-html="product.description"></p>
                        <p class="price">
                            {{ product.price | formatPrice }}
                        </p>
                        <button
                            class="btn btn-primary btn-lg"
                            v-on:click="addToCart(product)"
                            v-if="canAddToCart(product)"
                        >
                            Add to cart
                        </button>
                        <button
                            disabled="true"
                            class="btn btn-primary btn-lg"
                            v-else
                        >
                            Add to cart
                        </button>
                        <span
                            class="inventory-message"
                            v-if="
                                product.availableInventory -
                                    cartCount(product.id) ===
                                0
                            "
                            >All Out!
                        </span>
                        <span
                            class="inventory-message"
                            v-else-if="
                                product.availableInventory -
                                    cartCount(product.id) <
                                5
                            "
                        >
                            Only
                            {{
                                product.availableInventory -
                                cartCount(product.id)
                            }}
                            left!
                        </span>
                        <span class="inventory-message" v-else>Buy Now! </span>
                        <div class="rating">
                            <span
                                v-bind:class="{
                                    'rating-active': checkRating(n, product),
                                }"
                                v-for="n in 5"
                                :key="n"
                                >☆
                            </span>
                        </div>
                    </div>
                    <!-- end of col-md-6-->
                </div>
                <!-- end of row-->
                <hr />
            </div>
            <!-- end of v-for-->
        </main>
    </div>
</template>
<script>
import MyHeader from './MyHeader.vue';
//import axios from 'axios';

export default {
    name: 'MyMain',
    data() {
        return {
            products: [
                {
                    id: 1001,
                    title: 'Cat Food, 25lb bag',
                    description:
                        'A 25 pound bag of <em>irresistible</em>, organic goodness for your cat.',
                    price: 2000,
                    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.heb.com%2Fproduct-detail%2Fmeow-mix-original-choice-cat-food%2F33651&psig=AOvVaw1F_JTNVdipI6feyKoDpNmN&ust=1669184084567000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIiS9LWRwfsCFQAAAAAdAAAAABAE',
                    availableInventory: 10,
                    rating: 1,
                },
                {
                    id: 1002,
                    title: 'Yarn',
                    description:
                        'Yarn your cat can play with for a very <strong>long</strong> time!',
                    price: 299,
                    image: '../assets/images/yarn.jpg',
                    availableInventory: 7,
                    rating: 1,
                },
                {
                    id: 1003,
                    title: 'Kitty Litter',
                    description: 'Premium kitty litter for your cat.',
                    price: 1100,
                    image: '../assets/images/cat-litter.jpg',
                    availableInventory: 99,
                    rating: 4,
                },
                {
                    id: 1004,
                    title: 'Cat House',
                    description: 'A place for your cat to play!',
                    price: 799,
                    image: '../assets/images/cat-house.jpg',
                    availableInventory: 11,
                    rating: 5,
                },
                {
                    id: 1005,
                    title: 'Laser Pointer',
                    description:
                        'Drive your cat crazy with this <em>amazing</em> product.',
                    price: 4999,
                    image: '../assets/images/laser-pointer.jpg',
                    availableInventory: 25,
                    rating: 1,
                },
            ],
            cart: [],
        };
    },
    components: { MyHeader },
    methods: {
        checkRating(n, myProduct) {
            return myProduct.rating - n >= 0;
        },
        addToCart(aProduct) {
            this.cart.push(aProduct.id);
        },
        canAddToCart(aProduct) {
            //return this.product.availableInventory > this.cartItemCount;
            return aProduct.availableInventory > this.cartCount(aProduct.id);
        },
        cartCount(id) {
            let count = 0;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
    },
    computed: {
        cartItemCount() {
            return this.cart.length || '';
        },
        /* sortedProducts() {
            if (this.products.length > 0) {
                let productsArray = this.products.slice(0);
                function compare(a, b) {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    }
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                }
                return productsArray.sort(compare);
            }
        }, */
    },
    filters: {
        formatPrice(price) {
            if (!parseInt(price)) {
                return '';
            }
            if (price > 99999) {
                var priceString = (price / 100).toFixed(2);
                var priceArray = priceString.split('').reverse();
                var index = 3;
                while (priceArray.length > index + 3) {
                    priceArray.splice(index + 3, 0, ',');
                    index += 4;
                }
                return '$' + priceArray.reverse().join('');
            } else {
                return '$' + (price / 100).toFixed(2);
            }
        },
    },
    /* created: function () {
        axios.get('../static/products.json').then((response) => {
            this.products = response.data.products;
            console.log(this.products);
        });
    }, */
};
</script>
<style scoped></style>
