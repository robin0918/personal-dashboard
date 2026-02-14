// Todo List - 核心逻辑

const API_URL = 'http://localhost:8081';

async function fetchAPI(path, options = {}) {
    try {
        const response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: { 'Content-Type': 'application/json', ...options.headers }
        });
        if (response.ok) return await response.json();
    } catch (e) {
        console.log('API 不可用');
    }
    return null;
}

const DataManager = {
    KEY: 'todo_tasks',

    async getAll() {
        const data = await fetchAPI('/api/tasks');
        if (data) {
            localStorage.setItem(this.KEY, JSON.stringify(data));
            return data;
        }
        const local = localStorage.getItem(this.KEY);
        return local ? JSON.parse(local) : [];
    },

    async add(task) {
        const tasks = await this.getAll();
        task.id = Date.now().toString();
        task.createdAt = new Date().toISOString();
        task.completed = false;
        tasks.unshift(task);

        localStorage.setItem(this.KEY, JSON.stringify(tasks));
        await fetchAPI('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task)
        });
        return task;
    },

    async toggle(id) {
        const tasks = await this.getAll();
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            localStorage.setItem(this.KEY, JSON.stringify(tasks));
            await fetchAPI('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(task)
            });
        }
    },

    async update(id, updates) {
        const tasks = await this.getAll();
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            localStorage.setItem(this.KEY, JSON.stringify(tasks));
            await fetchAPI('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(tasks[index])
            });
        }
    },

    async delete(id) {
        const tasks = await this.getAll();
        const filtered = tasks.filter(t => t.id !== id);
        localStorage.setItem(this.KEY, JSON.stringify(filtered));
        await fetchAPI('/api/delete', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    }
};

// 标签颜色
const TagColors = {
    '工作': '#1d9bf0',
    '生活': '#00ba7c',
    '学习': '#7856ff',
    '健康': '#f4212e',
    '默认': '#71767b'
};

