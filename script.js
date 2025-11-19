/**
 * TaskMaster Pro - Advanced To-Do List Application
 * Complete implementation with all features
 */

// ===== STATE =====
let tasks = [];
let currentView = 'all';
let currentSort = 'dateDesc';
let searchQuery = '';
let editingTaskId = null;
let settings = {
    darkMode: false,
    notifications: true,
    autoSave: true,
    confirmDelete: true,
    soundEffects: false
};
let userProfile = {
    name: 'User',
    email: 'user@example.com'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    applySettings();
    updateAllCounts();
    renderCurrentView();
    attachEventListeners();
    updateUserProfile();
    setMinDate();
});

// ===== EVENT LISTENERS =====
function attachEventListeners() {
    // Mobile menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const view = e.currentTarget.dataset.view;
            if (view) {
                switchView(view);
            }
        });
    });

    // Add task
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', handleAddTask);
    }
    
    if (taskInput) {
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAddTask();
            }
        });
        taskInput.addEventListener('input', hideError);
    }

    // Advanced options toggle
    const advancedToggleBtn = document.getElementById('advancedToggleBtn');
    if (advancedToggleBtn) {
        advancedToggleBtn.addEventListener('click', toggleAdvancedOptions);
    }

    // Search
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }

    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderCurrentView();
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Refresh
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            renderCurrentView();
            showNotification('Tasks refreshed!');
        });
    }

    // Profile
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', openProfileModal);
    }

    const closeProfileModal = document.getElementById('closeProfileModal');
    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', () => closeModal('editProfileModal'));
    }

    const cancelProfileBtn = document.getElementById('cancelProfileBtn');
    if (cancelProfileBtn) {
        cancelProfileBtn.addEventListener('click', () => closeModal('editProfileModal'));
    }

    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', saveProfile);
    }

    // Export/Import
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportTasks);
    }

    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');
    
    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => importFile.click());
        importFile.addEventListener('change', importTasks);
    }

    // Settings
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
            settings.darkMode = e.target.checked;
            applySettings();
            saveSettings();
        });
    }

    const notificationsToggle = document.getElementById('notificationsToggle');
    if (notificationsToggle) {
        notificationsToggle.addEventListener('change', (e) => {
            settings.notifications = e.target.checked;
            saveSettings();
        });
    }

    const autoSaveToggle = document.getElementById('autoSaveToggle');
    if (autoSaveToggle) {
        autoSaveToggle.addEventListener('change', (e) => {
            settings.autoSave = e.target.checked;
            saveSettings();
        });
    }

    const confirmDeleteToggle = document.getElementById('confirmDeleteToggle');
    if (confirmDeleteToggle) {
        confirmDeleteToggle.addEventListener('change', (e) => {
            settings.confirmDelete = e.target.checked;
            saveSettings();
        });
    }

    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        soundToggle.addEventListener('change', (e) => {
            settings.soundEffects = e.target.checked;
            saveSettings();
        });
    }

    // Settings buttons
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllTasks);
    }

    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    if (clearCompletedBtn) {
        clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    }

    const resetSettingsBtn = document.getElementById('resetSettingsBtn');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', resetSettings);
    }

    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
}

/**
 * Handle adding a new task
 */
function handleAddTask() {
    const taskText = taskInput.value.trim();
    
    // Validate input
    if (!validateTaskInput(taskText)) {
        return;
    }
    
    // Create new task object
    const newTask = {
        id: generateUniqueId(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // Add task to array
    tasks.unshift(newTask);
    
    // Save to local storage
    saveTasksToStorage();
    
    // Clear input
    taskInput.value = '';
    
    // Re-render tasks
    renderTasks();
    
    // Show success feedback
    taskInput.focus();
}

/**
 * Validate task input
 * @param {string} text - Task text to validate
 * @returns {boolean} - Whether input is valid
 */
function validateTaskInput(text) {
    if (!text) {
        showError('Please enter a task description');
        return false;
    }
    
    if (text.length > 200) {
        showError('Task description is too long (max 200 characters)');
        return false;
    }
    
    return true;
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    taskInput.focus();
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.remove('show');
}

/**
 * Generate a unique ID for tasks
 * @returns {string} - Unique identifier
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Render tasks based on current filter
 */
function renderTasks() {
    // Get filtered tasks
    const filteredTasks = getFilteredTasks();
    
    // Clear task list
    taskList.innerHTML = '';
    
    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        taskList.style.display = 'none';
    } else {
        emptyState.classList.remove('show');
        taskList.style.display = 'flex';
        
        // Render each task
        filteredTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }
    
    // Update task count
    updateTaskCount();
}

/**
 * Get tasks based on current filter
 * @returns {Array} - Filtered tasks
 */
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

/**
 * Create a task element
 * @param {Object} task - Task object
 * @returns {HTMLElement} - Task list item element
 */
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.taskId = task.id;
    
    // Create checkbox
    const checkbox = document.createElement('div');
    checkbox.className = `task-checkbox ${task.completed ? 'checked' : ''}`;
    checkbox.addEventListener('click', () => toggleTaskComplete(task.id));
    
    // Create task content
    const content = document.createElement('div');
    content.className = 'task-content';
    
    // Create task text
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;
    
    content.appendChild(textSpan);
    
    // Create actions
    const actions = document.createElement('div');
    actions.className = 'task-actions';
    
    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => startEditTask(task.id));
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    // Append all elements
    li.appendChild(checkbox);
    li.appendChild(content);
    li.appendChild(actions);
    
    return li;
}

