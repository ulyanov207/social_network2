import * as axios from "axios";

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "api-key": "43f62315-7641-403b-a6f4-8f7f80a278d7"
    }
})

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    follow(userId) {
        return instanse.post(`follow/${userId}`)
    },

    unfollow(userId) {
        return instanse.delete(`follow/${userId}`)
    },

    getProfile(userId) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instanse.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instanse.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instanse.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instanse.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instanse.put(`profile`, profile)
    }
}


export const authAPI = {
    me() {
        return instanse.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instanse.post(`auth/login`,{email, password, rememberMe, captcha})
    },
    logout() {
        return instanse.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instanse.get(`security/get-captcha-url`)
    }
}





