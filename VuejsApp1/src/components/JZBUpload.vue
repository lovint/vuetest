<template>
    <a-upload name="file"
              :multiple="true"
              action="http://192.168.0.117:80/Login/saveFile"
              :headers="headers"
              @change="handleChange">
        <a-button> <a-icon type="upload" /> 上传 </a-button>
    </a-upload>
</template>
<script>
    export default {
        data() {
            return {
                headers: {
                    authorization: 'authorization-text',
                },
            };
        },
        methods: {
            handleChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} 文件上传成功`);
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} 文件上传失败.`);
                }
            },
        },
    };
</script>
