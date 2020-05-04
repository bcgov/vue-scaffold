<template>
  <v-container class="hello-call text-center">
    <v-btn
      @click="getHello"
      color="primary"
      class="hello-call-btn"
      id="hello-call-btn"
      large
      :loading="loading"
    >
      <v-icon left>mdi-hexagon-multiple</v-icon>
      <span>Get Response</span>
    </v-btn>
    <p>{{ helloData }}</p>
  </v-container>
</template>

<script>
import helloService from '@/services/helloService';

export default {
  name: 'HelloWorld',
  data() {
    return {
      helloData: '???',
      loading: false
    };
  },
  methods: {
    async getHello() {
      this.loading = true;
      try {
        const response = await helloService.getHello();
        this.helloData = response.data;
      } catch (e) {
        this.helloData = e;
      }
      this.loading = false;
    }
  }
};
</script>



