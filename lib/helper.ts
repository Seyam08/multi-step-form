import { skillsByDepartment } from "@/mock-data/skills";

// extract department names
export const departmentList: string[] = Object.keys(skillsByDepartment);

// function for getting skills according to department
export type Department = keyof typeof skillsByDepartment;

export const getSkillsByDepartment = (department: Department): string[] => {
  return skillsByDepartment[department];
};
