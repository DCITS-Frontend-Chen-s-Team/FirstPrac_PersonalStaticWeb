<template>
  <baidu-map class="map"
             :center="{lng: 121.506377, lat: 31.245105}"
             :zoom="14"
             @mousemove="syncPolyline"
             @click="paintPolyline"
             @rightclick="newPolyline">
    <bm-control>
      <button @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
    </bm-control>
    <bm-polyline :path="path" v-for="path of polyline.paths"></bm-polyline>
  </baidu-map>
</template>

<script>
export default {
  name: 'MapPainting',
  data () {
    return {
      polyline: {
        editing: false,
        paths: []
      }
    }
  },
  methods: {
    toggle (name) {
      this[name].editing = !this[name].editing
    },
    syncPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
    },
    newPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      if (!paths.length) {
        paths.push([])
      }
      const path = paths[paths.length - 1]
      path.pop()
      if (path.length) {
        paths.push([])
      }
    },
    paintPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    }
  }
}
</script>

<style>
  .map {
    width: 100%;
    height: 300px;
  }
</style>
