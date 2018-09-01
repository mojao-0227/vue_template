import Vue from 'vue';
import MyComponent from './sub';
import button from './components/button.vue';

new Vue({
    el        : '#app',
    template  :
        `<div class="app">
        <h1>Hello Vue.js!</h1>
        <p>text</p>
        <my-component message="My Counter for TypeScript"></my-component>
        <hoge-Button></hoge-Button>
      </div>`,

    components: {
        'my-component': MyComponent,
        'hoge-Button': button
    }
});