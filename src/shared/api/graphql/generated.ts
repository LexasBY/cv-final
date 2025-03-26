import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Void: { input: unknown; output: unknown };
};

export type AddCvProjectInput = {
  cvId: Scalars["ID"]["input"];
  end_date?: InputMaybe<Scalars["String"]["input"]>;
  projectId: Scalars["ID"]["input"];
  responsibilities: Array<Scalars["String"]["input"]>;
  roles: Array<Scalars["String"]["input"]>;
  start_date: Scalars["String"]["input"];
};

export type AddCvSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  cvId: Scalars["ID"]["input"];
  mastery: Mastery;
  name: Scalars["String"]["input"];
};

export type AddProfileLanguageInput = {
  name: Scalars["String"]["input"];
  proficiency: Proficiency;
  userId: Scalars["ID"]["input"];
};

export type AddProfileSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  mastery: Mastery;
  name: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type AuthInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type AuthResult = {
  __typename?: "AuthResult";
  access_token: Scalars["String"]["output"];
  refresh_token: Scalars["String"]["output"];
  user: User;
};

export type CreateCvInput = {
  description: Scalars["String"]["input"];
  education?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type CreateDepartmentInput = {
  name: Scalars["String"]["input"];
};

export type CreateLanguageInput = {
  iso2: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  native_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreatePositionInput = {
  name: Scalars["String"]["input"];
};

export type CreateProfileInput = {
  first_name?: InputMaybe<Scalars["String"]["input"]>;
  last_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateProjectInput = {
  description: Scalars["String"]["input"];
  domain: Scalars["String"]["input"];
  end_date?: InputMaybe<Scalars["String"]["input"]>;
  environment: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  start_date: Scalars["String"]["input"];
};

export type CreateSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
};

export type CreateUserInput = {
  auth: AuthInput;
  cvsIds: Array<Scalars["String"]["input"]>;
  departmentId?: InputMaybe<Scalars["ID"]["input"]>;
  positionId?: InputMaybe<Scalars["ID"]["input"]>;
  profile: CreateProfileInput;
  role: UserRole;
};

export type Cv = {
  __typename?: "Cv";
  created_at: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  education?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  languages: Array<LanguageProficiency>;
  name: Scalars["String"]["output"];
  projects?: Maybe<Array<CvProject>>;
  skills: Array<SkillMastery>;
  user?: Maybe<User>;
};

export type CvProject = {
  __typename?: "CvProject";
  description: Scalars["String"]["output"];
  domain: Scalars["String"]["output"];
  end_date?: Maybe<Scalars["String"]["output"]>;
  environment: Array<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  internal_name: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  project: Project;
  responsibilities: Array<Scalars["String"]["output"]>;
  roles: Array<Scalars["String"]["output"]>;
  start_date: Scalars["String"]["output"];
};

export type DeleteAvatarInput = {
  userId: Scalars["ID"]["input"];
};

export type DeleteCvInput = {
  cvId: Scalars["ID"]["input"];
};

export type DeleteCvSkillInput = {
  cvId: Scalars["ID"]["input"];
  name: Array<Scalars["String"]["input"]>;
};

export type DeleteDepartmentInput = {
  departmentId: Scalars["ID"]["input"];
};

export type DeleteLanguageInput = {
  languageId: Scalars["ID"]["input"];
};

export type DeletePositionInput = {
  positionId: Scalars["ID"]["input"];
};

export type DeleteProfileInput = {
  userId: Scalars["ID"]["input"];
};

export type DeleteProfileLanguageInput = {
  name: Array<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type DeleteProfileSkillInput = {
  name: Array<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type DeleteProjectInput = {
  projectId: Scalars["ID"]["input"];
};

export type DeleteResult = {
  __typename?: "DeleteResult";
  affected: Scalars["Int"]["output"];
};

export type DeleteSkillInput = {
  skillId: Scalars["ID"]["input"];
};

export type Department = {
  __typename?: "Department";
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type ExportPdfInput = {
  html: Scalars["String"]["input"];
  margin?: InputMaybe<MarginInput>;
};

export type ForgotPasswordInput = {
  email: Scalars["String"]["input"];
};

export type Language = {
  __typename?: "Language";
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  iso2: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  native_name?: Maybe<Scalars["String"]["output"]>;
};

export type LanguageProficiency = {
  __typename?: "LanguageProficiency";
  name: Scalars["String"]["output"];
  proficiency: Proficiency;
};

export type LanguageProficiencyInput = {
  name: Scalars["String"]["input"];
  proficiency: Proficiency;
};

export type Mail = {
  __typename?: "Mail";
  created_at: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  otp: Scalars["String"]["output"];
};

export type MarginInput = {
  bottom: Scalars["String"]["input"];
  left: Scalars["String"]["input"];
  right: Scalars["String"]["input"];
  top: Scalars["String"]["input"];
};

export enum Mastery {
  Novice = "Novice",
  Competent = "Competent",
  Proficient = "Proficient",
  Advanced = "Advanced",
  Expert = "Expert",
}

export type Mutation = {
  __typename?: "Mutation";
  addCvProject: Cv;
  addCvSkill: Cv;
  addProfileLanguage: Profile;
  addProfileSkill: Profile;
  createCv: Cv;
  createDepartment: Department;
  createLanguage: Language;
  createPosition: Position;
  createProject: Project;
  createSkill: Skill;
  createUser: User;
  deleteAvatar?: Maybe<Scalars["Void"]["output"]>;
  deleteCv: DeleteResult;
  deleteCvSkill: Cv;
  deleteDepartment: DeleteResult;
  deleteLanguage: DeleteResult;
  deletePosition: DeleteResult;
  deleteProfileLanguage: Profile;
  deleteProfileSkill: Profile;
  deleteProject: DeleteResult;
  deleteSkill: DeleteResult;
  deleteUser: DeleteResult;
  exportPdf: Scalars["String"]["output"];
  forgotPassword?: Maybe<Scalars["Void"]["output"]>;
  removeCvProject: Cv;
  resetPassword?: Maybe<Scalars["Void"]["output"]>;
  signup: AuthResult;
  updateCv: Cv;
  updateCvProject: Cv;
  updateCvSkill: Cv;
  updateDepartment: Department;
  updateLanguage: Language;
  updatePosition: Position;
  updateProfile: Profile;
  updateProfileLanguage: Profile;
  updateProfileSkill: Profile;
  updateProject: Project;
  updateSkill: Skill;
  updateToken: UpdateTokenResult;
  updateUser: User;
  uploadAvatar: Scalars["String"]["output"];
  verifyMail?: Maybe<Scalars["Void"]["output"]>;
};

export type MutationAddCvProjectArgs = {
  project: AddCvProjectInput;
};

export type MutationAddCvSkillArgs = {
  skill: AddCvSkillInput;
};

export type MutationAddProfileLanguageArgs = {
  language: AddProfileLanguageInput;
};

export type MutationAddProfileSkillArgs = {
  skill: AddProfileSkillInput;
};

export type MutationCreateCvArgs = {
  cv: CreateCvInput;
};

export type MutationCreateDepartmentArgs = {
  department: CreateDepartmentInput;
};

export type MutationCreateLanguageArgs = {
  language: CreateLanguageInput;
};

export type MutationCreatePositionArgs = {
  position: CreatePositionInput;
};

export type MutationCreateProjectArgs = {
  project: CreateProjectInput;
};

export type MutationCreateSkillArgs = {
  skill: CreateSkillInput;
};

export type MutationCreateUserArgs = {
  user: CreateUserInput;
};

export type MutationDeleteAvatarArgs = {
  avatar: DeleteAvatarInput;
};

export type MutationDeleteCvArgs = {
  cv: DeleteCvInput;
};

export type MutationDeleteCvSkillArgs = {
  skill: DeleteCvSkillInput;
};

export type MutationDeleteDepartmentArgs = {
  department: DeleteDepartmentInput;
};

export type MutationDeleteLanguageArgs = {
  language: DeleteLanguageInput;
};

export type MutationDeletePositionArgs = {
  position: DeletePositionInput;
};

export type MutationDeleteProfileLanguageArgs = {
  language: DeleteProfileLanguageInput;
};

export type MutationDeleteProfileSkillArgs = {
  skill: DeleteProfileSkillInput;
};

export type MutationDeleteProjectArgs = {
  project: DeleteProjectInput;
};

export type MutationDeleteSkillArgs = {
  skill: DeleteSkillInput;
};

export type MutationDeleteUserArgs = {
  userId: Scalars["ID"]["input"];
};

export type MutationExportPdfArgs = {
  pdf: ExportPdfInput;
};

export type MutationForgotPasswordArgs = {
  auth: ForgotPasswordInput;
};

export type MutationRemoveCvProjectArgs = {
  project: RemoveCvProjectInput;
};

export type MutationResetPasswordArgs = {
  auth: ResetPasswordInput;
};

export type MutationSignupArgs = {
  auth: AuthInput;
};

export type MutationUpdateCvArgs = {
  cv: UpdateCvInput;
};

export type MutationUpdateCvProjectArgs = {
  project: UpdateCvProjectInput;
};

export type MutationUpdateCvSkillArgs = {
  skill: UpdateCvSkillInput;
};

export type MutationUpdateDepartmentArgs = {
  department: UpdateDepartmentInput;
};

export type MutationUpdateLanguageArgs = {
  language: UpdateLanguageInput;
};

export type MutationUpdatePositionArgs = {
  position: UpdatePositionInput;
};

export type MutationUpdateProfileArgs = {
  profile: UpdateProfileInput;
};

export type MutationUpdateProfileLanguageArgs = {
  language: UpdateProfileLanguageInput;
};

export type MutationUpdateProfileSkillArgs = {
  skill: UpdateProfileSkillInput;
};

export type MutationUpdateProjectArgs = {
  project: UpdateProjectInput;
};

export type MutationUpdateSkillArgs = {
  skill: UpdateSkillInput;
};

export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};

export type MutationUploadAvatarArgs = {
  avatar: UploadAvatarInput;
};

export type MutationVerifyMailArgs = {
  mail: VerifyMailInput;
};

export type Position = {
  __typename?: "Position";
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export enum Proficiency {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
  Native = "Native",
}

export type Profile = {
  __typename?: "Profile";
  avatar?: Maybe<Scalars["String"]["output"]>;
  created_at: Scalars["String"]["output"];
  first_name?: Maybe<Scalars["String"]["output"]>;
  full_name?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  languages: Array<LanguageProficiency>;
  last_name?: Maybe<Scalars["String"]["output"]>;
  skills: Array<SkillMastery>;
};

export type Project = {
  __typename?: "Project";
  created_at: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  domain: Scalars["String"]["output"];
  end_date?: Maybe<Scalars["String"]["output"]>;
  environment: Array<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  internal_name: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  start_date: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  cv: Cv;
  cvs: Array<Cv>;
  departments: Array<Department>;
  languages: Array<Maybe<Language>>;
  login: AuthResult;
  position: Position;
  positions: Array<Position>;
  profile: Profile;
  project: Project;
  projects: Array<Project>;
  skillCategories: Array<SkillCategory>;
  skills: Array<Skill>;
  user: User;
  users: Array<User>;
};

export type QueryCvArgs = {
  cvId: Scalars["ID"]["input"];
};

export type QueryLoginArgs = {
  auth: AuthInput;
};

export type QueryPositionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryProfileArgs = {
  userId: Scalars["ID"]["input"];
};

export type QueryProjectArgs = {
  projectId: Scalars["ID"]["input"];
};

export type QueryUserArgs = {
  userId: Scalars["ID"]["input"];
};

export type RemoveCvProjectInput = {
  cvId: Scalars["ID"]["input"];
  projectId: Scalars["ID"]["input"];
};

export type ResetPasswordInput = {
  newPassword: Scalars["String"]["input"];
};

export type Skill = {
  __typename?: "Skill";
  category?: Maybe<SkillCategory>;
  category_name?: Maybe<Scalars["String"]["output"]>;
  category_parent_name?: Maybe<Scalars["String"]["output"]>;
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type SkillCategory = {
  __typename?: "SkillCategory";
  children: Array<SkillCategory>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  order: Scalars["Int"]["output"];
  parent?: Maybe<SkillCategory>;
};

export type SkillMastery = {
  __typename?: "SkillMastery";
  categoryId?: Maybe<Scalars["ID"]["output"]>;
  mastery: Mastery;
  name: Scalars["String"]["output"];
};

export type SkillMasteryInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  mastery: Mastery;
  name: Scalars["String"]["input"];
};

export type UpdateCvInput = {
  cvId: Scalars["ID"]["input"];
  description: Scalars["String"]["input"];
  education?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type UpdateCvProjectInput = {
  cvId: Scalars["ID"]["input"];
  end_date?: InputMaybe<Scalars["String"]["input"]>;
  projectId: Scalars["ID"]["input"];
  responsibilities: Array<Scalars["String"]["input"]>;
  roles: Array<Scalars["String"]["input"]>;
  start_date: Scalars["String"]["input"];
};

export type UpdateCvSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  cvId: Scalars["ID"]["input"];
  mastery: Mastery;
  name: Scalars["String"]["input"];
};

export type UpdateDepartmentInput = {
  departmentId: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type UpdateLanguageInput = {
  iso2: Scalars["String"]["input"];
  languageId: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
  native_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdatePositionInput = {
  name: Scalars["String"]["input"];
  positionId: Scalars["ID"]["input"];
};

export type UpdateProfileInput = {
  first_name?: InputMaybe<Scalars["String"]["input"]>;
  last_name?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type UpdateProfileLanguageInput = {
  name: Scalars["String"]["input"];
  proficiency: Proficiency;
  userId: Scalars["ID"]["input"];
};

export type UpdateProfileSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  mastery: Mastery;
  name: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type UpdateProjectInput = {
  description: Scalars["String"]["input"];
  domain: Scalars["String"]["input"];
  end_date?: InputMaybe<Scalars["String"]["input"]>;
  environment: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  projectId: Scalars["ID"]["input"];
  start_date: Scalars["String"]["input"];
};

export type UpdateSkillInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  skillId: Scalars["ID"]["input"];
};

export type UpdateTokenResult = {
  __typename?: "UpdateTokenResult";
  access_token: Scalars["String"]["output"];
  refresh_token: Scalars["String"]["output"];
};

export type UpdateUserInput = {
  cvsIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  departmentId?: InputMaybe<Scalars["ID"]["input"]>;
  positionId?: InputMaybe<Scalars["ID"]["input"]>;
  role?: InputMaybe<UserRole>;
  userId: Scalars["ID"]["input"];
};

export type UploadAvatarInput = {
  base64: Scalars["String"]["input"];
  size: Scalars["Int"]["input"];
  type: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type User = {
  __typename?: "User";
  created_at: Scalars["String"]["output"];
  cvs?: Maybe<Array<Cv>>;
  department?: Maybe<Department>;
  department_name?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  is_verified: Scalars["Boolean"]["output"];
  position?: Maybe<Position>;
  position_name?: Maybe<Scalars["String"]["output"]>;
  profile: Profile;
  role: UserRole;
};

export enum UserRole {
  Admin = "Admin",
  Employee = "Employee",
}

export type VerifyMailInput = {
  otp: Scalars["String"]["input"];
};

export type LoginQueryVariables = Exact<{
  auth: AuthInput;
}>;

export type LoginQuery = {
  __typename?: "Query";
  login: {
    __typename?: "AuthResult";
    access_token: string;
    refresh_token: string;
    user: {
      __typename?: "User";
      id: string;
      created_at: string;
      email: string;
      is_verified: boolean;
      role: UserRole;
      profile: {
        __typename?: "Profile";
        id: string;
        full_name?: string | null;
        avatar?: string | null;
      };
      cvs?: Array<{
        __typename?: "Cv";
        id: string;
        name: string;
        description: string;
        skills: Array<{
          __typename?: "SkillMastery";
          name: string;
          mastery: Mastery;
        }>;
        languages: Array<{
          __typename?: "LanguageProficiency";
          name: string;
          proficiency: Proficiency;
        }>;
      }> | null;
    };
  };
};

export type SignupMutationVariables = Exact<{
  auth: AuthInput;
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: {
    __typename?: "AuthResult";
    access_token: string;
    refresh_token: string;
    user: {
      __typename?: "User";
      id: string;
      created_at: string;
      email: string;
      is_verified: boolean;
      role: UserRole;
      profile: {
        __typename?: "Profile";
        id: string;
        full_name?: string | null;
        avatar?: string | null;
      };
    };
  };
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: string;
    email: string;
    profile: {
      __typename?: "Profile";
      first_name?: string | null;
      last_name?: string | null;
      avatar?: string | null;
    };
    department?: { __typename?: "Department"; name: string } | null;
    position?: { __typename?: "Position"; name: string } | null;
  }>;
};

export type ProfileSkillsQueryVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type ProfileSkillsQuery = {
  __typename?: "Query";
  profile: {
    __typename?: "Profile";
    id: string;
    skills: Array<{
      __typename?: "SkillMastery";
      name: string;
      mastery: Mastery;
      categoryId?: string | null;
    }>;
  };
};

export type SkillsQueryVariables = Exact<{ [key: string]: never }>;

export type SkillsQuery = {
  __typename?: "Query";
  skills: Array<{
    __typename?: "Skill";
    id: string;
    name: string;
    category?: { __typename?: "SkillCategory"; id: string } | null;
  }>;
};

export type SkillCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type SkillCategoriesQuery = {
  __typename?: "Query";
  skillCategories: Array<{
    __typename?: "SkillCategory";
    id: string;
    name: string;
    order: number;
    parent?: { __typename?: "SkillCategory"; id: string; name: string } | null;
    children: Array<{
      __typename?: "SkillCategory";
      id: string;
      name: string;
      order: number;
    }>;
  }>;
};

export type AddProfileSkillMutationVariables = Exact<{
  skill: AddProfileSkillInput;
}>;

export type AddProfileSkillMutation = {
  __typename?: "Mutation";
  addProfileSkill: {
    __typename?: "Profile";
    id: string;
    skills: Array<{
      __typename?: "SkillMastery";
      name: string;
      mastery: Mastery;
      categoryId?: string | null;
    }>;
  };
};

export type UpdateProfileSkillMutationVariables = Exact<{
  skill: UpdateProfileSkillInput;
}>;

export type UpdateProfileSkillMutation = {
  __typename?: "Mutation";
  updateProfileSkill: {
    __typename?: "Profile";
    id: string;
    skills: Array<{
      __typename?: "SkillMastery";
      name: string;
      mastery: Mastery;
      categoryId?: string | null;
    }>;
  };
};

export type DeleteProfileSkillMutationVariables = Exact<{
  skill: DeleteProfileSkillInput;
}>;

export type DeleteProfileSkillMutation = {
  __typename?: "Mutation";
  deleteProfileSkill: {
    __typename?: "Profile";
    id: string;
    skills: Array<{
      __typename?: "SkillMastery";
      name: string;
      mastery: Mastery;
      categoryId?: string | null;
    }>;
  };
};

export type GetUserQueryVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: string;
    email: string;
    created_at: string;
    profile: {
      __typename?: "Profile";
      id: string;
      first_name?: string | null;
      last_name?: string | null;
      avatar?: string | null;
    };
    department?: { __typename?: "Department"; id: string; name: string } | null;
    position?: { __typename?: "Position"; id: string; name: string } | null;
  };
};

export type GetUserDataQueryVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type GetUserDataQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: string;
    email: string;
    profile: {
      __typename?: "Profile";
      first_name?: string | null;
      last_name?: string | null;
      avatar?: string | null;
    };
  };
};

export type GetDepartmentsQueryVariables = Exact<{ [key: string]: never }>;

export type GetDepartmentsQuery = {
  __typename?: "Query";
  departments: Array<{ __typename?: "Department"; id: string; name: string }>;
};

export type GetPositionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPositionsQuery = {
  __typename?: "Query";
  positions: Array<{ __typename?: "Position"; id: string; name: string }>;
};

export type UpdateProfileMutationVariables = Exact<{
  profile: UpdateProfileInput;
}>;

export type UpdateProfileMutation = {
  __typename?: "Mutation";
  updateProfile: {
    __typename?: "Profile";
    id: string;
    first_name?: string | null;
    last_name?: string | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "User";
    id: string;
    department?: { __typename?: "Department"; id: string; name: string } | null;
    position?: { __typename?: "Position"; id: string; name: string } | null;
  };
};

export type UploadAvatarMutationVariables = Exact<{
  avatar: UploadAvatarInput;
}>;

export type UploadAvatarMutation = {
  __typename?: "Mutation";
  uploadAvatar: string;
};

export type DeleteAvatarMutationVariables = Exact<{
  avatar: DeleteAvatarInput;
}>;

export type DeleteAvatarMutation = {
  __typename?: "Mutation";
  deleteAvatar?: unknown | null;
};

export const LoginDocument = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        created_at
        email
        is_verified
        profile {
          id
          full_name
          avatar
        }
        role
        cvs {
          id
          name
          description
          skills {
            name
            mastery
          }
          languages {
            name
            proficiency
          }
        }
      }
      access_token
      refresh_token
    }
  }
