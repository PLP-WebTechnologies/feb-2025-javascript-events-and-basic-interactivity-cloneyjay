// DOM Elements
const form = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const strengthMeter = document.getElementById('strengthMeter');
const themeToggle = document.getElementById('themeToggle');
const accentColorPicker = document.getElementById('accentColor');
const animatedBox = document.getElementById('animatedBox');
const animateBtn = document.getElementById('animateBtn');

// Form Validation
const validateUsername = () => {
    const value = usernameInput.value.trim();
    const error = document.getElementById('usernameError');
    
    if (value.length < 3) {
        error.textContent = 'Username must be at least 3 characters long';
        return false;
    }
    error.textContent = '';
    return true;
};

const validateEmail = () => {
    const value = emailInput.value.trim();
    const error = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        error.textContent = 'Please enter a valid email address';
        return false;
    }
    error.textContent = '';
    return true;
};

// Add visual feedback for input fields
const addInputFeedback = (input) => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
};

[usernameInput, emailInput, passwordInput].forEach(addInputFeedback);

// Enhance password strength indicator with labels
const updatePasswordStrength = (strength) => {
    const strengthLabel = document.createElement('span');
    strengthLabel.style.fontSize = '0.8rem';
    strengthLabel.style.marginLeft = '0.5rem';
    strengthLabel.style.transition = 'all 0.3s ease';
    
    if (strength <= 25) {
        strengthLabel.textContent = 'Weak';
        strengthLabel.style.color = '#ff4444';
    } else if (strength <= 50) {
        strengthLabel.textContent = 'Fair';
        strengthLabel.style.color = '#ffa700';
    } else if (strength <= 75) {
        strengthLabel.textContent = 'Good';
        strengthLabel.style.color = '#4CAF50';
    } else {
        strengthLabel.textContent = 'Strong';
        strengthLabel.style.color = '#00C853';
    }
    
    const existingLabel = strengthMeter.nextElementSibling;
    if (existingLabel && existingLabel.tagName === 'SPAN') {
        existingLabel.remove();
    }
    strengthMeter.parentElement.appendChild(strengthLabel);
};

// Enhance password validation
const validatePassword = () => {
    const value = passwordInput.value;
    const error = document.getElementById('passwordError');
    
    let strength = 0;
    if (value.length >= 8) strength += 25;
    if (/[A-Z]/.test(value)) strength += 25;
    if (/[0-9]/.test(value)) strength += 25;
    if (/[^A-Za-z0-9]/.test(value)) strength += 25;
    
    strengthMeter.style.setProperty('--strength', `${strength}%`);
    strengthMeter.style.width = `${strength}%`;
    strengthMeter.style.backgroundColor = `hsl(${strength}, 70%, 45%)`;
    
    updatePasswordStrength(strength);
    
    if (value.length < 8) {
        error.textContent = 'Password must be at least 8 characters long';
        return false;
    }
    error.textContent = '';
    return true;
};

// Real-time validation
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Enhance form submission animation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isUsernameValid && isEmailValid && isPasswordValid) {
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.style.position = 'relative';
        submitBtn.innerHTML = `
            <span style="opacity: 0">Register</span>
            <span style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
                <svg width="24" height="24" viewBox="0 0 24 24" style="animation: spin 1s linear infinite">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="31.4 31.4">
                        <animate attributeName="stroke-dashoffset" from="0" to="62.8" dur="1s" repeatCount="indefinite"/>
                    </circle>
                </svg>
            </span>
        `;
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Success!';
            submitBtn.style.backgroundColor = 'var(--success-color)';
            submitBtn.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Register';
                submitBtn.style.backgroundColor = 'var(--primary-color)';
                submitBtn.style.transform = 'scale(1)';
                strengthMeter.style.width = '0%';
                const strengthLabel = strengthMeter.nextElementSibling;
                if (strengthLabel) strengthLabel.remove();
            }, 2000);
        }, 1500);
    }
});

// Theme toggling
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
    themeToggle.textContent = document.body.dataset.theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});

// Accent color customization
accentColorPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary-color', e.target.value);
});

// Animation
animateBtn.addEventListener('click', () => {
    animatedBox.classList.remove('bounce');
    void animatedBox.offsetWidth; // Trigger reflow
    animatedBox.classList.add('bounce');
});

// Interactive checkbox styling
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const label = checkbox.closest('.checkbox-label');
        if (checkbox.checked) {
            label.style.color = 'var(--primary-color)';
        } else {
            label.style.color = 'var(--text-color)';
        }
    });
});