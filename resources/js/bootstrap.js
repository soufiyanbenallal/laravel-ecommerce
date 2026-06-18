import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const metaToken = document.querySelector('meta[name="csrf-token"]');
if (metaToken) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = metaToken.getAttribute('content');
}
