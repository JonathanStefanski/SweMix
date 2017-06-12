import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControlName } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { Song, Video } from "./song.models";
import { NumericValidators } from "../shared/numeric.validator";
import { GenericValidator } from '../shared/generic-validator';
import { SongService } from "./song.service";
import { YoutubeService } from "./youtube.service";

@Component({
    moduleId: module.id,
    templateUrl: 'song-edit.component.html',
    styleUrls: ['song-edit.component.css']    
})
export class SongEditComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    pageTitle: string;
    songForm : FormGroup;    
    song : Song;
    errorMessage: string;    

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;
    
    constructor(private _route: ActivatedRoute,
                private _fb: FormBuilder,
                private _songService: SongService,
                private _router: Router) { 

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            title: {
                required: 'Please enter a title.',
                minlength: 'The song title must be longer than 3 characters.'             
            },
            artist: {
                required: 'Please enter an artist.',
                minlength: 'The song artist must be longer than 3 characters.'
            },
            youtubeCode: {
                required: 'Please enter the song\'s youtube code.'
            },
            length: {
                required: 'Please enter the song\'s duration (in seconds).',
                isBetween: 'Please enter a song longer than one minute and shorter than twenty.'
            },
            fileLocation: {
                required: 'Please enter the directory you saved the file to.',
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    

    ngOnInit() {
        this._route.data.subscribe(
            data => {
                let temp : Song = data['song'];
                this.song = new Song(temp.id, temp.title, temp.artist, temp.youtubeCode, temp.length);
                this.onSongRetrieved(this.song);
            }
        );
     }   

    ngAfterViewInit():void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.songForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.songForm);
        });
    }

    save(): void {        
        let s = Object.assign({}, this.song, this.songForm.value);
        
        this._songService
            .saveProduct(s)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            )
    }

    delete() : void {
        if (this.song.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the song: ${this.song.title}?`)) {
                this._songService.deleteSong(this.song.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.songForm.reset();
        this._router.navigate(['/songs']);
    }

    onSongRetrieved(song: Song): void {
        if (this.songForm) {
            this.songForm.reset();
        }
        this.song = song;

        if (this.song.id === 0) {
            this.pageTitle = 'Add a Song';
        } else {
            this.pageTitle = `Edit Song: ${this.song.title}`;
        }      

        this.songForm = this._fb.group({
                    id: {value: this.song.id, disabled: true},
                    title: [this.song.title, [Validators.required, Validators.minLength(3)]],
                    artist: [this.song.artist, [Validators.required, Validators.minLength(3)]],
                    youtubeCode: [this.song.youtubeCode, [Validators.required]],
                    length: [this.song.length, [Validators.required, NumericValidators.isBetween(60, 1200)]],
                    downloaded: this.song.downloaded,
                    fileLocation: this.song.fileLocation
        });
      

        this.songForm.get('downloaded').valueChanges.subscribe(
            value => {
                const fileLocationControl = this.songForm.get('fileLocation');
                if (value) fileLocationControl.setValidators([Validators.required]);
                else fileLocationControl.clearValidators();  
                fileLocationControl.updateValueAndValidity();
            }
        );        
    }

    onVideoReceived(video: Video) {
        this.songForm.get('title').setValue(video.title);
        this.songForm.get('youtubeCode').setValue(video.videoId); 
        this.songForm.get('length').setValue(video.getLength());
    }
    

   

}