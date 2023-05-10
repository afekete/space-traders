<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
  export let form;

	function shipDetails(ship: any) {
		const { nav, fuel } = ship;
		return { nav, fuel };
	}

  function getShipyards(waypoints) {
    console.log(waypoints)
    return waypoints.filter(waypoint => waypoint.traits.some(trait => trait.symbol === 'SHIPYARD'))
  }
</script>

<h1>My Fleet</h1>
{#each data.fleet as ship}
	<article>
		<header>{ship.symbol}</header>
		<pre>{JSON.stringify(shipDetails(ship), null, 2)}</pre>
	</article>
{/each}

<h1>Find Shipyard</h1>
<form action="?/findShipyard" method="post">
	<label for="systemSymbol">
		System Symbol
		<input type="text" id="systemSymbol" name="systemSymbol" required />
	</label>
	<button>Submit</button>
</form>

<!-- <pre>{JSON.stringify(form, null, 2)}</pre> -->
{#if form}
<pre>{JSON.stringify(getShipyards(form.data), null, 2)}</pre>
{/if}

<h1>Buy Ship</h1>
<form action="?/searchShips" method="post">
	<div class="grid">
		<label for="systemSymbol">
			System Symbol
			<input type="text" id="systemSymbol" name="systemSymbol" required />
		</label>
		<label for="waypointSymbol">
			Waypoint Symbol
			<input type="text" id="waypointSymbol" name="waypointSymbol" required />
		</label>
		<button>Submit</button>
	</div>
</form>

<pre>{JSON.stringify(data, null, 2)}</pre>
