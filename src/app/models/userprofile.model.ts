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
     mPhone1: string;
     mPhone2: string;
     fPhone: string;
     educationalBackgrounds: Education[] = [];
     workExperiences: WorkExperience[] = [];
}
