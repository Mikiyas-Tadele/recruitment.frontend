import { Education } from './education.model';
import { WorkExperience } from './work-experience.model';

export class Userprofile {
     id?: Number;
     email: string;
     fullName: string;
     userId: Number;
     dateOfBirth: Date;
     gender: string;
     disability: string;
     mPhone1: Number;
     mPhone2: string;
     fPhone: string;
     educationalBackgrounds: Education;
     workExperiences: WorkExperience;

      constructor(education: Education, experience: WorkExperience) {
        this.educationalBackgrounds = education;
        this.workExperiences = experience;
     }
}
