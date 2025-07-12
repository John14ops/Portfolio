import React, { useState, useEffect } from 'react'
import { X, Plus, Edit, Trash2, Save, LogOut } from 'lucide-react'
import { 
  getCurrentUser, 
  signOut, 
  getSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSiteSettings,
  updateSiteSettings,
  type Skill,
  type Project,
  type SiteSettings
} from '../../lib/supabase'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'skills' | 'projects' | 'settings'>('skills')
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      checkUser()
      loadData()
    }
  }, [isOpen])

  const checkUser = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    if (!currentUser) {
      onClose()
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const [skillsResult, projectsResult, settingsResult] = await Promise.all([
        getSkills(),
        getProjects(),
        getSiteSettings()
      ])

      if (skillsResult.data) setSkills(skillsResult.data)
      if (projectsResult.data) setProjects(projectsResult.data)
      if (settingsResult.data) setSettings(settingsResult.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  const handleSaveSkill = async (skillData: any) => {
    try {
      if (editingItem?.id) {
        await updateSkill(editingItem.id, skillData)
      } else {
        await createSkill(skillData)
      }
      await loadData()
      setEditingItem(null)
      setIsCreating(false)
    } catch (error) {
      console.error('Error saving skill:', error)
    }
  }

  const handleDeleteSkill = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      try {
        await deleteSkill(id)
        await loadData()
      } catch (error) {
        console.error('Error deleting skill:', error)
      }
    }
  }

  const handleSaveProject = async (projectData: any) => {
    try {
      if (editingItem?.id) {
        await updateProject(editingItem.id, projectData)
      } else {
        await createProject(projectData)
      }
      await loadData()
      setEditingItem(null)
      setIsCreating(false)
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await deleteProject(id)
        await loadData()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const handleSaveSettings = async (settingsData: any) => {
    try {
      await updateSiteSettings(settingsData)
      await loadData()
      setEditingItem(null)
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Administration</h2>
            {user && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Connecté en tant que {user.email}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'skills', label: 'Compétences' },
            { id: 'projects', label: 'Projets' },
            { id: 'settings', label: 'Paramètres' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-medium transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'text-yellow-500 border-b-2 border-yellow-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <>
              {activeTab === 'skills' && (
                <SkillsTab
                  skills={skills}
                  onEdit={setEditingItem}
                  onDelete={handleDeleteSkill}
                  onCreate={() => setIsCreating(true)}
                  editingItem={editingItem}
                  isCreating={isCreating}
                  onSave={handleSaveSkill}
                  onCancel={() => {
                    setEditingItem(null)
                    setIsCreating(false)
                  }}
                />
              )}

              {activeTab === 'projects' && (
                <ProjectsTab
                  projects={projects}
                  onEdit={setEditingItem}
                  onDelete={handleDeleteProject}
                  onCreate={() => setIsCreating(true)}
                  editingItem={editingItem}
                  isCreating={isCreating}
                  onSave={handleSaveProject}
                  onCancel={() => {
                    setEditingItem(null)
                    setIsCreating(false)
                  }}
                />
              )}

              {activeTab === 'settings' && settings && (
                <SettingsTab
                  settings={settings}
                  onEdit={setEditingItem}
                  editingItem={editingItem}
                  onSave={handleSaveSettings}
                  onCancel={() => setEditingItem(null)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Skills Tab Component
const SkillsTab: React.FC<any> = ({ 
  skills, 
  onEdit, 
  onDelete, 
  onCreate, 
  editingItem, 
  isCreating, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: '',
    icon: ''
  })

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem)
    } else if (isCreating) {
      setFormData({ name: '', level: 50, category: '', icon: '' })
    }
  }, [editingItem, isCreating])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const categories = [...new Set(skills.map(skill => skill.category))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Gestion des Compétences</h3>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
        >
          <Plus size={18} />
          Ajouter une compétence
        </button>
      </div>

      {(editingItem || isCreating) && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de la compétence
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Catégorie
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Niveau (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icône (nom Lucide)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                placeholder="ex: Code, Database, etc."
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              <Save size={18} />
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {categories.map(category => (
          <div key={category} className="bg-white dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">{category}</h4>
            <div className="space-y-2">
              {skills.filter(skill => skill.category === category).map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-500 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => onEdit(skill)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-300"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(skill.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Projects Tab Component
const ProjectsTab: React.FC<any> = ({ 
  projects, 
  onEdit, 
  onDelete, 
  onCreate, 
  editingItem, 
  isCreating, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    technologies: [] as string[],
    category: '',
    status: 'completed' as 'completed' | 'in_progress'
  })

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem)
    } else if (isCreating) {
      setFormData({
        title: '',
        description: '',
        url: '',
        technologies: [],
        category: '',
        status: 'completed'
      })
    }
  }, [editingItem, isCreating])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleTechnologiesChange = (value: string) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech)
    setFormData({ ...formData, technologies })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Gestion des Projets</h3>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
        >
          <Plus size={18} />
          Ajouter un projet
        </button>
      </div>

      {(editingItem || isCreating) && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre du projet
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL du projet
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Catégorie
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Statut
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              >
                <option value="completed">Terminé</option>
                <option value="in_progress">En cours</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies (séparées par des virgules)
            </label>
            <input
              type="text"
              value={formData.technologies.join(', ')}
              onChange={(e) => handleTechnologiesChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              placeholder="React, TypeScript, Tailwind CSS"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              <Save size={18} />
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white dark:bg-gray-700 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white">{project.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {project.status === 'completed' ? 'Terminé' : 'En cours'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                >
                  Voir le projet →
                </a>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => onEdit(project)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-300"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Settings Tab Component
const SettingsTab: React.FC<any> = ({ settings, onEdit, editingItem, onSave, onCancel }) => {
  const [formData, setFormData] = useState(settings)

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem)
    } else {
      setFormData(settings)
    }
  }, [editingItem, settings])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Paramètres du Site</h3>
        {!editingItem && (
          <button
            onClick={() => onEdit(settings)}
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
          >
            <Edit size={18} />
            Modifier
          </button>
        )}
      </div>

      {editingItem ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre principal
              </label>
              <input
                type="text"
                value={formData.hero_title}
                onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sous-titre
              </label>
              <input
                type="text"
                value={formData.hero_subtitle}
                onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Années d'expérience
              </label>
              <input
                type="number"
                value={formData.years_experience}
                onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de technologies
              </label>
              <input
                type="number"
                value={formData.technologies_count}
                onChange={(e) => setFormData({ ...formData, technologies_count: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de projets
              </label>
              <input
                type="number"
                value={formData.projects_count}
                onChange={(e) => setFormData({ ...formData, projects_count: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Localisation
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Texte À propos
            </label>
            <textarea
              value={formData.about_text}
              onChange={(e) => setFormData({ ...formData, about_text: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              <Save size={18} />
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Titre principal</label>
              <p className="text-gray-900 dark:text-white">{settings.hero_title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Sous-titre</label>
              <p className="text-gray-900 dark:text-white">{settings.hero_subtitle}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Années d'expérience</label>
              <p className="text-gray-900 dark:text-white">{settings.years_experience}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Technologies</label>
              <p className="text-gray-900 dark:text-white">{settings.technologies_count}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Projets</label>
              <p className="text-gray-900 dark:text-white">{settings.projects_count}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
              <p className="text-gray-900 dark:text-white">{settings.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel