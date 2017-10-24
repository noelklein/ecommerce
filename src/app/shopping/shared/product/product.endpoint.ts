import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { environment } from '../../../../environments/environment';
import { ProductCategory } from '../models/product-category';
import { ProductListOptions } from '../models/product-list';
import { ProductState, ShoppingState } from '../shopping.state';
import { ProductsResponse } from './product.responses';

@Injectable()
export class ProductEndpoint {
  constructor(private http: HttpClient, private store: Store<ShoppingState>) {}

  public fetchCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(
      `${environment.endpoint}/productCategories`
    );
  }

  public fetchProduct(id: number): Observable<ProductState> {
    return this.http.get<ProductState>(
      `${environment.endpoint}/products/${id}`
    );
  }

  public fetchProducts(
    options: ProductListOptions
  ): Observable<ProductsResponse> {
    let searchParams = new HttpParams();
    searchParams = searchParams.set('sortColumn', options.sortColumn);
    searchParams = searchParams.set('pageSize', options.pageSize.toString());
    searchParams = searchParams.set('pageNumber', options.currentPage.toString());
    if (options.selectedProductCategories.length > 0) {
      const categoryFilter = {
        GroupOp: 1,
        Conditions: options.selectedProductCategories.map(categoryId => {
          return {
            Field: 'productCategoryId',
            Op: 'eq',
            Data: categoryId,
          };
        }),
      };
      searchParams = searchParams.set('filters', JSON.stringify(categoryFilter));
    }
    return this.http.get<ProductsResponse>(`${environment.endpoint}/products`, {
      params: searchParams,
    });
  }
}
