<!--  -->
<template>
    <div class="login-page">
        <div class="login-container">
            <a-tabs class="login-tabs" default-active-key="1">
                <a-tab-pane key="1" tab="账号登录">
                    <normal-form></normal-form>
                </a-tab-pane>
                <a-tab-pane key="2" tab="CA登录" force-render>
                    <!-- <ca-form></ca-form> -->
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script setup lang='ts'>
import normalForm from './components/normalForm.vue';
</script>
<style lang="less" scoped>
.login-container {
    height: 500px;
    width: 300px;
    margin: 0 auto;
    display: flex;
}
</style>