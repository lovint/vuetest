
<template>
    <a-layout id="homeLayout" :style="{ overflow: 'auto', height: '100vh' }">
        <a-layout-header>
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    class="triggerIcon headTool"
                    @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
        <a-layout>
            <a-layout-sider :trigger="null"
                            collapsible
                            v-model="collapsed">
                <!--菜单-->
                <a-menu 
                        @click="menuClick"
                        @openChange="onOpenChange"
                        :openKeys="openKeys"
                        :defaultSelectedKeys="[$route.path]"
                        theme="dark"
                        mode="inline">
                    <!--横向：horizontal-->
                    <!--有openKeys时 :defaultOpenKeys="[200]"无效 -->
                    <!--有v-model时 :ddefaultSelectedKeys="[202]"无效 -->
                    <a-sub-menu v-for="itParent in NavData" :key="itParent.NavID">
                        <span slot="title">
                            <a-icon :type="itParent.Icons" />
                            <span>{{itParent.Title}}</span>
                        </span>
                        <a-menu-item v-for="itChild in itParent.Child" :key="itChild.NavID">
                            <router-link :to="itChild.Path">
                                <!--根据路径去跳转页面-->
                                {{itChild.Title}}
                            </router-link>
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>

            <a-layout-content :style="{
                margin: '1.5vh 10px',
                padding: '10px',
                background: '#fff',
                height: '90vh' }">
                <!--行内样式记得写成class-->
                内容
            </a-layout-content>

        </a-layout>
    </a-layout>
</template>

<script>
    import { Menu } from 'ant-design-vue';
    export default {
        data() {
            return {
                collapsed: false,
                rootSubmenuKeys: [100,300],
                openKeys: [300],
                defaultSelectedKeys: [this.$route.path],
                NavData: [{
                    NavID: 100,
                    Icons: "dashboard",
                    Title: "操作",
                    Path: "",
                    Child: [
                        {
                            NavID: 101,
                            Icons: "",
                            Title: "用户",
                            Path: "/UserInfo",
                        }, {
                            NavID: 102,
                            Icons: "",
                            Title: "公司",
                            Path: "/CompanyInfo",
                        }, {
                            NavID: 103,
                            Icons: "",
                            Title: "部门",
                            Path: "/TeamInfo",
                        },

                    ]
                }, {
                    NavID: 300,
                    Icons: "audit",
                    Title: "报表",
                    Path: "",
                    Child: [{
                        NavID: 301,
                        Icons: "",
                        Title: "列表",
                        Path: "/ListIndex",
                    }]
                }]
            }
        },

        methods: {
            menuClick({ item, key, keyPath }) {
                // 获取到当前的key,并且跳转
                this.$router.push({
                    path: key
                })
            },
            onOpenChange(openKeys) {               
                //  控制只打开一个
                const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
                if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                    this.openKeys = openKeys;
                } else {
                    this.openKeys = latestOpenKey ? [latestOpenKey] : [];
                }
            }
        }
    }
</script>

<style>
</style>
