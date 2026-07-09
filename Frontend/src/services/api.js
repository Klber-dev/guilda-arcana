import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/index.php',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        const data = response.data;

        /*
            Segurança extra:
            Caso algum método antigo do backend ainda retorne HTTP 200,
            mas com status: "error", o frontend ainda vai tratar como erro.
        */
        if (data?.status === 'error') {
            return Promise.reject({
                status: response.status,
                type: data.type || 'app',
                message: data.message || 'Ocorreu um erro.',
                debug: data.debug || null,
                data: data
            });
        }

        return response;
    },

    (error) => {
        /*
            Aqui caem os erros HTTP reais:
            400, 401, 403, 404, 409, 500 etc.
        */
        const data = error.response?.data;

        return Promise.reject({
            status: error.response?.status || null,
            type: data?.type || 'network',
            message: data?.message || 'Erro ao se comunicar com o servidor.',
            debug: data?.debug || null,
            data: data || null,
            originalError: error
        });
    }
);

export default api;