<script lang="ts">
  // ** Carbon
  import { Grid, Row } from "carbon-components-svelte";

  // ** Types
  import type { TProduct } from "../types/product";

  // ** Components
  import Product from "./product.svelte";

  export let products: TProduct[] = [];
</script>

<Grid>
  <Row padding>
    {#each products as product}
      <Product {product} />
    {/each}
  </Row>
</Grid>
