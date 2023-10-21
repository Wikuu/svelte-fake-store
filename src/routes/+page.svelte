<script lang="ts">
  // ** Configs
  import axios from "../config/axios.js";

  // ** Svelte
  import { onMount } from "svelte";

  // ** Types
  import type { TProduct } from "../types/product";

  // ** Components
  import Layout from "../components/layout.svelte";
  import Products from "../components/products.svelte";

  let products: TProduct[] = [];

  onMount(() => {
    axios.get("/").then((res) => {
      products = res.data;
    });
  });
</script>

<Layout>
  <Products {products} />
</Layout>
