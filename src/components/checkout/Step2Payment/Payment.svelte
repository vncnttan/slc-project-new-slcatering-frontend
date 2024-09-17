<script lang="ts">
    import CheckoutSummary from "./CheckoutSummary.svelte";
    import type {
        CateringType,
        OrderRequestType,
    } from "../../../scripts/custom-type-declarations";
    import CheckoutQR from "./CheckoutQR.svelte";
    import { onMount } from 'svelte';
    import { createOrder } from '../../../scripts/datas/order-mutations-and-queries';

    export let menu: CateringType
    export let orderRequest: OrderRequestType
    export let currentStep: number
    export let qrCodeString: string
    export let accessToken: string | undefined

    function progressToNextStep() {
        currentStep += 1
    }

    function progressToPreviousStep() {
        currentStep -= 1
    }

    // TODO: Create logic to generate qr and websocket
    onMount(async () => {
        console.log("Payment OnMount Called");
        if(!accessToken) {
            console.log("No access token");
            return;
        } else {
            const response = await createOrder(orderRequest, accessToken)
            qrCodeString = response.data.qrString
        }
    })

    console.log(orderRequest)
</script>

<div class="flex flex-col gap-12 place-items-center w-full">
    <div class="page-container">
        <div class="border-box-container">
            <!--        Summary -->
            <CheckoutSummary menu={menu} orderRequest={orderRequest}/>
        </div>
        <div class="border-box-container">
            <!--        QR Code -->
            <CheckoutQR bind:qrCodeString/>
        </div>
    </div>

    <button class="py-3 w-48 bg-gray-400 hover:bg-gray-500 rounded-lg text-white text-xl" on:click={progressToPreviousStep}> Cancel
    </button>
</div>

<!--TODO: Comment this so that they will progress with websocket-->
<button class="py-3 bg-orange-sig rounded-lg text-white text-xl" on:click={progressToNextStep}> Continue</button>

<style>
    .page-container {
        display: grid;
        grid-template-columns: 5fr 3fr;
        gap: 3rem;
        width: 100%;
    }

    .border-box-container {
        border: 1px solid #D7D7D7;
        padding: 1rem;
        border-radius: 0.5rem;
    }
</style>