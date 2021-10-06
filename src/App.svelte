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
	let pumpLevels = [5, 10, 25, 0];
  let tankLevels = [4,14, 70, -20];
  let isAnimating = false;
  export function pumpHeart(counter) {

    if(isAnimating) {
      return;
    }
    
    isAnimating = true;
    //forward
    gsap.to('.heart', {
      translateZ: pumpLevels[counter], 
      duration: 0.5
    });
    
    gsap.to(".curve", {
      bottom: tankLevels[counter],
      transformOrigin: "bottom",
      scaleY: 1,
      duration: 0.5
    })
      gsap.to(".tank", {
      height: counter === 3 ? 0 : tankLevels[counter],
      duration: 0.5
    })
    
    //reverse
    gsap.to(".curve", {
      delay: 0.6,
      bottom: tankLevels[counter],
      transformOrigin: "bottom",
      scaleY: 0.5,
      duration: 0.5
    });
    
    gsap.to('.heart', {
      delay: 0.6,
      translateZ: 0,
      duration: 0.25,
      onComplete: function() {
        isAnimating = false;
      }
    })
    
    if(++counter > 3) counter = 0;
  }
