<template>
    <div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '../api/index'
export default {
    name: 'theme',
    computed: {
		...mapState({
			flag: state => state.num
		})
    },
    mounted(){
        console.log(this.$route.query.id);
        this.$store.commit('changeNum',this.$route.query.id);
    },
    data() {
        return {
            tops: []
        }
    }
} 
</script>