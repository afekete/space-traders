<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#each data.contracts.data as contract}
  <form method="post" action="?/acceptContract">
    <article>
      <header>{contract.type}</header>
      <pre>{JSON.stringify(contract.terms, null, 2)}</pre>
      <input type="hidden" value={contract.id} name="contractId" />
      <footer>
        {#if contract.accepted === true}
          Contract accepted
        {:else}
          <button>Accept</button>
        {/if}
      </footer>
    </article>
  </form>
{/each}
<pre>{JSON.stringify(data, null, 2)}</pre>
