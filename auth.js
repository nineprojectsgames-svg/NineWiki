// auth.js
function showAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'flex';
}

function hideAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'none';
}

function registerUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      hideAuthModal();
      updateUserUI(auth.currentUser);
    })
    .catch(error => alert('Error al registrar: ' + error.message));
}

function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      hideAuthModal();
      updateUserUI(auth.currentUser);
    })
    .catch(error => alert('Error al iniciar sesión: ' + error.message));
}

function logoutUser() {
  auth.signOut().then(() => updateUserUI(null));
}

function updateUserUI(user) {
  const authStatus = document.getElementById('auth-status');
  const authBtn = document.getElementById('auth-btn');
  const profileLink = document.getElementById('profile-link');
  if (!authStatus || !authBtn) return;

  if (user) {
    authStatus.textContent = `👤 ${user.email}`;
    authBtn.textContent = 'Cerrar sesión';
    authBtn.onclick = logoutUser;
    if (profileLink) profileLink.style.display = 'inline';
  } else {
    authStatus.textContent = 'No logueado';
    authBtn.textContent = 'Iniciar sesión';
    authBtn.onclick = showAuthModal;
    if (profileLink) profileLink.style.display = 'none';
  }
}

// Observador de autenticación
auth.onAuthStateChanged(user => {
  updateUserUI(user);
});

// Configurar eventos después de cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
  // Login
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      loginUser(email, password);
    });
  }

  // Register
  const registerBtn = document.getElementById('register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirm = document.getElementById('register-confirm').value;
      if (password !== confirm) {
        alert('Las contraseñas no coinciden');
        return;
      }
      registerUser(email, password);
    });
  }

  // Cambiar pestañas del modal
  const tabs = document.querySelectorAll('.auth-tab');
  const panels = {
    login: document.getElementById('auth-login'),
    register: document.getElementById('auth-register')
  };
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const target = this.dataset.tab;
      panels.login.style.display = target === 'login' ? 'block' : 'none';
      panels.register.style.display = target === 'register' ? 'block' : 'none';
    });
  });

  // Cerrar modal al hacer clic fuera
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideAuthModal();
    });
  }

  // Inicializar UI (por si ya hay usuario)
  updateUserUI(auth.currentUser);
});
