<script>
import Heart_1 from './heart.svelte';
 
let hearts = [3,1,2,3,4,5]

</script>

{#each hearts as heart , i }
<Heart_1 count={heart} count_id={i}></Heart_1>
{/each}
