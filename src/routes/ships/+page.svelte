<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form;

	// html attributes are only removed from dom when value is null or undefined
	// https://github.com/sveltejs/svelte/issues/259#issuecomment-582112526
	let modalState: boolean | null = null;

	$: if (form?.message) {
		toggleModal();
	}

	function toggleModal() {
		if (modalState) {
			modalState = null;
		} else {
			modalState = true;
		}
		return null;
	}

	function shipDetails(ship: any) {
		const { nav, fuel, registration, cargo } = ship;
		return { registration };
	}

	function getShipyards(waypoints: Array<any>) {
		console.log(waypoints);
		return waypoints.filter((waypoint) =>
			waypoint.traits.some((trait: any) => trait.symbol === 'SHIPYARD')
		);
	}
</script>

<h1>My Fleet</h1>
<div style="display:flex; flex-wrap:wrap; gap:10px;">
	{#each data.fleet as ship}
		<article>
			<header>{ship.symbol}</header>
			<pre>{JSON.stringify(shipDetails(ship), null, 2)}</pre>
			<footer>
				<button on:click={() => goto(`/ships/${ship.symbol}`)}>Details</button>
			</footer>
		</article>
	{/each}
</div>

<h1>Find Shipyard</h1>
<form action="?/findShipyard" method="post">
	<label for="systemSymbol">
		System Symbol
		<input type="text" id="systemSymbol" name="systemSymbol" required />
	</label>
	<button>Submit</button>
</form>

{#if form?.shipyards}
	<pre>{JSON.stringify(getShipyards(form.shipyards), null, 2)}</pre>
{/if}

<h1>Buy Ship</h1>
<form action="?/searchShips" method="post">
	<div class="grid">
		<label for="waypointSymbol">
			Waypoint Symbol
			<input type="text" id="waypointSymbol" name="waypointSymbol" required />
		</label>
		<button>Submit</button>
	</div>
</form>

<!-- need to find way to distinguish which form has returned data -->
{#if form?.ships}
	<div style="display:flex; flex-wrap:wrap; gap:10px;">
		{#each form.ships.shipTypes as ship}
			<form action="?/buyShip" method="post">
				<article>
					<span>{ship.type}</span>
					<input type="hidden" value={ship.type} name="shipType" />
					<input type="hidden" value={form.ships.symbol} name="waypointSymbol" />
					<footer>
						<button>Buy ship</button>
					</footer>
				</article>
			</form>
		{/each}
	</div>
{/if}

<pre>{JSON.stringify(form, null, 2)}</pre>
<pre>{JSON.stringify(data, null, 2)}</pre>

<dialog open={modalState} id="modal-example">
	<article>
		<a
			href="#close"
			aria-label="Close"
			class="close"
			data-target="modal-example"
			on:click={toggleModal}
		/>
		<h3>{form?.message}</h3>
		<footer>
			<button on:click={toggleModal}> Confirm </button>
		</footer>
	</article>
</dialog>
