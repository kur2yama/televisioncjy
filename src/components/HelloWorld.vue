<template>
  <div class="hello">
    <div class="aliplayer-box">
      <!-- <img src="http://img.cjyun.org/a/10140/201811/29752bf7ffbea956d19fff2415738051.png" alt="" class="audio-poster" v-if="playtoggle=='audio'"> -->
      <vue-aliplayer-v2
        :source="url"
        ref="VueAliplayerV2"
        @play="play"
        @pause="pause"
        :options="options"
      />
    </div>
    <div id="video_toggle" style="display: none">
      <span :class="{'playtoggle':playtoggle=='video'}" @click="playtoggle='video'">电视</span>
      <span :class="{'playtoggle':playtoggle=='audio'}" @click="playtoggle='audio'">广播</span>
    </div>
    <ul v-if="playtoggle=='video'">
      <li v-for="(item, i) in videoList" :key="i" :class="{'playing':playid==item.id}"
          @click="switchSource(item)">{{ item.name }}
      </li>
    </ul>
    <ul v-if="playtoggle=='audio'">
      <li v-for="(item, i) in audioList" :key="i" :class="{'playing':playid==item.id}"
          @click="switchSource(item)">{{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import {videoSource, audioSource} from "../assets/source";
import {getAuth} from '../api/anti_leech';

export default {
  name: "HelloWorld",
  data() {
    const MC = window.mc
    return {
      jssdk: MC,
      options: {
        height: "100%",
        width: "100%",
        isLive: true, //切换为直播流的时候必填
        autoplay: true,
        format: "m3u8", //切换为直播流的时候必填
      },
      url: "",
      videoList: videoSource,
      audioList: audioSource,
      currentList: videoSource,
      playid: 1,
      playtoggle: 'video'
    };
  },
  mounted() {
    if (this.getQueryVariable("isaudio")) {
      this.playtoggle = "audio"
      this.playid = 9
      this.getFirstAuth('http://live21-cjy.hbtv.com.cn/hbfm/hbfm-hbzs774.m3u8')
    } else {
      this.getFirstAuth('http://live21-cjy.hbtv.com.cn/hbtv/hbtv-hbws.m3u8')
    }


  },
  methods: {
    getFirstAuth(url) {
      getAuth({origin_stream: url}).then(res => {
        if (res.state) {
          this.url = res.data[0];
        }
      }).catch(error => {
        console.log(error)
      })
    },
    play() {
      // var video = $('video')
      // var audio = $('audio')

      // // 暂停函数
      // function pauseAll() {
      //   var self = this;
      //   [].forEach.call(video, function(i) {
      //     // 将video中其他的video全部暂停
      //     i !== self && i.pause()
      //   });
      //   [].forEach.call(audio, function(i) {
      //     // 将audios中其他的audio全部暂停
      //     i !== self && i.pause()
      //   })
      // }

      // // 给play事件绑定暂停函数
      // [].forEach.call(video, function(i) {
      //   i.addEventListener('play', pauseAll.bind(i))
      // });
      // [].forEach.call(audio, function(i) {
      //   i.addEventListener('play', pauseAll.bind(i))
      // })
      this.$refs.VueAliplayerV2.play();
    },
    pause() {
      console.log("暂停");
      this.$refs.VueAliplayerV2.pause();
    },
    switchSource(item) {
      var _this = this;
      this.playid = item.id;
      if (item.isAuth) {
        getAuth({origin_stream: item.url}).then(res => {
          if (res.state) {
            _this.url = res.data[0];
            _this.play();
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.url = item.url;
        this.play();
      }
    },
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.hello {
  width: 100%;
  overflow-x: hidden;
}

.aliplayer-box {
  width: 100%;
  height: 60vw;
  position: relative;
}

.aliplayer-box {
  .audio-poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }

}

.prism-big-play-btn {
  left: 50% !important;
  transform: translateX(-50%);
}

#video_toggle {
  font-size: 14px;
  width: 70%;
  margin: 10px auto;
  border-radius: 15px;
  background-color: #404040;
}

#video_toggle {
  span {
    border-radius: 15px;
    display: inline-block;
    width: 50%;
    line-height: 25px;
    height: 25px;
    text-align: center;
  }
}

#video_toggle span.playtoggle {
  background-color: #37b1e5;
  color: #2b2b2b;
}

ul {
  border-top: 1px solid #37b1e5;
  overflow: hidden;
  background-color: #404040;
}

ul li {
  border-bottom: 1px solid #666666;
  line-height: 60px;
  text-align: center;
  float: left;
  width: 50%;
  background: url("http://hudong.hbtv.com.cn/uploads/cjyuncalendar/bg_corner_gray.png") no-repeat 100% 100%;
}

ul li a {
  color: #666666;
  text-decoration: none;
}

ul li.playing {
  color: #37b1e5;
  border-color: #37b1e5;
  background-image: url("http://hudong.hbtv.com.cn/uploads/cjyuncalendar/bg_corner_blue.png");
  box-shadow: 0px 0px 10px 5px #37b1e5;
}

ul li span {
  display: block;
  line-height: 30px;
}
</style>
