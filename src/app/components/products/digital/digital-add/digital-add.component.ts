import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {HttpResponse} from '@angular/common/http';
import {SubCategory} from '../../../../shared/models/subCategory';
import {User} from '../../../user/user';
import {CategoryService} from '../../../../shared/service/categoryService';
import {ProductService} from '../../../../shared/service/ProductService';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../../shared/models/product';
import {UploadFileService} from '../../../../shared/service/uploadFileService';
import {Category} from '../../../../shared/models/category';
import {Mark} from '../../../../shared/models/mark';
import {SubCategoryService} from '../../../../shared/service/subCategoryService';
import {MarkService} from '../../../../shared/service/markService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-digital-add',
  templateUrl: './digital-add.component.html',
  styleUrls: ['./digital-add.component.scss']
})
export class DigitalAddComponent implements OnInit {

  constructor( private fb: FormBuilder, private productService: ProductService, private router: Router, private categoryService: CategoryService, private subCategoryService: SubCategoryService, private markService: MarkService,  private uploadService: UploadFileService) {
    this.myGroup = new FormGroup({
      hasVariant: new FormControl()
    });
  }

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  // tslint:disable-next-line:variable-name
  public Products_DATA = [];
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  selectedCategory: any;
  selectedMark: any;
  selectedSubCategory: any;
  selectedFiles: FileList;
  categories: Category[];
  marks: Mark[];
  myGroup: FormGroup;
  subCategories: SubCategory[];
  urlImage = '';
  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(6)]],
    sku: [],
    description: [],
    price: [],
    hasVariant: [],
    qttInStock: [],
    image: [],
    cat: [],
    sub: [],
    mark: [],
  });

  public onUploadInit(args: any): void { }

  public onUploadError(args: any): void { }

  public onUploadSuccess(args: any): void { }

  ngOnInit() {
    this.getAllRec();
    this.getAllSub();
    this.getAllMark();
  }
  getAllRec()
  {
    return this.categoryService.getAll().subscribe( groups =>  this.categories = groups);
  }
  getAllSub()
  {
    return this.subCategoryService.getAll().subscribe( groups =>  this.subCategories = groups);
  }
  getAllMark()
  {
    return this.markService.getAll().subscribe( groups =>  this.marks = groups);
  }
  private onSuccess(body: any[]) {
    const dataProd = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < body.length; i++) {
      const line = {
        id: body[i].id,
        name: body[i].name,
        sku: body[i].sku,
        description: body[i].description,
        price: body[i].price,
        hasVariant: body[i].hasVariant,
        image: body[i].image,
        qttInStock: body[i].qttInStock,
        deleted: body[i].deleted,
        dataChangeCreatedTime: body[i].dataChangeCreatedTime,
        dataChangeLastModifiedTime: body[i].dataChangeLastModifiedTime,
        articleCategories: body[i].articleCategories,
        articleSubCategories: body[i].articleSubCategories,
        articleMarks: body[i].articleMarks

      };
      dataProd.push(line);
    }
    this.Products_DATA = dataProd;

  }
  saveProduct() {
    console.log('url: ' + this.selectedFiles);
    const product = this.createFromForm();
    // const formData = new FormData();
    // formData.append('subCategory', JSON.stringify(subCategory));
    // @ts-ignore
    // formData.append('files', this.selectedFiles);
    console.log(product);
    this.productService.create(product).subscribe(() => {
            this.router.navigate(['/products/digital/digital-product-list'], );
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
      sku: this.editForm.get(['sku'])!.value,
      description: this.editForm.get(['description'])!.value,
      price: this.editForm.get(['price'])!.value,
      hasVariant: this.editForm.get(['hasVariant'])!.value,
      qttInStock: this.editForm.get(['qttInStock'])!.value,
      image: this.urlImage,
      category: this.selectedCategory,
      mark: this.selectedMark,
      subCategory: this.selectedSubCategory,
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
}
