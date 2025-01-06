<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import CustomerList from '../../../components/details/CustomerList.svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		closeCatering,
		getCateringDetailsById
	} from '../../../scripts/datas/catering-mutations-and-queries';
	import { formatPrice, showToast, TOAST_TYPE } from '../../../scripts/helpers';
	import type { CateringType } from '../../../../types/catering.type';
	import type { PageData } from './$types';

	let id = $page.params.id;
	let menu = {} as CateringType;
	export let data: PageData;


	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	let transactionCounter = {}
	onMount(async () => {
		menu = (await getCateringDetailsById(id)).data;
	});

	$: {
		if (previousPage.startsWith('/product-detail/') || previousPage.startsWith('/checkout/') || previousPage == '') {
			previousPage = '/';
		}
	}

	async function handleCloseCatering() {
		if (data.user?.username !== menu.created_by?.username && data.user?.role !== 'merchant') {
			showToast('You are not allowed to close this catering', TOAST_TYPE.ERROR);
		}

		try {
			if (data.user === null) {
				showToast('You must login first', TOAST_TYPE.ERROR);
				return;
			}
			await closeCatering(menu.id, data.user?.token);
			showToast('Menu closed successfully', TOAST_TYPE.SUCCESS);
			window.location.reload()
		} catch (e) {
			showToast('Failed to close menu', TOAST_TYPE.ERROR);
		}

	}
</script>

<div class="w-full h-screen flex flex-col xl:flex-row">
	<button on:click={()=>{goto(previousPage)}}
					class="flex flex-row gap-3 place-items-center mt-5 ms-5 py-3 px-5 w-fit hover:bg-gray-200 rounded font-semibold relative xl:absolute">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				 class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
		</svg>
		Back to {previousPage === '/' ? 'Home' : previousPage}
	</button>

	<div
		class="pb-5 pt-12 my-5 xl:my-0 h-screen flex-grow flex flex-col justify-center place-items-center bg-gray-100 xl:max-w-2xl">
		<div class="responsive-cols flex flex-col gap-12 font-inter">
			<div class="flex flex-col md:flex-row xl:flex-col gap-6">
				<div class="flex flex-col gap-2">
					<div>
						<div
							class="h-2.5 w-2.5 rounded-full {!menu.is_closed ? 'bg-green-600' : 'bg-orange-sig'} me-1 inline-block"></div>
						{menu.is_closed ? "Closed" : "Open"}
					</div>
					{#if menu.imageLink}
						<img src={menu.imageLink} alt={menu.title} class="h-40 w-40 xl:h-72 xl:w-72 my-2 rounded-xl object-cover" />
					{/if}
				</div>
				<div class="flex flex-col">
					<div class="text-black text-xs">
						{menu.date}
					</div>
					<div class="text-red-sig text-5xl font-semibold">
						{menu.title}
					</div>
					<div class="text-gray-800 text-lg">
						{menu.created_by?.store_name}
					</div>

					<div class="mt-2 text-sm">
						{#if menu.description}
							<div class="text-gray-800 md:flex hidden">
								{menu.description} <br />
							</div>
						{/if}
						{#if menu.weightPortion}
							<div class="text-black font-bold">
								Portion: {menu.weightPortion} <br />
							</div>
						{/if}
					</div>

					<div class="mt-4 xl:mt-12 flex flex-col gap-1">
						<div class="font-semibold text-3xl">
							{formatPrice(menu.price)}
						</div>
						<div class="text-xs">
							* Price may vary depends on your variant and merchant
						</div>

						{#if data.user && data.user?.username === menu.created_by?.username && data.user?.role === 'merchant' && menu.is_closed === false}
							<button
								class="mt-4 py-2 px-4 bg-red-sig hovered-bg-red-sig text-white rounded font-semibold flex flex-row gap-2 w-fit place-items-center"
								on:click={handleCloseCatering}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
										 stroke="currentColor" class="size-4">
									<path stroke-linecap="round" stroke-linejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
								</svg>

								Close Catering
							</button>
						{/if}
					</div>


				</div>
			</div>

		</div>
	</div>

	<div class="h-screen flex-grow flex flex-col justify-center place-items-center">
		<div class="overflow-y-auto xl:my-24 responsive-cols w-full flex flex-col justify-center place-items-center">
			<div class="h-full w-full">
				<CustomerList catering_id={id} />
			</div>
		</div>
	</div>

</div>

<style>
    .responsive-cols {
        width: 95%;
    }

    @media (min-width: 640px) {
        .responsive-cols {
            width: 90%;
        }
    }

    @media (min-width: 768px) {
        .responsive-cols {
            width: 80%;
        }
    }
</style>