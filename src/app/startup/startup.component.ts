import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  files: string[] = [];
  flipFiles: string[] = [];
  selectedFile: string;
  selectedFlipFile: string;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<string[]>('http://localhost:3000/api/getFilenames/questions').subscribe((data: string[]) => {
      this.files = data;

    });
    this.http.get<string[]>('http://localhost:3000/api/getFilenames/flipquestions').subscribe((data: string[]) => {
      this.flipFiles = data;

    });
    this.selectedFile = localStorage.getItem('questionsSetJsonFilePath') || './assets/datasource/questionSet/questions-set-1.json';
    this.selectedFlipFile = localStorage.getItem('flipQuestionsSetJsonFilePath') || './assets/datasource/flipQuestions/flip-questions-set-1.json';
  }

  updateConstantValue(selectedFile: string) {
    // Update the constant value based on the selected file
    selectedFile = "./assets/datasource/questionSet/" + selectedFile;
    ConstantsService.questionsSetJsonFilePath = selectedFile; 
    localStorage.setItem('questionsSetJsonFilePath', selectedFile);
  }

  updateConstantFlipValue(selectedFlipFile: string){
    selectedFlipFile = "./assets/datasource/flipQuestions/" + selectedFlipFile;
    ConstantsService.flipQuestionsSetJsonFilePath = selectedFlipFile; 
    localStorage.setItem('flipQuestionsSetJsonFilePath', selectedFlipFile);
  }

}
