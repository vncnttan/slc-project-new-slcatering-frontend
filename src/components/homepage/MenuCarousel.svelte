<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { onMount } from 'svelte';
	import { getActiveMenus } from '../../scripts/datas/catering-mutations-and-queries';
	import { fade } from 'svelte/transition';
	import type { CateringType } from '../../../types/catering.type';
	import CarouselContent from './CarouselContent.svelte';

	let menus = [] as CateringType[];

	$: if (menus.length > 0) {
		console.log(menus);
	}


	let loading = true;


	onMount(async () => {
		menus = (await getActiveMenus()).data;
		loading = false;
	});

</script>

<div class="relative h-96">
	{#if loading}
		<div in:fade={{ delay: 500 }} out:fade
				 class="w-full h-96 flex flex-row justify-center items-center animate-pulse bg-gray-200">
		</div>
	{:else if menus.length === 0}
		<div in:fade={{ delay: 500 }} out:fade class="w-full h-96 flex flex-row justify-center items-center">
			<div class="text-2xl font-semibold text-gray-500">
				No Menus Available
			</div>
		</div>
	{:else}
		<div id="carousel" in:fade={{ delay: 500 }} out:fade
				 class="w-full h-96 justify-center justify-items-center rounded-xl">
			<div class="w-full h-full">
				<Carousel.Root opts={{
						loop: true,
					}}
				>
					<Carousel.Content>
						{#each menus as m, idx}
							<Carousel.Item>
								<CarouselContent {m} {idx} />
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root>
			</div>
		</div>
	{/if}


</div>