<template lang="html">
  <div style="width:100%; height:400px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name:'echarts',
  data(){
    return { instance: null }
  },
  props: {
    options:Object,
    loading:Boolean
  },
  mounted: function () {
    var _this = this, $el = this.$el;
    this.instance = echarts.init($el);

    // show loading animation
    this.loading && this.instance.showLoading();

    // auto resize
    var resizeEvent = new Event('resize');
    _this.resizeEventHandler = function () {
        _this.instance.resize();
    };

    $el.addEventListener('resize', _this.resizeEventHandler, false);
    window.onresize = function () {
        $el.dispatchEvent(resizeEvent);
    };

    this.instance.setOption(this.options)
  },
  watch: {
    loading: function (value) {
      this.instance.showLoading()
    },
    options: function (options) {
      this.instance.setOption(options)
    }
  },
  destroyed: function () {
    this.instance.dispose();
    this.$el.removeEventListener('resize', this.resizeEventHandler, false);
  }
}
</script>
