//print notification/error in console
const info = (...text) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...text)
    }
}

const error = (...err) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...err)
    }
}

module.exports = {
    info, error
}