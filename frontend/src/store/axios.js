import axios from "axios";

const baseURL = process.env.BACKEND_URL || 'http://localhost:3000/';
if (typeof baseURL !== 'undefined')
{
    axios.defaults.baseURL = baseURL;
}

export default axios;