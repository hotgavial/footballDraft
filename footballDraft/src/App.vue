<script>
import CompositionScreen from './components/CompositionScreen.vue'
import UsersScoreSheets from './components/UsersScoresheets.vue'
import ListOfPlayersForUser from './components/ListOfPlayersForUser.vue'
import BestPlayers from './components/BestPlayers.vue'
import RankingComposition from './components/RankingComposition.vue'

export default {
    components: {CompositionScreen, UsersScoreSheets, ListOfPlayersForUser, BestPlayers, RankingComposition}, 
  data: function() {
        return {
            bestPlayers: [],
            clue: "",
            clues: [],
            currentIndexUsersArray: 0,
            currentPlayer: null,
            currentPlayerClues: [],
            currentUser: null,
            guess: "",
            hasGameStarted: false,
            indexStartingUser: 0,
            isGameOver: false,
            lastAttempts: [],
            nbrRounds: 0,
            rankingAllCompositions:  [],
            selectedCompo: 0,
            selectedUserIndexForCompoScreen: 0,
            users: [
                {
                    id: 1,
                    pseudo: "Matthieu",
                    score: 0,
                    ranking: 1,
                    nbrFbPlayers: 0,
                    fbPlayers: [],
                    listCompoUser: [],
                    bestCompo: null,
                    bestScore: 0,
                    playersTested: [],
                    bestPossibleScore: 0,
                    playerToRemove: "",
                    listCompoScore: []
                },
                {
                    id: 2,
                    pseudo: "Samuel",
                    score: 0,
                    ranking: 1,
                    nbrFbPlayers: 0,
                    fbPlayers: [],
                    listCompoUser: [],
                    bestCompo: null,
                    bestScore: 0,
                    playersTested: [],
                    bestPossibleScore: 0,
                    playerToRemove: "",
                    listCompoScore: []
                },
                {
                    id: 3,
                    pseudo: "Vincent P",
                    score: 0,
                    ranking: 1,
                    nbrFbPlayers: 0,
                    fbPlayers: [],
                    listCompoUser: [],
                    bestCompo: null,
                    bestScore: 0,
                    playersTested: [],
                    bestPossibleScore: 0,
                    playerToRemove: "",
                    listCompoScore: []
                },
                {
                    id: 4,
                    pseudo: "Vincent W",
                    score: 0,
                    ranking: 1,
                    nbrFbPlayers: 0,
                    fbPlayers: [],
                    listCompoUser: [],
                    bestCompo: null,
                    bestScore: 0,
                    playersTested: [],
                    bestPossibleScore: 0,
                    playerToRemove: "",
                    listCompoScore: []
                }
            ],
        }
        
    },
    methods: {
        addPlayerToBestPlayers: function() {
            if (this.bestPlayers.length >= 30) {
                if (this.currentPlayer.grade <= this.bestPlayers[this.bestPlayers.length - 1].grade) {
                return;
                }
            }
            this.bestPlayers.push(this.currentPlayer);
            this.bestPlayers.sort((a, b) => b.grade - a.grade);
            
            if (this.bestPlayers.length > 30) {
                this.bestPlayers.pop();
            }       
        },
        addPlayerToDatabase: function(idPlayer, idUser, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost/updatePlayerSession.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.responseText);
            callback();
                }
            };
            xhr.send("idPlayer=" + idPlayer + "&idUser=" + idUser);
        },
        addNewPlayerToTeam : function(newPlayer, composition, uniqueUser) {
            if(composition.grades.length === 11) {
                // If in a complete team the worst graded player has a better grade than the new player, the team can't possibly improve by replacing any old player by the new player
                if(composition.grades[0] >= newPlayer.grade) {
                    return;
                }
                // If in a complete team the new player has a position where the old player has the worst grade of the team he can take his place.
                for(let position of newPlayer.positions) {
                    if(position === "Milieu de Terrain" || position === "Défenseur Central" || position === "Buteur") {
                        for(let i=0; i < 2; i++) {
                            if(newPlayer.grade > composition.grades[0] && composition.positions[position][i].grade === composition.grades[0]) {
                                uniqueUser.playerToRemove = composition.positions[position][i];
                                composition.grades.splice(0, 1);
                                composition.grades.push(newPlayer.grade);
                                composition.grades.sort((a,b)=>a-b); // So that we know composition.grades[0] will always be the worst grade of the players in the team
                                composition.positions[position].splice(i, 1);
                                composition.positions[position].push(newPlayer);
                                return;
                            }
                        }
                    } else {
                        if(composition.positions[position][0].grade === composition.grades[0]) {
                            composition.grades.splice(0, 1);
                            uniqueUser.playerToRemove = composition.positions[position][0];
                            composition.grades.push(newPlayer.grade);
                            composition.grades.sort((a,b)=>a-b);
                            composition.positions[position].splice(0, 1);
                            composition.positions[position].push(newPlayer);
                            return;
                        }
                    }
                }
                uniqueUser.bestPossibleScore = composition.grades.reduce((partialSum, a) => partialSum + a, 0) - composition.grades[0] + newPlayer.grade; // We may use this value later inside our recursiveTesting function
            } else {
                // If new player has a position that hasn't been fullfilled yet, he can take it. That'll be the better improvement for the team.
                for(let position of newPlayer.positions) {
                    if(position === "Milieu de Terrain" || position === "Défenseur Central" || position === "Buteur") {
                        for(let i=0; i < 2; i++) {
                            if(composition.positions[position][i] === undefined) {
                                uniqueUser.playerToRemove = "";
                                composition.positions[position].push(newPlayer);
                                composition.grades.push(newPlayer.grade); 
                                composition.grades.sort((a,b)=>a-b);
                                return;
                            }
                        }
                    } else {
                        if(composition.positions[position].length === 0) {
                            uniqueUser.playerToRemove = "";
                            composition.positions[position].push(newPlayer);
                            composition.grades.push(newPlayer.grade); 
                            composition.grades.sort((a,b)=>a-b);
                            return;
                        }
                    }
                }
                uniqueUser.bestPossibleScore = composition.grades.reduce((partialSum, a) => partialSum + a, 0) + newPlayer.grade;
            }
            // If the new player has only one position he can fullfill and the players who play in this position in the team can only play this position too, we can simply compare their grades to know which one(s) are the best
            if(newPlayer.positions.length === 1) {
                if(newPlayer.positions[0] === "Milieu de Terrain" || newPlayer.positions[0] === "Défenseur Central" || newPlayer.positions[0] === "Buteur") {
                    if(composition.positions[newPlayer.positions[0]][0].positions.length === 1 && composition.positions[newPlayer.positions[0]][1].positions.length === 1) {
                        if(composition.positions[newPlayer.positions[0]][0].grade >= composition.positions[newPlayer.positions[0]][1].grade
                            && newPlayer.grade > composition.positions[newPlayer.positions[0]][1].grade) {
                                composition.grades.splice(composition.grades.indexOf(composition.positions[newPlayer.positions[0]][1].grade), 1);
                                uniqueUser.playerToRemove = composition.positions[newPlayer.positions[0]][1];
                                composition.grades.push(newPlayer.grade);
                                composition.grades.sort((a,b)=>a-b);
                                composition.positions[newPlayer.positions[0]][1] = newPlayer;
                        } else if(composition.positions[newPlayer.positions[0]][1].grade > composition.positions[newPlayer.positions[0]][0].grade
                            && newPlayer.grade > composition.positions[newPlayer.positions[0]][0].grade) {
                                composition.grades.splice(composition.grades.indexOf(composition.positions[newPlayer.positions[0]][0].grade), 1);
                                uniqueUser.playerToRemove = composition.positions[newPlayer.positions[0]][0];
                                composition.grades.push(newPlayer.grade);
                                composition.grades.sort((a,b)=>a-b);
                                composition.positions[newPlayer.positions[0]][0] = newPlayer;
                        }
                        return;
                    }
                } else {
                    if(composition.positions[newPlayer.positions[0]][0].positions.length === 1) {
                        if(newPlayer.grade > composition.positions[newPlayer.positions[0]][0].grade) {
                            composition.grades.splice(composition.grades.indexOf(composition.positions[newPlayer.positions[0]][0].grade), 1);
                            uniqueUser.playerToRemove = composition.positions[newPlayer.positions[0]][0];
                            composition.grades.push(newPlayer.grade);
                            composition.grades.sort((a,b)=>a-b);
                            composition.positions[newPlayer.positions[0]][0] = newPlayer;
                        }
                        return;
                    }
                }
            }

            uniqueUser.bestCompo = JSON.parse(JSON.stringify(composition));
            uniqueUser.bestScore = composition.grades.reduce((partialSum, a) => partialSum + a, 0);
            uniqueUser.playersTested = [];
            this.recursiveTesting(newPlayer, composition, uniqueUser);
            composition.positions = uniqueUser.bestCompo.positions;
            composition.grades = uniqueUser.bestCompo.grades;
            composition.grades.sort((a,b)=>a-b);
            return;
        },
        calculateRanking: function() {
            this.calculalteUsersScore();
            

            for(let user of this.users) {
                let ranking = 1;
                for(let userToCompare of this.users) {
                    if(user.score < userToCompare.score) {
                        ranking += 1;
                    }
                }
                user.ranking = ranking;
            }
        },
        calculalteUsersScore: function() {
            let rankingAllCompositions = [];

            for(let user of this.users) {
                user.score = 0;
                for(let compo of user.listCompoUser) {
                    let sumGrades = compo.grades.reduce((total, grade) => total + grade, 0);
                    let bonus = compo.grades.length == 11 ? true : false;
                    let newCompo = { 
                        sumGrades: sumGrades,
                        user: user,
                        bonus: bonus,
                        nbrPlayers: compo.grades.length,
                        total: 0
                     };
                    rankingAllCompositions.push(newCompo);
                }
            }

            rankingAllCompositions.sort((a, b) => b.sumGrades - a.sumGrades);
            console.log(rankingAllCompositions);
            let pointsToAdd = rankingAllCompositions.length;
            let iterationDecreasing = pointsToAdd;
            let previousIndex = -1;
            for(let compo of rankingAllCompositions) {
                if(previousIndex != -1 && iterationDecreasing != 1 && rankingAllCompositions[previousIndex].sumGrades == compo.sumGrades) {
                    pointsToAdd = pointsToAdd;
                } else {
                    pointsToAdd = iterationDecreasing;
                }
                for(let user of this.users) {
                    if(user.pseudo == compo.user.pseudo) {
                        console.log(user.score + "+" + pointsToAdd);
                        if(compo.bonus) {
                            user.score += pointsToAdd * 2;
                            compo.total = pointsToAdd * 2;
                        } else {
                            user.score += pointsToAdd;
                            compo.total = pointsToAdd;
                        }
                        
                    }
                }
                iterationDecreasing--;
                previousIndex += 1;
            }
            this.rankingAllCompositions = rankingAllCompositions.sort((a, b) => b.total - a.total);
        },
        convertIntoArray: function() {
            this.currentPlayerClues = [];
            console.log("Sarjo");
            this.currentPlayerClues.push("Nom " + this.currentPlayer.name.charAt(0));
            this.currentPlayerClues.push("Prénom " + this.currentPlayer.firstname?.charAt(0));
            this.currentPlayerClues.push(this.currentPlayer.positions);
            this.currentPlayerClues.push(this.currentPlayer.size + " cm");
            this.currentPlayerClues.push("Année de Naissance : " + this.currentPlayer.birthdate);
            this.currentPlayerClues.push("Buts en Sélection : " + this.currentPlayer.selectionsGoals);
            this.currentPlayerClues.push("Match en Sélection : " + this.currentPlayer.selectionsGames);
            this.currentPlayerClues.push(this.currentPlayer.country);
            this.currentPlayer.career.forEach((club) => {
                this.currentPlayerClues.push(club);
            });
        },
        distributionNewPlayer: function(newPlayer, uniqueUser) {
                    
            if(uniqueUser.listCompoUser[0] === undefined) {
                let compo = {
                    positions: {
                        "Gardien" : [],
                        "Arrière Droit" : [],
                        "Arrière Gauche" : [],
                        "Défenseur Central" : [],
                        "Milieu de Terrain" : [],
                        "Ailier Droit" : [],
                        "Ailier Gauche" : [],
                        "Buteur" : []
                    },
                    grades: []
                };
                uniqueUser.listCompoUser.push(compo);
            }
            uniqueUser.playerToRemove = newPlayer;
            for(let compo of uniqueUser.listCompoUser) {
                this.addNewPlayerToTeam(uniqueUser.playerToRemove, compo, uniqueUser);
                if(uniqueUser.playerToRemove === "") {
                    return;
                }
            }
            let compo = {
                    positions: {
                        "Gardien" : [],
                        "Arrière Droit" : [],
                        "Arrière Gauche" : [],
                        "Défenseur Central" : [],
                        "Milieu de Terrain" : [],
                        "Ailier Droit" : [],
                        "Ailier Gauche" : [],
                        "Buteur" : []
                    },
                    grades: []
                };
            uniqueUser.listCompoUser.push(compo);
            this.addNewPlayerToTeam(uniqueUser.playerToRemove, compo, uniqueUser);
            return;
        },
        getClue: function() {
            console.log("oui");
            let indexClue = Math.floor(Math.random() * this.currentPlayerClues.length);
            let clue = this.currentPlayerClues[indexClue];
            this.clues.push(clue);
            this.currentPlayerClues.splice(indexClue, 1);
        },
        getPlayer() {
            return fetch(`http://localhost/getNewPlayer.php?idGameSession=1`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                this.currentPlayer = data;
                this.currentPlayer.grade = parseInt(this.currentPlayer.grade);
                })
                .catch((error) => console.error(error));
        },
        giveUp: function() {
            this.guess = "";
            if(this.clues.length == 8) {
                this.addPlayerToDatabase(this.currentPlayer.id, 6, () => {
                        this.newRound();
                    });
            } else {
                this.lastAttempts.push(this.guess);
                this.currentIndexUsersArray = this.currentIndexUsersArray + 1 == this.users.length ? 0 : this.currentIndexUsersArray + 1; 
                this.currentUser = this.users[this.currentIndexUsersArray];
                this.getClue();
            }
        },
        guessingAttempt: function() {
            let normalizedGuess = this.guess.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/(.)\1+/g, "$1");
            let normalizedNamePlayerToGuess = this.currentPlayer.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/(.)\1+/g, "$1");
            if(normalizedGuess ==  normalizedNamePlayerToGuess){
                this.users[this.currentIndexUsersArray].fbPlayers.push(this.currentPlayer);
                this.users[this.currentIndexUsersArray].nbrFbPlayers += 1;
                this.currentPlayer.owner = this.users[this.currentIndexUsersArray].pseudo;
                this.distributionNewPlayer(this.currentPlayer, this.users[this.currentIndexUsersArray]);
                this.addPlayerToBestPlayers();
                this.calculateRanking();
                this.addPlayerToDatabase(this.currentPlayer.id, this.currentUser.id, () => {
                    this.newRound();
                });
            } else {
                this.lastAttempts.push(this.guess);
                if(this.clues.length == 8) {
                    this.addPlayerToDatabase(this.currentPlayer.id, 6, () => {
                        this.newRound();
                    });
                } else {
                    this.guess = "";
                    this.currentIndexUsersArray = this.currentIndexUsersArray + 1 == this.users.length ? 0 : this.currentIndexUsersArray + 1;
                    this.currentUser = this.users[this.currentIndexUsersArray];
                    this.getClue(); 
                }
            }
        },
        newRound: function() {
            this.nbrRounds++;
            this.indexStartingUser = this.indexStartingUser+1 == this.users.length ? 0 : this.indexStartingUser + 1;
            this.currentIndexUsersArray = this.indexStartingUser;
            this.currentUser = this.users[this.indexStartingUser];
            this.lastAttempts = [];
            this.clues = [];
            this.guess = "";
            console.log("on est ici");
            this.getPlayer()
            .then(() => this.convertIntoArray())
            .then(() => this.getClue())
            .catch((error) => console.error(error));
        },
        recursiveTesting: function (player, composition, uniqueUser) {
            uniqueUser.playersTested.push(player.name);
            let testedComposition = JSON.parse(JSON.stringify(composition));
            let newScore = 0;
            let playerRemoved;
            for(let position of player.positions) {
                testedComposition = JSON.parse(JSON.stringify(composition));
                newScore = 0;
                if(position === "Milieu de Terrain" || position === "Défenseur Central" || position === "Buteur") {
                    for(let i=0; i < 2; i++) {
                        testedComposition = JSON.parse(JSON.stringify(composition));
                        newScore = 0;
                        // If the player can be placed without replacing any player, it is the best composition and we can stop
                        if(testedComposition.positions[position][i] === undefined) {
                            uniqueUser.playerToRemove = "";
                            testedComposition.positions[position].push(player);
                            testedComposition.grades.push(player.grade);
                            testedComposition.grades.sort((a,b)=>a-b);
                            uniqueUser.bestCompo = testedComposition; 
                            return true;
                        }
                        // If the player we want to replace has already been moved, we stop, otherwise we check if we've reached the best possible score. If that's not the case we call the recursiveTesting function 
                        // with the new composition and the the player we've removed as parameters.
                        if(uniqueUser.playersTested.indexOf(testedComposition.positions[position][i].name) === -1) {
                            playerRemoved = composition.positions[position][i];
                            testedComposition.positions[position].splice(i, 1);
                            testedComposition.positions[position].push(player);
                            testedComposition.grades.splice(testedComposition.grades.indexOf(playerRemoved.grade), 1);
                            testedComposition.grades.push(player.grade);
                            testedComposition.grades.sort((a,b)=>a-b);
                            newScore = testedComposition.grades.reduce((partialSum, a) => partialSum + a, 0);
                            if(newScore === uniqueUser.bestPossibleScore) {
                                uniqueUser.playerToRemove = playerRemoved;
                                uniqueUser.bestCompo = testedComposition; 
                                return true;
                            }
                            if(uniqueUser.bestScore < newScore) {
                                uniqueUser.playerToRemove = playerRemoved;
                                uniqueUser.bestScore = newScore;
                                uniqueUser.bestCompo = testedComposition;
                            }                         
                            let recursive = this.recursiveTesting(playerRemoved, testedComposition, uniqueUser);
                            if(recursive === true) {
                                return true;
                            }
                        }
                    }
                } else {
                    if(testedComposition.positions[position][0] === undefined) {
                        uniqueUser.playerToRemove = "";
                        testedComposition.positions[position].push(player);
                        testedComposition.grades.push(player.grade);
                        testedComposition.grades.sort((a,b)=>a-b);
                        uniqueUser.bestCompo = testedComposition; 
                        return true;
                    }
                    if(uniqueUser.playersTested.indexOf(testedComposition.positions[position][0].name) === -1) {
                        playerRemoved = composition.positions[position][0];
                        testedComposition.positions[position].splice(0, 1);
                        testedComposition.positions[position].push(player);
                        testedComposition.grades.splice(testedComposition.grades.indexOf(playerRemoved.grade), 1);
                        testedComposition.grades.push(player.grade);
                        testedComposition.grades.sort((a,b)=>a-b);
                        newScore = testedComposition.grades.reduce((partialSum, a) => partialSum + a, 0);
                        if(newScore === uniqueUser.bestPossibleScore) {
                            uniqueUser.playerToRemove = playerRemoved;
                            uniqueUser.bestCompo = testedComposition; 
                            return true;
                        }
                        if(uniqueUser.bestScore < newScore) {
                            uniqueUser.playerToRemove = playerRemoved;
                            uniqueUser.bestScore = newScore;
                            uniqueUser.bestCompo = testedComposition;
                        }
                        // If the player we've removed has only one position available, he can't possibly be moved elsewhere. Therefore there is no need to call recursiveTesting.
                        if(composition.positions[position][0].positions.length !== 1) {
                            let machin = this.recursiveTesting(playerRemoved, testedComposition, uniqueUser);
                            if(machin === true) {
                                return true;
                            }
                        } 
                    }
                }
            }
            uniqueUser.playersTested.splice(uniqueUser.playersTested.indexOf(player), 1);
            return;
        },  
        startGame: function() {
            this.nbrRounds = 1;
            this.hasGameStarted = true;
            this.currentUser = this.users[0];
            this.getPlayer()
            .then(() => this.convertIntoArray())
            .then(() => this.getClue())
            .catch((error) => console.error(error));
        },
        loadGame: function() {
            return fetch(`http://localhost/loadFbSession.php`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    data.forEach(element => {
                        console.log(element);
                        element.grade = parseInt(element.grade);
                        element.owner = parseInt(element.owner);
                        this.distributionNewPlayer(element, this.users[element.owner - 1]);
                        this.currentPlayer = element;
                        console.log(this.users[element.owner - 1]);
                        this.users[element.owner - 1].fbPlayers.push(element);
                        this.users[element.owner - 1].nbrFbPlayers += 1;
                        this.currentPlayer.owner = this.users[element.owner - 1].pseudo;
                        console.log(this.users[element.owner - 1]);
                        this.addPlayerToBestPlayers();
                    });
                    this.calculateRanking();
                })
                .catch((error) => console.error(error));
        }
    }, 
    computed: {
        compositionToDisplay: function() {
            return this.users[this.selectedUserIndexForCompoScreen].listCompoUser[this.selectedCompo];
        },
        selectedUserForListOfPlayers: function() {
            return this.users[this.selectedUserIndexForCompoScreen];
        }
    }
}

