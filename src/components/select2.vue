<template>
	<select>
		<slot></slot>
	</select>
</template>
<script>
	export default {
		name : 'select2',
        props: ['options', 'value','search', 'placeholder'],
	  	mounted: function () {
		    var vm = this;
		    setTimeout( () => {
		    	$(this.$el).val(this.value).select2({ data: this.options, placeholder: this.placeholder, minimumResultsForSearch:(this.search=='0' ? -1 : 0)}).on('change', function () {
		        vm.$emit('input', this.value);
		        vm.$emit('sChange',this.value);
		    });
		    }, 50)
		},
		watch: {
		    value: function (v) {
		    	$(this.$el).val(v).trigger('change');
		    },
		    options: function (options) {
		    	var vm = this;
		      	setTimeout( () => {
		      		$(this.$el).empty().select2({ data: vm.options, placeholder: vm.placeholder, minimumResultsForSearch:(vm.search=='0' ? -1 : 0)});
					if (vm.value) {
						$(this.$el).val(vm.value).trigger('change');
						// $(this.$el).select2('val',vm.value);
					}
		      	}, 50)

		    }
		},
		destroyed: function () {
			if ($(this.$el).select2()){
		   		$(this.$el).off().select2('destroy')
			}
		}
    }
</script>
