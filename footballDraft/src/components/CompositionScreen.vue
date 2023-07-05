<script>
export default {
    props: ["compositionToDisplay"],
}
</script>

<template>
  <div class="teamComposition">
        <div id="strikers">
            <div id="striker1">
                <p>
                    <span class="playerName">{{ compositionToDisplay?.positions["Buteur"][0] ? compositionToDisplay?.positions["Buteur"][0].name : '???' }}</span><br/>
                    <span class="grade">{{ compositionToDisplay?.positions["Buteur"][0] ? compositionToDisplay?.positions["Buteur"][0].grade : '???' }}</span>
                </p>
            </div>
            <div id="striker2">
                <p>
                    <span class="playerName">{{ compositionToDisplay?.positions["Buteur"][1] ? compositionToDisplay?.positions["Buteur"][1].name : '???' }}</span><br/>
                    <span class="grade">{{ compositionToDisplay?.positions["Buteur"][1] ? compositionToDisplay?.positions["Buteur"][1].grade : '???' }}</span>
                </p>
            </div>
        </div>
        <div id="wings">
            <div id="leftwing">
                <p>
                    <span class="playerName">{{ compositionToDisplay?.positions["Ailier Gauche"][0] ? compositionToDisplay?.positions["Ailier Gauche"][0].name : '???' }}</span><br/>
                    <span class="grade">{{ compositionToDisplay?.positions["Ailier Gauche"][0] ? compositionToDisplay?.positions["Ailier Gauche"][0].grade : '???' }}</span>
                </p>
            </div>
            <div id="rightwing">
                <p>
                    <span class="playerName">{{ compositionToDisplay?.positions["Ailier Droit"][0] ? compositionToDisplay?.positions["Ailier Droit"][0].name : '???' }}</span><br/>
                    <span class="grade">{{ compositionToDisplay?.positions["Ailier Droit"][0] ? compositionToDisplay?.positions["Ailier Droit"][0].grade : '???' }}</span>
                </p>
            </div>
        </div>
        <div id="midfielders">
            <div id="midfielder1">
                <p>
                    <span class="playerName">{{ compositionToDisplay?.positions["Milieu de Terrain"][0] ? compositionToDisplay?.positions["Milieu de Terrain"][0].name : '???' }}</span><br/>
                    <span class="grade">{{ compositionToDisplay?.positions["Milieu de Terrain"][0] ? compositionToDisplay?.positions["Milieu de Terrain"][0].grade : '???' }}</span>
                </p>
            </div>
            <div id="midfielder2">
                <p>
                    <span class="playerName">{{ compositionToDisplay?.positions["Milieu de Terrain"][1] ? compositionToDisplay?.positions["Milieu de Terrain"][1].name : '???' }}</span><br/>
                    <span class="grade">{{ compositionToDisplay?.positions["Milieu de Terrain"][1] ? compositionToDisplay?.positions["Milieu de Terrain"][1].grade : '???' }}</span>
                </p>
            </div>
        </div>
        <div id="defenders">
                <div id="leftback">
                    <p>
                        <span class="playerName">{{ compositionToDisplay?.positions["Arrière Gauche"][0] ? compositionToDisplay?.positions["Arrière Gauche"][0].name : '???' }}</span><br/>
                        <span class="grade">{{ compositionToDisplay?.positions["Arrière Gauche"][0] ? compositionToDisplay?.positions["Arrière Gauche"][0].grade : '???' }}</span>
                    </p>
                </div>
                <div id="defender1">
                    <p>
                        <span class="playerName">{{ compositionToDisplay?.positions["Défenseur Central"][0] ? compositionToDisplay?.positions["Défenseur Central"][0].name : '???' }}</span><br/>
                        <span class="grade">{{ compositionToDisplay?.positions["Défenseur Central"][0] ? compositionToDisplay?.positions["Défenseur Central"][0].grade : '???' }}</span>
                    </p>
                </div>
                <div id="defender2">
                    <p>
                        <span class="playerName">{{ compositionToDisplay?.positions["Défenseur Central"][1] ? compositionToDisplay?.positions["Défenseur Central"][1].name : '???' }}</span><br/>
                        <span class="grade">{{ compositionToDisplay?.positions["Défenseur Central"][1] ? compositionToDisplay?.positions["Défenseur Central"][1].grade : '???' }}</span>
                    </p>
                </div>
                <div id="rightback">
                    <p>
                        <span class="playerName">{{ compositionToDisplay?.positions["Arrière Droit"][0] ? compositionToDisplay.positions["Arrière Droit"][0].name : '???' }}</span><br/>
                        <span class="grade">{{ compositionToDisplay?.positions["Arrière Droit"][0] ? compositionToDisplay.positions["Arrière Droit"][0].grade : '???' }}</span>
                    </p>
                </div>
        </div>
        <div id="goalkeeper">
            <div>
                <p>
                    <span class="playerName">{{ compositionToDisplay?.positions["Gardien"][0] ? compositionToDisplay.positions["Gardien"][0].name : '???' }}</span><br/>
                    <span class="grade">{{ compositionToDisplay?.positions["Gardien"][0] ? compositionToDisplay.positions["Gardien"][0].grade : '???' }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style>
    .teamComposition {
        margin-top: 15px;
        width: 80%;
        height: 60%;
        background-image: url('@/assets/footballfield.jpg');
        background-position: center center;
        background-size: 100% auto;
        border: solid black 2px;
        text-align: center;
        font-size: 1.1em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-weight: bold;
    }

    #strikers {
        display: flex;
        width: 60%;
        justify-content: space-around;
    }

    #wings {
        display: flex;
        width: 70%;
        justify-content: space-between;
    }

    #midfielders {
        display: flex;
        width: 50%;
        justify-content: space-around;
    }

    #defenders {
        display: flex;
        width: 80%;
        justify-content: space-between;
    }

    .grade {
        color: blue;
    }
</style>