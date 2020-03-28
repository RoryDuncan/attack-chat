<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
		const { id } = page.params;

		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const res = await this.fetch(`rooms/${id}.json`);
		const room = await res.json();

		return { room };
	}
</script>

<script>
	export let room;
</script>

<svelte:head>
	<title>{room.name}</title>
</svelte:head>