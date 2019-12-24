import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MarketsService } from '../../services/markets.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.page.html',
  styleUrls: ['./modal-product.page.scss'],
})
export class ModalProductPage implements OnInit {

  @Input() categories;
  myform: FormGroup;
  subcategories = [];
  hasCategory = false;
  hasSubcategory = false;
  hasProduct = false;

  constructor(
    private modalCtrl: ModalController,
    private marketsService: MarketsService,
    private formBuilder: FormBuilder,
    private uiService: UiServiceService
  ) {
    this.myform = this.createMyForm();
  }

  ngOnInit() { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  selectCategory(event) {
    this.subcategories = [];
    console.log(event.detail.value);
    const id = event.detail.value;
    this.marketsService.getSubcategories(id).subscribe(resp => {
      this.subcategories = resp.subcategories;
    });
    // this.subcategories = await this.marketsService.getSubcategories(id).
    console.log(this.subcategories);
    this.hasCategory = true;
  }

  selectSubcategory(event) {
    console.log(event.detail.value);
    const id = event.detail.value;
    this.hasSubcategory = true;
  }

  private createMyForm() {
    return this.formBuilder.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      product: ['', Validators.required]
    });
  }

  createProduct() {
    this.marketsService.createProduct(this.myform.value).then(resp => {
      // tslint:disable-next-line: no-string-literal
      let message = `Error al crear: ${resp['errmsg']}`;
      // tslint:disable-next-line: no-string-literal
      if (resp['ok']) {
        message = `${this.myform.value.product} creado con exito!!`;
        this.dismissModal();
      }
      this.uiService.presentAlert(message);
    });
  }

}
