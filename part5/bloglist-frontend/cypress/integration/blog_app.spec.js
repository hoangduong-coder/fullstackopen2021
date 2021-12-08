/* eslint-disable indent */

describe('Blog app', function() {
    let user

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        user = {
            name: 'Howard',
            username: 'e1900281',
            password: '12345678'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })

    describe('Login', function() {
        it('Testing successful log in attempt', function() {
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#loginButton').click()
            cy.contains('Howard has logged in')
        })
        it('Testing failed log in attempt', function() {
            cy.get('#username').type(user.username)
            cy.get('#password').type('000000')
            cy.get('#loginButton').click()
            cy.get('.error').should('contain', 'Wrong username or password')
            cy.get('html').should('not.contain', 'Hoang Duong has logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'e1900281', password: '12345678' })
        })

        it('A blog can be created', function() {
            cy.contains('Create new blog').click()
            cy.get('#title').type('Boring testing')
            cy.get('#author').type('E.W.Henry')
            cy.get('#url').type('stackoverflow.com/forum/e12313454seda43')
            cy.get('#createBlogButton').click()
            cy.get('html').should('contain', 'Boring testing')
        })

        describe('a blog exists', () => {
            beforeEach(() => {
                cy.createBlog({
                    title: 'Another testing',
                    author: 'William',
                    url: 'www.fullstack2021.com'
                })
            })
            it('user can like the blog', () => {
                cy.contains('View more').click()
                cy.get('.likeButton').click()
                cy.get('.newBlog').contains('Likes: 1')
                cy.get('.likeButton').click()
                cy.get('.newBlog').contains('Likes: 2')
            })
            it('user can delete the blog', () => {
                cy.contains('View more').click()
                cy.get('.deleteButton').click()
                cy.get('.sucess').should('contain', 'Delete Another testing (William) successfully!')
                cy.get('html').should('not.contain', 'www.fullstack2021.com')
            })
        })
    })
})