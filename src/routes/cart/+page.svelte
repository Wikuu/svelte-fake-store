<script lang="ts">
  // ** Components
  import Layout from "../../components/layout.svelte";

  // ** Store
  import { cartStore } from "../../store/cart-store";

  // ** Carbon
  import {
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
    Button,
    Tile,
    Modal,
    ToastNotification,
  } from "carbon-components-svelte";

  // ** Icons
  import AddIcon from "carbon-icons-svelte/lib/Add.svelte";
  import SubtractIcon from "carbon-icons-svelte/lib/Subtract.svelte";

  // ** Style
  import "../../styles/cart.css";

  // ** States
  let open = false;
  let showToast = false;

  const { items, total } = cartStore;

  // ** Functions
  const increaseQty = (id: number) => {
    cartStore.increaseQty(id);
  };

  const decreaseQty = (id: number) => {
    cartStore.decreaseQty(id);
  };

  const removeItem = (id: number) => {
    cartStore.removeProduct(id);
  };

  const clearCart = () => cartStore.clearCart();

  const onOrder = () => {
    showToast = true;
    open = false;
    clearCart();
  };
</script>

<Layout>
  {#if $items.length > 0}
    <StructuredList>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head style="width: 25%;">Item</StructuredListCell>
          <StructuredListCell head style="width: 30%"
            >Description</StructuredListCell
          >
          <StructuredListCell head>Quantity</StructuredListCell>
          <StructuredListCell head style="width: 10%">Price</StructuredListCell>
          <StructuredListCell head style="width: 10%">Total</StructuredListCell>
          <StructuredListCell head />
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {#each $items as item}
          <StructuredListRow>
            <StructuredListCell>{item.title}</StructuredListCell>
            <StructuredListCell>{item.description}</StructuredListCell>
            <StructuredListCell>
              <div class="quantity-actions">
                <Button
                  kind="danger-tertiary"
                  iconDescription="Increase"
                  icon={AddIcon}
                  on:click={() => increaseQty(item.id)}
                />
                <span class="important-text">{item.quantity}</span>
                <Button
                  kind="danger-tertiary"
                  iconDescription="Decrease"
                  icon={SubtractIcon}
                  on:click={() => decreaseQty(item.id)}
                  disabled={item.quantity === 1}
                />
              </div>
            </StructuredListCell>
            <StructuredListCell
              ><span class="important-text">${item.price.toFixed(2)}</span
              ></StructuredListCell
            >
            <StructuredListCell>
              <span class="important-text"
                >${(item.price * item.quantity).toFixed(2)}</span
              >
            </StructuredListCell>
            <StructuredListCell style="width: 200px">
              <Button kind="danger" on:click={() => removeItem(item.id)}
                >Remove</Button
              >
            </StructuredListCell>
          </StructuredListRow>
        {/each}

        {#if $total > 0}
          <StructuredListRow>
            <StructuredListCell>Total: ${$total.toFixed(2)}</StructuredListCell>
            <StructuredListCell />
            <StructuredListCell />
            <StructuredListCell />
            <StructuredListCell>
              <Button kind="primary" on:click={() => (open = true)}
                >Order</Button
              >
            </StructuredListCell>
            <StructuredListCell>
              <Button kind="danger" on:click={clearCart}>Clear</Button>
            </StructuredListCell>
          </StructuredListRow>
        {/if}
      </StructuredListBody>
    </StructuredList>
  {:else}
    <Tile style="text-align:center;">
      <p>Your Cart is Empty</p>
    </Tile>
  {/if}

  <Modal
    bind:open
    modalHeading="Order"
    primaryButtonText="Confirm"
    secondaryButtonText="Cancel"
    on:click:button--secondary={() => (open = false)}
    on:submit={onOrder}
  >
    <p>
      You are about to order products with total of <span
        style="font-weight: 600; text-decoration: underline;"
        >${$total.toFixed(2)}</span
      >. Are you sure ?
    </p>
  </Modal>

  {#if showToast}
    <ToastNotification
      class="toaster"
      lowContrast
      kind="success"
      title="Order Successful"
      subtitle="You have ordered successfuly."
      timeout={3000}
      on:close={() => (showToast = false)}
      on:click={() => (showToast = false)}
    />
  {/if}
</Layout>
