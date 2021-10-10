<!-- <script>

import { onMount } from  'svelte';
import Heart_1 from './heart.svelte';
 
let hearts 
//  = [0,1,2,3,4,5,6,7]



async function fetchMoviesJSON() {
                const response = await fetch('https://gs-api.vercel.app/bl');
                const sheetData = await response.json();
                return sheetData;
            }

            fetchMoviesJSON().then(sheetData => {

              hearts = sheetData[0]
            });


/*

0 - 0
1 - 10
2 - 20 -30 
3 - 40
4 -50
5 = 50 60 
6 70 80
7 90 
8 100

*/

</script>
<ul>

{#if hearts}
{#each hearts as heart , i }
<li>

  <Heart_1 count={heart} count_id={i}></Heart_1>

</li>
{/each}
{/if}
</ul>


<style>
    
	ul {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;  
        -webkit-flex-flow: row wrap;
        flex-flow: row wrap;
        gap:-0.5em;
          align-items: start;
          justify-content:center;
		  width: 100%;
	}
li {
  display: inline-block;
}

</style>
 -->

<script>
  import Heart_1 from './heart.svelte';
   
	async function getBL() {
		const res = await fetch(`https://gs-api.vercel.app/bl`);
		const text = await res.json();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}
	
	let promise = getBL();

	function handleClick() {
		promise = getBL();
	}
</script>

<ul class="ulist">

{#await promise}
	<strong>...Loading</strong>
{:then heart}
<li>

  <Heart_1 count={heart[0].A_Negative} count_id={1} label={'A-'}></Heart_1>

</li>

<li>

<Heart_1 count={heart[0].A_POSITIVE} count_id={2} label={'A+'}></Heart_1>

</li>


  <li>

  <Heart_1 count={heart[0].B_Negative} count_id={3} label={'B-'}></Heart_1>

  </li>


  <li>

  <Heart_1 count={heart[0].B_POSITIVE} count_id={4} label={'B+'}></Heart_1>

  </li>


  <li>

  <Heart_1 count={heart[0].AB_Negative} count_id={5} label={'AB-'}></Heart_1>

  </li>


  <li>

  <Heart_1 count={heart[0].AB_POSITIVE} count_id={6} label={'AB+'}></Heart_1>

  </li>
  

  <li>

  <Heart_1 count={heart[0].O_Negative} count_id={7} label={'O-'}></Heart_1>

  </li>

  <li>


  <Heart_1 count={heart[0].O_POSITIVE} count_id={8} label={'O+'}></Heart_1>

  </li>
                    

{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
</ul>
<style>
.ulist {
    
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;  
        -webkit-flex-flow: row wrap;
        flex-flow: row wrap;
        gap:1em;
          align-items: flex-start;
          justify-content:space-evenly;
          padding: 30px;

	}
  .ulist li {
  display: inline-block;
  min-width: 5vw;
  max-width: 5vw;
  max-height: 10vh;
  padding:35px ;
}


</style>
