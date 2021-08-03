import { VacancyDetail } from './vacancy.detail.model';

export class Vacancy {
      id: Number;
      title: string;
      qualification: string;
      workExperience: string;
      location: string;
      postedDate: Date;
      deadlineDate: Date;
      minutesElapsedSinceCreation: string;
      closed: boolean;
      vacancyModelDetailList: Array<VacancyDetail>;
}
