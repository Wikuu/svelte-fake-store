import { derived, get, writable, type Writable } from "svelte/store";
import type { TProduct } from "../types/product";

class CartStore {
  constructor(public items: Writable<TProduct[]> = writable([])) {}

  /**
   *
   * @param product
   * @description Add product to cart. If product already exists in cart, increase quantity by 1
   * @returns void
   */
  public addProduct(product: TProduct) {
    const items = get(this.items);

    if (items.find((item) => item.id === product.id)) {
      this.items.update((items) => {
        return items.map((item) => {
          if (item.id === product.id) {
            item.quantity += 1;
          }
          return item;
        });
      });
    } else {
      this.items.update((items) => [...items, { ...product, quantity: 1 }]);
    }
  }

  /**
   *
   * @param productId
   * @description Remove product from cart
   * @returns void
   */
  public removeProduct(productId: number) {
    this.items.update((items) => items.filter((item) => item.id !== productId));
  }

  /**
   * @description Get total price of all products in cart
   * @returns Writable<number>
   */
  public get total() {
    return derived(this.items, ($items) => {
      return $items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    });
  }

  /**
   * @description Clear cart
   * @returns void
   */
  public clearCart() {
    this.items.set([]);
  }

  /**
   *
   * @param productId
   * @description Increase quantity of product in cart by 1
   * @returns void
   */
  public increaseQty(productId: number) {
    this.items.update((items) => {
      return items.map((item) => {
        if (item.id === productId) {
          item.quantity += 1;
        }
        return item;
      });
    });
  }

  /**
   *
   * @param productId
   * @description Decrease quantity of product in cart by 1
   * @returns void
   */
  public decreaseQty(productId: number) {
    this.items.update((items) => {
      return items.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          item.quantity -= 1;
        }
        return item;
      });
    });
  }
}

export const cartStore = new CartStore();
