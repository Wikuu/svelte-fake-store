<script lang="ts">
  //**Components
  import Layout from "../../../components/layout.svelte";
  import ProductDetail from "../../../components/product-detail.svelte";

  export let data;
</script>

<Layout>
  <ProductDetail product={data.product} />
</Layout>
