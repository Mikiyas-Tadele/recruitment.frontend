import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';
import { InternalVacancyService } from '../internal-vacancy.service';

@Component({
    selector: 'app-internal-vacancy-form',
    templateUrl: './internal-vacancy-form.component.html',
    styleUrls: ['./internal-vacancy-form.component.scss'],
})
export class InternalVacancyFormComponent implements OnInit {
    vacancyForm: FormGroup;
    vacancy: any;
    minDate: Date;
    maxDate: Date;
    constructor(
        private vacancyService: InternalVacancyService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setFullYear(this.minDate.getFullYear());
        this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
    }

    ngOnInit() {
        this.initForm();
        const id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.vacancyService.getInternalVacancy(id).subscribe((res) => {
                this.vacancy = res as InternalVacancyModel;
                this.setForm(this.vacancy);
            });
        }
    }
    save({ value, valid }: { value: InternalVacancyModel; valid: boolean }) {
      console.log(valid);
        if (valid) {
            this.vacancyService.addOrUpdateVacancy(value).subscribe(
                (res) => {
                    this.vacancy = res;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Saved',
                        detail: 'Data Saved Successfully',
                    });
                    this.clear();
                },
                (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Saved',
                        detail: err,
                    });
                }
            );
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Saved',
                detail: 'Please fill the form data properly!',
            });
            console.log(valid);
        }
    }

    initForm() {
        this.vacancyForm = new FormGroup({
            id: new FormControl(''),
            position: new FormControl('', Validators.required),
            qualifications: new FormControl('', Validators.required),
            jobGrade: new FormControl('', Validators.required),
            noRequired: new FormControl('', Validators.required),
            postDate: new FormControl(null, Validators.required),
            endDate: new FormControl(null, Validators.required),
            placementOfWork: new FormControl(''),
        });
    }

    setForm(vacancy: InternalVacancyModel) {
        this.vacancyForm.setValue({
            id: vacancy.id,
            position: vacancy.position,
            qualifications: vacancy.qualifications,
            jobGrade: vacancy.jobGrade,
            noRequired: vacancy.noRequired,
            postDate: new Date(vacancy.postDate),
            endDate: new Date(vacancy.endDate),
            placementOfWork: vacancy.placementOfWork,
        });
    }

    back() {
        this.router.navigate(['admin/internalVacancies']);
    }

    clear() {
        this.vacancyForm.reset({});
    }
}