`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useLoginQuery(
  baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> &
    ({ variables: LoginQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export function useLoginLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export function useLoginSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<
  typeof useLoginSuspenseQuery
>;
export type LoginQueryResult = Apollo.QueryResult<
  LoginQuery,
  LoginQueryVariables
>;
export const SignupDocument = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        created_at
        email
        is_verified
        profile {
          id
          full_name
          avatar
        }
        role
      }
      access_token
      refresh_token
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const GetUsersDocument = gql`
  query GetUsers {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department {
        name
      }
      position {
        name
      }
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export function useGetUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetUsersSuspenseQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
export const ProfileSkillsDocument = gql`
  query ProfileSkills($userId: ID!) {
    profile(userId: $userId) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;

/**
 * __useProfileSkillsQuery__
 *
 * To run a query within a React component, call `useProfileSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileSkillsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProfileSkillsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProfileSkillsQuery,
    ProfileSkillsQueryVariables
  > &
    (
      | { variables: ProfileSkillsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileSkillsQuery, ProfileSkillsQueryVariables>(
    ProfileSkillsDocument,
    options
  );
}
export function useProfileSkillsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProfileSkillsQuery,
    ProfileSkillsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileSkillsQuery, ProfileSkillsQueryVariables>(
    ProfileSkillsDocument,
    options
  );
}
export function useProfileSkillsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ProfileSkillsQuery,
        ProfileSkillsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ProfileSkillsQuery,
    ProfileSkillsQueryVariables
  >(ProfileSkillsDocument, options);
}
export type ProfileSkillsQueryHookResult = ReturnType<
  typeof useProfileSkillsQuery
