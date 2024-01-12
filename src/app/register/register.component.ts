import { Component } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http:HttpClient,private snackBar:MatSnackBar,private router:Router){}

  openSnackBar(message: string,action: string) {
    this.snackBar.open(message, action,{
      duration:2000
    });
  }

  private apiUrl = `http://localhost:7171/register`


  inputPassword:any = "password"


  showHidePassword(){
    this.inputPassword = this.inputPassword === "password" ? 'text' : 'password'
  }

  submit(register:any){
    console.log(register.value)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})// Add any authentication token if required    }); 
    this.http.post<any>(`${this.apiUrl}`,register.value,{headers})
    .subscribe(
      response =>{
        if(response.status === 200){
          this.openSnackBar(response.message,'close');
          this.router.navigate(['/login'])
        }
      },
      error =>{
        this.openSnackBar(error.error.message,'close')
      }
    )

  }

}
