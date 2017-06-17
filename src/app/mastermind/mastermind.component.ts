import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'mastermind.component.html',
    styleUrls: ['mastermind.component.css']
})
export class MasterMindComponent {
    guesses = [];
    colors = [
        { color: "blue", code: "#1E90FF" },
        { color: "green", code: "#32CD32" },
        { color: "red", code: "#800000" },
        { color: "yellow", code: "#FFFF33" },
        { color: "purple", code: "#8A2BE2" }
    ];
    draggedColor: {};
    results: string[];

    constructor() {
        this.guesses.push({ id: 1, code: "#FFF", color: "white" });
        this.guesses.push({ id: 2, code: "#FFF", color: "white" });
        this.guesses.push({ id: 3, code: "#FFF", color: "white" });
        this.guesses.push({ id: 4, code: "#FFF", color: "white" });
        this.guesses.push({ id: 5, code: "#FFF", color: "white" });
        this.guesses.push({ id: 6, code: "#FFF", color: "white" });
        this.guesses.push({ id: 7, code: "#FFF", color: "white" });
        this.guesses.push({ id: 8, code: "#FFF", color: "white" });
        this.guesses.push({ id: 9, code: "#FFF", color: "white" });
        this.guesses.push({ id: 10, code: "#FFF", color: "white" });
        this.guesses.push({ id: 11, code: "#FFF", color: "white" });
        this.guesses.push({ id: 12, code: "#FFF", color: "white" });
        this.guesses.push({ id: 13, code: "#FFF", color: "white" });
        this.guesses.push({ id: 14, code: "#FFF", color: "white" });
        this.guesses.push({ id: 15, code: "#FFF", color: "white" });
    }

    dragStart(color) {        
        this.draggedColor = color;
    }

    drop(guess) {
        console.log("Dropped");
        console.log(guess);
        if (this.draggedColor) {
            guess.code = this.draggedColor["code"];
            guess.color = this.draggedColor["color"];
        }
    }
    
    dragEnd() {
        this.draggedColor = {};
    }

    submit() {
        this.results = [];
        this.guesses.forEach(g => {
            let id = g["id"];
            let color = g["color"];
            this.results.push(`Guess with id ${id} received with color ${color}`)
        });
    }

    clear() {
        this.results = [];
        this.guesses.forEach((g) => g["color"] = "white");
        this.guesses.forEach((g) => g["code"] = "#FFF");
    }
}