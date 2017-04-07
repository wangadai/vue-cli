<!--
 - options 类型object
    {
        province: '',    省份ID，可不填，默认loc_province，页面多次调用时间组件需填写
        city: '',        地级市ID，可不填，默认loc_city，页面多次调用时间组件需填写
        district: '',        市县区ID，可不填，默认loc_district，页面多次调用时间组件需填写

        flag: false,     验证省市区是否选择
    }

 - value 类型object        回填省市区
        如果绑定的对象参数为province，city，district可直接绑定

        否则自定义对象｛
                            province: '',
                            city: '',
                            district: '',
                        ｝

    不需要验证时：

        flag: 不需传入

    验证时：

        flag: false, 必填

        但在未选择的情况下，直接点击提交，触发不了组件的change事件，错误信息提示会显示不出来，需在提交的时候手动判断当前对象里面的

        options.flag == options.val(或value.district) ? false : true;

    options.val: {   //类型object
                    province: 省份,
                    city: 地级市,
                    district: 市、县、区,
                 }

 -->
<template>
    <div class="dib">
        <select :id="options.province || 'loc_province'" class="dib form-control input-sm w125"></select>
        <input type="hidden" :name="options.province || 'loc_province'">

        <select :id="options.city || 'loc_city'" class="dib form-control input-sm  w125"></select>
        <input type="hidden" :name="options.city || 'loc_city'">

        <select :id="options.district || 'loc_district'" class="dib form-control input-sm  w125"></select>
        <input type="hidden" :name="options.district || 'loc_district'">

        <span v-if="options.flag" class="text-danger ml10">请选择联系地址</span>
    </div>
</template>
<script>
export default {
    name: 'location',
    props: ['options', 'value'],
    data() {
        return {
            detailObject: null,
        }
    },
    mounted() {
        let _t = this;
		require.ensure([], function(require){
			require('assets/js/locationNew');
			_t.initlocation();
		},'location');
    },
    watch: {
        value(v) {
            this.detailObject.setValue({
                province: v.province,
                city: v.city,
                district: v.district,
            })
        },
        'options.flag': function(v) {
            if (v) {
                let province = $("#select2-" + this.options.province + "-container"),
                    provinceText = province.text(),
                    city = $("#select2-" + this.options.city + "-container"),
                    cityText = city.text(),
                    district = $("#select2-" + this.options.district + "-container"),
                    districtText = district.text();

                province.parent().css({
                    'borderColor': provinceText == '省份' ? '#f05050' : '#ccc',
                });
                city.parent().css({
                    'borderColor': cityText == '地级市' ? '#f05050' : '#ccc',
                });
                district.parent().css({
                    'borderColor': districtText == '市、县、区' ? '#f05050' : '#ccc',
                });
            } else {
                $("#select2-" + this.options.province + "-container, #select2-" + this.options.city + "-container, #select2-" + this.options.district + "-container").parent().css({
                    'borderColor': '#ccc',
                });
            }
        },
    },
    methods: {
		initlocation(){
			let _t = this,options = _t.options;
	        options.province = options.province || 'loc_province',
	        options.city = options.city || 'loc_city',
	        options.district = options.district || 'loc_district';

	        _t.detailObject = new Location({
	            domsId: {
	                province: options.province,
	                city: options.city,
	                district: options.district,
	            },
	        });

	        if (options.flag !== undefined && !options.flag) {
	            $('#' + options.province).on('change', function() {
	                $("#select2-" + options.province + "-container").parent().css({
	                    'borderColor': this.value ? '#ccc' : '#f05050',
	                });
	                $("#select2-" + options.city + "-container").parent().css({
	                    'borderColor': '#f05050',
	                });
	                options.flag = this.value && $('#' + options.city).val() && $('#' + options.district).val() ? false : true;

	                let newProvince = $("#" + options.province).select2("data")[0].text;
	                newProvince = newProvince === '省份' ? '' : newProvince;
	                _t.value.province = newProvince;
	                _t.value.city = '';
	                _t.value.district = '';
	            });

	            $('#' + options.city).on('change', function() {
	                $("#select2-" + options.city + "-container").parent().css({
	                    'borderColor': this.value ? '#ccc' : '#f05050',
	                });
	                options.flag = this.value && $('#' + options.district).val() ? false : true;

	                let newCity = $("#" + options.city).select2("data")[0].text;
	                newCity = newCity === '地级市' ? '' : newCity;
	                _t.value.city = newCity;
	                _t.value.district = '';
	            });

	            $('#' + options.district).on('change', function() {
	                options.flag = this.value ? false : true;
	                options.val = this.value ? _t.detailObject.getValue() : '';
	                $("#select2-" + options.city + "-container").parent().css({
	                    'borderColor': this.value ? '#ccc' : '#f05050',
	                });

	                let newDistrict = $("#" + options.district).select2("data")[0].text;
	                newDistrict = newDistrict === '市、县、区' ? '' : newDistrict;
	                _t.value.district = newDistrict;
	            });
	        } else {
	            $('#' + options.province).on('change', function() {
	                let newProvince = $("#" + options.province).select2("data")[0].text;
	                newProvince = newProvince === '省份' ? '' : newProvince;
	                _t.value.province = newProvince;
	                _t.value.city = '';
	                _t.value.district = '';

	            });

	            $('#' + options.city).on('change', function() {
	                let newCity = $("#" + options.city).select2("data")[0].text;
	                newCity = newCity === '地级市' ? '' : newCity;
	                _t.value.city = newCity;
	                _t.value.district = '';
	            });

	            $('#' + options.district).on('change', function() {
	                let newDistrict = $("#" + options.district).select2("data")[0].text;
	                newDistrict = newDistrict === '市、县、区' ? '' : newDistrict;
	                _t.value.district = newDistrict;

	                options.val = _t.detailObject.getValue();
	            });
	        }
		}
    },
}
</script>