/**
 * Toggle task completion status
 * @param {string} taskId - ID of task to toggle
 */
function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
    }
}

/**
 * Start editing a task
 * @param {string} taskId - ID of task to edit
 */
function startEditTask(taskId) {
    // Prevent multiple edits at once
    if (editingTaskId) {
        return;
    }
    
    editingTaskId = taskId;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    const content = taskElement.querySelector('.task-content');
    const actions = taskElement.querySelector('.task-actions');
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-input';
    input.value = task.text;
    input.maxLength = 200;
    
    // Replace text with input
    content.innerHTML = '';
    content.appendChild(input);
    input.focus();
    input.select();
    
    // Update actions
    actions.innerHTML = '';
    
    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'action-btn save-btn';
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => saveEditTask(taskId, input.value));
    
    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'action-btn cancel-btn';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => cancelEditTask());
    
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    
    // Save on Enter, cancel on Escape
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEditTask(taskId, input.value);
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cancelEditTask();
        }
    });
}

/**
 * Save edited task
 * @param {string} taskId - ID of task to save
 * @param {string} newText - New task text
 */
function saveEditTask(taskId, newText) {
    const trimmedText = newText.trim();
    
    // Validate input
    if (!trimmedText) {
        showError('Task description cannot be empty');
        return;
    }
    
    if (trimmedText.length > 200) {
        showError('Task description is too long (max 200 characters)');
        return;
    }
    
    // Update task
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.text = trimmedText;
        saveTasksToStorage();
        editingTaskId = null;
        renderTasks();
    }
}

/**
 * Cancel editing task
 */
function cancelEditTask() {
    editingTaskId = null;
    renderTasks();
}

/**
 * Delete a task
 * @param {string} taskId - ID of task to delete
 */
function deleteTask(taskId) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasksToStorage();
        renderTasks();
    }
}

/**
 * Clear all completed tasks
 */
function handleClearCompleted() {
    const completedTasks = tasks.filter(t => t.completed);
    
    if (completedTasks.length === 0) {
        return;
    }
    
    if (confirm(`Delete ${completedTasks.length} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasksToStorage();
        renderTasks();
    }
}

/**
 * Update filter button states
 */
function updateFilterButtons() {
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Update task count display
 */
function updateTaskCount() {
    const totalTasks = tasks.length;
    const activeTasks = tasks.filter(t => !t.completed).length;
    const completedTasks = tasks.filter(t => t.completed).length;
    
    let countText = '';
    
    switch (currentFilter) {
        case 'active':
            countText = `${activeTasks} active task${activeTasks !== 1 ? 's' : ''}`;
            break;
        case 'completed':
            countText = `${completedTasks} completed task${completedTasks !== 1 ? 's' : ''}`;
            break;
        default:
            countText = `${totalTasks} task${totalTasks !== 1 ? 's' : ''}`;
            if (activeTasks > 0 && completedTasks > 0) {
                countText += ` (${activeTasks} active, ${completedTasks} completed)`;
            }
    }
    
    taskCount.textContent = countText;
}

/**
 * Save tasks to local storage
 */
function saveTasksToStorage() {
    try {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to local storage:', error);
        showError('Failed to save tasks. Please check your browser settings.');
    }
}

/**
 * Load tasks from local storage
 */
function loadTasksFromStorage() {
    try {
        const storedTasks = localStorage.getItem('todoTasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    } catch (error) {
        console.error('Error loading tasks from local storage:', error);
        tasks = [];
    }
}
