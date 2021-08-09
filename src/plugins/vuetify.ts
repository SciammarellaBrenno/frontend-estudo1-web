import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/src/locale/pt';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { pt },
      current: 'pt',
    },
});