>;
export type ProfileSkillsLazyQueryHookResult = ReturnType<
  typeof useProfileSkillsLazyQuery
>;
export type ProfileSkillsSuspenseQueryHookResult = ReturnType<
  typeof useProfileSkillsSuspenseQuery
>;
export type ProfileSkillsQueryResult = Apollo.QueryResult<
  ProfileSkillsQuery,
  ProfileSkillsQueryVariables
>;
export const SkillsDocument = gql`
  query Skills {
    skills {
      id
      name
      category {
        id
      }
    }
  }
`;

/**
 * __useSkillsQuery__
 *
 * To run a query within a React component, call `useSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillsQuery(
  baseOptions?: Apollo.QueryHookOptions<SkillsQuery, SkillsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SkillsQuery, SkillsQueryVariables>(
    SkillsDocument,
    options
  );
}
export function useSkillsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SkillsQuery, SkillsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SkillsQuery, SkillsQueryVariables>(
    SkillsDocument,
    options
  );
}
export function useSkillsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<SkillsQuery, SkillsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SkillsQuery, SkillsQueryVariables>(
    SkillsDocument,
    options
  );
}
export type SkillsQueryHookResult = ReturnType<typeof useSkillsQuery>;
export type SkillsLazyQueryHookResult = ReturnType<typeof useSkillsLazyQuery>;
export type SkillsSuspenseQueryHookResult = ReturnType<
  typeof useSkillsSuspenseQuery
>;
export type SkillsQueryResult = Apollo.QueryResult<
  SkillsQuery,
  SkillsQueryVariables
>;
export const SkillCategoriesDocument = gql`
  query SkillCategories {
    skillCategories {
      id
      name
      order
      parent {
        id
        name
      }
      children {
        id
        name
        order
      }
    }
  }
`;

/**
 * __useSkillCategoriesQuery__
 *
 * To run a query within a React component, call `useSkillCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SkillCategoriesQuery,
    SkillCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SkillCategoriesQuery, SkillCategoriesQueryVariables>(
    SkillCategoriesDocument,
    options
  );
}
export function useSkillCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SkillCategoriesQuery,
    SkillCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SkillCategoriesQuery,
    SkillCategoriesQueryVariables
  >(SkillCategoriesDocument, options);
}
export function useSkillCategoriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SkillCategoriesQuery,
        SkillCategoriesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SkillCategoriesQuery,
    SkillCategoriesQueryVariables
  >(SkillCategoriesDocument, options);
}
export type SkillCategoriesQueryHookResult = ReturnType<
  typeof useSkillCategoriesQuery
>;
export type SkillCategoriesLazyQueryHookResult = ReturnType<
  typeof useSkillCategoriesLazyQuery
>;
export type SkillCategoriesSuspenseQueryHookResult = ReturnType<
  typeof useSkillCategoriesSuspenseQuery
>;
export type SkillCategoriesQueryResult = Apollo.QueryResult<
  SkillCategoriesQuery,
  SkillCategoriesQueryVariables
>;
export const AddProfileSkillDocument = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;
export type AddProfileSkillMutationFn = Apollo.MutationFunction<
  AddProfileSkillMutation,
  AddProfileSkillMutationVariables
>;

/**
 * __useAddProfileSkillMutation__
 *
 * To run a mutation, you first call `useAddProfileSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfileSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfileSkillMutation, { data, loading, error }] = useAddProfileSkillMutation({
 *   variables: {
 *      skill: // value for 'skill'
 *   },
 * });
 */
