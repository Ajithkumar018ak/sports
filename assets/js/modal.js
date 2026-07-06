/* ==========================================================================
   PREMIUM ANIMATED AUTHENTICATION CONTROLLER (modal.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const loginTriggers = document.querySelectorAll('.login-trigger');
  const modalOverlay = document.querySelector('.modal-overlay');
  
  if (!modalOverlay) return;

  const eyeOpenSvg = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;

  const eyeClosedSvg = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  `;

  // Inject premium HTML content dynamically
  modalOverlay.innerHTML = `
    <div class="modal-wrapper">
      <button class="modal-close-btn" aria-label="Close Portal Modal">
        <svg viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div class="auth-slider-container">
        
        <!-- LOGIN CARD -->
        <div class="auth-card" id="login-card">
          <div class="modal-header">
            <h3 class="modal-title">Welcome Back</h3>
            <p class="modal-subtitle">Access your Apex Sports portal and track your metrics</p>
          </div>
          <form id="login-form" novalidate>
            <div class="select-wrapper">
              <label class="select-label" for="login-role">Login As</label>
              <select class="custom-select" id="login-role">
                <option value="Player">Player Login</option>
                <option value="Admin">Admin Login</option>
              </select>
            </div>
            
            <div class="input-group">
              <input type="email" id="login-email" class="floating-input" placeholder=" " required autocomplete="email">
              <label for="login-email" class="floating-label">Email Address</label>
            </div>
            
            <div class="input-group password-group">
              <input type="password" id="login-password" class="floating-input" placeholder=" " required autocomplete="current-password">
              <label for="login-password" class="floating-label">Password</label>
              <button type="button" class="password-toggle-btn" aria-label="Toggle password visibility">
                ${eyeOpenSvg}
              </button>
            </div>

            <div class="input-group password-group">
              <input type="password" id="login-confirm-password" class="floating-input" placeholder=" " required autocomplete="new-password">
              <label for="login-confirm-password" class="floating-label">Confirm Password</label>
              <button type="button" class="password-toggle-btn" aria-label="Toggle password visibility">
                ${eyeOpenSvg}
              </button>
            </div>

            <div class="password-strength-container" id="login-strength-container" style="display: none;">
              <div class="strength-meter-bar"><div class="strength-meter-fill"></div></div>
              <span class="strength-meter-text">Strength: Weak</span>
            </div>

            <div class="password-match-container" id="login-match-container" style="display: none;">
              <span class="match-text">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Passwords match
              </span>
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" id="login-remember">
                <span>Remember Me</span>
              </label>
              <a href="#" class="forgot-link" id="login-forgot-link">Forgot Password?</a>
            </div>
            
            <button type="submit" class="btn btn-primary modal-submit-btn">Login</button>
            <div class="modal-divider">OR</div>
            <p class="modal-footer-text">Don't have an account? <a href="#" id="to-signup-trigger">Create Account</a></p>
          </form>
        </div>

        <!-- SIGNUP CARD -->
        <div class="auth-card" id="signup-card">
          <div class="modal-header">
            <h3 class="modal-title">Join the Academy</h3>
            <p class="modal-subtitle">Sign up for high performance athletic coaching</p>
          </div>
          <form id="signup-form" novalidate>
            <div class="role-selection-container">
              <label class="select-label">Register As</label>
              <div class="role-cards-grid">
                <div class="role-card active" data-role="Player">
                  <div class="role-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                      <path d="M9.8 19L11 15.5L8 12.5L10.5 8L15.5 10L18.5 7.5"/>
                      <path d="M14.5 14L12.5 19H9.5"/>
                    </svg>
                  </div>
                  <div class="role-card-label">Player</div>
                </div>
                <div class="role-card" data-role="Coach">
                  <div class="role-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8a4 4 0 0 0 4-4V7a3 3 0 0 0-3-3z"/>
                      <path d="M16 8h5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5"/>
                      <line x1="8" y1="4" x2="8" y2="9"/>
                      <circle cx="7" cy="11" r="1.5"/>
                    </svg>
                  </div>
                  <div class="role-card-label">Coach</div>
                </div>
              </div>
              <input type="hidden" id="signup-role" value="Player">
            </div>

            <div class="input-group">
              <input type="text" id="signup-name" class="floating-input" placeholder=" " required autocomplete="name">
              <label for="signup-name" class="floating-label">Full Name</label>
            </div>
            
            <div class="input-group">
              <input type="email" id="signup-email" class="floating-input" placeholder=" " required autocomplete="email">
              <label for="signup-email" class="floating-label">Email Address</label>
            </div>
            
            <div class="input-group password-group">
              <input type="password" id="signup-password" class="floating-input" placeholder=" " required autocomplete="new-password">
              <label for="signup-password" class="floating-label">Password</label>
              <button type="button" class="password-toggle-btn" aria-label="Toggle password visibility">
                ${eyeOpenSvg}
              </button>
            </div>

            <div class="input-group password-group">
              <input type="password" id="signup-confirm-password" class="floating-input" placeholder=" " required autocomplete="new-password">
              <label for="signup-confirm-password" class="floating-label">Confirm Password</label>
              <button type="button" class="password-toggle-btn" aria-label="Toggle password visibility">
                ${eyeOpenSvg}
              </button>
            </div>

            <div class="password-strength-container" id="signup-strength-container" style="display: none;">
              <div class="strength-meter-bar"><div class="strength-meter-fill"></div></div>
              <span class="strength-meter-text">Strength: Weak</span>
            </div>

            <div class="password-match-container" id="signup-match-container" style="display: none;">
              <span class="match-text">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Passwords match
              </span>
            </div>
            
            <button type="submit" class="btn btn-primary modal-submit-btn">Create Account</button>
            <div class="modal-divider">OR</div>
            <p class="modal-footer-text">Already have an account? <a href="#" id="to-login-trigger">Login</a></p>
          </form>
        </div>

      </div>
    </div>
  `;

  // Get DOM References from injected modal
  const modalWrapper = modalOverlay.querySelector('.modal-wrapper');
  const modalClose = modalOverlay.querySelector('.modal-close-btn');
  const toSignupTrigger = modalOverlay.querySelector('#to-signup-trigger');
  const toLoginTrigger = modalOverlay.querySelector('#to-login-trigger');
  
  const loginForm = modalOverlay.querySelector('#login-form');
  const signupForm = modalOverlay.querySelector('#signup-form');

  // Role cards selection click handler for signup
  const roleCards = modalOverlay.querySelectorAll('.role-card');
  const signupRoleInput = modalOverlay.querySelector('#signup-role');
  
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      if (signupRoleInput) {
        signupRoleInput.value = card.getAttribute('data-role');
      }
    });
  });

  // Input elements
  const loginEmail = modalOverlay.querySelector('#login-email');
  const loginPassword = modalOverlay.querySelector('#login-password');
  const loginConfirm = modalOverlay.querySelector('#login-confirm-password');
  
  const signupName = modalOverlay.querySelector('#signup-name');
  const signupEmail = modalOverlay.querySelector('#signup-email');
  const signupPassword = modalOverlay.querySelector('#signup-password');
  const signupConfirm = modalOverlay.querySelector('#signup-confirm-password');

  // Trigger elements configuration
  loginTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      modalWrapper.classList.remove('show-signup');
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    resetForms();
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Switch modal panels with sliding animations
  toSignupTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    modalWrapper.classList.add('show-signup');
  });

  toLoginTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    modalWrapper.classList.remove('show-signup');
  });

  // Helper validation routines
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(input, msg) {
    const group = input.closest('.input-group');
    if (!group) return;
    group.classList.remove('success');
    group.classList.add('error');
    
    // Trigger local shake wiggles on the invalid input box
    group.classList.remove('shake-error');
    group.offsetHeight; // trigger layout reflow
    group.classList.add('shake-error');
    
    let errorSpan = group.querySelector('.error-message');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'error-message';
      group.appendChild(errorSpan);
    }
    errorSpan.textContent = msg;
  }

  function clearError(input) {
    const group = input.closest('.input-group');
    if (!group) return;
    group.classList.remove('error');
    group.classList.remove('shake-error');
    const errorSpan = group.querySelector('.error-message');
    if (errorSpan) errorSpan.remove();
  }

  function setSuccess(input) {
    clearError(input);
    const group = input.closest('.input-group');
    if (group) group.classList.add('success');
  }

  function resetValidationState(input) {
    clearError(input);
    const group = input.closest('.input-group');
    if (group) {
      group.classList.remove('success');
      group.classList.remove('error');
      group.classList.remove('shake-error');
    }
  }

  function resetForms() {
    loginForm.reset();
    signupForm.reset();
    [loginEmail, loginPassword, loginConfirm, signupName, signupEmail, signupPassword, signupConfirm].forEach(input => {
      resetValidationState(input);
    });
    
    modalOverlay.querySelectorAll('.password-strength-container, .password-match-container').forEach(el => {
      el.style.display = 'none';
    });

    modalOverlay.querySelectorAll('.password-group input').forEach(input => {
      input.type = 'password';
    });
    modalOverlay.querySelectorAll('.password-toggle-btn').forEach(btn => {
      btn.innerHTML = eyeOpenSvg;
    });

    const successPanel = modalWrapper.querySelector('.success-panel');
    if (successPanel) successPanel.remove();
    modalWrapper.querySelector('.auth-slider-container').style.display = 'flex';

    // Reset signup role selection cards
    if (signupRoleInput) {
      signupRoleInput.value = 'Player';
    }
    roleCards.forEach(c => {
      if (c.getAttribute('data-role') === 'Player') {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
  }

  // Password visibility eye icons controller
  modalOverlay.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.closest('.password-group').querySelector('input');
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = eyeClosedSvg;
      } else {
        input.type = 'password';
        btn.innerHTML = eyeOpenSvg;
      }
    });
  });

  // Password strength algorithm
  function computeStrength(password) {
    if (!password) return { score: 0, label: 'Weak', color: '#ef4444' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let label = 'Weak';
    let color = '#ef4444';
    if (score === 2) {
      label = 'Medium';
      color = '#f59e0b';
    } else if (score === 3) {
      label = 'Strong';
      color = '#22c55e';
    } else if (score === 4) {
      label = 'Excellent';
      color = '#15803d';
    }
    return { score, label, color };
  }

  // Setup input handlers for real-time validation and strength meters
  function bindPasswordEngine(passInput, confirmInput, strengthCont, matchCont) {
    const fill = strengthCont.querySelector('.strength-meter-fill');
    const text = strengthCont.querySelector('.strength-meter-text');

    function check() {
      const passVal = passInput.value;
      const confirmVal = confirmInput.value;

      // Strength Validation
      if (passVal) {
        strengthCont.style.display = 'flex';
        const strength = computeStrength(passVal);
        fill.style.width = `${(strength.score / 4) * 100}%`;
        fill.style.backgroundColor = strength.color;
        text.textContent = `Strength: ${strength.label}`;
        text.style.color = strength.color;

        if (strength.score >= 2) {
          setSuccess(passInput);
        } else {
          resetValidationState(passInput);
        }
      } else {
        strengthCont.style.display = 'none';
        resetValidationState(passInput);
      }

      // Match Confirmation checks
      if (passVal && confirmVal) {
        if (passVal === confirmVal) {
          matchCont.style.display = 'flex';
          setSuccess(confirmInput);
          matchCont.style.animation = 'none';
          matchCont.offsetHeight;
          matchCont.style.animation = 'matchBadgeReveal 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both';
        } else {
          matchCont.style.display = 'none';
          resetValidationState(confirmInput);
        }
      } else {
        matchCont.style.display = 'none';
        resetValidationState(confirmInput);
      }
    }

    passInput.addEventListener('input', check);
    confirmInput.addEventListener('input', check);
  }

  // Bind password checkers
  bindPasswordEngine(
    loginPassword,
    loginConfirm,
    modalOverlay.querySelector('#login-strength-container'),
    modalOverlay.querySelector('#login-match-container')
  );

  bindPasswordEngine(
    signupPassword,
    signupConfirm,
    modalOverlay.querySelector('#signup-strength-container'),
    modalOverlay.querySelector('#signup-match-container')
  );

  // Email validation bindings
  [loginEmail, signupEmail].forEach(emailInput => {
    emailInput.addEventListener('input', () => {
      const val = emailInput.value.trim();
      if (!val) {
        resetValidationState(emailInput);
      } else if (validateEmail(val)) {
        setSuccess(emailInput);
      } else {
        clearError(emailInput);
      }
    });
  });

  // Full Name validation
  signupName.addEventListener('input', () => {
    const val = signupName.value.trim();
    if (val.length >= 2) {
      setSuccess(signupName);
    } else {
      resetValidationState(signupName);
    }
  });

  // macOS-style Shake card on failed submit
  function shakeFormCard(formElement) {
    const wrapper = formElement.closest('.modal-wrapper');
    if (wrapper) {
      wrapper.classList.remove('shake-error');
      wrapper.offsetHeight; // trigger reflow
      wrapper.classList.add('shake-error');
      setTimeout(() => {
        wrapper.classList.remove('shake-error');
      }, 500);
    }
  }

  // Handle Login submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Validate email
    const emailVal = loginEmail.value.trim();
    if (!emailVal) {
      showError(loginEmail, 'Email address is required');
      valid = false;
    } else if (!validateEmail(emailVal)) {
      showError(loginEmail, 'Please enter a valid email address');
      valid = false;
    }

    // Validate password
    const passVal = loginPassword.value;
    if (!passVal) {
      showError(loginPassword, 'Password is required');
      valid = false;
    } else {
      const strength = computeStrength(passVal);
      if (strength.score < 2) {
        showError(loginPassword, 'Password is too weak');
        valid = false;
      }
    }

    // Validate confirm password
    const confirmVal = loginConfirm.value;
    if (!confirmVal) {
      showError(loginConfirm, 'Please confirm your password');
      valid = false;
    } else if (confirmVal !== passVal) {
      showError(loginConfirm, 'Passwords do not match');
      valid = false;
    }

    if (!valid) {
      shakeFormCard(loginForm);
      return;
    }

    // Redirect logic
    const role = modalOverlay.querySelector('#login-role').value;
    modalWrapper.querySelector('.auth-slider-container').style.display = 'none';
    
    const successPanel = document.createElement('div');
    successPanel.className = 'success-panel reveal fade-up active';
    successPanel.style.textAlign = 'center';
    successPanel.style.padding = '44px';
    successPanel.innerHTML = `
      <div class="flex-center" style="margin-bottom: 24px; display: flex; justify-content: center;">
        <div style="width: 72px; height: 72px; border-radius: 50%; background-color: var(--color-sports-green-tint); display: flex; align-items: center; justify-content: center; color: var(--color-sports-green);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
      <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--color-dark-slate);">Welcome Back!</h3>
      <p style="color: var(--color-text-secondary); margin-bottom: 30px;">Successfully logged in as <strong>${role}</strong>.<br>Preparing your customized training dashboard...</p>
      <div class="sports-spinner" style="margin: 0 auto 20px auto; border-color: var(--color-sports-green) transparent transparent transparent;"></div>
    `;
    modalWrapper.appendChild(successPanel);

    setTimeout(() => {
      const loaderOverlay = document.getElementById('loader-overlay');
      if (loaderOverlay) {
        loaderOverlay.classList.remove('loaded');
      }
      document.body.classList.remove('page-loaded');
      
      setTimeout(() => {
        if (role === 'Player') {
          window.location.href = 'player-dashboard.html';
        } else if (role === 'Coach') {
          window.location.href = 'coach-dashboard.html';
        } else if (role === 'Admin') {
          window.location.href = 'admin-dashboard.html';
        }
      }, 400);
    }, 1500);
  });

  // Handle Signup submission
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Validate Name
    const nameVal = signupName.value.trim();
    if (nameVal.length < 2) {
      showError(signupName, 'Full Name must be at least 2 characters');
      valid = false;
    }

    // Validate email
    const emailVal = signupEmail.value.trim();
    if (!emailVal) {
      showError(signupEmail, 'Email address is required');
      valid = false;
    } else if (!validateEmail(emailVal)) {
      showError(signupEmail, 'Please enter a valid email address');
      valid = false;
    }

    // Validate password
    const passVal = signupPassword.value;
    if (!passVal) {
      showError(signupPassword, 'Password is required');
      valid = false;
    } else {
      const strength = computeStrength(passVal);
      if (strength.score < 2) {
        showError(signupPassword, 'Password must be stronger (at least Medium)');
        valid = false;
      }
    }

    // Validate confirm password
    const confirmVal = signupConfirm.value;
    if (!confirmVal) {
      showError(signupConfirm, 'Please confirm your password');
      valid = false;
    } else if (confirmVal !== passVal) {
      showError(signupConfirm, 'Passwords do not match');
      valid = false;
    }

    if (!valid) {
      shakeFormCard(signupForm);
      return;
    }

    const role = modalOverlay.querySelector('#signup-role').value;
    modalWrapper.querySelector('.auth-slider-container').style.display = 'none';
    
    const successPanel = document.createElement('div');
    successPanel.className = 'success-panel reveal fade-up active';
    successPanel.style.textAlign = 'center';
    successPanel.style.padding = '44px';
    successPanel.innerHTML = `
      <div class="flex-center" style="margin-bottom: 24px; display: flex; justify-content: center;">
        <div style="width: 72px; height: 72px; border-radius: 50%; background-color: var(--color-sports-green-tint); display: flex; align-items: center; justify-content: center; color: var(--color-sports-green);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
      <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--color-dark-slate);">Account Created!</h3>
      <p style="color: var(--color-text-secondary); margin-bottom: 30px;">Successfully registered as <strong>${role}</strong>.<br>Redirecting to your new dashboard portal...</p>
      <div class="sports-spinner" style="margin: 0 auto 20px auto; border-color: var(--color-sports-green) transparent transparent transparent;"></div>
    `;
    modalWrapper.appendChild(successPanel);

    setTimeout(() => {
      const loaderOverlay = document.getElementById('loader-overlay');
      if (loaderOverlay) {
        loaderOverlay.classList.remove('loaded');
      }
      document.body.classList.remove('page-loaded');
      
      setTimeout(() => {
        if (role === 'Player') {
          window.location.href = 'player-dashboard.html';
        } else if (role === 'Coach') {
          window.location.href = 'coach-dashboard.html';
        }
      }, 400);
    }, 1500);
  });

});
