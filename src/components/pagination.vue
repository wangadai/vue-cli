<template>
	<div class="page-bar text-right mt20">
      <ul>
      <li v-if="page.cur!=1"><a v-on:click="btnClick(page.cur-1)">上一页</a></li>
      <li v-for="index in indexs"  v-bind:class="{ active: page.cur == index}">
          <a v-on:click="btnClick(index)">{{ index }}</a>
          </li>
          <li v-if="page.cur!=page.pages && page.pages>0"><a v-on:click="btnClick(page.cur+1)">下一页</a></li>
          <li v-if="page.pages>0"><a>共<i>{{page.pages}}</i>页<i>{{page.all}}</i>条</a></li>
      </ul>
  </div>
</template>
<script>
export default {
		name : 'pagination',
    props: ['page'],
    computed: {
        indexs: function(){
            this.page.pages = Math.ceil(this.page.all/(this.page.pageSize || 20));
            var pages = this.page.pages,
              left = 1,
              right = pages,
              ar = [];
            if(pages>= 11){
              if(this.page.cur > 5 && this.page.cur < pages-4){
                      left = this.page.cur - 5
                      right = this.page.cur + 4
              }else{
                  if(this.page.cur<=5){
                      left = 1
                      right = 10
                  }else{
                      right = pages
                      left = pages -9
                  }
              }
           }
          while (left <= right){
              ar.push(left)
              left ++
          }   
          return ar
       }
    },
    methods: {
        btnClick: function(data){
            if(data != this.page.cur){
                this.page.cur = data;
                this.$emit('btn-click',data);
                // this.$parent.paginate(data)
            }
        }
    }
}
</script>