export function useAddProfileSkillMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProfileSkillMutation,
    AddProfileSkillMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddProfileSkillMutation,
    AddProfileSkillMutationVariables
  >(AddProfileSkillDocument, options);
}
export type AddProfileSkillMutationHookResult = ReturnType<
  typeof useAddProfileSkillMutation
>;
export type AddProfileSkillMutationResult =
  Apollo.MutationResult<AddProfileSkillMutation>;
export type AddProfileSkillMutationOptions = Apollo.BaseMutationOptions<
  AddProfileSkillMutation,
  AddProfileSkillMutationVariables
>;
export const UpdateProfileSkillDocument = gql`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;
export type UpdateProfileSkillMutationFn = Apollo.MutationFunction<
  UpdateProfileSkillMutation,
  UpdateProfileSkillMutationVariables
>;

/**
 * __useUpdateProfileSkillMutation__
 *
 * To run a mutation, you first call `useUpdateProfileSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileSkillMutation, { data, loading, error }] = useUpdateProfileSkillMutation({
 *   variables: {
 *      skill: // value for 'skill'
 *   },
 * });
 */
export function useUpdateProfileSkillMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileSkillMutation,
    UpdateProfileSkillMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProfileSkillMutation,
    UpdateProfileSkillMutationVariables
  >(UpdateProfileSkillDocument, options);
}
export type UpdateProfileSkillMutationHookResult = ReturnType<
  typeof useUpdateProfileSkillMutation
