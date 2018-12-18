<template>
    <div class="player">
        <inPlayer :inTitle="videoTitle" :inVideoSrc="videoSrc" :inVideoBg="videoBg" :inHasNav="hasNav" :inNavList="btnList" @inVideoRequt="videoRequt"></inPlayer>
        <!--<ul class="action-btnlist">
            <li v-for="(btn,index) in btnList" :key="index">{{btn.name}}</li>
        </ul>-->
    </div>
</template>

<script>
import inPlayer from '@/components/in-chimee-player/index'

export default {
  name: 'player',
    data () {
    return {
        videoTitle:'title',
        videoSrc:'',
        videoBg:'',
        hasNav:true,
        btnList:[],
    }
  },
  components:{
      inPlayer,
  },
  created:function() {
        let that=this;
        
        this.videoBg='http://assets.91118.com/img/klxt2017/header/h-Logo1.png';
        if(this.hasNav){  //LV视频
            let isReadArr=[true,false,false]
            this.btnList=[
                {
                    name:'nav1',
                    isRead:isReadArr[0],
                    videoUrl:'https://vjs.zencdn.net/v/oceans.mp4',
                },
                {
                    name:'nav2',
                    isRead:isReadArr[1],
                    videoUrl:'https://chimee.org/vod/1.mp4',
                },
                {
                    name:'nav3',
                    isRead:isReadArr[2],
                    videoUrl:'https://chimee.org/vod/2.mp4',
                },
            ]
            this.videoSrc=this.btnList[0].videoUrl;
        }else{   //导读视频
            this.videoSrc='https://vjs.zencdn.net/v/oceans.mp4';
        }      
  },
  mounted:function() {

       
  },
  methods: {
        /* 点亮nav接口 */
        videoRequt(type){
            console.log(type)
            console.log('点亮nav接口')
        },

  }

}
</script>