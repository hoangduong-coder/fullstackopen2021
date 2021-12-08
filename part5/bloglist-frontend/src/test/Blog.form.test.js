/* eslint-disable indent */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

test('Create blog', () => {
    const blog = {
        title: 'Testing blog',
        author: 'admin',
        url: 'www.forum.fi',
        likes: 0,
        user: {
            name: 'Teacher',
            username: 'admin',
        },
    }

    const createNote = jest.fn()
    const component = render(
        <BlogForm handleBlog={createNote} />
    )
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    fireEvent.change(titleInput, {
        target: { value: blog.title }
    })
    fireEvent.change(authorInput, {
        target: { value: blog.author }
    })
    fireEvent.change(urlInput, {
        target: { value: blog.url }
    })
    fireEvent.submit(form)
    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].title).toBe(blog.title)
    expect(createNote.mock.calls[0][0].author).toBe(blog.author)
    expect(createNote.mock.calls[0][0].url).toBe(blog.url)
})