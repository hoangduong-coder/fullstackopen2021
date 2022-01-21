/* eslint-disable indent */
import blogService from '../services/blogs'

export const newBlog = (blog) => {
    return async dispatch => {
        const addNewBlog = await blogService.createBlog(blog)
        dispatch({
            type: 'NEW_BLOG',
            addNewBlog
        })
    }
}

export const initializeBlog = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const updatedBlog = {
            url: blog.url,
            author: blog.author,
            title: blog.title,
            likes: blog.likes + 1
        }
        const likedBlog = await blogService.update(blog.id, updatedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            likedBlog
        })
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.deleteBlog(blog.id)
        dispatch({
            type: 'DELETE_BLOG',
            blog
        })
    }
}

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'NEW_BLOG':
            return [...state, action.addNewBlog]
        case 'INIT_BLOG':
            return action.blogs
        case 'LIKE_BLOG':
            return state.map(blog => blog.id !== action.likedBlog.id ? blog : action.likedBlog)
        case 'DELETE_BLOG':
            return state.filter(obj => obj.id !== action.blog.id)
        default:
            return state
    }
}

export default blogReducer