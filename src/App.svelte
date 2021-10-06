<script> 
import { onMount } from 'svelte';
	import gsap from 'gsap'
import Heart from './heart.svelte'
	
import { pumpHeart } from './heart.js';
	
	onMount(()=> pumpHeart(0) )
	
</script>

<Heart></Heart>
<Heart></Heart>
<Heart></Heart>
<Heart></Heart>
<Heart></Heart>		
