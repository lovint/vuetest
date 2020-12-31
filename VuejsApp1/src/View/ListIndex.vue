<template>
    <div>
        
        <a-table bordered :loading="isTableLoad" :row-key="record => record.UserID"
                 :data-source="tbMainData" :columns="tbMainHead" :customRow="rowClick">
            <!-- 插槽插入图片 -->
            <img slot="pic" slot-scope="text" :src="text" style="width:20px;height:20px" />
        </a-table>
        <!--表单弹出框-->
        <a-drawer title="编辑"
                  destroyOnClose
                  width="45%"
                  :visible="isDrawerShow"
                  @close="isDrawerShow=false">

            <a-form-model ref="checkForm" :model="formData" :rules="formRule">
                <a-form-model-item label="姓名" prop="name">
                    <a-input v-model="formData.name" />
                </a-form-model-item>
                <a-form-model-item label="年龄" prop="age">
                    <a-input-number v-model="formData.age" />
                </a-form-model-item>
                <a-form-model-item label="性别">
                    <a-radio-group v-model="formData.sex">
                        <a-radio value="1">男</a-radio>
                        <a-radio value="2">女</a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item>
                    <a-upload></a-upload>
                </a-form-model-item>

                <a-form-model-item :wrapper-col="{span:14,offset:4}">
                    <a-button type="primary" @click="submitData">
                        提交
                    </a-button>
                    <a-button style="margin-left:10px;" @click="resetForm('formData')">
                        取消
                    </a-button>
                </a-form-model-item>


            </a-form-model>


        </a-drawer>
    </div>
</template>
<script>
    import aUpload from '@/components/JZBUpload.vue';

    const tbMainHead = [{
        title: '图片',
        dataIndex: 'HeadImg',
        scopedSlots: {
            customRender: 'pic'
        },
    }, {
        title: '姓名',
        dataIndex: 'name',
    }, {
        title: '年龄',
        dataIndex: 'age',
    }
    ];
    export default {
        data() {
            return {
                tbMainData: [],
                tbMainHead,
                isTableLoad: false,
                isDrawerShow: false,
                formData: {
                    name: '',
                    age: '',
                    sex: '',
                },
                formRule: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '姓名长度需在2到5个字符', trigger: 'blur' },
                    ],
                    age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
                }

            }
        },
        components: {
            aUpload
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.isTableLoad = true;
                this.$http.get('http://192.168.0.117:80/Login/GetAllUser')
                    .then((data) => {
                        var res = JSON.parse(data.bodyText)
                        this.isTableLoad = false;
                        if (res) {
                            this.tbMainData = res;
                        }
                    }, (error) => {
                        console.log(error);
                    })
            },
            rowClick(record, index) {
                return {
                    on: {
                        click: () => {
                            this.isDrawerShow = true;
                        }
                    }
                }
            },
            submitData() {
                this.$refs.checkForm.validate(valid => {
                    if (valid) {
                        this.$http.post('http://192.168.0.117:80/Login/AddVueUser', this.formData).then(function (res) {

                            this.resetForm(this.$refs.checkForm);
                            this.getData();
                        }, function (res) {
                            console.log('添加失败')
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$nextTick(() => {
                    this.$refs.checkForm.resetFields();
                })
                this.isDrawerShow = false;
            }

        }

    }
</script>