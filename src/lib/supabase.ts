import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables not configured. Admin features will not work.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  url: string
  technologies: string[]
  category: string
  status: 'completed' | 'in_progress'
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: string
  hero_title: string
  hero_subtitle: string
  years_experience: number
  technologies_count: number
  projects_count: number
  about_text: string
  email: string
  phone: string
  location: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  status: 'new' | 'read' | 'replied'
}

// Auth functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Skills CRUD
export const getSkills = async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
  return { data, error }
}

export const getSkillsByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('category', category)
    .order('level', { ascending: false })
  return { data, error }
}

export const searchSkills = async (query: string) => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .or(`name.ilike.%${query}%,category.ilike.%${query}%`)
    .order('category', { ascending: true })
  return { data, error }
}

export const createSkill = async (skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) => {
  // Validation
  if (!skill.name || skill.name.trim().length === 0) {
    return { data: null, error: { message: 'Le nom de la compétence est requis' } }
  }
  if (skill.level < 0 || skill.level > 100) {
    return { data: null, error: { message: 'Le niveau doit être entre 0 et 100' } }
  }

  const { data, error } = await supabase
    .from('skills')
    .insert([{
      ...skill,
      name: skill.name.trim(),
      category: skill.category.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
  return { data, error }
}

export const updateSkill = async (id: string, skill: Partial<Skill>) => {
  // Validation
  if (skill.name && skill.name.trim().length === 0) {
    return { data: null, error: { message: 'Le nom de la compétence est requis' } }
  }
  if (skill.level !== undefined && (skill.level < 0 || skill.level > 100)) {
    return { data: null, error: { message: 'Le niveau doit être entre 0 et 100' } }
  }

  const { data, error } = await supabase
    .from('skills')
    .update({ 
      ...skill,
      name: skill.name?.trim(),
      category: skill.category?.trim(),
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select()
  return { data, error }
}

export const deleteSkill = async (id: string) => {
  const { data, error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)
  return { data, error }
}

// Projects CRUD
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const getProjectsByStatus = async (status: 'completed' | 'in_progress') => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const searchProjects = async (query: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
  // Validation
  if (!project.title || project.title.trim().length === 0) {
    return { data: null, error: { message: 'Le titre du projet est requis' } }
  }
  if (!project.description || project.description.trim().length === 0) {
    return { data: null, error: { message: 'La description du projet est requise' } }
  }
  if (!project.url || project.url.trim().length === 0) {
    return { data: null, error: { message: 'L\'URL du projet est requise' } }
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([{
      ...project,
      title: project.title.trim(),
      description: project.description.trim(),
      url: project.url.trim(),
      category: project.category.trim(),
      technologies: project.technologies.filter(tech => tech.trim().length > 0),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
  return { data, error }
}

export const updateProject = async (id: string, project: Partial<Project>) => {
  // Validation
  if (project.title && project.title.trim().length === 0) {
    return { data: null, error: { message: 'Le titre du projet est requis' } }
  }
  if (project.description && project.description.trim().length === 0) {
    return { data: null, error: { message: 'La description du projet est requise' } }
  }
  if (project.url && project.url.trim().length === 0) {
    return { data: null, error: { message: 'L\'URL du projet est requise' } }
  }

  const { data, error } = await supabase
    .from('projects')
    .update({ 
      ...project,
      title: project.title?.trim(),
      description: project.description?.trim(),
      url: project.url?.trim(),
      category: project.category?.trim(),
      technologies: project.technologies?.filter(tech => tech.trim().length > 0),
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select()
  return { data, error }
}

export const deleteProject = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
  return { data, error }
}

// Site Settings
export const getSiteSettings = async () => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single()
  return { data, error }
}

export const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
  // Validation
  if (settings.years_experience !== undefined && settings.years_experience < 0) {
    return { data: null, error: { message: 'Les années d\'expérience doivent être positives' } }
  }
  if (settings.technologies_count !== undefined && settings.technologies_count < 0) {
    return { data: null, error: { message: 'Le nombre de technologies doit être positif' } }
  }
  if (settings.projects_count !== undefined && settings.projects_count < 0) {
    return { data: null, error: { message: 'Le nombre de projets doit être positif' } }
  }

  // D'abord récupérer l'ID existant
  const { data: existingSettings } = await supabase
    .from('site_settings')
    .select('id')
    .limit(1)
    .single()

  if (!existingSettings) {
    return { data: null, error: { message: 'Aucun paramètre trouvé' } }
  }

  const { data, error } = await supabase
    .from('site_settings')
    .update({ 
      ...settings,
      hero_title: settings.hero_title?.trim(),
      hero_subtitle: settings.hero_subtitle?.trim(),
      about_text: settings.about_text?.trim(),
      email: settings.email?.trim(),
      phone: settings.phone?.trim(),
      location: settings.location?.trim(),
      updated_at: new Date().toISOString() 
    })
    .eq('id', existingSettings.id)
    .select()
  return { data, error }
}

// Contact form submission
export const submitContactForm = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  // Validation
  if (!formData.name || formData.name.trim().length === 0) {
    return { data: null, error: { message: 'Le nom est requis' } }
  }
  if (!formData.email || formData.email.trim().length === 0) {
    return { data: null, error: { message: 'L\'email est requis' } }
  }
  if (!formData.subject || formData.subject.trim().length === 0) {
    return { data: null, error: { message: 'Le sujet est requis' } }
  }
  if (!formData.message || formData.message.trim().length === 0) {
    return { data: null, error: { message: 'Le message est requis' } }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    return { data: null, error: { message: 'Format d\'email invalide' } }
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      status: 'new',
      created_at: new Date().toISOString()
    }])
    .select()
  return { data, error }
}

// Contact submissions management
export const getContactSubmissions = async () => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const updateContactSubmissionStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
    .select()
  return { data, error }
}

export const deleteContactSubmission = async (id: string) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id)
  return { data, error }
}

// Statistics
export const getStatistics = async () => {
  const [skillsResult, projectsResult, contactsResult] = await Promise.all([
    getSkills(),
    getProjects(),
    getContactSubmissions()
  ])

  const stats = {
    totalSkills: skillsResult.data?.length || 0,
    totalProjects: projectsResult.data?.length || 0,
    completedProjects: projectsResult.data?.filter(p => p.status === 'completed').length || 0,
    inProgressProjects: projectsResult.data?.filter(p => p.status === 'in_progress').length || 0,
    totalContacts: contactsResult.data?.length || 0,
    newContacts: contactsResult.data?.filter(c => c.status === 'new').length || 0,
    readContacts: contactsResult.data?.filter(c => c.status === 'read').length || 0,
    repliedContacts: contactsResult.data?.filter(c => c.status === 'replied').length || 0
  }

  return { data: stats, error: null }
}
