<!-- 普通登录表单 -->
<template>
    <div class="normal-form">
        <a-form ref="formRef" :model="formState" :rules="rules" class="login-form">
            <a-form-item name="username">
                <a-input v-model:value="formState.username" placeholder="请输入账号">
                </a-input>
            </a-form-item>
            <a-form-item name="password">
                <a-input v-model:value="formState.password" placeholder="请输入密码">
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button class="login-submit-btn" type="primary" :loading="loading" @click="handleLogin">
                    登录
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
interface FormState {
    username: string;
    password: string;
}
const formState = reactive<FormState>({
    username: '',
    password: ''
});
const rules: Record<string, Rule[]> = {
    username: [{ required: true, message: '请输入您的用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入您的密码', trigger: 'blur' }]
}
const loading = ref(false);
const formRef = ref();
const handleLogin = () => {
    formRef.value
        .validate()
        .then(() => {
            console.log('values', formState);
        })
};

</script>
