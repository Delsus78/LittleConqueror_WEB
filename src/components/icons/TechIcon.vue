<template>
  <font-awesome-icon :icon="icon" :size="size"/>
</template>
<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed} from "vue";

const { techId, size } = defineProps({
  techId: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '2x',
    validator: (value) => [
      'xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(value),
  }
});

const icon = computed(() => {
  switch (techId.toLowerCase())
  {
    case 'root':
      return 'play';
    // Miltaire
    case 'armement_I':
      return 'bomb';
    case 'armement_II':
      return 'fighter-jet';
    case 'armement_III':
      return 'fighter-jet';
    case 'poudre_a_canon':
      return 'bomb';
    case 'armement_iv':
      return 'fighter-jet';
    case 'arme_atomique':
      return 'radiation-alt';

    // GeoPolitique
    case 'classement':
      return 'rectangle-list';
    case 'politique':
      return 'vote-yea';
    case 'alliance':
      return 'handshake';
    case 'guerre':
      return 'skull-crossbones';
    case 'espionnage':
      return 'eye';
    case 'echanges':
      return 'exchange-alt';
    case 'traite_de_paix':
      return 'handshake-alt';

    // Theorie
    case 'gribouillis':
      return 'pencil';
    case 'roue':
      return 'cog';
    case 'ecriture':
      return 'pen';
    case 'apprentissage':
      return 'book';
    case 'ecoles':
      return 'school';
    case 'mathematiques':
      return 'calculator';
    case 'monnaie':
      return 'coins';
    case 'physiques':
      return 'flask';
    case 'explosion':
      return 'bomb';
    case 'traitement_des_fluides':
      return 'tint';
    case 'forage':
      return 'tools';
    case 'projet_manhattan':
      return 'radiation-alt';
    case 'financement_mondiale_future_i':
      return 'hand-holding-usd';
    case 'financement_mondiale_future_ii':
      return 'hand-holding-usd';
    case 'financement_mondiale_future_iii':
      return 'hand-holding-usd';
    case 'financement_mondiale_future_iv':
      return 'hand-holding-usd';
    case 'skills_sellers':
      return 'o';

    // Ingenierie
    case 'pierre':
      return 'mountain';
    case 'rendement_minier_i':
      return 'industry';
    case 'rendement_agricole_i':
      return 'tractor';
    case 'fer':
      return 'weight-hanging';
    case 'rendement_minier_ii':
      return 'industry';
    case 'rendement_agricole_ii':
      return 'tractor';
    case 'routes':
      return 'road';
    case 'chemins_de_fer':
      return 'train';
    case 'or':
      return 'coins';
    case 'electricite':
      return 'bolt';
    case 'diamant':
      return 'gem';
    case 'rendement_minier_iii':
      return 'industry';
    case 'rendement_agricole_iii':
      return 'tractor';
    case 'petrole':
      return 'oil-well';
    case 'carburant':
      return 'gas-pump';
    case 'fission_nucleaire':
      return 'radiation-alt';
    case 'fusion_nucleaire':
      return 'radiation-alt';
    case 'tesseract_energetique':
      return 'radiation-alt';
    case 'rendement_scientifique_i':
      return 'flask';
    case 'rendement_scientifique_ii':
      return 'flask';
    case 'rendement_scientifique_iii':
      return 'flask';
    case 'rendement_scientifique_iv':
      return 'flask';
    case 'technologies_futures':
      return 'user-astronaut';
    case 'mode_creatif':
      return 'infinity';


    default:
      return 'question';
  }
});

</script>
<style scoped>

</style>