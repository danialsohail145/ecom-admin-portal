import { Component, OnInit } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToasterService } from "app/config/toaster.service";
import { Collection } from "app/pages/collection/model/collection.model";
import { CollectionService } from "app/pages/collection/service/collection.service";
import { finalize, map, Observable } from "rxjs";
import { SizeGuideService } from "../../service/size-guide.service";
import { v4 as uuidv4 } from "uuid";
import { ProductService } from "../../service/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../model/product.model";

const PIECES = [
  "1 Pc",
  "2 Pc",
  "2 Pc (with trousers)",
  "2 Pc (with dupatta)",
  "3pc",
];
@Component({
  selector: "add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  pageTitle: string = "Add Product";
  sizeList = [];
  sizeGuideList = [];
  selectedItems = [];
  dropdownSettings = {};
  singleSelectdropdownSettings = {};
  productUUID: string = uuidv4();

  pieces = PIECES;
  availabePieceArrayValues = [];
  productDetailArrayValues = [];
  productImagesArray = [];

  allCollection: Collection[];
  addProductForm: FormGroup;

  productIdControl: FormControl;
  collectionIdControl: FormControl;
  productNameControl: FormControl;
  productCodeControl: FormControl;
  productPriceControl: FormControl;
  topDescriptionControl: FormControl;
  mainDescriptionControl: FormControl;
  productSizeControl: FormControl;
  availabePieceArray: FormControl;
  productDetailContol: FormControl;
  sizeGuideContol: FormControl;
  productImageControl: FormControl;
  isOnsaleControl: FormControl;
  isSoldControl: FormControl;
  salePriceControl: FormControl;

  downloadURL: Observable<string>;

  isLoading: boolean = false;

  availabePieceForm: FormGroup;
  productDetailForm: FormGroup;

  editKey: any;
  editData: Product;

  constructor(
    private collectionService: CollectionService,
    private storage: AngularFireStorage,
    private toast: ToasterService,
    private sizeGuideService: SizeGuideService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productIdControl = new FormControl(
      this.productUUID,
      Validators.required
    );
    this.collectionIdControl = new FormControl("", Validators.required);
    this.productNameControl = new FormControl("", Validators.required);
    this.productCodeControl = new FormControl("", Validators.required);
    this.productPriceControl = new FormControl("", Validators.required);
    this.topDescriptionControl = new FormControl("", Validators.required);
    this.mainDescriptionControl = new FormControl("", Validators.required);
    this.productSizeControl = new FormControl(
      this.sizeList,
      Validators.required
    );
    this.availabePieceArray = new FormControl([], Validators.required);
    this.productDetailContol = new FormControl([], Validators.required);

    this.sizeGuideContol = new FormControl("", Validators.required);
    this.productImageControl = new FormControl(
      this.productImagesArray,
      Validators.required
    );

    this.isOnsaleControl = new FormControl(false, Validators.required);
    this.isSoldControl = new FormControl(false, Validators.required);
    this.salePriceControl = new FormControl(0, Validators.required);

    this.addProductForm = new FormGroup({
      id: this.productIdControl,
      collectionId: this.collectionIdControl,
      name: this.productNameControl,
      code: this.productCodeControl,
      price: this.productPriceControl,
      topDescription: this.topDescriptionControl,
      mainDescription: this.mainDescriptionControl,
      productSize: this.productSizeControl,
      availablePiece: this.availabePieceArray,
      productDetail: this.productDetailContol,
      sizeGuide: this.sizeGuideContol,
      images: this.productImageControl,
      isOnSale: this.isOnsaleControl,
      isSold: this.isSoldControl,
      salePrice: this.salePriceControl,
    });
    this.availabePieceForm = new FormGroup({
      piece: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
    });
    this.productDetailForm = new FormGroup({
      heading: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.setEditForm();
    this.initData();
  }

  setEditForm() {
    if (this.isEditForm) {
      this.isLoading = true;
      this.pageTitle = "Edit Product";
      this.route.params.subscribe((params) => {
        this.editKey = params.id;
        this.productService
          .getProductById(params.id)
          .valueChanges()
          .subscribe((res: Product) => {
            this.editData = res;

            this.isLoading = false;
            this.addProductForm.setValue(this.editData);
            this.availabePieceArrayValues = this.editData.availablePiece;

            this.productDetailArrayValues = this.editData.productDetail;
            this.productImagesArray = this.editData.images;
            this.sizeGuideService
              .getSizeById(this.sizeGuideContol.value)
              .valueChanges()
              .subscribe((size: any) => {
                size.key = this.sizeGuideContol.value;
                let sizeArr = [];
                sizeArr.push(size);
                this.sizeGuideContol.setValue(sizeArr);
              });
          });
      });
    }
  }

  initData() {
    this.sizeList = [
      { id: 1, text: "Extra Small (XS)" },
      { id: 2, text: "Small (S)" },
      { id: 3, text: "Medium (M)" },
      { id: 4, text: "Large (L)" },
      { id: 5, text: "Extra Large (XL)" },
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.singleSelectdropdownSettings = {
      singleSelection: true,
      idField: "key",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.getAllCollection();
    this.getSizeGuide();
  }

  getSizeGuide() {
    this.sizeGuideService
      .getAllSizeGuide()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.sizeGuideList = data;

        this.isLoading = false;
      });
  }

  getAllCollection() {
    this.collectionService
      .GetCollection()
      .valueChanges()
      .subscribe((res) => {
        this.allCollection = res;
      });
  }

  onProductImageUpload(event) {
    this.isLoading = true;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `ProductImages/${this.productUUID}/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(
      `ProductImages/${this.productUUID}/${n}`,
      file
    );
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.productImagesArray.push(url);
              this.productImageControl.setValue(this.productImagesArray);
            }
            this.isLoading = false;
          });
        })
      )
      .subscribe((url) => {});
  }
  editProduct() {
    let orgSizeGuide: any = 0;
    orgSizeGuide = this.sizeGuideContol.value;
    if (orgSizeGuide.length > 0) {
      orgSizeGuide = orgSizeGuide[0].key;
    }
    let params = {
      ...this.addProductForm.value,
      sizeGuide: orgSizeGuide,
    };
    try {
      this.productService
        .updateProduct(this.editKey, params)
        .then((res) => {
          this.toast.success("Product Edit successfully");

          this.setEditForm();
        })
        .catch((error) => {
          this.setEditForm();

          this.toast.error("Error! cannot update");
        });
    } catch (e) {
      this.setEditForm();

      this.toast.error("Error! cannot update");
    }
  }
  saveProduct() {
    if (this.isEditForm) {
      this.editProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct() {
    let orgSizeGuide: any = 0;
    orgSizeGuide = this.sizeGuideContol.value;
    if (orgSizeGuide.length > 0) {
      orgSizeGuide = orgSizeGuide[0].key;
    }
    let params = {
      ...this.addProductForm.value,
      sizeGuide: orgSizeGuide,
    };
    try {
      this.productService
        .addProduct(params)
        .then((res) => {
          this.toast.success("Product added successfully");
          this.availabePieceArrayValues = [];
          this.productDetailArrayValues = [];
          this.productImagesArray = [];
          this.addProductForm.reset();

          this.productUUID = uuidv4();
          this.productIdControl.setValue(this.productUUID);
        })
        .catch((error) => {
          this.availabePieceArrayValues = [];
          this.productDetailArrayValues = [];
          this.productImagesArray = [];
          this.addProductForm.reset();
          this.toast.error("Error! cannot save");
          this.productUUID = uuidv4();
          this.productIdControl.setValue(this.productUUID);
        });
    } catch (e) {
      this.availabePieceArrayValues = [];
      this.productDetailArrayValues = [];
      this.productImagesArray = [];
      this.addProductForm.reset();

      this.toast.error("Error! cannot save");
      this.productUUID = uuidv4();
      this.productIdControl.setValue(this.productUUID);
    }
  }
  findInvalidControls(f: FormGroup) {
    const invalid = [];
    const controls = f.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  addAvailabePiece() {
    if (!this.availabePieceForm.invalid) {
      this.availabePieceArrayValues.push(this.availabePieceForm.value);

      this.addProductForm.controls["availablePiece"].setValue(
        this.availabePieceArrayValues
      );
      this.availabePieceForm.reset();
    } else {
      this.toast.error("Please Enter Valid Values");
    }
  }
  removeAvailabePiece(index: number) {
    this.availabePieceArrayValues.splice(index, 1);
  }
  addProductDetail() {
    if (!this.productDetailForm.invalid) {
      this.productDetailArrayValues.push(this.productDetailForm.value);

      this.addProductForm.controls["productDetail"].setValue(
        this.productDetailArrayValues
      );
      this.productDetailForm.reset();
    } else {
      this.toast.error("Please Enter Valid Values");
    }
  }
  removeProductDetail(index: number) {
    this.productDetailArrayValues.splice(index, 1);
  }
  removeProductImg(index: number) {
    this.deleteProductImage(this.productImagesArray[index]);

    this.productImagesArray.splice(index, 1);
    this.productImageControl.setValue(this.productImagesArray);
  }
  deleteProductImage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  // Edit

  get isEditForm() {
    if (this.router.url.includes("edit")) {
      return true;
    }
    return false;
  }
}
