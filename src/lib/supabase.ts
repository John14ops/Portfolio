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

export const createSkill = async (skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('skills')
    .insert([skill])
    .select()
  return { data, error }
}

export const updateSkill = async (id: string, skill: Partial<Skill>) => {
  const { data, error } = await supabase
    .from('skills')
    .update({ ...skill, updated_at: new Date().toISOString() })
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

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
  return { data, error }
}

export const updateProject = async (id: string, project: Partial<Project>) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...project, updated_at: new Date().toISOString() })
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
  const { data, error } = await supabase
    .from('site_settings')
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq('id', '1')
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
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{
      ...formData,
      created_at: new Date().toISOString()
    }])
    .select()
  return { data, error }
}