<script>
export default {
  methods: {
  },
    props: ["bestPlayers"],
}
</script>
<template>
    <div class="bestPlayersYet">
        <h4>30 Meilleurs Joueurs</h4>
        <table>
            <tr v-for="player in bestPlayers" :key="player">
                <td>{{ player.name }}</td>
                <td>{{ player.grade }}</td>
                <td>{{ player.owner }}</td>       
            </tr>
        </table>
    </div>
</template>
<style>
    .bestPlayersYet {
        background: rgba(245, 245, 220, 0.9);
        border: solid black 3px;
        height: 45%;
        overflow: auto;
    }
</style>