<script lang="ts">
  // ** Carbon
  import {
    Header,
    HeaderNav,
    HeaderNavItem,
    SkipToContent,
    Content,
    HeaderUtilities,
    Button,
  } from "carbon-components-svelte";
  import ShoppingCart from "carbon-icons-svelte/lib/ShoppingCart.svelte";

  // ** Configs
  import axios from "../config/axios.js";

  // ** Svelte
  import { onMount } from "svelte";

  // ** Store
  import { cartStore } from "../store/cart-store.js";

  const { items } = cartStore;

  let categories: string[] = [];

  onMount(() => {
    axios.get("categories").then((res) => {
      categories = res.data;
    });
  });
</script>

<Header company="Fake" platformName="Store">
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderNav>
    <HeaderNavItem href="/" text="Home" />

    {#each categories as category}
      <HeaderNavItem href={`/category/${category}`} text={category} />
    {/each}
  </HeaderNav>
  <HeaderUtilities>
    <Button href="/cart" kind="danger-ghost" icon={ShoppingCart}
      >Cart ({$items.length})</Button
    >
  </HeaderUtilities>
</Header>

<Content>
  <slot />
</Content>
