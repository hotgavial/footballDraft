<script>
export default {
    props: ["users", "currentUser"],
}
</script>
<template>
    <div class="host-game_scoresheets">
        <div v-bind:class="currentUser?.pseudo == user.pseudo ? 'host-game_scoresheets_user_current' : 'host-game_scoresheets_user'" v-for="user in users">
            <p class="host-game_scoresheets_user_pseudo">{{ user.pseudo }}</p>
            <p>Classement : {{ user.ranking }}</p>
            <p>Score : {{ user.score }}</p>
            <p>Nombre de joueurs : {{ user.nbrFbPlayers }}</p>
        </div>
    </div>  
</template>
<style>
.host-game_scoresheets {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 20%;
}

.host-game_scoresheets_user {
    text-align: center;
    background-image: url('@/assets/wood.jpg');
    border: solid black 2px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.host-game_scoresheets_user_current {
    text-align: center;
    background-image: url('@/assets/wood.jpg');
    border: solid red 4px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.host-game_scoresheets_user_pseudo {
    font-weight: bold;
    font-size: 1.2em;
}
</style>