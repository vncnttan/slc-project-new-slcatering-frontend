<script lang="ts">
    import {page} from "$app/stores";
    import CheckoutLayout from "../../../components/checkout/CheckoutLayout.svelte";
    import {onMount} from "svelte";
    import type {PageData} from "./$types";
    import {getCateringDetailsById} from "../../../scripts/datas/catering-mutations-and-queries";
    import CompleteOrderInfo from "../../../components/checkout/Step1OrderInfo/CompleteOrderInfo.svelte";
    import Payment from "../../../components/checkout/Step2Payment/Payment.svelte";
    import type {CateringType, OrderRequestType} from "../../../scripts/custom-type-declarations";
    import OrderCompleted from "../../../components/checkout/Step3Completed/OrderCompleted.svelte";

    let id = $page.params.id;
    let menu = {} as CateringType;
    let qrCodeString: string = ""
    export let data: PageData;

    let orderRequest = {
        variants: [{
            variant_name: "Reguler",
            additional_price: 0,
            variant_id: "Reguler",
            quantity: 1
        }]
    } as OrderRequestType


    onMount(async () => {
        menu = (await getCateringDetailsById(id)).data
        orderRequest.catering_id = menu.id
    })
    let currentStep = 1;

</script>

<CheckoutLayout currentStep={currentStep}>

    {#if currentStep === 1}
        <CompleteOrderInfo bind:currentStep menu={menu} bind:orderRequest/>
    {:else if currentStep === 2}
        <Payment menu={menu} orderRequest={orderRequest} bind:qrCodeString bind:currentStep accessToken={data.user?.token}/>
    {:else}
        <OrderCompleted/>
    {/if}
</CheckoutLayout>