import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

export enum Status {
    Waiting = 'waiting',
    Submitted = 'submitted',
    Cancelled = 'cancelled',
}

@Entity('applications')
@Index(['projectId'])
@Index(['applicantId'])
export class ApplicationEntity {
    @PrimaryColumn()
    public id: string;

    @Column({ type: 'text', nullable: false })
    public projectId: string;

    @Column({ type: 'text', nullable: false })
    public applicantId: string;

    @Column({ type: 'date', nullable: false })
    public submittedAt: Date;

    @Column({ type: 'text', nullable: false })
    public status: Status;

    // constructor(id: string, projectId: string, applicationId: string) {
    //     // super();
    //     this.id = id;
    //     this.status = Status.Waiting;
    // }
    //
    // public approveApplication(projectId: string, applicantId: string) {
    //     this.apply(new ApproveApplicantEvent(projectId, applicantId));
    // }
    //
    // public declineApplication(projectId: string, applicantId: string) {
    //     this.apply(new DeclineApplicantEvent(projectId, applicantId));
    // }

    public submit(submittedAt: Date) {
        this.submittedAt = submittedAt;
    }
}
