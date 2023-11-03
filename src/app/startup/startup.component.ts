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
  selectedFile: string;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<string[]>('http://localhost:3000/api/getFilenames').subscribe((data: string[]) => {
      this.files = data;

    });
    this.selectedFile = localStorage.getItem('questionsSetJsonFilePath') || './assets/datasource/questions-set-1.json';
  }

  updateConstantValue(selectedFile: string) {
    // Update the constant value based on the selected file
    selectedFile = "./assets/datasource/" + selectedFile;
    ConstantsService.questionsSetJsonFilePath = selectedFile; 
    localStorage.setItem('questionsSetJsonFilePath', selectedFile);
    const updatedFilePath = ConstantsService.questionsSetJsonFilePath;
    console.log(updatedFilePath);
  }

}
