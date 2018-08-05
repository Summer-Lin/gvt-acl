import { login } from '../../api/auth'
import { fetchUserInfo } from '../../api/user'
import { setToken, removeToken } from '../../utils/auth'

const user = {
    state: {
        username: '',
        role: '',
        permissions: '',
    },

    mutations: {
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_ROLE: (state, role) => {
            state.role = role;
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions;
        }
    },

    actions: {
        Login({ commit }, params) {
            return new Promise((resolve, reject) => {
                login(params.username, params.password).then(response => {
                    if (response.ret_code === 0) {
                        let token = response.ret_msg.token;
                        setToken(token);
                        resolve();
                    } else {
                        reject(response.ret_msg);
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },
        LogOut() {
            removeToken();
            return;
        },
        FetchUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                fetchUserInfo().then(response => {
                    if (response.ret_code === 0) {
                        let userinfo = response.ret_msg;
                        commit('SET_USERNAME', userinfo.username);
                        commit('SET_ROLE', userinfo.role);
                        commit('SET_PERMISSIONS', userinfo.permissions);
                        resolve(userinfo);
                    } else {
                        reject(response.ret_msg);
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
}

export default user;