<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let form;

	$: ship = data.ship;
	let transitTime: number, transitProgress: number, remainingTime: string
	$: if (ship.nav.status === 'IN_TRANSIT') {
		const departure = Date.parse(ship.nav.route.departureTime)
		const arrival = Date.parse(ship.nav.route.arrival)
		transitTime = arrival - departure

		const currentTime = Date.now()
		transitProgress = currentTime - departure

		const remainingMs = new Date(arrival - currentTime)
		remainingTime = `${remainingMs.getMinutes()}:${remainingMs.getSeconds()}`
	}

	const shipActions = ['dock', 'refuel', 'orbit', 'extract'];

</script>

<h1>{ship.symbol}</h1>

{#if ship.nav.status === 'IN_TRANSIT'}
	<h3>Ship in transit</h3>
	<progress value={transitProgress} max={transitTime}></progress>
	<span>Time remaining: {remainingTime}</span>
{:else}
	<h3>Navigate to</h3>
	<form action="?/navigateShip" method="post">
		<label for="waypointSymbol">
			Waypoint Symbol
			<input type="text" id="waypointSymbol" name="waypointSymbol" required />
			<input type="hidden" value={ship.symbol} name="shipSymbol" />
		</label>
		<button>Submit</button>
	</form>
	{#if form?.action === 'navigateShip'}
		<span>{form.message}</span>
	{/if}
{/if}

<h3>Ship actions</h3>
<form action="?/shipActions" method="post">
	<label for="actionSelect" />
	<select name="shipAction" id="actionSelect" required>
		<option value="" selected disabled>Select an action...</option>
		{#each shipActions as action}
			<option value={action}>{action}</option>
		{/each}
	</select>
	<input type="hidden" value={ship.symbol} name="shipSymbol" />
	<button>Submit</button>
</form>
{#if form?.action && shipActions.includes(form.action)}
	{#if form.success}
		<span>{form.message}</span>
	{:else}
		<pre>{JSON.stringify(form.error, null, 2)}</pre>
	{/if}
{/if}

<h3>Cargo ({ship.cargo.units}/{ship.cargo.capacity})</h3>
<div style="display:flex; flex-wrap:wrap; gap:10px;">
	{#each ship.cargo.inventory as item}
		<form action="?/sellItem" method="post">
			<article>
				<b>{item.name}</b>
				<p>Units: {item.units}</p>
				<input type="hidden" value={ship.symbol} name="shipSymbol" />
				<input type="hidden" value={item.symbol} name="itemSymbol" />
				<footer>
					<label for="itemRange">
						Sell amount
						<input
							type="range"
							min="0"
							max={item.units}
							value={item.units}
							id="itemRange"
							name="itemAmount"
						/>
					</label>
					<button>Sell</button>
					<label for="contractId">
						Contract Id
						<input type="text" id="contractId" name="contractId" />
					</label>
					<button formaction="?/deliverItem">Deliver</button>
				</footer>
			</article>
		</form>
	{/each}
</div>
{#if form?.action === 'sellItem'}
	{#if form.success}
		<pre>{JSON.stringify(form.data.transaction, null, 2)}</pre>
	{:else}
		<pre>{JSON.stringify(form.error, null, 2)}</pre>
	{/if}
{/if}
{#if form?.action === 'deliverItem'}
	<pre>{JSON.stringify(form.data.contract.terms, null, 2)}</pre>
{/if}

<pre>{JSON.stringify(data, null, 2)}</pre>
