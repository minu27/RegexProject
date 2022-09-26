const strengthMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password-input')
const reasonsContainer = document.getElementById('reasons')

passwordInput.addEventListener('input', updateStrengthMeter)
updateStrengthMeter()

function updateStrengthMeter() {
    const weaknesses = calculatePasswordStrength(passwordInput.value)
    let strength = 100
    reasonsContainer.innerHTML = ''
    weaknesses.forEach(weakness => {
        if(weakness == null) return
        strength -= weakness.deduction
        const messageElement = document.createElement('div')
        messageElement.innerText = weakness.message
        reasonsContainer.appendChild(messageElement)
    })
    strengthMeter.style.setProperty('--strength', strength)
}
function calculatePasswordStrength(password) {
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    return weaknesses
}

function lengthWeakness(password) {
    const length = password.length

    if(length <= 5){
        return {
            message: 'Your password is too short',
            deduction: 40
        }
    }

    if(length <= 10){
        return {
            message: 'Your password could be longer',
            deduction: 15
        }
    }    
}

function lowercaseWeakness(password) {
    const matches = password.match(/[a-z]/g) || []

    if(matches.length === 0) {
        return {
            message: 'Your password has no lowercase characters',
            deduction: 20
        }
    }

    if(matches.length <= 2) {
        return {
            message: 'Your password could use more lowercase characters',
            deduction: 5
        }
    }
}