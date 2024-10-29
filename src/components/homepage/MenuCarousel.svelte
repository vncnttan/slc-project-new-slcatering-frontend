<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { onMount } from 'svelte';
	import { getActiveMenus } from '../../scripts/datas/catering-mutations-and-queries';
	import { fade } from 'svelte/transition';
	import type { CateringType } from '../../../types/catering.type';
	import CarouselContent from '../CarouselContent.svelte';

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


	<!--    Slider Radio Button -->
	<!--{#if menus.length > 1}-->
	<!--	<div class="md:flex justify-center items-center">-->
	<!--		{#each menus as _, i} &lt;!&ndash; eslint-disable-line @typescript-eslint/no-unused-vars &ndash;&gt;-->
	<!--			<button-->
	<!--				class={"w-2 h-2 rounded-full mx-1 mt-4 cursor-pointer " + (currentIndex === i ? "bg-gray-400" : "bg-gray-300")}-->
	<!--				on:click={() => {-->
	<!--              currentIndex = i;-->
	<!--          }}></button>-->
	<!--		{/each}-->
	<!--	</div>-->
	<!--	<button on:click={prev} class="hidden md:block absolute top-[45%] left-[-3rem] text-black">-->
	<!--		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
	<!--				 stroke="currentColor"-->
	<!--				 class="size-8">-->
	<!--			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />-->
	<!--		</svg>-->
	<!--	</button>-->
	<!--	<button on:click={next} class="hidden md:block absolute top-[45%] right-[-3rem] text-black">-->
	<!--		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
	<!--				 stroke="currentColor"-->
	<!--				 class="size-8">-->
	<!--			<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />-->
	<!--		</svg>-->
	<!--	</button>-->
	<!--{/if}-->
</div>