</script>

<template>
      <div class="whole">
        <div class="host-game">
            <div class="host-game_orderedTeams">
                <RankingComposition :rankingAllCompositions="rankingAllCompositions" />
                <BestPlayers :bestPlayers="bestPlayers" />
            </div>
            <div class="host-game_central-div">
                <div class="host-game_central-div_upper-part">
                    <div>
                        <button @click="giveUp">Passer son tour</button>
                    </div>
                    <div>
                        <input type="text" v-model="guess" @keyup.enter="guessingAttempt"/>
                    </div>
                    <div>
                        <button @click="guessingAttempt">Valider</button>
                    </div>
                </div>
                <div class="nbrRounds">
                    TOUR: {{ nbrRounds }}
                </div>
                <div class="cluesAndAttemts">
                    <div>
                        <h4>Indices</h4>
                        <ul v-if="currentPlayer">
                            <li v-for="clue in clues" :key="clue"> {{ clue }} </li>
                        </ul>
                    </div>
                    <div>
                        <h4>Joueurs tentés</h4>
                        <ul v-if="currentPlayer">
                            <li v-for="attempt in lastAttempts" :key="attempt"> {{ attempt }} </li>
                        </ul>
                    </div>
                </div>
                <CompositionScreen :compositionToDisplay="compositionToDisplay" />
                <select class="listUserForCompoScreenChange" name="" id="" v-model="selectedUserIndexForCompoScreen">
                    <option v-for="(user, index) in users" :value="index" :key="index">{{ user.pseudo }}</option>
                </select>
                <select class="listUserForCompoScreenChange" name="" id="" v-model="selectedCompo">
                    <option v-for="(numCompo, index) in selectedUserForListOfPlayers.listCompoUser" :value="index" :key="index">{{ index }}</option>
                </select>
                <button v-if="!hasGameStarted" @click="startGame">Ajouter joueur</button>
                <button @click="loadGame">LOAD</button>
            </div>
            <UsersScoreSheets :users="users" :currentUser="currentUser"/>
        </div>
    </div>
</template>

<style>

    .whole {
        height: 100vh;
        width: 100vw;
        background-image: url('@/assets/stadium.jpg');
        background-position: center center;
    }

    .host-game {
        display: flex;
        justify-content: space-between;
        height: 100%;
        width: 100%;
    }

    .host-game_orderedTeams {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
        width: 20%;
        height: 100%;
    }

    .host-game_central-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 45%;
    }

    .host-game_central-div_upper-part {
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
    }

    .nbrRounds {
        background-color: lightblue;
        border: red solid 3px;
        font-weight: bold;
        border-radius: 20px;
        text-align: center;
        width: 30%;
    }

    .cluesAndAttemts {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        width: 90%;
    }
    .cluesAndAttemts div {
        width: 40%;
        height: 220px;
        font-size: 1.3em;
        background-color:burlywood;
        border: black solid 3px;
        text-align: center;
        overflow: auto
    }

    button {
        font-weight: bold;
    }

    h4 {
        font-weight: bold;
        text-decoration: underline;
    }

    table {
        border-collapse: collapse;
        margin: auto;
    }

    td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }

</style>
