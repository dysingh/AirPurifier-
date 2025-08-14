// Show modal with information
function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    const modal = new bootstrap.Modal(document.getElementById('infoModal'));
    modal.show();
}

// Show order form
function showOrderForm() {
    const modal = new bootstrap.Modal(document.getElementById('orderModal'));
    modal.show();
}

// Submit order function
function submitOrder() {
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const model = document.getElementById('model').value;
    
    // Simple validation
    if (!name || !email || !phone || !address || !model) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        
        // Hide order modal
        const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
        orderModal.hide();
        
        // Show success modal
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        
        // Reset form
        document.getElementById('orderForm').reset();
        
        // Log order (in real app, send to server)
        console.log('Order submitted:', { name, email, phone, address, model });
    }, 2000);
}

// Loading functions
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.id = 'loadingSpinner';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
    loading.style.display = 'flex';
}

function hideLoading() {
    const loading = document.getElementById('loadingSpinner');
    if (loading) {
        loading.remove();
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    submitOrder();
});

// Add animation to elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .feature-box, h2, h3, p');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .feature-box, h2, h3, p');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation check
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});

// Email validation function
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation function
function isValidPhone(phone) {
    const re = /^[0-9+\-\s\(\)]{10,15}$/;
    return re.test(phone);
}

// Real-time form validation
document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !isValidEmail(this.value)) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
    } else if (this.value) {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    if (this.value && !isValidPhone(this.value)) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
    } else if (this.value) {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
    }
});

// Auto-hide alerts after 5 seconds
function autoHideAlerts() {
    setTimeout(() => {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
            bsAlert.close();
        });
    }, 5000);
}

// Initialize tooltips (if any)
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Track user interactions
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // In a real app, you would send this to Google Analytics or similar
}

// Add tracking to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// Track form submissions
document.getElementById('orderForm').addEventListener('submit', function() {
    trackEvent('Form', 'Submit', 'Order Form');
});