const UIManager = {
    currentFilter: 'all',
    deleteId: null,

    init() {
        this.bindEvents();
        this.loadTasks();
    },

    bindEvents() {
        // 添加任务
        document.getElementById('saveTaskBtn').addEventListener('click', () => this.addTask());
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // 筛选
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.renderTasks();
            });
        });

        // 搜索
        document.getElementById('searchInput').addEventListener('input', () => this.renderTasks());

        // 编辑弹窗
        document.getElementById('closeEditModal').addEventListener('click', () => this.closeModal('editModal'));
        document.getElementById('cancelEdit').addEventListener('click', () => this.closeModal('editModal'));
        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEdit();
        });

        // 删除弹窗
        document.getElementById('cancelDelete').addEventListener('click', () => this.closeModal('deleteModal'));
        document.getElementById('confirmDelete').addEventListener('click', () => this.confirmDelete());

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal(modal.id);
            });
        });
    },

    async addTask() {
        const title = document.getElementById('taskInput').value.trim();
        const tag = document.getElementById('tagInput').value.trim() || '默认';
        const dueDate = document.getElementById('dateInput').value;
        const dueTime = document.getElementById('timeInput').value;

        if (!title) return;

        await DataManager.add({
            title,
            tag,
            dueDate: dueDate || null,
            dueTime: dueTime || null
        });

        document.getElementById('taskInput').value = '';
        document.getElementById('tagInput').value = '';
        document.getElementById('dateInput').value = '';
        document.getElementById('timeInput').value = '';

        await this.loadTasks();
        this.showToast('任务已添加');
    },

    async loadTasks() {
        let tasks = await DataManager.getAll();

        // 按时间排序（最近的排在前面）
        tasks.sort((a, b) => {
            // 未完成的任务优先
            if (a.completed !== b.completed) return a.completed - b.completed;

            // 按日期+时间排序
            const dateA = a.dueDate ? new Date(a.dueDate + (a.dueTime ? 'T' + a.dueTime : '')) : new Date(8640000000000000);
            const dateB = b.dueDate ? new Date(b.dueDate + (b.dueTime ? 'T' + b.dueTime : '')) : new Date(8640000000000000);
            return dateA - dateB;
        });

        localStorage.setItem('todo_tasks', JSON.stringify(tasks));
        this.updateCounts(tasks);
        this.renderTasks(tasks);
    },

    updateCounts(tasks) {
        document.getElementById('countAll').textContent = tasks.length;
        document.getElementById('countActive').textContent = tasks.filter(t => !t.completed).length;
        document.getElementById('countCompleted').textContent = tasks.filter(t => t.completed).length;
    },

    async renderTasks(tasksParam = null) {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        let tasks = tasksParam || await DataManager.getAll();

        // 筛选
        if (this.currentFilter === 'active') {
            tasks = tasks.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            tasks = tasks.filter(t => t.completed);
        }

        // 搜索
        if (searchTerm) {
            tasks = tasks.filter(t => t.title.toLowerCase().includes(searchTerm));
        }

        const container = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');

        if (tasks.length === 0) {
            container.innerHTML = '';
            emptyState.classList.add('show');
            return;
        }

        emptyState.classList.remove('show');

        const today = new Date().toISOString().split('T')[0];

        container.innerHTML = tasks.map(task => {
            const tagColor = TagColors[task.tag] || TagColors['默认'];
            let dateClass = '';
            let dateIcon = '';
            
            if (task.dueDate) {
                const taskDateTime = task.dueDate + (task.dueTime ? 'T' + task.dueTime : '');
                const taskDate = new Date(taskDateTime);
                const now = new Date();
                
                if (taskDate > now && !task.completed) {
                    const diffHours = (taskDate - now) / (1000 * 60 * 60);
                    if (diffHours <= 1) {
                        dateClass = 'overdue';
                        dateIcon = '🔔';
                    } else if (diffHours <= 24) {
                        dateClass = 'soon';
                        dateIcon = '⏰';
                    }
                }
                
                if (task.dueDate < today && !task.completed) {
                    dateClass = 'overdue';
                    dateIcon = '⚠️';
                }
            }

            return `
                <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="UIManager.toggleTask('${task.id}')"></div>
                    <div class="task-content">
                        <div class="task-title">${this.escapeHtml(task.title)}</div>
                        <div class="task-meta">
                            <span class="task-tag" style="background: ${tagColor}20; color: ${tagColor}">${this.escapeHtml(task.tag)}</span>
                            ${task.dueDate ? `
                                <span class="task-date ${dateClass}">
                                    ${dateIcon} ${task.dueDate}
                                    ${task.dueTime ? ' ' + task.dueTime : ''}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="task-action-btn edit" onclick="UIManager.openEditModal('${task.id}')">✏️</button>
                        <button class="task-action-btn delete" onclick="UIManager.openDeleteModal('${task.id}')">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    async toggleTask(id) {
        await DataManager.toggle(id);
        await this.loadTasks();
    },

    async openEditModal(id) {
        const tasks = await DataManager.getAll();
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTaskContent').value = task.title;
        document.getElementById('editTag').value = task.tag;
        document.getElementById('editDate').value = task.dueDate || '';
        document.getElementById('editTime').value = task.dueTime || '';
        document.getElementById('editModal').classList.add('active');
    },

    async saveEdit() {
        const id = document.getElementById('editTaskId').value;
        const updates = {
            title: document.getElementById('editTaskContent').value.trim(),
            tag: document.getElementById('editTag').value.trim() || '默认',
            dueDate: document.getElementById('editDate').value || null,
            dueTime: document.getElementById('editTime').value || null
        };

        if (!updates.title) return;

        await DataManager.update(id, updates);
        this.closeModal('editModal');
        await this.loadTasks();
        this.showToast('任务已更新');
    },

    openDeleteModal(id) {
        this.deleteId = id;
        document.getElementById('deleteModal').classList.add('active');
    },

    async confirmDelete() {
        if (this.deleteId) {
            await DataManager.delete(this.deleteId);
            this.deleteId = null;
            this.closeModal('deleteModal');
            await this.loadTasks();
            this.showToast('任务已删除');
        }
    },

    closeModal(id) {
        document.getElementById(id).classList.remove('active');
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = 'position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: var(--accent-green); color: white; padding: 12px 24px; border-radius: 9999px; font-weight: 600; z-index: 2000; animation: fadeIn 0.3s;';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => UIManager.init());
