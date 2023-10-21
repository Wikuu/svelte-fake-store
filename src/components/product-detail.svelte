<script lang="ts">
  // ** Carbon
  import { Column, Grid, Row, Tile } from "carbon-components-svelte";

  // ** Types
  import type { TProduct } from "../types/product";

  // ** Style
  import "../styles/product-detail.css";

  export let product: TProduct;
</script>

<Grid condensed>
  <Row>
    <Column sm={16} md={16} lg={16} class="title">
      <Tile>
        <h4>{product.title}</h4>
      </Tile>
    </Column>
    <Column sm={16} md={8} lg={8}>
      <Tile>
        <img class="product-detail-image" src={product.image} alt="product" />
      </Tile>
    </Column>
    <Column sm={16} md={8} lg={8}>
      <Tile>
        <h5>{product.description}</h5>
        <div class="product-detail-footer">
          <h5>Rating: {product.rating.rate}</h5>
          <h5>Price: ${product.price}</h5>
        </div>
        <h5>Category: {product.category}</h5>
      </Tile>
    </Column>
  </Row>
</Grid>
