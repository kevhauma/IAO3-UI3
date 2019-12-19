<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          ExamenProject - Hospitaal
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Lijst</q-item-label>
          <q-item clickable tag="a" to="/rooms">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Patients</q-item-label>
            <q-item-label caption>click to go to patients</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/patients">
          <q-item-section avatar>
            <q-icon name="event_seat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Rooms</q-item-label>
            <q-item-label caption>click to go to rooms</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
