<template>
	<div class="linkSelectContainer">
		<input type="hidden" :value="linkUrl" class="linkUrl">
		<select2 :options="linkTypeList" :search="0" v-model="linkType" class="form-control input-sm w200" id="seelectOpt"></select2>
		<div class="mt10">
			<input v-if="linkType==99" class="form-control input-sm w200" type="text" placeholder="请以http//或https://开头" v-model="linkUrl">
			<select2 v-if="isPromotion && promotionList.length>0" :options="promotionList" :search="0" v-on:sChange="promotionChange" class="form-control input-sm w200"></select2>
			<a v-if="isPromotion && promotionList.length==0" :href="createPromotion" target="_blank">暂无此类活动，点击创建</a>
		</div>
	</div>
</template>
<script>
	import { getSpecialPromotionList,getDiscountPromotionVoList,queryLuckyDrawList } from 'api'
	export default {
		name : 'linkList',
		props:['selected','suid'],
		data(){
			return {
				linkTypeList:[
					{id:"/store.htm?suid="+this.suid,text:'微商城首页'},
					{id:"/customer.htm?suid="+this.suid,text:'个人中心'},
					{id:"/mall/mySalesList.htm?suid="+this.suid,text:'我的服务顾问'},
					{id:"/mall/contactSales.htm?supplierId="+this.suid,text:'联系导购'},
					{id:"/mall/getOrderListOfCustomer.htm?suid="+this.suid,text:'我的订单'},
					{id:"/mall/getShoppingCart.htm?suid="+this.suid,text:'我的购物车'},
					{id:"/mall/getCustomerFavoriteStockList.htm?suid="+this.suid,text:'我的收藏'},
					{id:"/mall/myCouponList.htm?suid="+this.suid,text:'我的优惠券'},
					{id:"/mall/activityOfSeckill.htm?suid="+this.suid,text:'限时折扣'},
					{id:"/mall/qiangHongBao.htm?suid="+this.suid,text:'抢红包'},
					{id:"/mall/storeAllList.htm?supplierId="+this.suid+"&type=select&redirect=appointmentSalesList.htm",text:'预约导购'},
					{id:"/mall/pointSign.htm?supplierId="+this.suid,text:'会员签到'},
					{id:"/mall/exchangeMall.htm?suid="+this.suid,text:'积分商城'},
					{id:"1",text:'商品专题'},
					{id:"2",text:'满减满折'},
					{id:"3",text:'刮刮卡'},
					{id:"4",text:'大转盘'},
					{id:"99",text:'自定义链接'},
				],
				isPromotion:false,
				promotionList:[{id:"",text:"正在加载活动列表"}],
				createPromotion:'',
				linkType:"random",
				linkUrl:""
			}
		},
		mounted: function () {
		    var _t = this;
		    if(_t.selected.url){
		    	_t.linkType = "99";
		    	_t.linkUrl = _t.selected.url;
		    }
		},
		watch:{
			'selected.url':{
				handler:function(v){
					this.linkType = 99;
			    	this.linkUrl = v;
				},
				immediate:false
			},
			linkType:function(v){
				var _t = this;
				_t.linkUrl = _t.selected.url||'';
				switch(v){
					case "99":
					_t.isPromotion = false;
					break;
					case "1":
					_t.isPromotion = true;
					_t.getSpecialList();
					break;
					case "2":
					_t.isPromotion = true;
					_t.getDiscountList();
					break;
					case "3":
					_t.isPromotion = true;
					_t.queryLuckyDraw3List();
					break;
					case "4":
					_t.isPromotion = true;
					_t.queryLuckyDraw2List();
					break;
					default:
					_t.linkUrl = location.protocol+"//"+ location.host +v;
					_t.isPromotion = false;
				}
			},
			// linkUrl:function(v){
			// 	this.selected.url = v;
			// }
		},
		methods:{
			getSpecialList(){
				var _t = this;
				getSpecialPromotionList.get({index:"0",length:"100"}).then(res=>{
					_t.promotionList=[];
					if(res.body.result.count > 0){
						$.each(res.body.result.specialPromotionList,function(i,e){
							_t.promotionList.push({id:"/mall/getSpecialPromotion.htm?id="+e.id+"&suid="+_t.suid,text:e.name});
						});
						_t.linkUrl = location.protocol+"//"+ location.host+_t.promotionList[0].id;
					}else{
						_t.createPromotion = '/admin/createSpecialPromotion.htm'
					}
				})
			},
			getDiscountList(){
				var _t = this;
				getDiscountPromotionVoList.get({index:"0",length:"100",processing:"3"}).then(res=>{
					_t.promotionList=[];
					if(res.body.result.count > 0){
						$.each(res.body.result.discountPromotionVoList,function(i,e){
							_t.promotionList.push({id:'/mall/storeAllList.htm?supplierId='+_t.suid+'&type=select&redirect='+encodeURIComponent('discountPromotionDetail.htm?id='+e.id),text:e.promotionName});
						});
						_t.linkUrl = location.protocol+"//"+ location.host+_t.promotionList[0].id;
					}else{
						_t.createPromotion = '/admin/createDiscount.htm'
					}
				})
			},
			queryLuckyDraw3List(){
				var _t = this;
				queryLuckyDrawList.get({index:"0",length:"100",fromExchange:"3",status:"1"}).then(res=>{
					_t.promotionList=[];
					if(res.body.result.count > 0){
						$.each(res.body.result.luckyDrawList,function(i,e){
							_t.promotionList.push({id:"/mall/customerLotteryScratch.htm?luckyDrawId="+e.id+"&supplierId="+_t.suid,text:e.luckyDrawTitle});
						});
						_t.linkUrl = location.protocol+"//"+ location.host+_t.promotionList[0].id;
					}else{
						_t.createPromotion = '/admin/activityGames.htm#!/activityGameOfLotteryCreateEdit?flag=create&fromExchange=3'
					}
				})
			},
			queryLuckyDraw2List(){
				var _t = this;
				queryLuckyDrawList.get({index:"0",length:"100",fromExchange:"2",status:"1"}).then(res=>{
					_t.promotionList=[];
					if(res.body.result.count > 0){
						$.each(res.body.result.luckyDrawList,function(i,e){
							_t.promotionList.push({id:"/mall/customerLotteryScratch.htm?luckyDrawId="+e.id+"&supplierId="+_t.suid,text:e.luckyDrawTitle});
						});
						_t.linkUrl = location.protocol+"//"+ location.host+_t.promotionList[0].id;
					}else{
						_t.createPromotion = '/admin/activityGames.htm#!/activityGameOfLotteryCreateEdit?flag=create&fromExchange=2'
					}
				})
			},
			promotionChange(url){
				this.linkUrl = location.protocol+"//"+ location.host+url;
			}
		}
    }
</script>
