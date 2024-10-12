<script lang="ts">
    import { formatPrice } from '../../scripts/helpers';

    export let menuTitle: string
    export let merchantStoreName: string
</script>

<div class="grid grid-cols-2">
    <div class="item-set">
        <div class="font-medium font-karla text-gray-500 ">Item Name</div>
        <div class="font-inter font-bold text-xl">{menuTitle}</div>
        <div class="font-inter text-xs">by {merchantStoreName}</div>
    </div>
    <div class="item-set">
        <div class="font-medium font-karla text-gray-500">Price</div>
        <div class="font-inter font-bold text-xl">{formatPrice(24000)}</div>
    </div>
</div>