import {Component, OnInit, TemplateRef} from '@angular/core';
import { digitalCategoryDB } from 'src/app/shared/tables/digital-category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {CategoryService} from 'src/app/shared/service/categoryService';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Category} from '../../../../shared/models/category';
import {User} from '../../../user/user';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-digital-category',
  templateUrl: './digital-category.component.html',
  styleUrls: ['./digital-category.component.scss']
})
export class DigitalCategoryComponent implements OnInit {

  constructor(private modalService: NgbModal, private fb: FormBuilder, private categoryService: CategoryService) {
    this.digital_categories = digitalCategoryDB.digital_category;
  }
  public closeResult: string;
  public digital_categories = [];
  public Categories_DATA = [];
  category: any;
  url: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(6)]],
    image: [],
  });

  categories: LocalDataSource;


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
    //   deleted: {
    //     title: 'Deleted',
    //     type: 'html',
    //   },
    //   dataChangeCreatedTime: {
    //     title: 'CreatedAt'
    //   },
    //   dataChangeLastModifiedTime: {
    //     title: 'UpdatedAt'
    //   }
     },
  };

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    this.categoryService.getAll().subscribe(data => {
      this.categories = new LocalDataSource(data);
      console.log(data);
    });
  }

  private onSuccess(body: any[]) {
    const dataCat = [];
    // tslint:disable-next-line:prefer-for-of
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
      dataCat.push(line);
    }
    this.Categories_DATA = dataCat;

  }

  // onView(row: any, j) {
  //
  //   for (let i = 0; i < this.Categories_DATA.length; i++) {
  //     if (this.Categories_DATA[i].id === row.id) {
  //       if (row.isOpen) {
  //         this.Categories_DATA[i].isOpen = false;
  //       } else {
  //         this.Categories_DATA[i].isOpen = true;
  //       }
  //
  //     }
  //   }
  // }


  saveCategory() {
    console.log('url: ' + this.url);
    const category = this.createFromForm();
    const formData = new FormData();
    formData.append('files', this.url);
    formData.append('category', JSON.stringify(category));
    console.log(JSON.stringify(formData));
    this.categoryService.create(formData).subscribe(res => {
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
      image: null,
    };
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.url = event.target.files[0];
      // var reader = new FileReader();
      //
      // reader.onload = (event: ProgressEvent) => {
      //   this.url = (<FileReader>event.target).result;
      // };
      //
      // reader.readAsDataURL(event.target.files[0]);
    }
  }

  // onAdd(addCat: TemplateRef<any>, cat: any) {
  //   this.category = cat;
  //   this.modalService.open(addCat, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }


  // addRecord(cat) {
  //  this.categoryService.create(Category).subscribe(
  //     res => {
  //       console.log(res);
  //       cat.confirm.resolve(cat.data);
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         console.log("Client-side error occured.");
  //       } else {
  //         console.log("Server-side error occured.");
  //       }
  //     });
  // }
  onDelete(cat: any){
  console.log(cat.data);
  this.categoryService.delete(cat.data.id).subscribe(
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
  }
}
