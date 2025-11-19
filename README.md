TaskMaster Pro — Advanced To-Do List
codesand deployment link : https://y5klp9.csb.app/

Project Difficulty Level: Medium-Hard Technologies Used: HTML5, CSS3, JavaScript (ES6+)

Project Overview TaskMaster Pro is a feature-rich web-based to-do list application designed for personal productivity. It demonstrates modern UI patterns, state management with JavaScript, and uses browser APIs like localStorage for persistence.

Features ✅ User Interface

Responsive layout with a collapsible sidebar and mobile-friendly menu
Sticky header and flexible main content area for lists and details
Statistics and charts view to review productivity over time
✅ Task Management

Add tasks with an input or by pressing Enter
Advanced options: priority, category, due date, tags, and description
Edit tasks inline with Save/Cancel functionality
Mark tasks complete/uncomplete with checkbox
Delete tasks with confirmation
✅ Views & Filters

Pre-built navigation filters: All Tasks, Today, Upcoming, Completed, Incomplete, Overdue
Priority filters (Urgent / High / Medium / Low) and category filters (Personal / Work / Shopping / Health / Finance / Other)
Sort by date, priority, alphabetical, and more
✅ Persistence and I/O

Uses localStorage to persist tasks and settings across sessions
Export and import tasks as JSON for backup and transfer
✅ Accessibility & UX

Accessible markup (aria-labels, roles for alerts)
Keyboard shortcuts: Enter to add, Enter/Escape while editing tasks
Advanced toggles and confirmation dialogs for destructive actions
How to Use Getting Started

Open index.html in any modern browser to run locally
No server or build step is necessary
Add Tasks

Type a task description in the main input and press Enter or click Add
Use Advanced Options to set Priority, Category, Due Date, Tags, or add a description
Edit and Manage

Click Edit on a task to update the text; Save or Cancel to confirm
Use Delete to remove an individual task (confirmation shown)
Clear completed tasks or Clear all tasks from Settings
Export / Import

Use the sidebar buttons to Export tasks (download JSON) or Import from a JSON file
Developer Notes Code Structure

index.html — App layout, components, and modal markup
styles.css — Full styling with CSS variables, Flexbox, and Grid
script.js — App logic, event listeners, state (task array), and persistence
Primary JavaScript responsibilities

State management (tasks, current view, settings)
Storage helpers (save and load tasks & settings to/from localStorage)
Rendering and DOM updates for filters, sorting, and counts
Export/import JSON functionality
Extending the App

Add server sync: create a backend API to save user tasks
Implement drag-and-drop for reordering tasks or uploading files
Add a calendar integration for due dates and reminders
Add unit tests for core logic (e.g., filtering, sorting, task creation)
Browser Support

Works on modern browsers: Chrome, Firefox, Edge, Safari
License

This project is a learning/educational project.
Credits

Developer: [Your Name]
Built with vanilla HTML, CSS and JavaScript
Enjoy using TaskMaster Pro for better productivity! ✅
