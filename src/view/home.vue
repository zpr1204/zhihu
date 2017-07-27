<template>
    <div>
        <t-swiper swiperId="swipe" :autoplay=3000 effect="slide">
            <div class="swiper-slide" slot="swiper-con" v-for="(top,index) in tops" :key="index">
                <img :src="top.image">
                <h3>{{top.title}}</h3>
            </div>
        </t-swiper>
        <div class="list" v-for="(x,index) in list" :key="index">
            <p class="list-time">{{x.date.slice(0,4)+'/'+x.date.slice(4,6)+'/'+x.date.slice(6,8)}}</p>
            <div class="list-con" v-for="(y,ind) in x.stories" :key="ind" @click="go(y.id)">
                <img :src="y.images[0]" />
                <p>{{y.title}}</p>
            </div>
        </div>
    </div>
</template>
<script>

import api from '../api/index'
import { mapState } from 'vuex'
export default {
    mounted() {
        this.getList(1);
    },
    data() {
        return {
            list: [],
            count: 1,
            tops: []
        }
    },
    methods: {
        getList(type) {
            let vue = this;
            if (type) {
                api.getNews().then(function (data) {
                    vue.tops = data.data.top_stories;
                    vue.list.push(data.data);
                });
            } else {
                api.getNewsByDate(vue.GetDate(vue.count)).then((data) => {
                    vue.list.push(data.data);
                });
            }
        },
        GetDate(Count) {
            var dd = new Date();
            dd.setDate(dd.getDate() + Count); //获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1; //获取当前月份的日期
            m = m > 10 ? m : "0" + m
            var d = dd.getDate();
            d = d >= 10 ? d : "0" + d;
            return y + "" + m + "" + d;
        },
        go(id){
            this.$router.push({
                path: "article",
                query: {
                    id: id
                }
            });
        }
    }
} 
</script>
<style lang="scss">
$yellow: #FFD300;
$blue: #5B7492;
$gray: #acb9c8;
.app-view {
    .swiper-container {
        width: 100%;
    }
    .swiper-slide {
        height: 8rem;
        overflow: hidden;
        position: relative;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 1rem;
        width: 95%;
        text-align: right;
    }
    .list:nth-child(2) {
        margin-bottom: 0;
        padding-top: 0;
        .list-time {
            top: -.8rem;
        }
    }
}
.swiper-slide {
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
        top: 50%;
        position: relative;
        transform: translate(0, -50%);
    }
    h3 {
        width: 70%;
        color: #fff;
        margin: 0;
        font-size: 0.5rem;
        line-height: 1rem;
        right: 5%;
        bottom: 2.6rem;
        text-align: right;
        position: absolute;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
        &:before {
            content: "";
            width: 3rem;
            bottom: -.6rem;
            right: 0;
            display: block;
            position: absolute;
            border: 2px solid $yellow;
        }
    }
}

.list {
    width: 90%;
    z-index: 1;
    position: relative;
    padding-top: 0.8rem;
    margin: .8rem auto 0;
    &-time {
        top: 0;
        margin: 0;
        color: #fff;
        padding: 0 1rem;
        font-size: 0.4rem;
        line-height: 0.8rem;
        letter-spacing: 0.1rem;
        border-radius: 0.4rem;
        text-align: center;
        background-color: $yellow;
        transform: translate(0, -50%);
        position: absolute;
        box-shadow: 0 3px 10px 0 rgba(91, 115, 146, 0.15);
    }
    &-con {
        cursor: pointer;
        display: flex;
        padding: 0.3rem;
        margin-bottom: 0.4rem;
        border-radius: 0.15rem;
        align-items: center;
        background-color: #fff;
        box-shadow: 0 3px 10px 0 rgba(91, 115, 146, 0.15);
        img {
            width: 2rem;
            margin-right: 0.4rem;
        }
        p {
            color: $blue;
            font-size: 0.4rem;
            text-align: justify;
            margin: 0;
        }
    }
}

.loading {
    width: 25%;
    height: 0.4rem;
    margin: 25% auto 0;
    position: relative;
    span {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        position: absolute;
        background: $blue;
        transform: translate(-50%, 0);
    }
    .left {
        background: $yellow;
        animation: lMove 2.5s ease infinite;
    }
    .middle {
        left: 50%;
        animation: mMove 2.5s ease infinite;
    }
    .right {
        left: 100%;
        background: $gray;
        animation: rMove 2.5s ease infinite;
    }
}

@keyframes lMove {
    0% {
        left: 0;
    }
    25% {
        left: 50%;
        background: $yellow;
    }
    50% {
        left: 100%;
        background: $blue;
    }
    75% {
        left: 50%;
        background: $gray;
    }
    100% {
        left: 0;
    }
}

@keyframes mMove {
    0% {}
    25% {
        background: $blue;
    }
    50% {
        background: $yellow;
    }
    75% {
        background: $blue;
    }
    100% {}
}

@keyframes rMove {
    0% {
        left: 100%;
    }
    25% {
        left: 50%;
    }
    50% {
        left: 0;
        background: $gray;
    }
    75% {
        left: 50%;
        background: $yellow;
    }
    100% {
        left: 100%;
    }
}
</style>
