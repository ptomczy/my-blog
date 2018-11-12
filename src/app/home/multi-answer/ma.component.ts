import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
    selector: 'multi-answer',
    templateUrl: './ma.component.html'
})

export class MultiAnswerComponent implements OnInit {

    @Input() defaultAnswer: AnswerTypes;
    @Input() noAnswerAllowed: string;
    @Output() answerReturned = new EventEmitter();

    private ANSWER_OPTIONS = [
        {value: AnswerTypes.null, caption: 'Brak odpowiedzi'},
        {value: AnswerTypes.true, caption: 'Tak'},
        {value: AnswerTypes.false, caption: 'Nie'},
    ];

    private answerTemp: AnswerTypes;
    buttonCaption: string;

    ngOnInit(){
        this.answerTemp = this.defaultAnswer;
        this.emitResult(this.answerTemp);
        this.setCaption(this.answerTemp);
    }

    buttonValueChanged(){

        switch (this.answerTemp) {
            case AnswerTypes.null:
                this.answerTemp = AnswerTypes.true;
                break;
            case AnswerTypes.true:
                this.answerTemp = AnswerTypes.false;
                break;
            case AnswerTypes.false:
                this.answerTemp = AnswerTypes.true;
                if (this.noAnswerAllowed === 'true') {
                    this.answerTemp = AnswerTypes.null;
                }
                break;
            default:
        }
        this.emitResult(this.answerTemp);
        this.setCaption(this.answerTemp);
    }

    setCaption(btn){
        this.buttonCaption = this.ANSWER_OPTIONS.find(x => x.value == btn).caption;
    }

    emitResult(btn){
        this.answerReturned.emit(btn);
    }
}

export enum AnswerTypes {
    null = 'null',
    false = 'false',
    true = 'true'
}



