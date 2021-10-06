<script> 
	import { onMount } from 'svelte';
	import Heart from './heart_1.svelte'
		
	import { pumpHeart } from './heart.js';
		
		 onMount(()=> pumpHeart(1) )
		
</script>

	<Heart ></Heart>
