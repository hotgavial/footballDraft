<script>
import CompositionScreen from './CompositionScreen.vue';

export default {
    components: {CompositionScreen},
  data() {
    return {
      compo: null,
      player: null,
      showCompo: false,
      message: ''
    };
  },
  mounted() {    
    this.compo = this.oldCompo;
    this.player = this.oldPlayer
    if(this.newCompo === null) {
      this.message = 'ET NON ! LE JOUEUR A TROUVER ETAIT : '
      setTimeout(() => {
          this.$emit('success-animation-over')
        }, 13000);
    } else {
      this.showCompo = true
      this.message = 'BRAVO !'
      setTimeout(() => {
        this.compo = this.newCompo
        this.player = this.newPlayer
      }, 3000); 
      setTimeout(() => {
          this.$emit('success-animation-over')
        }, 6000);
    }
    
  },
  props: ["oldPlayer", "newPlayer", "oldCompo", "newCompo"]
}
</script>
<template>
    <div class="success">
        <div class="success__window">
            <h4>{{ message }}</h4>
            <div class="success__infos">
                <div>{{newPlayer?.name}}</div>
                <div>{{newPlayer?.grade}}</div>
            </div>
            <CompositionScreen v-if="showCompo" :compositionToDisplay="compo" :player="player"/>
        </div>
    </div>
</template>
<style>
    .success {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }

    .success__window {
        background: rgba(245, 245, 220, 0.9);
        border: solid black 3px;
        width: 60%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .success__infos {
        font-size: 20px;
        font-weight: bold;
    }

    .h4 {
      text-decoration: none;
      font-weight: bold;
      font-size: 20px;
    }

</style>