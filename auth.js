// auth.js
// ===================== AUTENTICACIÓN =====================

function showAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'flex';
}

function hideAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'none';
}

// Registrar usuario
function registerUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      hideAuthModal();
      updateUserUI(userCredential.user);
    })
    .catch(error => {
      alert('Error al registrar: ' + error.message);
    });
}

// Login
function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      hideAuthModal();
      updateUserUI(userCredential.user);
    })
    .catch(error => {
      alert('Error al iniciar sesión: ' + error.message);
    });
}

// Logout
function logoutUser() {
  auth.signOut().then(() => {
    updateUserUI(null);
  });
}

// Actualizar UI según usuario logueado
function updateUserUI(user) {
  const authStatus = document.getElementById('auth-status');
  const authBtn = document.getElementById('auth-btn');
  if (!authStatus || !authBtn) return;

  if (user) {
    authStatus.innerHTML = `👤 ${user.email}`;
    authBtn.textContent = 'Cerrar sesión';
    authBtn.onclick = logoutUser;
    // Mostrar enlace a perfil
    const profileLink = document.getElementById('profile-link');
    if (profileLink) profileLink.style.display = 'inline';
  } else {
    authStatus.textContent = 'No logueado';
    authBtn.textContent = 'Iniciar sesión / Registrarse';
    authBtn.onclick = showAuthModal;
    const profileLink = document.getElementById('profile-link');
    if (profileLink) profileLink.style.display = 'none';
  }
}

// Verificar estado de autenticación al cargar cada página
auth.onAuthStateChanged(user => {
  updateUserUI(user);
});

// Eventos del modal
document.addEventListener('DOMContentLoaded', function() {
  // Botón de login/register en el modal
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      loginUser(email, password);
    });
  }
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
  // Cerrar modal al hacer clic fuera
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideAuthModal();
    });
  }
});

// Cambio de tabs en el modal
document.addEventListener('DOMContentLoaded', function() {
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
      Object.keys(panels).forEach(key => {
        panels[key].style.display = key === target ? 'block' : 'none';
      });
    });
  });
});