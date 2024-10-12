<script lang="ts">
    import {page} from "$app/stores";
    import CheckoutLayout from "../../../components/checkout/CheckoutLayout.svelte";
    import {onMount} from "svelte";
    import type {PageData} from "./$types";
    import {getCateringDetailsById} from "../../../scripts/datas/catering-mutations-and-queries";
    import CompleteOrderInfo from "../../../components/checkout/Step1OrderInfo/CompleteOrderInfo.svelte";
    import Payment from "../../../components/checkout/Step2Payment/Payment.svelte";
    import OrderCompleted from "../../../components/checkout/Step3Completed/OrderCompleted.svelte";
		import type { CateringType } from '../../../../types/catering.type';
    import type { OrderRequestType } from '../../../../types/order-request.type';
		import type { PaymentResponseType } from '../../../../types/payment-response.type';

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

    let paymentResponse: PaymentResponseType | undefined

    onMount(async () => {
        menu = (await getCateringDetailsById(id)).data
        console.log("Menu: ", menu);
        orderRequest.catering_id = menu.id
    })
    let currentStep = 1;

</script>

<CheckoutLayout currentStep={currentStep}>

    {#if currentStep === 1}
        <CompleteOrderInfo bind:currentStep menu={menu} bind:orderRequest/>
    {:else if currentStep === 2}
        <Payment menu={menu} orderRequest={orderRequest} bind:qrCodeString bind:currentStep bind:paymentResponse accessToken={data.user?.token}/>
    {:else}
        <OrderCompleted bind:paymentResponse cateringId={orderRequest.catering_id}/>
    {/if}
</CheckoutLayout>