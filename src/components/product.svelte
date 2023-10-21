<script lang="ts">
  // ** Carbon
  import {
    Row,
    Column,
    ClickableTile,
    TooltipDefinition,
    Button,
  } from "carbon-components-svelte";

  // ** Style
  import "../styles/home.css";

  // ** Types
  import type { TProduct } from "../types/product";

  // ** Store
  import { cartStore } from "../store/cart-store";

  // ** Props
  export let product: TProduct;

  // ** States
  let open = false;

  // ** Functions
  function addToCart(e: Event) {
    e.preventDefault();
    cartStore.addProduct(product);
  }
</script>

<Column sm={6} md={4} lg={4}>
  <ClickableTile href={`/products/${product.id}`} class="product">
    <TooltipDefinition
      bind:open
      tooltipText={product.title}
      direction="top"
      align="end"
    >
      <h4
        on:mouseenter={() => (open = true)}
        on:mouseleave={() => (open = false)}
      >
        {product.title.substring(0, 20)}...
      </h4>
      <span slot="tooltip">{product.title}</span>
    </TooltipDefinition>
    <img src={product.image} alt="product" />
    <Row>
      <Column>
        <p>Rating: {product.rating.rate}</p>
      </Column>
      <Column>
        <p style="text-align: end; font-size: 18px; font-weight:500;">
          $ {product.price}
        </p>
      </Column>
    </Row>
    <Button class="add-to-cart-button" on:click={(e) => addToCart(e)}
      >Add to Cart</Button
    >
  </ClickableTile>
</Column>
