import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  createPostForm: FormGroup;
  loading = false;
  imageSrc: string;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      title: ["", Validators.required],
      assetType: ["", Validators.required],
      category: ["", Validators.required],
      origin: ["", Validators.required],
      description: [""],
      file: ["", Validators.required],
      fileSource: ["", Validators.required],
      proof: ["", Validators.required],
      amount: ["", Validators.required],
      createdAt: new Date(),
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.createPostForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.createPostForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }
}
