import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
//import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import UserList from './views/user/user-list.vue'
import RecommendList from './views/recommend/recommend-list.vue'
import RecommendDetail from './views/recommend/recommend-detail.vue'
import ArticleList from './views/article/article-list.vue'
import AddArticle from './views/article/add-article.vue'
import CollectionArticleList from './views/collection/collection-article-list.vue'
import CollectorList from './views/collection/collector-list.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '首页',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
//          { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '文章管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/article/add-article', component: AddArticle, name: '添加文章' },
            { path: '/article/article-list', component: ArticleList, name: '文章列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '收藏管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/collection/collection-article-list', component: CollectionArticleList, name: '文章收藏列表' },
            { path: '/collection/collector-list', component: CollectorList, name: '收藏者管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/recommend/recommend-list', component: RecommendList, name: '投稿管理' },
            { 
			    path: '/recommend/recommend-detail/:id',
			    component: RecommendDetail,
			    name:'推荐文章详情',
			    hidden: true
			}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/user/user-list', component: UserList, name: '用户管理'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;