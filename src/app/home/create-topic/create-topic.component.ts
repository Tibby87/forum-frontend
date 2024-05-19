import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { TopicsService } from '../../service/topics/topics.service';
import { Observable, switchMap, take, tap } from 'rxjs';
import { User } from '../../model/user/user';
import { selectCurrentUser } from '../../reducers/user/user.selector';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TopicsHelperService } from '../../service/topics/topics-helper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-topic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.scss',
})
export class CreateTopicComponent implements OnInit {
  @Output() topicSent = new EventEmitter<void>();
  user$: Observable<User>;
  topicform: FormGroup;
  constructor(
    private store: Store<AppState>,
    private topicService: TopicsService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.user$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.topicform = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  initTopicSend(): void {
    this.topicform.markAllAsTouched();
    if (this.topicform.valid) {
      this.sendTopic();
    }
  }

  get title(): string {
    return this.topicform.get('title').value;
  }

  get body(): string {
    return this.topicform.get('body').value;
  }

  private sendTopic(): void {
    this.user$
      .pipe(
        take(1),
        switchMap((user) =>
          this.topicService.addTopic({
            author: TopicsHelperService.mapUserToAuthor(user),
            body: this.body,
            title: this.title,
          })
        ),
        tap(() => {
          this.snackbar.open('You topic has been created, hooray!');
          this.topicSent.emit();
        })
      )
      .subscribe();
  }
}
