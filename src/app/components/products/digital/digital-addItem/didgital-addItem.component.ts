import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {HttpResponse} from '@angular/common/http';
import {User} from '../../../user/user';
import {ProductService} from '../../../../shared/service/ProductService';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../../shared/models/product';
import {UploadFileService} from '../../../../shared/service/uploadFileService';
import {Router} from '@angular/router';
import {ItemService} from '../../../../shared/service/itemService';
import {Item} from '../../../../shared/models/item';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-digital-addItem',
  templateUrl: './digital-addItem.component.html',
  styleUrls: ['./digital-addItem.component.scss']
})
export class DigitalAddItemComponent implements OnInit {

  constructor( private fb: FormBuilder, private itemService: ItemService, private productService: ProductService, private router: Router,  private uploadService: UploadFileService) {
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
  public Items_DATA = [];
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  selectedProduct: any;
  selectedFiles: FileList;
  products: Product[];
  myGroup: FormGroup;
  urlImage = '';
  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(6)]],
    sku: [],
    description: [],
    price: [],
    qttInStock: [],
    image: [],
    prod: [],
  });

  public onUploadInit(args: any): void { }

  public onUploadError(args: any): void { }

  public onUploadSuccess(args: any): void { }

  ngOnInit() {
    this.getAllProd();
  }
  getAllProd()
  {
    return this.productService.getAll().subscribe( groups => {
      this.products = groups.content;
      console.log(groups)
    });
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
        image: body[i].image,
        qttInStock: body[i].qttInStock,
        deleted: body[i].deleted,
        dataChangeCreatedTime: body[i].dataChangeCreatedTime,
        dataChangeLastModifiedTime: body[i].dataChangeLastModifiedTime,
        articleProducts: body[i].articleProducts,

      };
      dataProd.push(line);
    }
    this.Items_DATA = dataProd;

  }
  saveItem() {
    console.log('url: ' + this.selectedFiles);
    const item = this.createFromForm();
    // const formData = new FormData();
    // formData.append('subCategory', JSON.stringify(subCategory));
    // @ts-ignore
    // formData.append('files', this.selectedFiles);
    console.log(item);
    this.itemService.create(item).subscribe(() => {
        this.itemService.getAll().subscribe(
          (res2: HttpResponse<Item[]>) => {
            this.onSuccess(res2.body);
            const user: User = JSON.parse(localStorage.getItem('currentUser'));
            this.router.navigate(['/products/digital/digital-itemLlist']);

          },
        );
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
      qttInStock: this.editForm.get(['qttInStock'])!.value,
      image: this.urlImage,
      product: this.selectedProduct,
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

