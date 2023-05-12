<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let form;
</script>

<h3>View Market Data</h3>
<form action="?/getMarketData" method="post">
	<label for="waypointSymbol">
		Waypoint Symbol
		<input type="text" id="waypointSymbol" name="waypointSymbol" required />
	</label>
	<button>Submit</button>
</form>
{#if form?.action === 'getMarketData'}
	<pre>{JSON.stringify(form.data, null, 2)}</pre>
{/if}

<h1>Current Flagship System</h1>
<pre>{JSON.stringify(data, null, 2)}</pre>