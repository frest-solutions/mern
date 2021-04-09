import axios from 'axios'

export const instance = axios.create({baseURL: 'http://localhost:5000/'})
export const imgApiUrl = 'http://localhost:5000/upload/'

function errorHandler(error) {
  if (error.response) {
    // Request made and server responded
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
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

export const authAPI = {
  register(form) {
    return instance.post('api/auth/register', {...form},
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  },
  login(form) {
    return instance.post('api/auth/login', {...form},
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  }
}

export const profileAPI = {
  getProfile() {
    return instance.get('api/auth/profile',
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  },
  getUsers() {
    return instance.get('api/auth/users',
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  },
}

export const chatsAPI = {
  getUserMessages(id) {

    return instance.get(`/api/chat/messages/${id}`, {
      headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
    })
      .catch(e => errorHandler(e))
  },

  sendMessage(msg, to) {
    return instance.post('/api/chat/send', {msg, to, foo: 'bar'}, {
      headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
    })
      .catch(e => errorHandler(e))
  }
}

export const tasksAPI = {
  create(item) {
    return instance.post('api/task/create', {...item},
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  },

  deleteTask(id) {
    return instance.delete(`/api/task/${id}`,
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  },

  uploadPhoto(formData) {
    return instance.post('api/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`
      }
    })
  },

  getTasks() {
    return instance.get('api/task',
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  },
}

export const categoriesAPI = {
  getCategories() {
    return instance.get('api/category',
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  },

  getCategory(id) {
    return instance.get(`api/category/${id}`,
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  },

  getServices() {
    return instance.get('api/category/service',
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  },

  getService(id) {
    return instance.get(`api/category/service/${id}`,
      {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`}
      })
      .catch(e => errorHandler(e))
  }
}
