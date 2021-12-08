/* eslint-disable indent */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Basic testing', () => {
    let component
    const blog = {
        title: 'Testing blog',
        author: 'admin',
        url: 'www.forum.fi',
        likes: 0,
        user: {
            name: 'Teacher',
            username: 'admin'
        }
    }
    const mockHandler = jest.fn()
    beforeEach(() => {
        component = render(<Blog blog={blog} userData={blog.user} updateAction={mockHandler} deleteAction={mockHandler}/>)
    })
    test('basic blog display', () => {
        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).toHaveTextContent(blog.author)
        const toggableHide = component.container.querySelector('.hideDefault')
        expect(toggableHide).toHaveStyle('display: none')
    })
    test('display likes and url', () => {
        const buttonView = component.getByText('View more')
        fireEvent.click(buttonView)

        const toggableHide = component.container.querySelector('.hideDefault')

        expect(toggableHide).not.toHaveStyle('display: none')
        expect(toggableHide).toHaveTextContent(blog.url)
        expect(toggableHide).toHaveTextContent(blog.likes)

        const buttonHide = component.getByText('Hide')
        fireEvent.click(buttonHide)
        expect(toggableHide).toHaveStyle('display: none')
    })
    test('test like button', () => {
        const buttonView = component.getByText('View more')
        fireEvent.click(buttonView)

        const like = component.getByText('Like')
        fireEvent.click(like)
        fireEvent.click(like)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})