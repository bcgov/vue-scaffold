<template>
  <div v-if="kcReady">
    <v-btn
      v-if="$keycloak.authenticated"
      color="secondary"
      class="login-btn"
      id="header-logout"
      @click="logout"
    >
      <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-logout</v-icon>
      <span v-if="$vuetify.breakpoint.smAndUp">Logout</span>
    </v-btn>
    <v-btn v-else color="secondary" class="login-btn" id="header-login" @click="login">
      <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-login</v-icon>
      <span v-if="$vuetify.breakpoint.smAndUp">Login</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'BaseAuthButton',
  computed: {
    kcReady() {
      return !!this.$keycloak && this.$keycloak.ready;
    }
  },
  methods: {
    login() {
      window.location.replace(this.$keycloak.createLoginUrl());
    },
    logout() {
      window.location.replace(this.$keycloak.createLogoutUrl());
    }
  }
};
</script>
