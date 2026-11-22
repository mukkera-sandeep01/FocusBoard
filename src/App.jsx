import { useMemo, useState } from 'react'
import {
  LayoutDashboard, CheckSquare, CalendarDays, Settings, Bell, Plus,
  Search, ChevronDown, Menu, X, Sparkles, SlidersHorizontal
} from 'lucide-react'
import { sampleTasks } from './data/sampleTasks'
import { useLocalStorage } from './hooks/useLocalStorage'
import StatCard from './components/StatCard'
import FocusNotes from './components/FocusNotes'
import TaskItem from './components/TaskItem'
import TaskForm from './components/TaskForm'

const statusTabs = ['All tasks', 'To do', 'In progress', 'Completed']

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard-tasks-v1', sampleTasks)
  const [activeTab, setActiveTab] = useState('All tasks')
  const [priorityFilter, setPriorityFilter] = useState('All priorities')
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const total = tasks.length
  const inProgress = tasks.filter((task) => task.status === 'In progress').length
  const completed = tasks.filter((task) => task.status === 'Completed').length
  const completion = total ? Math.round((completed / total) * 100) : 0

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = activeTab === 'All tasks' || task.status === activeTab
    const matchesPriority = priorityFilter === 'All priorities' || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  }), [tasks, search, activeTab, priorityFilter])

  const openCreate = () => { setEditingTask(null); setFormOpen(true) }
  const openEdit = (task) => { setEditingTask(task); setFormOpen(true) }

  const saveTask = (formData) => {
    if (editingTask) {
      setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...formData, id: task.id } : task))
    } else {
      setTasks((current) => [{ ...formData, id: Date.now() }, ...current])
    }
    setFormOpen(false)
    setEditingTask(null)
  }

  const deleteTask = (task) => {
    if (window.confirm(`Delete "${task.title}"? This action cannot be undone.`)) {
      setTasks((current) => current.filter((item) => item.id !== task.id))
    }
  }

  const updateStatus = (id, status) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task))
  }

  return (
    <div className="app-shell">
      {mobileNavOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={20} /></div>
          <span>focus<span className="brand-light">board</span></span>
          <button className="mobile-close icon-button" onClick={() => setMobileNavOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#dashboard"><LayoutDashboard size={18} /> Dashboard</a>
          <a className="nav-link" href="#tasks"><CheckSquare size={18} /> My tasks <span className="nav-count">{total}</span></a>
          <a className="nav-link" href="#tasks"><CalendarDays size={18} /> Calendar</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div className="tip-icon"><Sparkles size={17} /></div>
            <strong>Stay in your flow</strong>
            <p>Small steps every day lead to big things.</p>
          </div>
          <a className="nav-link" href="#settings"><Settings size={18} /> Settings</a>
          <div className="profile">
            <div className="avatar">S</div>
            <div><strong>My workspace</strong><small>Personal account</small></div>
            <ChevronDown size={16} />
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <button className="mobile-menu icon-button" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="breadcrumb">Workspace <span>/</span> <strong>Dashboard</strong></div>
          <div className="topbar-right">
            <span className="today-label">{new Date().toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
            <div className="avatar top-avatar">S</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <span className="eyebrow">YOUR PERSONAL SPACE</span>
              <h1>Good things take focus<span>.</span></h1>
              <p>Here's what's happening with your tasks today.</p>
            </div>
            <button className="button button-primary create-button" onClick={openCreate}><Plus size={18} /> Create task</button>
          </section>

          <section className="stats-grid" aria-label="Task overview">
            <StatCard type="total" label="Total tasks" value={total} note="Across your workspace" />
            <StatCard type="progress" label="In progress" value={inProgress} note="Tasks you're working on" />
            <StatCard type="completed" label="Completed" value={completed} note="Tasks finished so far" />
            <StatCard type="rate" label="Completion rate" value={`${completion}%`} note="Keep up the momentum" />
          </section>

          <FocusNotes />

          <section className="tasks-section" id="tasks">
            <div className="section-heading">
              <div>
                <span className="eyebrow">MAKE EVERY DAY COUNT</span>
                <h2>Your tasks <span className="task-count">{filteredTasks.length}</span></h2>
              </div>
              <button className="button button-outline" onClick={openCreate}><Plus size={17} /> Add task</button>
            </div>
            <div className="task-toolbar">
              <div className="tabs" role="tablist" aria-label="Filter tasks by status">
                {statusTabs.map((tab) => (
                  <button key={tab} role="tab" aria-selected={activeTab === tab}
                    className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab(tab)}>{tab}</button>
                ))}
              </div>
              <div className="task-filters">
                <label className="search-box">
                  <Search size={16} />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks..." aria-label="Search tasks by title" />
                </label>
                <label className="priority-filter">
                  <SlidersHorizontal size={15} />
                  <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} aria-label="Filter by priority">
                    <option>All priorities</option><option>High</option><option>Medium</option><option>Low</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="task-list">
              <div className="task-list-header"><span>TASK</span><span>PRIORITY</span><span>STATUS</span><span>DUE DATE</span><span>ACTIONS</span></div>
              {filteredTasks.length ? filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={openEdit} onDelete={deleteTask} onStatusChange={updateStatus} />
              )) : (
                <div className="empty-state">
                  <div className="empty-icon"><CheckSquare size={22} /></div>
                  <strong>No tasks found</strong>
                  <p>Try changing your search or filters, or create a new task.</p>
                  <button className="button button-primary" onClick={openCreate}><Plus size={16} /> Create task</button>
                </div>
              )}
            </div>
            <p className="list-footer">Showing {filteredTasks.length} of {total} tasks</p>
          </section>

          <footer className="footer"><span>© 2026 FocusBoard</span><span>Made for a more focused you <span className="footer-heart">♥</span></span></footer>
        </div>
      </main>

      {formOpen && <TaskForm task={editingTask} onSave={saveTask} onClose={() => setFormOpen(false)} />}
    </div>
  )
}
