export interface AuthInput {
  email: string;
  password: string;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar: string | null;
  first_name?: string;
  last_name?: string;
  skills?: SkillMastery[];
  languages?: LanguageProficiency[];
}

export interface Department {
  id: string;
  name: string;
}

export interface Position {
  id: string;
  name: string;
}

export interface SkillMastery {
  name: string;
  categoryId?: string;
  mastery: "Novice" | "Advanced" | "Competent" | "Proficient" | "Expert";
}
export interface SkillCategory {
  id: string;
  name: string;
  order: number;
  parent?: SkillCategory | null;
  children: SkillCategory[];
}

export interface Skill {
  id: string;
  created_at: string;
  name: string;
  category?: SkillCategory | null;
  category_name?: string | null;
  category_parent_name?: string | null;
}

export interface LanguageProficiency {
  name: string;
  proficiency: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
}

export interface CvProject {
  id: string;
  name: string;
  description: string;
  roles: string[];
  responsibilities: string[];
}

export interface Cv {
  id: string;
  created_at: string;
  name: string;
  education?: string;
  description: string;
  user?: User;
  projects?: CvProject[];
  skills: SkillMastery[];
  languages: LanguageProficiency[];
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  is_verified: boolean;
  profile: Profile;
  role: "Employee" | "Admin";
  cvs?: Cv[];
  department?: Department;
  department_name?: string;
  position?: Position;
  position_name?: string;
}

export interface AuthResult {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface DeleteResult {
  affected: number;
}

export interface UpdateTokenResult {
  access_token: string;
  refresh_token: string;
}

export type Void = null;
