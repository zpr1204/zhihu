<template>
    <div id="app">
        <header class="header">
            <i class="iconfont icon-ic_menu" @click="toggle(true)"></i>
        </header>
        <aside class="aside" :class="{open: open,lock: lock}" @click="toggle()">
            <ul>
                <li :class="{choose:num==1}" @click="change(1)">
                    <span>首页</span>
                    <i class="iconfont" :class="{'iconcolor icon-ic_star_black':num==1,'icon-ic_star':num!=1}"></i>
                </li>
                <li v-for="(item,index) in list" :key="index" :class="{choose:num==item.id}" @click="change(item.id)">
                    <span>{{item.name}}</span>
                    <i class="iconfont" :class="{'iconcolor icon-ic_star_black':num==item.id,'icon-ic_star':num!=item.id}"></i>
                </li>
            </ul>
            <div class="cover"></div>
        </aside>
        <transition :name="transitionName">
            <keep-alive>
                <router-view class="app-view" :class="{'app-view-hidden':lock}"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import api from './api/index'
import { mapState } from 'vuex'
export default {
    name: 'app',
    data: function () {
        return {
            list: [],
            open: false,
            lock: false,
            transitionName: 'slide-left'
        }
    },
    mounted: function () {
        let vue = this;
        api.getTopics().then(function (data) {
            vue.list = data.data.others;
        })
    },
    computed: {
        ...mapState({
            num: state => state.num
        })
    },
    methods: {
        toggle() {
            if (!this.open) {
                this.open = true;
                this.lock = true;
            } else {
                this.open = false;
                let vue = this;
                setTimeout(function () {
                    vue.lock = false;
                }, 300);
            }
        },
        change(id) {
            let path = (id == 1) ? 'home' : 'theme';
            console.log(id);
            this.$router.push({
                path: path,
                query: id || ''
            });
            this.$store.commit('changeNum', id);
        }
    }
}
</script>

<style lang="scss">
.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50vw, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0.1;
    -webkit-transform: translate(-50vw, 0);
}

.header {
    width: 100%;
    height: 1.5rem;
    z-index: 9;
    padding-left: 5%;
    position: fixed;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.51) 95%);
    .iconfont {
        color: #fff;
        font-size: 0.8rem;
        top: 20%;
        position: relative;
        cursor: pointer;
    }
}

.aside {
    z-index: 11;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: fixed;
    visibility: hidden;
    &::-webkit-scrollbar {
        display: none!important;
        width: 0!important;
        height: 0!important;
        -webkit-appearance: none;
        opacity: 0!important;
    }
    ul {
        margin: 0;
        float: left;
        width: 60%;
        height: 100%;
        padding: 1.3rem 0.5rem 0.5rem;
        overflow: auto;
        background: rgba(91, 116, 146, 0.75);
        transform: translate(-100%, 0);
        transition: transform 0.3s ease;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display: none!important;
            width: 0!important;
            height: 0!important;
            -webkit-appearance: none;
            opacity: 0!important;
        }
    }
    li {
        cursor: pointer;
        font-size: 0.43rem;
        list-style: none;
        color: #fff;
        margin-top: 20px;
        .iconfont {
            float: right;
            font-size: 0.6rem;
        }
        &.choose {
            color: #FFD300;
        }
    }
    .cover {
        width: 100%;
        height: 100%;
        opacity: 0;
        display: none;
        background: rgba(172, 185, 201, 0.40);
        transition: opacity 0.3s ease;
    }
    &.open {
        ul {
            transform: translate(0);
        }
        .cover {
            opacity: 1;
        }
    }
    &.lock {
        visibility: visible;
        .cover {
            display: block;
        }
    }
}

.app-view {
    z-index: 1;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    position: absolute;
    transition: transform 0.3s ease;
    -webkit-overflow-scrolling: touch;
    &-hidden {
        overflow: hidden;
    }
}

@media screen and (min-width: 640px) {
    .app-view {
        width: 640px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .aside ul {
        width: 350px;
    }
}
</style>

