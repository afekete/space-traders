<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let form;
</script>

<h1>{data.ship.symbol}</h1>

<h3>Navigate to</h3>
<form action="?/navigateShip" method="post">
	<label for="waypointSymbol">
		Waypoint Symbol
		<input type="text" id="waypointSymbol" name="waypointSymbol" required />
		<input type="hidden" value={data.ship.symbol} name="shipSymbol" />
	</label>
	<button>Submit</button>
</form>
{#if form?.action === 'navigateShip'}
	<span>{form?.message}</span>
{/if}

<pre>{JSON.stringify(data,null,2)}</pre>