>;
export type UpdateProfileSkillMutationResult =
  Apollo.MutationResult<UpdateProfileSkillMutation>;
export type UpdateProfileSkillMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileSkillMutation,
  UpdateProfileSkillMutationVariables
>;
export const DeleteProfileSkillDocument = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;
export type DeleteProfileSkillMutationFn = Apollo.MutationFunction<
  DeleteProfileSkillMutation,
  DeleteProfileSkillMutationVariables
>;

/**
 * __useDeleteProfileSkillMutation__
 *
 * To run a mutation, you first call `useDeleteProfileSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProfileSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProfileSkillMutation, { data, loading, error }] = useDeleteProfileSkillMutation({
 *   variables: {
 *      skill: // value for 'skill'
 *   },
 * });
 */
export function useDeleteProfileSkillMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProfileSkillMutation,
    DeleteProfileSkillMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProfileSkillMutation,
    DeleteProfileSkillMutationVariables
  >(DeleteProfileSkillDocument, options);
}
export type DeleteProfileSkillMutationHookResult = ReturnType<
  typeof useDeleteProfileSkillMutation
>;
export type DeleteProfileSkillMutationResult =
  Apollo.MutationResult<DeleteProfileSkillMutation>;
export type DeleteProfileSkillMutationOptions = Apollo.BaseMutationOptions<
  DeleteProfileSkillMutation,
  DeleteProfileSkillMutationVariables
