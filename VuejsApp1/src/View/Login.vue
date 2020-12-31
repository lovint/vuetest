<template>
    <div class="loginPage">

        <input type="number" v-model="phone" placeholder="输入账号" />

        <input type="password" v-model="pwd" placeholder="输入密码" />

        <input type="button" @click="login" value="登录" />


    </div>
</template>

<script>
    import reqwest from 'reqwest';

    export default {
        data() {
            return {
                phone: "",
                pwd: "",
            }
        },
        mounted() {

        },
        methods: {
            login() {
                if (this.phone == "" || this.pwd == "") {
                    alert("Not NULL")
                } else {
                    //var sentData = {
                    //    Phone: this.phone,
                    //    Password: this.pwd
                    //}
                    //reqwest({
                    //    url: "http://192.168.0.117:80/Login/LoginUser?Phone=" + this.phone+"&Password="+this.pwd,
                    //    methods: "POST",
                    //    headers: {
                    //        'Accept': 'application/json',
                    //        'Content-Type': 'multipart/form-data',
                    //    },                       
                    //    error: (error) => {

                    //    },
                    //    success: (res) => {
                            this.$router.push('/ListIndex');
                        //}
                    //});
                }
            }
        }
    }
</script>

<style scoped>
     .loginPage {
        width:200px;
        height:200px;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    margin-left: -50px;
	    margin-top:50px;
        text-align:center;
    }
    .loginPage input{
        margin:10px;
        padding:6px 10px;
        border-radius:5px;
        border:1px solid #ccc;
    }
</style>