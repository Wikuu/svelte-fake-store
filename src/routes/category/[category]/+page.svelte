<script lang="ts">
  //** Components
  import Layout from "../../../components/layout.svelte";
  import Products from "../../../components/products.svelte";

  export let data;
</script>

<Layout>
  <Products products={data.products} />
</Layout>
