<template>
   <van-popup
    :value ="value"
    @input="$emit('input',$event)"
    round
    position="bottom"
    :style="{ height: '90%' }"
>
    hello
   </van-popup>
</template>

<script>
export default {
  name: 'HomeChannel',
  props: ['value']
//   data () {
//     return {
//       show: true
//     }
//   }
}
</script>

<style>

</style>
