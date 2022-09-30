import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  
  public name : string="";
  public questionList : any=[];
  public currentQuestion : number = 0;
  public points : number=0;
  counter=10;
  correctAns:number=0;
  incorrectAns:number=0;
  interval$:any;
  progress:string="0";
  isCompleted : Boolean = false;
  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {

    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions(){

    this.questionService.getQuestion().subscribe(res=>{
      this.questionList= res.questions
      console.log(res);
    })

  }

  nextQuestion(){
    this.currentQuestion++;
  }
  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQno:number,option:any){

    if(currentQno === this.questionList.length){
      this.isCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAns++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgress();
      }, 1000)
      
    } else {

      setTimeout(()=>{
        this.currentQuestion++;
      this.incorrectAns++;
      this.resetCounter();
      this.getProgress();
      }, 1000)
     
      
      this.points -= 10;
   }
  }



  startCounter(){
    this.interval$ = interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=10;
        this.points-=10;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
      
    },100000);
  }
  
  stopCounter(){
 
  this.interval$.unsubscribe();
  this.counter=0;
  }
  resetCounter(){
  this.stopCounter();
  this.counter=10;
  this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=10;
    this.currentQuestion=0;
    this.progress="0";
  }

  getProgress(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
  
}
function currentQno(currentQno: any, number: any) {
  throw new Error('Function not implemented.');
}