>;
export const GetUserDocument = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      id
      email
      created_at
      profile {
        id
        first_name
        last_name
        avatar
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> &
    ({ variables: GetUserQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<
  typeof useGetUserSuspenseQuery
>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const GetUserDataDocument = gql`
  query GetUserData($userId: ID!) {
    user(userId: $userId) {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserDataQuery,
    GetUserDataQueryVariables
  > &
    (
      | { variables: GetUserDataQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(
    GetUserDataDocument,
    options
  );
}
export function useGetUserDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserDataQuery,
    GetUserDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(
    GetUserDataDocument,
    options
  );
}
export function useGetUserDataSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetUserDataQuery,
        GetUserDataQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUserDataQuery, GetUserDataQueryVariables>(
    GetUserDataDocument,
    options
  );
}
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<
  typeof useGetUserDataLazyQuery
>;
export type GetUserDataSuspenseQueryHookResult = ReturnType<
  typeof useGetUserDataSuspenseQuery
>;
export type GetUserDataQueryResult = Apollo.QueryResult<
  GetUserDataQuery,
  GetUserDataQueryVariables
>;
export const GetDepartmentsDocument = gql`
  query getDepartments {
    departments {
      id
      name
    }
  }
`;

/**
 * __useGetDepartmentsQuery__
 *
 * To run a query within a React component, call `useGetDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDepartmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetDepartmentsQuery,
    GetDepartmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(
    GetDepartmentsDocument,
    options
  );
}
export function useGetDepartmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDepartmentsQuery,
    GetDepartmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(
    GetDepartmentsDocument,
    options
  );
}
export function useGetDepartmentsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetDepartmentsQuery,
        GetDepartmentsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetDepartmentsQuery,
    GetDepartmentsQueryVariables
  >(GetDepartmentsDocument, options);
}
export type GetDepartmentsQueryHookResult = ReturnType<
  typeof useGetDepartmentsQuery
