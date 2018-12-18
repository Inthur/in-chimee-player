<template>
    <div class="in-chimee-player" ref="in-player">
        <div class="player-box" ref="player-box">
                <div id="wrapper" ref="in-wrapper"></div>
                <!--顶部-->
                <div class="in-top-body">
                    <transition name='inc-top'>
                        <div class="in-top" v-if="toolsShow">
                            <div class="in-top-box clearfix">
                                <!--返回按钮-->
                                <div class="in-return left" @click="inReturnClick()"></div>
                                <div class="in-title left">{{inTitle}}</div>
                            </div>
                            <ul class="in-nav-list" v-show="inHasNav">
                                <li v-for="(list,index) in inNavList" :key="index" :class="[inNavIndex == index ? 'selected':'', list.isRead ? 'readed':'']" @click="inNavClick(list,index)">{{list.name}}</li>
                            </ul>
                        </div>
                    </transition>  
                </div>
                <!--完成观看-->
                <div class="in-finish mask" v-show="inFinishShow">
                    <img src="./static/img/finish.png" alt="">
                </div>
                <!-- 播放提示 -->
                <!--<div class="start-tip" v-show="startTipShow">
                    请点击播放按钮观看视频
                </div>-->
                <!-- 提示弹框 -->
                <div class="alert-mask-body" v-if="alertMaskShow">
                    <div class="alert-mask">{{alertMaskText}}</div>
                </div>
        </div>
    </div>
</template>

<script>
import { touchFalse,alertMask } from './static/js/base.js'
import './static/css/in-chimee-player.min.css'
import './static/js/msize.js'

import ChimeeMobilePlayer from 'chimee-mobile-player'
import chimeePluginMobileControlbar from 'chimee-plugin-mobile-controlbar'
import './static/css/chimee-mobile-player.browser.css'


export default {
  name: 'inCPlayer',
  props:{
        inTitle:{
            type:String,
        },
        inVideoSrc:{
            type:String,
        },
        inVideoBg:{
            type:String,
        },
        inHasNav:{
            type:Boolean,
        },
        inNavList:{
            type:Array,
        },
        // inVideoRequt:{
        //     type:Function,
        // },
    },
  data () {
    return {
        inVideoUrl:'',
        toolsShow:true,
        inNavIndex:0,
        inFinishShow:false,
        startTipShow:true,
        // 提示弹框
        alertMaskShow:false,
        alertMaskText:'',
        //视频比率
        ratio:1140/750,
        inCPlayer:{},
    }
  },
  created:function() {
        touchFalse(); 
        if(this.inVideoSrc){
           this.inVideoUrl=this.inVideoSrc
           console.log(this.inVideoUrl)
        }else{
            alertMask(that,'没有视频可播放')
        }
  },
  mounted:function() {
        let that=this;
        
        ChimeeMobilePlayer.install(chimeePluginMobileControlbar);
        this.inCPlayer = new ChimeeMobilePlayer({
            wrapper: '#wrapper',  // video dom容器
            src: that.inVideoUrl,
            poster:that.inVideoBg,
            playsInline: true,
            webkitPlaysinline: true,
            preload: 'auto',
            x5VideoPlayerFullscreen: true,
            x5VideoOrientation: 'landscape|portrait',
            xWebkitAirplay: true,
            muted: false,
            // 使用插件
            plugin: [{
                name:chimeePluginMobileControlbar.name, // 或者 'chimeeMobiControlbar'
                majorColor: '#fff',
                children: {
                    play:{
                        bitmap: true,
                    },
                    currentTime: {},
                    progressBar: {},
                    totalTime: {},            
                    screen: {},
                },
            }],
            controls: true,
            autoplay: false,

            // removeInnerPlugins: ['chimeeMobiControlbar', 'chimeeState'] // 需要移除的插件
        });
        this.inCPlayer.$on('barShow', function () {
            that.toolsShow=true;
        })
        this.inCPlayer.$on('barHide', function () {
            that.toolsShow=false;
        })
        this.inCPlayer.$on('ended', function () {
            console.log('结束')
           that.inVideoEnd();
        })
        this.sizeSetUp();
       
  },
  methods: {
    /*  */
    sizeSetUp(){
        var bodyW = document.documentElement.clientWidth || document.body.clientWidth;
        var bodyH = document.documentElement.clientHeight || document.body.clientHeight;
        this.$refs['player-box'].style.width=bodyH+'px'
        this.$refs['player-box'].style.height=bodyW+'px'
        this.$refs['player-box'].style.marginTop=(bodyH-bodyW)/2+'px'
        this.$refs['player-box'].style.marginLeft=-(bodyH-bodyW)/2+'px' 
        
        console.log(bodyW,bodyH)
        
        let v=this.$refs['in-wrapper'].getElementsByTagName("video")[0]
        v.style.height = bodyW+'px'  
     
    },
    /* 视频更换 */
    inNavClick(list,index){
        // this.startTipShow=false;
        // this.inLoadingShow=true;
        this.$refs['in-wrapper'].getElementsByTagName("video")[0].pause()
        this.inNavIndex=index;
        this.inVideoUrl=list.videoUrl;
        this.inCPlayer.src=this.inVideoUrl;
        setTimeout(()=>{
            this.$refs['in-wrapper'].getElementsByTagName("video")[0].load();
            this.$refs['in-wrapper'].getElementsByTagName("video")[0].play();
        },800)
        
    },
    /* 播放结束 */
    inVideoEnd(){
        if(this.inHasNav){
            if(!this.inNavList[this.inNavIndex].isRead){
                // this.inVideoRequt(this.inNavIndex+1);
                this.$emit('inVideoRequt', this.inNavIndex+1)
                this.inFinishShow=true;
                setTimeout(()=>{
                    this.inFinishShow=false;
                    this.inNavList[this.inNavIndex].isRead=true;
                    
                },2000)
            }
        }
    },
    /* 返回 */
    inReturnClick(){
        // this.$router.go(-1);
        this.$refs['in-wrapper'].getElementsByTagName("video")[0].pause()
        window.history.back();
    },

  }

}
</script>

<style>
#wrapper{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
#wrapper chimee-control.play chimee-control-state-play{
    width: 4em !important;
    height: 4em !important;
    border-radius: 50% !important; 
    background:#ffd300  url('./static/img/in-play.png') no-repeat 0 center !important; 
    background-size: 100% 100% !important; 
}
#wrapper chimee-control.pause chimee-control-state-pause{
    width: 4em !important;
    height: 4em !important;
    border-radius: 50% !important; 
    background:#ffd300  url('./static/img/in-pause.png') no-repeat 0 center !important; 
    background-size: 100% 100% !important; 
}
#wrapper chimee-total-time.chimee-flex-component{
    padding-right: 1em !important; 
}
</style>
