<template>
  <div id="article">article</div>
</template>
<script>
export default{
    data() {
		return {
			data: "",
			scroller: window
		}
	},
	methods: {
		pop(e) {
			let href = e.target.href;
			if (href) {
				window.open(href);
			}
		}
	}
}
</script>