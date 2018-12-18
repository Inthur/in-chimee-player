# in-chimee-player

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 使用
``` bash
#将组件in-chimee-player拷贝到自己的项目中，引入
import inPlayer from '@/components/in-chimee-player/index'
```
``` bash
#依赖于chimee-mobile-player
npm install chimee-mobile-player --save
#将chimee-plugin-mobile-controlbar/lib中的index.browser.js替换为in-chimee-player/static/js中的index.browser.js
```

``` bash
<inPlayer 
    :inTitle="videoTitle"       #视频标题,String
    :inVideoSrc="videoSrc"      #视频地址,String
    :inVideoBg="videoBg"        #视频预览图,String(可选)
    :inHasNav="hasNav"          #是否需要视频切换菜单,Boolean
    :inNavList="btnList"        #视频切换菜单数组,Array(inHasNav为true时必需)
    @inVideoRequt="videoRequt"  #当前视频第一次观看结束时回调，记录该视频的观看状态(inHasNav为true时必需)
></inPlayer>
```
``` bash
    data () {
        return {
            videoTitle:'',
            videoSrc:'',
            videoBg:'',
            hasNav:true,
            btnList:[],
        }
    },
    mounted:function() {
        if(this.hasNav){ 
            this.btnList=[
                {
                    name:'nav1',     #菜单名,String
                    isRead:true,     #该视频观看状态,Boolean（后台记录，是否已经观看完成）
                    videoUrl:'',     #视频地址,String               
                },
                {
                    name:'nav2',
                    isRead:false,
                    videoUrl:'',
                },
                ...
            ]
            this.videoSrc=this.btnList[0].videoUrl;
        }
       
    },
    methods: {
        videoRequt(index){
            console.log(index)
        },
    }
```
