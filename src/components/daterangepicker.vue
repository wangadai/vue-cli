<!--
传入参数五个：
config:{
	id:'', 				//元素id，字符串不需要‘#’
	time:true, 			//是否有时间筛选（除了订单和优惠券等活动，一般都不需要）
	single:true, 		//是否是单个日期筛选
	start:'2017-3-27',	//默认开始时间，支持Date对象，moment对象，或者字符串“2017-3-27”
	end:'2017-3-27',	//默认结束时间，传参同start
	maxRange:90			//最长时间跨度,单位“天”，只能传数字,默认90，0表示不限制
}
取出参数2个：
startDate: 	开始时间，格式时间戳，毫秒级
endDate:	结束时间，格式同startDate，如果single=true，返回空


时间回填
time Array [开始时间，结束时间]
 -->

<template>
	<article class="dib">
		<div class="ui-slt-date dib vm" data-ui-daterang>
			<input v-validate :data-rules="'required:'+placeholder || '请选择时间'+'！'" data-vv-delay="500" type="text" :name="config.id || 'daterangepicker'" class="form-control input-sm dib" :class="width" :id="config.id || 'daterangepicker'" :placeholder="placeholder || '选择时间'" readonly>
		</div>
	</article>
</template>

<script>
	import 'assets/js/validate/validate';
	import moment from 'moment'
	export default {
		name: 'daterangepicker',
		props: ['config', 'time', 'placeholder'],
		data(){
			return {
				startDate:'',
				endDate:'',
				id:'',
				width:'w200',
			}
		},
		mounted(){
			this.init();
		},
		watch: {
			'config.check'(v) {
				if (v) this.checkTime();
			},
			time(v) {
				if (v) {
					$('#' + this.config.id || 'daterangepicker').val(this.$getLocalTime(v[0]) + ' - ' + this.$getLocalTime(v[1]));
					this.startDate = +moment(v[0]);
					this.endDate = +moment(v[1]);
				}
			}
		},
		methods:{
			init(){
				var _t = this;
				require.ensure([], function(require){
					require('assets/css/daterangepicker-bs3.css')
					require('assets/js/dateRangePicker/daterangepicker');
					_t.daterangepickerInit();
				},'daterangepicker')
			},
			daterangepickerInit(){
				let _this =this,ops = _this.config;
				let fType = ops.format ? ops.format : ops.time ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
				let maxRange = (typeof ops.maxRange === 'number') ? ops.maxRange : 90;
				_this.width = ops.width ? ops.width : ops.single ? (ops.time ? 'w150' : 'w100') : (ops.time ? 'w300' : 'w200')
				/*默认值*/
				_this.startDate = ops.start||'';
				_this.endDate	 = ops.end||'';
				_this.minDate = ops.min||'';
				_this.maxDate	 = ops.max||'';

				let datepickerOpt = {
					singleDatePicker:ops.single,
		            timePickerIncrement: 5,
					timePicker: ops.time||false,
					timePicker24Hour:true,
					autoUpdateInput: false,
		            startDate: _this.startDate ? moment(_this.startDate).format('YYYY-MM-DD') : undefined,
		            endDate: _this.endDate ? moment(_this.endDate).format('YYYY-MM-DD') : undefined,
		            minDate: _this.minDate ? moment(_this.minDate).format() : undefined,
		            maxDate : _this.maxDate ? moment(_this.maxDate).format() : undefined,
		            opens: 'right',
		            locale: {
		            	format: fType,
		            	applyLabel: "确定",
		            	cancelLabel: "取消",
		            	customRangeLabel:'自定义',
		            	daysOfWeek: ['日','一','二','三','四','五','六'],
		            	monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				    },
		            ranges: ops.ranges || {
		            	'今日': [moment().format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 23:59:59')],
		            	'昨日': [moment().subtract(1,'days').format('YYYY-MM-DD 00:00:00'), moment().subtract(1,'days').format('YYYY-MM-DD 23:59:59')],
		            	'最近 7 天': [moment().subtract(7,'days').format('YYYY-MM-DD 00:00:00'), moment().subtract(1,'days').format('YYYY-MM-DD 23:59:59')],
		            	'最近 30 天': [moment().subtract(30,'days').format('YYYY-MM-DD 00:00:00'), moment().subtract(1,'days').format('YYYY-MM-DD 23:59:59')]
				   }
		        };

		        ops.id = ops.id || 'daterangepicker';
				$('#' + ops.id).daterangepicker(datepickerOpt).on('apply.daterangepicker', function(ev, picker) {
					if ((picker.endDate - picker.startDate) / (24 * 3600 * 1000) > maxRange) {
						_this.$alert("请选择少于"+maxRange+"天的时间");
						return false;
					}
					if (ops.single) {
						$(this).val(picker.startDate.format(fType));
						_this.startDate = fType == 'MM-DD' ? picker.startDate.format(fType) : +moment(picker.startDate);
						_this.endDate = "";
					} else {
						$(this).val(picker.startDate.format(fType) + ' - ' + picker.endDate.format(fType));

						_this.startDate = fType == 'MM-DD' ? picker.startDate.format(fType) : +moment(picker.startDate);
						_this.endDate = fType == 'MM-DD' ? picker.endDate.format(fType) : +moment(picker.endDate) + (!ops.time ? 0 : (24*3600*1000-1))   //如果精确到日期，表示当前日期最后一秒，要加上23:59:59
					}
			  	});
			  	if(_this.startDate){
				  $('#'+ ops.id).val(moment(_this.startDate).format(fType));
				  _this.startDate = fType == 'MM-DD' ?  moment(_this.startDate).format(fType) : +moment(_this.startDate)
				  if(_this.endDate){
					  $('#'+ ops.id).val($('#'+ ops.id).val() + '-' + (moment(_this.endDate).format(fType)));
					  _this.endDate = fType == 'MM-DD' ?  moment(_this.endDate).format(fType) : +moment(_this.endDate) + (!ops.time ? 0 : (24*3600*1000-1))  ////如果精确到日期，表示当前日期最后一秒，要加上23:59:59
				  }
			 	}
				if (ops.check) _this.checkTime();
			},
			checkTime() {
				this.checkRes = this.$validator.validateAll({
					daterangepicker: this.startDate,
				});
			}
		}
	}
</script>

<style>
.daterangepicker .fa {
	display: inline-block;
	font: normal normal normal 14px/1 FontAwesome;
	font-size: inherit;
	text-rendering: auto;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	transform: translate(0, 0);
}
.daterangepicker .fa-chevron-left:before {
	content: "\f053";
}
.daterangepicker .fa-chevron-right:before {
	content: "\f054";
}
</style>
