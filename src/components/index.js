import Vue from 'vue'
import pagination from './pagination'
import select2 from './select2'
import ajaxselect from './ajaxselect'
import {getUrlParam, getMainPageUrl,getLocalTime, getOwnObj} from 'utils'

Vue.component('pagination', pagination)
Vue.component('select2', select2)
Vue.component('ajaxselect', ajaxselect)