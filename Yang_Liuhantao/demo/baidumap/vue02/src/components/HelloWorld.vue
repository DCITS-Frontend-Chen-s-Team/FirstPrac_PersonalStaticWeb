<template>
  <div class="baidumap">
    <baidu-map class="map" center="北京" scroll-wheel-zoom="true">
      <bm-view style="width: 100%; height:100%;"></bm-view>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-traffic :predictDate="{weekday: 7, hour: 12}">
      </bm-traffic>
      <bm-transit start="百度大厦" end="北京邮电大学西门" :auto-viewport="true" location="北京"></bm-transit>
      <bm-boundary name="北京市朝阳区" :strokeWeight="2" strokeColor="yellow"></bm-boundary>
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  }
}
</script>

<style>
.map {
  width: 80%;
  height: 600px;
}

.baidumap {
  display: flex;
  justify-content: center;
}
</style>
