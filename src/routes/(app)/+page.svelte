<script lang="ts">
    import TopCustomer from "../../components/homepage/TopCustomer.svelte";
    import TopMenu from "../../components/homepage/TopMenu.svelte";
    import MenuCarousel from '../../components/homepage/MenuCarousel.svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    $: isLoggedIn = data.user !== null && data.user !== undefined;

</script>

<div class="!my-8 responsive-container flex flex-col gap-16">
    <div class="flex flex-col gap-4 m-4 md:m-0">
        <div class="text-2xl font-semibold">
            Upcoming Menu
            <div class="text-base text-gray-500">
                Ask the respective merchant for more information and pickup location
            </div>
        </div>
        <MenuCarousel bind:isLoggedIn/>
    </div>

    <div class="flex flex-col gap-4 m-4 md:m-0">
        <div class="text-2xl font-semibold">
            Leaderboards
            <div class="text-base text-gray-500">
                Points are calculated based on the number of transactions and the total amount of money spent
            </div>
        </div>
        <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-8">
            <div class="flex flex-col bg-gray-300 rounded-xl">
                <div class="text-xl font-semibold p-4 text-center text-white rounded-t-xl bg-gradient-to-b from-slate-700 to-gray-700">Top Customer</div>
                <TopCustomer/>
            </div>
            <div class="flex flex-col bg-gray-300 rounded-xl">
                <div class="text-xl font-semibold p-4 text-center text-white rounded-t-xl bg-gradient-to-b from-slate-700 to-gray-700">Most Popular Menu</div>
                <TopMenu/>
            </div>
        </div>
    </div>

</div>
