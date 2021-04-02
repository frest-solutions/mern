import axios from 'axios'

const data = JSON.parse(localStorage.getItem('userData'))
console.log(data)
export const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    Authorization: `Bearer ${data?.token}`
  }
})

function errorHandler(error) {
  if (error.response) {
    // Request made and server responded
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    // if (error.response.status === 401) {
    //   localStorage.removeItem('userData')
    // }
    return error.response.data
  } else if (error.request) {
    // The request was made but no response was received
    // console.log(error.request);
    return error.request
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log('Error', error.message);
    return error
  }
}

export const imgApiUrl = '/temp/'

export const authAPI = {
  register(form) {
    return instance.post('api/auth/register', {...form})
      .catch(e => errorHandler(e))
  },
  login(form) {
    return instance.post('api/auth/login', {...form})
      .catch(e => errorHandler(e))
  }
}

export const profileAPI = {
  // auth() {
  //   return instance.get('profile')
  // }
}

export const tasksAPI = {
  create(item) {
    return instance.post('api/task/create', {...item})
      .catch(e => errorHandler(e))
  },

  getTasks() {
    return instance.get('api/task')
      .catch(e => errorHandler(e))
  },
}

export const categoriesAPI = {
  getCategories() {
    return instance.get('api/category')
      .catch(e => errorHandler(e))
  },

  getCategory(id) {
    return instance.get(`api/category/${id}`)
      .catch(e => errorHandler(e))
  },

  getServices() {
    return instance.get('api/category/service')
      .catch(e => errorHandler(e))
  },

  getService(id) {
    return instance.get(`api/category/service/${id}`)
      .catch(e => errorHandler(e))
  }
}
