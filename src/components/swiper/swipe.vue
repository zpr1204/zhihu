<template>
    <div class="swiper-container" :class="swiperId">
        <div class="swiper-wrapper">
            <slot name="swiper-con"></slot>
        </div>
        <div :class="{'swiper-pagination':pagination}"></div>
    </div>
</template>

<script>
import swiper from './swiper.js'
export default {
    name: 't-swiper',
    props: {
        swiperId: {
            type: String,
            default: ''
        },
        loop: {
            type: Boolean,
            default: true
        },
        effect: {
            type: String,
            default: 'slide'
        },
        pagination: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Number,
            default: 5000
        },
        paginationType: {
            type: String,
            default: 'bullets'
        },
        direction: {
            type: String,
            default: 'horizontal'
        }
    },
    mounted() {
        var that = this;
        this.dom = new Swiper('.' + this.swiperId, {
            //循环
            loop: that.loop,
            //分页器
            pagination: '.swiper-pagination',
            //分页类型
            paginationType: that.paginationType, //fraction,progress,bullets
            //自动播放
            // autoplay: that.autoplay,
            autoplay: that.autoplay,
            //方向
            direction: that.direction,
            //特效
            effect: that.effect, //slide,fade,coverflow,cube
            autoplayDisableOnInteraction: false,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true //修改swiper的父元素时，自动初始化swiper
        })
    }
}
</script>
<style lang="scss">
@import './swiper.min.css';
.swiper-pagination-bullet-active {
	background: #fff;
}
</style>

