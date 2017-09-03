<template>
    <div>
		<div class="theme">
			<img :src="list.image">
			<div></div>
			<h3>
			<p>{{list.description}}</p>
			<p>{{list.name}}</p>
		</h3>
		</div>
		<div class="list">
			<div class="list-con" link @click="go(y.id)" v-for="y in list.stories">
				<img v-if="y.images" :src="y.images[0]" />
				<p>{{y.title}}</p>
			</div>
		</div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '../api/index'
export default {
    name: 'theme',
    computed: {
		...mapState({
			flag: state => state.num,
			theme: state => state.theme
		})
    },
    mounted(){
        this.$store.commit('changeNum',this.$route.query.id);
    },
    data() {
        return {
            list: ''
        }
    },
    watch:{
        flag: function(a,b){
            console.log('a:'+a+',b:'+b);
            this.getList();
        }
    },
    methods: {
		go(id) {
			this.$router.push({
				path: "article",
				query: {
					id: id
				}
			});
		},
		getList() {
			let vue = this,
				id = this.$route.query.id;
			this.list = '';
			let dom = document.querySelector('.app-view');
			dom.scrollTop = 0;
			if(this.theme.hasOwnProperty(id)){
				this.list = this.theme[id];
			}else{
				api.getTopicsById(id).then(function(data) {
					vue.theme[id] = data.data;
					vue.list = data.data;
				});
			}
		}
	}
} 
</script>
<style lang="scss" scoped>$yellow: #FFD300;
$blue: #5B7492;
$gray: #acb9c8;
.theme {
    height: 8rem;
    position: relative;
	overflow: hidden;
    div {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        position: absolute;
        background-color: $blue;
    }
    img {
        width: auto;
        height: 8rem;
        left: 50%;
        transform: translate(-50%,0);
        position: relative;
    }
	h3,p{
		margin: 0;
	}
    h3 {
        width: 70%;
        color: #fff;
        font-size: 0.5rem;
        line-height: 1rem;
        right: 5%;
        bottom: 1.5rem;
        text-align: right;
        position: absolute;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
        p:first-child {
            position: relative;
            margin-bottom: 0.5rem;
            &:before {
                content: "";
                width: 3rem;
                bottom: -.3rem;
                right: 0;
                display: block;
                position: absolute;
                border: 2px solid $yellow;
            }
        }

    }
}
.list {
    margin-top: -.5rem;
}
</style>