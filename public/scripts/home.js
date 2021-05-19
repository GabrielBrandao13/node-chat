const inputName = document.querySelector('input.input-name')
const warn = document.querySelector('.invalid-warn')
inputName.focus()


inputName.addEventListener('invalid', e => {
    e.preventDefault()
    inputInvalid(e.target, warn)
})

inputName.addEventListener('change', e => {
    inputValid(e.target, warn)
})

window.addEventListener('keydown', e => {
    inputValid(inputName, warn)
})

function inputInvalid(input, error) {
    input.classList.add('error')
    error.classList.remove('hidden')
    input.focus()
}
function inputValid(input, error) {
    input.classList.remove('error')
    error.classList.add('hidden')
}

