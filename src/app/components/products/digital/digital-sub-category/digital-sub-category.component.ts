import { Component, OnInit } from '@angular/core';
import { digitalSubCategoryDB } from 'src/app/shared/tables/digital-sub-category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {CategoryService} from '../../../../shared/service/categoryService';
import {SubCategoryService} from '../../../../shared/service/subCategoryService';
import {LocalDataSource} from 'ng2-smart-table';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {Category} from '../../../../shared/models/category';
import {User} from '../../../user/user';
import {SubCategory} from '../../../../shared/models/subCategory';
import {$} from 'protractor';
import {UploadFileService} from '../../../../shared/service/uploadFileService';

@Component({
  selector: 'app-digital-sub-category',
  templateUrl: './digital-sub-category.component.html',
  styleUrls: ['./digital-sub-category.component.scss']
})
export class DigitalSubCategoryComponent implements OnInit {

  constructor(private modalService: NgbModal, private fb: FormBuilder, private categoryService: CategoryService, private subCategoryService: SubCategoryService, private uploadService: UploadFileService) {
    this.digital_sub_categories = digitalSubCategoryDB.digital_sub_category;

  }
  public closeResult: string;
  public digital_sub_categories = [];
  public SubCategories_DATA = [];
  subCategory: any;
  url: any;
  categories: Category[];
  selectedCategory: any;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  selectedFiles: FileList;
  currentFileUpload: File;



  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(6)]],
    image: [],
    cat: [],
  });

  subCategories: LocalDataSource;

  public settings = {
    actions: {
      position: 'right'
    },

    add: {
      confirmCreate: true,
    },
    delete: {
      confirmDelete: true,
    },
    columns: {
      image: {
        title: 'Image',
        type: 'html',
        valuePrepareFunction: (image: string) => `<img width="50px" src="${image}" />`,
      },
      name: {
        title: 'Name'
      },
      category: {
        title: 'Category',
        valuePrepareFunction: (idx, cat) => {
          return `${cat?.category?.name}`;
        },
      }
    },
  };
  // readUrl(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.url = event.target.files[0];
  //     // var reader = new FileReader();
  //     //
  //     // reader.onload = (event: ProgressEvent) => {
  //     //   this.url = (<FileReader>event.target).result;
  //     // };
  //     //
  //     // reader.readAsDataURL(event.target.files[0]);
  //   }
  // }
  urlImage = '';

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.subCategoryService.getAll().subscribe(data => {
      this.subCategories = new LocalDataSource(data);
      console.log(data);
    });
    this.getAllRec();
  }
  getAllRec()
  {
    return this.categoryService.getAll().subscribe( groups =>  this.categories = groups);

  }

  private onSuccess(body: any[]) {
    const dataSubCat = [];
    for (let i = 0; i < body.length; i++) {
      const line = {
        id: body[i].id,
        name: body[i].name,
        image: body[i].image,
        deleted: body[i].deleted,
        dataChangeCreatedTime: body[i].dataChangeCreatedTime,
        dataChangeLastModifiedTime: body[i].dataChangeLastModifiedTime,
        articleCategories: body[i].articleCategories
      };
      dataSubCat.push(line);
    }
    this.SubCategories_DATA = dataSubCat;

  }

  saveSubCategory() {
    console.log('url: ' + this.selectedFiles);
    const subCategory = this.createFromForm();
    // const formData = new FormData();
    // formData.append('subCategory', JSON.stringify(subCategory));
    // @ts-ignore
    // formData.append('files', this.selectedFiles);
    console.log(subCategory);
    this.subCategoryService.create(subCategory).subscribe(() => {

      },
      () => this.onSaveError());
  }

  protected onSaveError(): void {

  }

  private createFromForm(): any {
    return {
      // id: undefined,
      // tslint:disable-next-line:no-non-null-assertion
      name: this.editForm.get(['name'])!.value,
      image: this.urlImage,
      category: this.selectedCategory
    };
  }
  selectFile(event) {
    this.selectedFiles = event.target.files[0];
    console.log(this.selectedFiles);
    this.uploadService.pushFileToStorage(this.selectedFiles).subscribe(res => {
      console.log(res.body);
      this.urlImage = res.body.name;
    });
  }


  onDelete(cat: any){
    console.log(cat.data);
    this.subCategoryService.delete(cat.data.id).subscribe(
      res => {
        console.log(res);
        cat.confirm.resolve(cat.source.data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      });
    // if (cat.data.deleted === true){
    //   delete (cat.data);
    // }
  }
}

