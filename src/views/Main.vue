<template>
    <v-container class="my-10 ">
        <v-row no-gutters>
            <v-col cols="12">
                <h4 class="text-h4">Найкращій магазин канцтоварів!</h4>
            </v-col>
        </v-row>
    </v-container>
    <div class="my-10">
        <swiper
            :navigation="true" :modules="modules" class="mySwiper"
        >
            <swiper-slide
                v-for="banner of banners"
                :key="banner.id"
                :style="{ height: '300px' }"
            >
                <v-img :src="banner.src"
                       cover
                />
            </swiper-slide>
        </swiper>
    </div>

    <v-container>
      <ProductGroupByTag
        title="ТОП продажів"
        :products="allProducts"
        tag="home"
      />

      <ProductGroupByTag
        title="Сезонні знижки"
        :products="allProducts"
        tag="office"
      />
    </v-container>

</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from "@/components/ProductCard/ProductCard.vue";
import ProductGroupByTag from "@/components/ProductGroupByTag/ProductGroupByTag.vue";

const modules = [Navigation];

import {useProductsStore} from "@/store/modules/products";
import {storeToRefs} from "pinia";

const banners = [
  {
    id: 1,
    src: 'https://klike.net/uploads/posts/2022-12/1672124005_3-12.jpg',
  },
  {
    id: 2,
    src: 'https://klike.net/uploads/posts/2022-12/1672123930_3-27.jpg',
  },
  {
    id: 3,
    src: 'https://klike.net/uploads/posts/2022-12/1672124021_3-20.jpg',
  },
  {
    id: 4,
    src: 'https://klike.net/uploads/posts/2022-12/1672124010_3-19.jpg',
  },
  {
    id: 5,
    src: 'https://klike.net/uploads/posts/2022-12/1672123980_3-31.jpg',
  }
]


const productStore = useProductsStore()

const { allProducts } = storeToRefs(productStore);
</script>

<style scoped>
.swiper {
    max-width: 100%
}
</style>
