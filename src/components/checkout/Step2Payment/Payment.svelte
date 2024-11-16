<script lang="ts">
	import CheckoutSummary from './CheckoutSummary.svelte';
	import CheckoutQR from './CheckoutQR.svelte';
	import { onMount } from 'svelte';
	import { createOrder } from '../../../scripts/datas/order-mutations-and-queries';
	import type { CateringType } from '../../../../types/catering.type';
	import type { OrderRequestType } from '../../../../types/order-request.type';
	import type { PaymentResponseType } from '../../../../types/payment-response.type';
	import { PUBLIC_WEBSOCKET_LOCATION } from '$env/static/public';
	import { showToast, TOAST_TYPE } from '../../../scripts/helpers';

	export let menu: CateringType;
	export let orderRequest: OrderRequestType;
	export let currentStep: number;
	export let accessToken: string | undefined;
	export let paymentResponse: PaymentResponseType | undefined;

	let qrCodeString: string = '';

	function progressToNextStep() {
		currentStep += 1;
	}

	function progressToPreviousStep() {
		currentStep -= 1;
	}

	let userId = '';
	onMount(async () => {
		// console.log('Payment OnMount Called');
		if (!accessToken) {
			// console.log('No access token');
			return;
		} else {

			let response;
			try {
				response = await createOrder(orderRequest, accessToken);
			} catch (error) {
				showToast('Error while creating order: ' + error?.response?.data?.message, TOAST_TYPE.ERROR);
			}
			qrCodeString = response?.data.qr_string;
			userId = response?.data.ordered_by;
		}

		const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
		const socket = new WebSocket(`${protocol}://${PUBLIC_WEBSOCKET_LOCATION}/ws/qrcode/${userId}/`);

		socket.onopen = () => {
			// console.log('Connection established');
		};

		socket.onmessage = (ev) => {
			const data = JSON.parse(ev.data);
			// console.log('Data From Websocket: ', data);
			if (data.type === 'payment_success') {
				paymentResponse = data;
				progressToNextStep();
			}
		};


		socket.onerror = (error) => {
			console.error('WebSocket error observed:', error);
		};

	});
</script>

<div class="flex flex-col gap-12 place-items-center w-full p-[10%] md:p-0">
	<div class="page-container">
		<div class="border-box-container ">
			<!--        Summary -->
			<CheckoutSummary menu={menu} orderRequest={orderRequest} />
		</div>
		<div class="border-box-container reverse">
			<!--        QR Code -->
			<CheckoutQR {qrCodeString} />
		</div>
	</div>

	<button class="py-3 w-48 bg-gray-400 hover:bg-gray-500 rounded-lg text-white text-xl"
					on:click={progressToPreviousStep}> Cancel
	</button>
</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column-reverse;

        gap: 3rem;
        width: 100%;
    }

    @media screen and ( min-width: 1280px ) {
        .page-container {
            display: grid;
            order: -1;
            grid-template-columns: 5fr 3fr;
        }

    }

    .border-box-container {
        border: 1px solid #D7D7D7;
        padding: 1rem;
        border-radius: 0.5rem;
        display: grid;
    }
</style>