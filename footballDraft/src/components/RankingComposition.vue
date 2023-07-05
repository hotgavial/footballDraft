<script>
export default {
  methods: {
  },
    props: ["rankingAllCompositions"],
}
</script>
<template>
    <div class="rankingCompo">
        <h4>Classement des compositions</h4>
        <table>
            <tr v-for="compo in rankingAllCompositions" :key="compo"> 
                <td>{{ compo.user.pseudo }}</td>
                <td>{{ compo.sumGrades }}</td>
                <td>{{ compo.nbrPlayers }}</td>
                <td>{{ compo.total }}</td>
            </tr>
        </table>
    </div>
</template>
<style>
    .rankingCompo {
        background: rgba(245, 245, 220, 0.9);
        border: solid black 3px;
        height: 45%;
        overflow: auto;
    }
</style>