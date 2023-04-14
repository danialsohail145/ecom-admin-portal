import { Component, OnInit } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToasterService } from "app/config/toaster.service";
import { finalize, Observable } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { SizeGuide } from "../../model/sizeGuide.model";
import { SizeGuideService } from "../../service/size-guide.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "add-size-guide",
  templateUrl: "./add-size-guide.component.html",
  styleUrls: ["./add-size-guide.component.css"],
})
export class AddSizeGuideComponent implements OnInit {
  pageTitle: string = "Add Size Guide";
  isLoading: boolean = false;
  sizeGuideForm: FormGroup;
  topSizeControl: FormControl;
  bottomSizeControl: FormControl;
  sizeGuideIdControl: FormControl;
  sizeGuideNameControl: FormControl;
  sizeGuideUUID: string = uuidv4();

  isImageSelected: boolean = false;
  downloadURL: Observable<string>;

  editKey: any;
  editData: SizeGuide;

  constructor(
    private storage: AngularFireStorage,
    private sizeGuideService: SizeGuideService,
    private toast: ToasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.topSizeControl = new FormControl("", Validators.required);
    this.bottomSizeControl = new FormControl("", Validators.required);
    this.sizeGuideIdControl = new FormControl(
      this.sizeGuideUUID,
      Validators.required
    );
    this.sizeGuideNameControl = new FormControl("", Validators.required);

    this.sizeGuideForm = new FormGroup({
      id: this.sizeGuideIdControl,
      name: this.sizeGuideNameControl,
      top: this.topSizeControl,
      topFile: new FormControl("", Validators.required),
      bottom: this.bottomSizeControl,
      bottomFile: new FormControl("", Validators.required),
    });
  }

  onSizeUpload(event: any, sizeFor: string, formControl: FormControl) {
    this.isLoading = true;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `SizeGuide/${this.sizeGuideUUID}/${sizeFor}_${this.sizeGuideUUID}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(
      `SizeGuide/${this.sizeGuideUUID}/${sizeFor}_${this.sizeGuideUUID}`,
      file
    );
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              formControl.setValue(url);
            }
            this.isImageSelected = true;
            this.isLoading = false;
          });
        })
      )
      .subscribe((url) => {});
  }

  ngOnInit(): void {
    this.setEditForm();
  }

  get isEditForm() {
    if (this.router.url.includes("edit")) {
      return true;
    }
    return false;
  }

  setEditForm() {
    if (this.isEditForm) {
      this.isLoading = true;
      this.pageTitle = "Edit Size Guide";
      this.route.params.subscribe((params) => {
        this.editKey = params.id;
        this.sizeGuideService
          .getSizeById(params.id)
          .valueChanges()
          .subscribe((res: SizeGuide) => {
            this.editData = res;

            this.isLoading = false;
            this.sizeGuideNameControl.setValue(this.editData.name);
            this.topSizeControl.setValue(this.editData.top);
            this.bottomSizeControl.setValue(this.editData.bottom);
          });
      });
    }
  }

  editSizeGuide() {
    let params: SizeGuide = {
      id: this.sizeGuideIdControl.value,
      name: this.sizeGuideNameControl.value,
      top: this.topSizeControl.value,
      bottom: this.bottomSizeControl.value,
    };
    try {
      this.sizeGuideService
        .updateSizeGuide(this.editKey, params)
        .then((res) => {
          this.toast.success("Size Guide Updated successfully");
        })
        .catch((error) => {
          this.toast.error("Error! cannot Update");
        });
    } catch (e) {
      this.toast.error("Error! cannot Update");
    }
  }
  onSaveSizeGuide() {
    if (this.isEditForm) {
      this.editSizeGuide();
    } else {
      this.saveSize();
    }
  }

  saveSize() {
    let params: SizeGuide = {
      id: this.sizeGuideIdControl.value,
      name: this.sizeGuideNameControl.value,
      top: this.topSizeControl.value,
      bottom: this.bottomSizeControl.value,
    };
    try {
      this.sizeGuideService
        .addSizeGuide(params)
        .then((res) => {
          this.sizeGuideForm.reset();
          this.toast.success("Size Guide added successfully");
          this.sizeGuideUUID = uuidv4();
          this.sizeGuideIdControl.setValue(this.sizeGuideUUID);
        })
        .catch((error) => {
          this.toast.error("Error! cannot save");
          this.sizeGuideUUID = uuidv4();
          this.sizeGuideIdControl.setValue(this.sizeGuideUUID);
        });
    } catch (e) {
      this.toast.error("Error! cannot save");
      this.sizeGuideUUID = uuidv4();
      this.sizeGuideIdControl.setValue(this.sizeGuideUUID);
    }
  }
}
