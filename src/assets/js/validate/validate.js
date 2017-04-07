/*
*	验证时：v-validate data-rules="required:可自定义提示信息 | 自定义规则 | 自定义规则"
*
* 	this.$validator.validateAll({
	    name属性名称: 属性值,
	})
*   通过验证返回true
*/
import Vue from 'vue';
import VeeValidate,{ Validator } from './veevalidate';
import messages from './zh_CN';
Validator.updateDictionary({
	zh_CN: {
		messages
	}
});
const config = {
	errorBagName: 'errors', 
	locale: 'zh_CN',
	messages: null,
	strict: true
};

Vue.use(VeeValidate,config);

Validator.extend('mobile', {
	messages: {
		en:field => '请输入正确的手机号',
	},
	validate: value => {
		return value.length == 11 && /^(1[34578]\d{9})$/.test(value)
	}
});
Validator.extend('phone', {
	messages: {
		en:field => '请输入正确的联系电话',
	},
	validate: value => {
		return (value.length == 11 && /^(1[34578]\d{9})$/.test(value)) || /^(\(\d{3,4}\)|\d{3,4})?\d{7,8}$/.test(value)
	}
});
Validator.extend('password', {
	messages: {
		en:field => '以字母开头，6-12位之间的字符、数字和下划线',
	},
	validate: value => {
		return /^[a-zA-Z]\w{5,11}$/.test(value)
	}
});
Validator.extend('discount', {
	messages: {
		en:field => '只能输入0.1-10的最多包含一位小数的数字', //验证折扣
	},
	validate: value => {
		return /^(0\.([1-9]{1})|10(\.0{1,9})?)$/.test(value)
	}
});
Validator.extend('payment', {
	messages: {
		en:field => '最大金额为九千万,最多包含两位小数',  //验证金钱
	},
	validate: value => {
		return /^(\d{3,7}(\.\d{1,2}))|(\d{3,8})(\.0{1,9})?$/.test(value)
	}
});
Validator.extend('integer', {
	messages: {
		en:field => '只能输入大于0的整数',  //验证数字
	},
	validate: value => {
		return /^\+?[1-9][0-9]*$/.test(value)
	}
});
Validator.extend('upzero', {
	messages: {
		en:field => '只能输入大于0的数值',  //验证数字
	},
	validate: value => {
		return  /^[1-9]\d*(\.\d+)?$/.test(value)
	}
});
Validator.extend('str100', {
	messages: {
		en:field => '请输入最多100字',  //验证数字
	},
	validate: value => {
		return  /^.{1,100}$/.test(value)
	}
});
Validator.extend('percent', {
	messages: {
		en:field => '请输入0~100之间的数值',  //验证数字
	},
	validate: value => {
		return  /^(\d{1,2}(\.\d{1,2})?|100)$/.test(value)
	}
});
Validator.extend('percent1b', {
	messages: {
		en:field => '0~100000000之间的数值(最多两位小数)',  //验证数字
	},
	validate: value => {
		return  /^\d{1,8}(\.\d{1,2})?$/.test(value) && value > 0
	}
});
Validator.extend('percents', {
	messages: {
		en:field => '请输入0~100的整数',  //验证折扣
	},
	validate: value => {
		return  /^(100|[0-9]\d|\d)$/.test(value)
	}
});
Validator.extend('len3_20', {
	messages: {
		en:field => '长度在3-20之间',  //验证折扣
	},
	validate: value => {
		return  (value.length > 2 && value.length < 21)
	}
});
Validator.extend('len10_250', {
	messages: {
		en:field => '长度在10-250之间',  //验证折扣
	},
	validate: value => {
		return  (value.length > 9 && value.length < 251)
	}
});

