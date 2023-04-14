import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { CollectionService } from "../../service/collection.service";
import { CollectionRealtimeService } from "../../service/collection-realtime.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Collection } from "../../model/collection.model";

@Component({
  selector: "add-collection",
  templateUrl: "./add-collection.component.html",
  styleUrls: ["./add-collection.component.css"],
})
export class AddCollectionComponent implements OnInit {
  pageTitle: string = "Add Collection";
  addCollectionForm: FormGroup;
  collectionNameControl: FormControl;
  collctionImageControl: FormControl;

  selectedFile: File = null;
  fb: any = "";
  downloadURL: Observable<string>;
  isImageSelected: boolean = false;
  isLoading: boolean = false;

  editKey: any;
  editData: Collection;

  constructor(
    private collectionService: CollectionService,
    private storage: AngularFireStorage,
    private collectionRealTime: CollectionRealtimeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.collectionNameControl = new FormControl("", Validators.required);
    this.collctionImageControl = new FormControl("", Validators.required);

    this.addCollectionForm = new FormGroup({
      name: this.collectionNameControl,
      image: this.collctionImageControl,
    });
  }

  ngOnInit(): void {
    if (this.isEditForm) {
      this.isLoading = true;
      this.pageTitle = "Edit Collection";
      this.route.params.subscribe((params) => {
        this.editKey = params.id
        this.collectionService
          .getCollectionById(params.id)
          .valueChanges()
          .subscribe((res: Collection) => {
            this.isImageSelected = true;
            this.fb = res.image;
            this.editData = res;
            this.collctionImageControl.setValue(this.fb);
            this.collectionNameControl.setValue(res.name);
            this.isLoading = false;

          });
      });
    }
  }

  get isEditForm() {
    if (this.router.url.includes("edit")) {
      return true;
    }
    return false;
  }

  onFileSelected(event) {
    this.isLoading = true;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `CollectionImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`CollectionImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.collctionImageControl.setValue(this.fb);
            }
            this.isImageSelected = true;
            this.isLoading = false;
          });
        })
      )
      .subscribe((url) => {});
  }
  saveCollection() {
    if (this.isEditForm) {
      console.log("EDit");

    this.collectionService.updateCollection(this.editKey,this.editData.id,this.addCollectionForm.value)

    } else {

      console.log(this.addCollectionForm.value);

      this.collectionService.AddCollection(this.addCollectionForm.value);
    }
    // this.collectionService.GetCollection().snapshotChanges().subscribe(res=>{
    //   console.log(res);
    // })

    // this.collectionRealTime.create(this.addCollectionForm.value).then(() => {
    //   console.log('Created new item successfully!');
    //   // this.submitted = true;
    // });
  }
}
