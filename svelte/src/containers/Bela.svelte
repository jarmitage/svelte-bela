<script>
	import { onMount } from 'svelte'
	// import components
	import { BelaStore } from '../stores/belaStore.js'

	onMount(async () => {
		BelaStore.setup('192.168.8.2', onControl)
		BelaStore.sendControl({command: 'hello'})
	})

	function onControl(event) {
		console.log('[Bela.svelte] received event:', event.detail)
	}

</script>

<p>IP: {$BelaStore.ip}</p>
<p>Connected: {$BelaStore.connected}</p>

