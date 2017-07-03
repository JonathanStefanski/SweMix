import { Component, OnInit } from '@angular/core';
import { Guess, Color } from './mastermind.models';
import { ColorService } from "./color.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'mastermind.component.html',
    styleUrls: ['mastermind.component.css']
})
export class MasterMindComponent implements OnInit {
    
    old: Guess[][] = [[]];
    guesses: Guess[] = [];
    colors: Color[];
    draggedColor: Color;
    results: string[];

    constructor(private _route : ActivatedRoute) { }

    ngOnInit(): void {
        this._route.data.subscribe(
            data => {
                this.colors = data['colors'];
                this.colors.sort((a, b) => a.index - b.index)
            }
        )

        let x = new Color();
        
        this.guesses.push(Guess.create(1, x));
        this.guesses.push(Guess.create(2, x));
        this.guesses.push(Guess.create(3, x));
        this.guesses.push(Guess.create(4, x));
        this.guesses.push(Guess.create(5, x));
    }

    isValid():boolean {        
        return this.guesses.findIndex(g => g.color.index == null) == -1;
    }

    dragStart(color : Color) { 
        this.draggedColor = color;
    }

    drop(guess : Guess) {              
        if (this.draggedColor) {            
            guess.color = this.draggedColor;
        }
    }
    
    dragEnd() {       
        this.draggedColor = null;        
    }

    submit() {
        let x = [];
        this.guesses.forEach(g => x.push(Guess.create(g.id, g.color)));
        this.old.unshift(x);
        this.guesses.forEach((g) => g.color = new Color());
    }

    clear() {
        this.old = [[]];
        this.results = [];        
        this.guesses.forEach((g) => g.color = new Color());        
    }

    cycleColor(guess: Guess) {
        let index = guess.color.index || 0;
        let next = ++index % (this.colors.length + 1);
        if(next == 0) next++;
        guess.color = this.colors.find(i => i.index == next);
    }
}