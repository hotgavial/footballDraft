<script>
export default {
  methods: {
  },
    props: ["selectedUserForListOfPlayers"],
}
</script>
<template>
    <div class="allPlayersOfUser">
        <h4>Joueurs appartenant à {{ selectedUserForListOfPlayers.pseudo }}</h4>
        <p v-for="player in selectedUserForListOfPlayers.fbPlayers" :key="player"> {{ player.name }}</p>
    </div>
</template>
<style>
    .allPlayersOfUser {
        background: rgba(245, 245, 220, 0.9);
        border: solid black 3px;
        height: 45%;
        overflow: auto;
    }
</style>