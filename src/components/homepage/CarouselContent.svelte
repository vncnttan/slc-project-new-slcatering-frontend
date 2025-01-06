<script lang="ts">
	import { formatPrice, showToast, TOAST_TYPE } from '../../scripts/helpers.js';
	import type { CateringType } from '../../../types/catering.type';
	import { goto } from '$app/navigation';

	export let m: CateringType;
	export let idx: number;
	export let isLoggedIn: boolean;

	let navigateNavbar = (destinationLink: string) => {

		if (isLoggedIn) {
			goto(destinationLink);
		} else {
			// console.log('You need to login before accessing checkout page');
			showToast('You need to login before accessing checkout page', TOAST_TYPE.WARNING);
			goto('/login');
		}
	};


</script>

<div class="h-96 relative bg-no-repeat bg-cover bg-center rounded-xl bg-red-sig, {idx}"
		 style="background-image: {m.imageLink ? `url('${m.imageLink}')` : 'linear-gradient(90deg, #B02000, #FF370B)'}">
	<div class="absolute w-full h-96 bg-gradient-to-t from-black/100 to-black/15"></div>
	<div
		class="w-full h-96 flex flex-col md:flex-row justify-between place-items-start md:place-items-end absolute font-inter p-4 md:p-6 2xl:p-10">
		<a href="/product-detail/{m.id}" class="flex flex-row gap-3 place-items-center">
			<img
				src="{m.imageLink ?? 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'}"
				alt="Menu Preview" class="w-20 h-20 object-cover" />
			<div class="flex flex-col">
				<div class="text-white">
					{m.created_by.store_name}
				</div>
				<div class="text-4xl text-white font-semibold">
					{m.title}
				</div>
				<div class="text-sm text-white">
					{formatPrice(m.price)}
				</div>
			</div>
		</a>
		<div class="flex flex-row gap-3">
			<a href="/product-detail/{m.id}">
				<button
					class="bg-gray-600 hover:bg-gray-700 text-normal text-lg text-white rounded-xl p-1 md:p-3  tracking-wide w-20 md:w-28">
					Details
				</button>
			</a>
				<button on:click={() => navigateNavbar(`/checkout/${m.id}`) }
					class="bg-red-600 hover:bg-red-700 text-normal text-lg text-white rounded-xl p-1 md:p-3 font-semibold tracking-wide w-20 md:w-28">
					Order
				</button>
		</div>
	</div>
</div>