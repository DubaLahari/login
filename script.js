
        // DOM Elements
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const dashboard = document.getElementById('dashboard');
        const showRegister = document.getElementById('show-register');
        const showLogin = document.getElementById('show-login');
        const loginBtn = document.getElementById('login');
        const registerBtn = document.getElementById('register');
        const logoutBtn = document.getElementById('logout-btn');
        const loginError = document.getElementById('login-error');
        const registerError = document.getElementById('register-error');
        const registerSuccess = document.getElementById('register-success');
        const dashboardName = document.getElementById('dashboard-name');
        const dashboardEmail = document.getElementById('dashboard-email');

        // User data storage (in a real app, this would be server-side)
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

        // Check if user is already logged in
        if (currentUser) {
            showDashboard(currentUser);
        }

        // Event Listeners
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            clearMessages();
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            clearMessages();
        });

        loginBtn.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Validate login
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Successful login
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showDashboard(user);
            } else {
                // Failed login
                showMessage(loginError, 'Invalid email or password');
            }
        });

        registerBtn.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            // Clear previous messages
            clearMessages();

            // Validate registration
            if (password !== confirmPassword) {
                showMessage(registerError, 'Passwords do not match');
                return;
            }

            if (users.some(u => u.email === email)) {
                showMessage(registerError, 'Email already registered');
                return;
            }

            // Create new user
            const newUser = {
                name,
                email,
                password
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Show success message
            showMessage(registerSuccess, 'Registration successful! Please login.');
            
            // Clear form
            registerBtn.reset();
            
            // Show login form
            setTimeout(() => {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                clearMessages();
            }, 2000);
        });

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            currentUser = null;
            dashboard.style.display = 'none';
            loginForm.style.display = 'block';
            loginBtn.reset();
        });

        // Helper Functions
        function showDashboard(user) {
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
            dashboard.style.display = 'block';
            dashboardName.textContent = user.name;
            dashboardEmail.textContent = user.email;
        }

        function showMessage(element, message) {
            element.textContent = message;
            element.style.display = 'block';
        }

        function clearMessages() {
            loginError.style.display = 'none';
            registerError.style.display = 'none';
            registerSuccess.style.display = 'none';
        }

        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        }
  
