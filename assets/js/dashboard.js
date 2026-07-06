/* ==========================================================================
   PREMIUM DASHBOARD CONTROLLER (dashboard.js)
   Single Page Application Tab Switching, Lists Filtering, and Dynamic Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Loader Overlay and Skeleton Loading System
  const loaderOverlay = document.getElementById('loader-overlay');
  const skeletonLayer = document.getElementById('skeleton-layer');
  const dashboardContent = document.querySelector('.dashboard-content-loaded');

  if (loaderOverlay) {
    setTimeout(() => {
      loaderOverlay.style.opacity = '0';
      setTimeout(() => {
        loaderOverlay.style.display = 'none';
      }, 400);
    }, 400);
  }

  // Simulate loading skeletons
  setTimeout(() => {
    if (skeletonLayer) {
      skeletonLayer.style.opacity = '0';
      setTimeout(() => {
        skeletonLayer.style.display = 'none';
        if (dashboardContent) {
          dashboardContent.style.opacity = '1';
        }
        triggerCounterAnimations();
        triggerSVGPathDrawing();
        triggerProgressFilling();
      }, 400);
    }
  }, 1000);

  // 2. Responsive Mobile Drawer Sidebar Toggles
  const drawerToggle = document.getElementById('drawer-toggle');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const drawerOverlay = document.querySelector('.menu-drawer-overlay') || document.createElement('div');
  
  if (!drawerOverlay.parentNode) {
    drawerOverlay.className = 'menu-drawer-overlay';
    document.body.appendChild(drawerOverlay);
  }

  let scrollPosition = 0;

  const openSidebar = () => {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    sidebar.classList.add('drawer-open');
    drawerOverlay.classList.add('show');
    
    // Lock body scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPosition}px`;
  };

  const closeSidebar = () => {
    sidebar.classList.remove('drawer-open');
    drawerOverlay.classList.remove('show');
    
    // Restore body scrolling
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  };

  if (drawerToggle && sidebar) {
    drawerToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('drawer-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    drawerOverlay.addEventListener('click', closeSidebar);
  }

  // 3. Dropdowns (Alert bell and user profile menu)
  function setupDropdown(triggerId, menuId) {
    const trigger = document.getElementById(triggerId);
    const menu = document.getElementById(menuId);

    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.dropdown-menu').forEach(m => {
          if (m !== menu) m.classList.remove('show');
        });
        menu.classList.toggle('show');
      });
    }
  }

  setupDropdown('notification-trigger', 'notification-menu');
  setupDropdown('profile-trigger', 'profile-menu');

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-container')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });

  // 4. SPA Tab Switching Navigation Engine
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const dashboardViews = document.querySelectorAll('.dashboard-view');

  function switchView(targetId) {
    if (!targetId) return;

    // Toggle active views
    dashboardViews.forEach(view => {
      if (view.id === targetId) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Toggle active sidebar link highlights
    sidebarLinks.forEach(link => {
      const linkTarget = link.getAttribute('data-target') || 'view-dashboard';
      if (linkTarget === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Dynamically update the header page title
    const activeLink = document.querySelector(`.sidebar-link[data-target="${targetId}"]`);
    const headerTitle = document.getElementById('header-page-title');
    if (headerTitle) {
      if (activeLink) {
        headerTitle.textContent = activeLink.querySelector('span').textContent;
      } else if (targetId === 'view-dashboard') {
        headerTitle.textContent = 'Dashboard';
      }
    }

    // Close mobile drawers
    if (sidebar && sidebar.classList.contains('drawer-open')) {
      closeSidebar();
    }

    // Re-trigger visual animations on navigation swap
    triggerCounterAnimations();
    triggerSVGPathDrawing();
    triggerProgressFilling();
  }

  // Set initial dynamic page title on load
  const initialActiveLink = document.querySelector('.sidebar-link.active');
  const initialHeaderTitle = document.getElementById('header-page-title');
  if (initialActiveLink && initialHeaderTitle) {
    initialHeaderTitle.textContent = initialActiveLink.querySelector('span').textContent;
  }

  // Scroll-aware sticky top header effects (add shadow/blur on scroll)
  const headerEl = document.querySelector('.dashboard-header');
  window.addEventListener('scroll', () => {
    if (headerEl) {
      if (window.scrollY > 10) {
        headerEl.classList.add('header-scrolled');
      } else {
        headerEl.classList.remove('header-scrolled');
      }
    }
  });

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        e.preventDefault();
        switchView(targetId);
      }
    });
  });

  // Logo home click resets view to Main Dashboard Overview
  const homeLogoLinks = document.querySelectorAll('.dashboard-home-trigger');
  homeLogoLinks.forEach(logo => {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('view-dashboard');
    });
  });

  // 5. Dynamic Animation Handlers
  function triggerCounterAnimations() {
    const statsCounters = document.querySelectorAll('.active .counter-number');
    statsCounters.forEach(counter => {
      const rawText = counter.innerText.trim();
      const hasPlus = rawText.includes('+');
      const hasPercent = rawText.includes('%');
      const targetVal = parseFloat(rawText.replace(/[^0-9.]/g, ''));

      if (isNaN(targetVal)) return;

      let startVal = 0;
      const duration = 1200;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress * (2 - progress); 
        const currentVal = Math.round(startVal + (targetVal - startVal) * eased);

        counter.innerText = `${currentVal}${hasPercent ? '%' : ''}${hasPlus ? '+' : ''}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.innerText = rawText;
        }
      }
      requestAnimationFrame(update);
    });
  }

  function triggerSVGPathDrawing() {
    const paths = document.querySelectorAll('.active .chart-path');
    paths.forEach(path => {
      path.style.strokeDashoffset = '1000';
      path.offsetHeight; // trigger reflow
      path.style.strokeDashoffset = '0';
    });
  }

  function triggerProgressFilling() {
    const bars = document.querySelectorAll('.active .progress-bar-fill');
    bars.forEach(bar => {
      const progressTarget = bar.getAttribute('data-progress-target');
      if (progressTarget) {
        bar.style.width = '0%';
        bar.offsetHeight; // trigger reflow
        bar.style.width = progressTarget;
      }
    });
  }

  // 6. Action Hooks & Form Handlers

  // --- PLAYER PANEL ACTIONS ---
  // Edit Profile Form Submit
  const editProfileForm = document.getElementById('edit-profile-form');
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedName = document.getElementById('profile-name').value.trim();
      const updatedEmail = document.getElementById('profile-email').value.trim();
      
      // Update display tags in navbar avatar profile triggers
      const nameTags = document.querySelectorAll('.user-name, #user-display-name');
      nameTags.forEach(el => {
        el.textContent = updatedName;
      });

      const profileHeaderName = document.getElementById('profile-card-name');
      if (profileHeaderName) profileHeaderName.textContent = updatedName;

      alert('Profile details updated successfully!');
    });
  }

  // Change Password Form
  const profilePasswordForm = document.getElementById('profile-password-form');
  if (profilePasswordForm) {
    profilePasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('profile-new-password').value;
      const confirm = document.getElementById('profile-confirm-password').value;

      if (pass.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
      }

      if (pass !== confirm) {
        // macOS shake cards wiggles
        profilePasswordForm.closest('.profile-form-card').classList.remove('shake-error');
        profilePasswordForm.closest('.profile-form-card').offsetHeight;
        profilePasswordForm.closest('.profile-form-card').classList.add('shake-error');
        setTimeout(() => {
          profilePasswordForm.closest('.profile-form-card').classList.remove('shake-error');
        }, 500);
        alert('Passwords do not match.');
        return;
      }

      alert('Password updated successfully!');
      profilePasswordForm.reset();
    });
  }

  // --- COACH PANEL ACTIONS ---
  // Search Athlete in Coach directory table
  const athleteSearchInput = document.getElementById('athlete-search-input');
  const athletesTable = document.getElementById('athletes-table');
  if (athleteSearchInput && athletesTable) {
    athleteSearchInput.addEventListener('input', () => {
      const val = athleteSearchInput.value.toLowerCase();
      const rows = athletesTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(val)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // Create training program form
  const createPlanForm = document.getElementById('create-plan-form');
  if (createPlanForm) {
    createPlanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-plan-title').value;
      alert(`Training Plan "${title}" deployed successfully to squad targets!`);
      createPlanForm.reset();
    });
  }

  // Mark Roster Attendance triggers
  const attendanceButtons = document.querySelectorAll('.btn-attendance');
  const presentCountSpan = document.getElementById('attendance-present-count');
  const absentCountSpan = document.getElementById('attendance-absent-count');

  function recalculateAttendance() {
    if (!presentCountSpan || !absentCountSpan) return;
    const presentActive = document.querySelectorAll('.btn-attendance.present.active').length;
    const absentActive = document.querySelectorAll('.btn-attendance.absent.active').length;
    presentCountSpan.textContent = presentActive;
    absentCountSpan.textContent = absentActive;
  }

  attendanceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const actionsGroup = btn.closest('.attendance-actions');
      const siblings = actionsGroup.querySelectorAll('.btn-attendance');
      siblings.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      recalculateAttendance();
    });
  });

  // Coach Export summary button
  const coachExportBtn = document.getElementById('btn-coach-export');
  if (coachExportBtn) {
    coachExportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Squad reports exported and saved in downloads directory.');
    });
  }

  // --- ADMIN PANEL ACTIONS ---
  // Show/Hide Add Player form drawer panel
  const btnAddPlayer = document.getElementById('btn-add-player-form');
  const addPlayerPanel = document.getElementById('add-player-panel');
  const btnCancelPlayer = document.getElementById('btn-cancel-player');

  if (btnAddPlayer && addPlayerPanel) {
    btnAddPlayer.addEventListener('click', () => {
      addPlayerPanel.style.display = 'block';
    });
  }

  if (btnCancelPlayer && addPlayerPanel) {
    btnCancelPlayer.addEventListener('click', () => {
      addPlayerPanel.style.display = 'none';
    });
  }

  // Add Athlete to Admin player database list
  const addPlayerForm = document.getElementById('add-player-form');
  const playersTable = document.getElementById('players-table');
  const totalPlayersCardValue = document.getElementById('stats-total-players');

  if (addPlayerForm && playersTable) {
    addPlayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-player-name').value.trim();
      const email = document.getElementById('new-player-email').value.trim();
      const coach = document.getElementById('new-player-coach').value;
      const status = document.getElementById('new-player-status').value;

      // Create new row
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="athlete-meta">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" alt="Avatar" class="athlete-avatar">
            <span class="athlete-name">${name}</span>
          </div>
        </td>
        <td>${email}</td>
        <td>${coach}</td>
        <td><span class="status-badge status-${status.toLowerCase()}">${status}</span></td>
        <td>
          <button class="btn-attendance delete-player-trigger" data-name="${name}">Delete</button>
        </td>
      `;

      playersTable.querySelector('tbody').appendChild(tr);

      // Increment statistics
      if (totalPlayersCardValue) {
        const currentCount = parseInt(totalPlayersCardValue.textContent.trim()) || 0;
        totalPlayersCardValue.textContent = currentCount + 1;
      }

      // Re-bind delete actions
      bindDeleteAthleteTriggers();

      addPlayerForm.reset();
      addPlayerPanel.style.display = 'none';
      alert(`Athlete ${name} has been successfully registered on the academy roster.`);
    });
  }

  // Search athlete rows filter inside Player tab database
  const playerSearchInput = document.getElementById('player-search');
  if (playerSearchInput && playersTable) {
    playerSearchInput.addEventListener('input', () => {
      const val = playerSearchInput.value.toLowerCase();
      const rows = playersTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const nameText = row.querySelector('.athlete-name').innerText.toLowerCase();
        if (nameText.includes(val)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // Delete Athlete trigger routine
  function bindDeleteAthleteTriggers() {
    const deleteButtons = document.querySelectorAll('.delete-player-trigger');
    deleteButtons.forEach(btn => {
      // Remove existing listener to prevent double fire
      btn.onclick = (e) => {
        e.preventDefault();
        const row = btn.closest('tr');
        const name = btn.getAttribute('data-name');
        if (confirm(`Are you sure you want to remove ${name} from the active database?`)) {
          row.remove();
          // Decrement statistics
          if (totalPlayersCardValue) {
            const currentCount = parseInt(totalPlayersCardValue.textContent.trim()) || 0;
            totalPlayersCardValue.textContent = Math.max(0, currentCount - 1);
          }
        }
      };
    });
  }

  bindDeleteAthleteTriggers();

  // Export report buttons inside Admin Tab
  const btnExportReport = document.getElementById('btn-export-report');
  if (btnExportReport) {
    btnExportReport.addEventListener('click', (e) => {
      e.preventDefault();
      const scope = document.getElementById('export-scope').value;
      const format = document.getElementById('export-format').value;
      alert(`Generating ${scope} Report in ${format} format. Your download will start momentarily.`);
    });
  }

  // --- LOGOUT ACTION ENGINE ---
  const logoutTriggers = document.querySelectorAll('.logout-link');
  logoutTriggers.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (loaderOverlay) {
        loaderOverlay.style.display = 'flex';
        loaderOverlay.style.opacity = '1';
      }
      document.body.classList.remove('page-loaded');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    });
  });

});
