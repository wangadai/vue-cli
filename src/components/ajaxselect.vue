<template>
    <div class="dib p0">
        <div class="row">
            <div class="col-md-6">
                <label class="label" v-if="ops.label">{{ops.label || ''}}</label>
                <select :id="ops.id || 'ajaxselect2'" :class="ops.width || 'w200'"></select>
            </div>
            <div class="col-md-6">
                <label class="label" v-if="ops.children && ops.children.label">{{ops.children.label || ''}}</label>
                <select :id="ops.children.id || 'ajaxselect2children'" :class="ops.width || 'w200'" v-if="ops.children"></select>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: ['ops', 'value'],
    data(){
        return {
            id: '',
            text: '',
            childrenId: '',
            childrenText: '',
        }
    },
    mounted() {
       this.init();
    },
    methods: {
        init(){
            this.id = this.text = this.childrenId = this.childrenText = '';
            let _t = this,
                ops = this.ops || {},
                id = ops.id || 'ajaxselect2',
                children = ops.children || {},
                childrenId = children.id || 'ajaxselect2children',
                ajaxOps = {
                    url: ops.url,
                    dataType: 'json',
                    delay: 400,
                    cache: true,
                    data: function(params) {
                        params.page = params.page || 1;
                        let paramsOps = (ops.type == 'POST' || ops.type == 'post') ? JSON.stringify(ops.dataOps(params)) : ops.dataOps(params);
                        return  paramsOps;
                    },
                    processResults: function(data, params) {
                        let list = [];
                        if (ops.all) {
                            list = params.page == 1 ? [{
                                id: ' ',
                                text: '全部'
                            }] : [];
                        } else {
                            list = [];
                        }
                        list = list.concat(ops.dataResults(data, params));
                        return {
                            results: list,
                            pagination: {
                                more: (params.page * 30) < data.result.count
                            }
                        };
                    },
                },
                ajaxChildrenOps = {
                    url: children.url,
                    dataType: 'json',
                    delay: 400,
                    cache: true,
                    data: function(params) {
                        params.page = params.page || 1;
                        let paramsOps = (children.type == 'POST' || children.type == 'post') ? JSON.stringify(children.dataOps(params, _t.id)) : children.dataOps(params, _t.id);
                        return  paramsOps;
                    },
                    processResults: function(data, params) {
                        let list = [];
                        if (children.all) {
                            list = params.page == 1 ? [{
                                id: ' ',
                                text: '全部'
                            }] : [];
                        } else {
                            list = [];
                        }
                        list = list.concat(children.dataResults(data, params));
                        return {
                            results: list,
                            pagination: {
                                more: (params.page * 30) < data.result.count
                            }
                        };
                    },
                };
            ops.all = ops.all === undefined ? true : ops.all;
            children.all = children.all === undefined ? true : children.all;
            if (ops.type == 'POST' || ops.type == 'post') {
                ajaxOps.contentType = ops.contentType || 'application/json;charset=UTF-8';
                ajaxOps.type = ops.type;
                ajaxOps.processData = false;
            }
            if (children.type == 'POST' || children.type == 'post') {
                ajaxChildrenOps.contentType = children.contentType || 'application/json;charset=UTF-8';
                ajaxChildrenOps.type = children.type;
                ajaxChildrenOps.processData = false;
            }
            $('#' + id).select2({
                placeholder: ops.placeholder || '请选择',
                minimumInputLength: ops.length || -1,
                minimumResultsForSearch: ops.search || 1,
                ajax: ajaxOps,
            }).on('change', function() {
                _t.id = this.value;
                _t.text = !($(this).select2("data")) ? '' : $(this).select2("data")[0].text == '全部' ? '' : $(this).select2("data")[0].text;
                if (_t.id != ' ' && children) {
                    $('#' + childrenId).select2({
                        placeholder: children.placeholder || '请选择',
                        minimumInputLength: children.length || -1,
                        minimumResultsForSearch: children.search || 1,
                        ajax: ajaxChildrenOps,
                    }).on('change', function(ssss) {
                        _t.childrenId = this.value;
                        _t.childrenText = !($(this).select2("data")) ? '' : $(this).select2("data")[0].text == '全部' ? '' : $(this).select2("data")[0].text;
                    })
                } else {
                    $('#' + childrenId).empty().select2({
                        data: [{
                            id: ' ',
                            text: '全部'
                        }]
                    });
                    this.childrenText = '';
                }
            })
            if (children) {
                $('#' + childrenId).select2({
                    data: [{
                        id: ' ',
                        text: '全部'
                    }]
                });
            }
        }   
    },
    watch: {
        value(v) {
            if (typeof(v) !== 'number') {
                let ops = this.ops || {},
                id = ops.id || 'ajaxselect2';
                $("#select2-" + id + "-container").text(v.text);
                this.id = v.id;
                this.text = v.text;
            } else {
                this.id = v;
            }
        },
        id(v) {
            let ops = this.ops || {},
                children = ops.children || {},
                childrenId = children.id || 'ajaxselect2children';
            if (children) {
                $('#' + childrenId).select2('val',' ');
                this.childrenText = '';
            }
        }
    }
}
</script>
<style scoped>
    .label{width: 95px;text-align: right;white-space: nowrap;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: bold;color: #444;font-size: 14px;padding: 0;letter-spacing: 0;}
</style>