import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'otp';
  otpForm: FormGroup = new FormGroup({});
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  constructor(){
    this.otpForm = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements:any) {
    const group: any = {};

    elements.forEach((key:any) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyDownEvent(event:any, index:number) {
    let input = this.otpForm.controls[this.formInput[index]];
    if(event.keyCode === 37 || event.keyCode === 39) {
      var k = parseInt(event.keyCode)-38;
      console.log(k);
      index = (index+k+this.formInput.length)%this.formInput.length;
      console.log(index);
      this.rows._results[index].nativeElement.focus();
      return;
    }
    input.setValue("");
    if(event.keyCode === 8) {
      index = (index-2+this.formInput.length)%this.formInput.length;
    }
    else if(event.keyCode > 95 && event.keyCode<106) {
      input.setValue(event.key);
    }
    else {
      return;
    }
    if(this.otpForm.valid){
      this.onSubmit();
    }
    index = (index+1)%this.formInput.length;
    this.rows._results[index].nativeElement.focus();
  }


  onSubmit() {
    window.location.href='https://www.google.com/';
  }

}