>;
export type GetDepartmentsLazyQueryHookResult = ReturnType<
  typeof useGetDepartmentsLazyQuery
>;
export type GetDepartmentsSuspenseQueryHookResult = ReturnType<
  typeof useGetDepartmentsSuspenseQuery
>;
export type GetDepartmentsQueryResult = Apollo.QueryResult<
  GetDepartmentsQuery,
  GetDepartmentsQueryVariables
>;
export const GetPositionsDocument = gql`
  query getPositions {
    positions {
      id
      name
    }
  }
`;

/**
 * __useGetPositionsQuery__
 *
 * To run a query within a React component, call `useGetPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPositionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPositionsQuery,
    GetPositionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPositionsQuery, GetPositionsQueryVariables>(
    GetPositionsDocument,
    options
  );
}
export function useGetPositionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPositionsQuery,
    GetPositionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPositionsQuery, GetPositionsQueryVariables>(
    GetPositionsDocument,
    options
  );
}
export function useGetPositionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetPositionsQuery,
        GetPositionsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPositionsQuery, GetPositionsQueryVariables>(
    GetPositionsDocument,
    options
  );
}
export type GetPositionsQueryHookResult = ReturnType<
  typeof useGetPositionsQuery
>;
export type GetPositionsLazyQueryHookResult = ReturnType<
  typeof useGetPositionsLazyQuery
>;
export type GetPositionsSuspenseQueryHookResult = ReturnType<
  typeof useGetPositionsSuspenseQuery
>;
export type GetPositionsQueryResult = Apollo.QueryResult<
  GetPositionsQuery,
  GetPositionsQueryVariables
>;
export const UpdateProfileDocument = gql`
  mutation updateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      profile: // value for 'profile'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, options);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult =
  Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const UploadAvatarDocument = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;
export type UploadAvatarMutationFn = Apollo.MutationFunction<
  UploadAvatarMutation,
  UploadAvatarMutationVariables
>;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarMutation, { data, loading, error }] = useUploadAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useUploadAvatarMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadAvatarMutation,
    UploadAvatarMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UploadAvatarMutation,
    UploadAvatarMutationVariables
  >(UploadAvatarDocument, options);
}
export type UploadAvatarMutationHookResult = ReturnType<
  typeof useUploadAvatarMutation
>;
export type UploadAvatarMutationResult =
  Apollo.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = Apollo.BaseMutationOptions<
  UploadAvatarMutation,
  UploadAvatarMutationVariables
>;
export const DeleteAvatarDocument = gql`
  mutation deleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`;
export type DeleteAvatarMutationFn = Apollo.MutationFunction<
  DeleteAvatarMutation,
  DeleteAvatarMutationVariables
>;

/**
 * __useDeleteAvatarMutation__
 *
 * To run a mutation, you first call `useDeleteAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAvatarMutation, { data, loading, error }] = useDeleteAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useDeleteAvatarMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAvatarMutation,
    DeleteAvatarMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteAvatarMutation,
    DeleteAvatarMutationVariables
  >(DeleteAvatarDocument, options);
}
export type DeleteAvatarMutationHookResult = ReturnType<
  typeof useDeleteAvatarMutation
>;
export type DeleteAvatarMutationResult =
  Apollo.MutationResult<DeleteAvatarMutation>;
export type DeleteAvatarMutationOptions = Apollo.BaseMutationOptions<
  DeleteAvatarMutation,
  DeleteAvatarMutationVariables
>;
